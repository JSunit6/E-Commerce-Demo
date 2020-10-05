using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Products_Api.Models
{
    public class AppUserContext: IdentityDbContext
    {
        public AppUserContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<AppUser> AppUsers { get; set; }
    }
}
