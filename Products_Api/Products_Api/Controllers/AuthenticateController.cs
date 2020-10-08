using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Products_Api.Models;

namespace Products_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;

        public AuthenticateController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> PostAppUser(AppUserModel model)
        {
            var appUser = new AppUser()
            {
                UserName = model.Username,
                Email = model.Email,
                FullName = model.FullName
            };

            try
            {
                var userRegistered = await _userManager.CreateAsync(appUser, model.Password);
                return Ok(userRegistered);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return BadRequest(ModelState);
        }
        //public async Task<IActionResult> Login([FromBody] )
    }
}
