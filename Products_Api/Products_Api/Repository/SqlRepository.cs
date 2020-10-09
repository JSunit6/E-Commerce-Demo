using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Products_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Repository
{
    public class SqlRepository: IRepository
    {
        private ShoppingDBContext _context;

        public SqlRepository(ShoppingDBContext context)
        {
            this._context = context;
        }

        public async Task<int> AddProduct(Products product)
        {
            await this._context.Products.AddAsync(product);
            return await this._context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Products>> ViewAllProducts()
        {
            return  await this._context.Products.ToArrayAsync<Products>();
        }

        public async Task<Products> ViewProductById(int productId)
        {
            return await this._context.Products.FindAsync(productId);
        }
    }
}
