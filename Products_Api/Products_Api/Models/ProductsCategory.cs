using System;
using System.Collections.Generic;

namespace Products_Api.Models
{
    public partial class ProductsCategory
    {
        public ProductsCategory()
        {
            Products = new HashSet<Products>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<Products> Products { get; set; }
    }
}
