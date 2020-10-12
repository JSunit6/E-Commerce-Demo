using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Classes
{
    public class ProductQueryParameters
    {
        public decimal MinPrice { get; set; } = 0;
        public decimal MaxPrice { get; set; } = decimal.MaxValue;
        public string Brand { get; set; }
        public string ProductName { get; set; }
    }
}
