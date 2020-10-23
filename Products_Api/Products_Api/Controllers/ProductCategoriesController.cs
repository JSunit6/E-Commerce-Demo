using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Products_Api.Models;
using Products_Api.Repository;

namespace Products_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoriesController : ControllerBase
    {
        private IRepository _repository;
        public ProductCategoriesController(IRepository repository)
        {
            _repository = repository;
        }


        [HttpGet]
        public async Task<IActionResult> GetProductCategories()
        {
            var productCategories = await this._repository.ViewAllProductCategories();

            return Ok(productCategories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductCategory([FromRoute] int id)
        {
            var productCategory = await this._repository.ViewProductById(id);

            if(productCategory == null)
            {
                return NotFound();
            }

            return Ok(productCategory);
        }

        [HttpPost]
        public async Task<ActionResult> PostProductCategory([FromBody] ProductsCategory productsCategory) 
        {
            if (ModelState.IsValid)
            {
                if(await this._repository.AddProductCategory(productsCategory) > 0)
                {
                    return CreatedAtAction(
                            "GetProductCategories",
                            new {id = productsCategory.CategoryId},
                            productsCategory
                        );
                }

                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
