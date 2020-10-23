using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Products_Api.Models
{
    public partial class ProductsCategory
    {
        public ProductsCategory()
        {
            Products = new HashSet<Products>();
        }

        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }

        public virtual ICollection<Products> Products { get; set; }
    }
}
