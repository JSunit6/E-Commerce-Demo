using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Models
{
    public class AppUserModel
    {
        [Required]
        public String Username { get; set; }
        
        [Required]
        public String Password { get; set; }

        [Required]
        public String Email { get; set; }

        [Required]
        public String FullName { get; set; }
    }
}
