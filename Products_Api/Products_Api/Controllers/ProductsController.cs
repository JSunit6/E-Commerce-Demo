using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
