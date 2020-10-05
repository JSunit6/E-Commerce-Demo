using System;
using System.Collections.Generic;

namespace Products_Api.Models
{
    public partial class Products
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductBrand { get; set; }
        public int? ProductQtyAvailable { get; set; }
        public decimal? ProductPrice { get; set; }
        public int? ProductCategoryId { get; set; }

        public virtual ProductsCategory ProductCategory { get; set; }
    }
}
