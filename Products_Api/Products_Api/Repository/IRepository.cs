using Microsoft.AspNetCore.Mvc;
using Products_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Repository
{
    public interface IRepository
    {
        //Product Methods

        public Task<IEnumerable<Products>> ViewAllProducts();

        public Task<Products> ViewProductById(int productId);

        public Task<int> AddProduct(Products product);

        
        //Product Categories Methods

        public Task<IEnumerable<ProductsCategory>> ViewAllProductCategories();

        public Task<ProductsCategory> ViewProductCategoryById(int categoryId);

        public Task<int> AddProductCategory(ProductsCategory productsCategory);

    }
}
