using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Products_Api.Classes;
using Products_Api.Models;
using Products_Api.Repository;

namespace Products_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private IRepository _repository;

        public ProductsController(IRepository repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] ProductQueryParameters queryParameters)
        {
             var products =  await this._repository.ViewAllProducts();
           
            if (!string.IsNullOrEmpty(queryParameters.Brand))
            {
                products = products.Where(
                        product => product.ProductBrand == queryParameters.Brand 
                    );
            }

            if (!string.IsNullOrEmpty(queryParameters.ProductName))
            {
                products = products.Where(
                        product => product.ProductName.Equals(queryParameters.ProductName)
                    );
            }

            if (queryParameters.MinPrice != 0 || queryParameters.MaxPrice!=decimal.MaxValue)
            {
                products = products.Where(
                        product => product.ProductPrice >= queryParameters.MinPrice && product.ProductPrice <= queryParameters.MaxPrice
                    );
            }
            
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var product = await this._repository.ViewProductById(id);

            if (product == null)
            {
                return NotFound();
            }
            
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> PostProduct([FromBody] Products product)
        {
            if (ModelState.IsValid)
            {
                int productAdded = await this._repository.AddProduct(product);

                if (productAdded > 0)
                {
                    return CreatedAtAction(
                        "GetProduct",
                        new { id = product.ProductId },
                        product
                    );
                }

                else
                {
                    return BadRequest("Error Adding Product");
                }
            }

            return BadRequest(ModelState);
        }
    }
}
