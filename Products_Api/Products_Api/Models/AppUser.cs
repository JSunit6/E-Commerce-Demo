using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Models
{
    public class AppUser: IdentityUser
    {
        [Column(TypeName = "nvarchar(120)")]
        public String FullName { get; set; }
    }
}
