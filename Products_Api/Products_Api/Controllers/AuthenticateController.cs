using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Products_Api.Models;

namespace Products_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public AuthenticateController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> PostAppUser(AppUserModel model)
        {
            if(model.Username!="Admin")
                model.Roles = "Customer";
            else
                model.Roles = "Admin";

            var appUser = new AppUser()
            {
                UserName = model.Username,
                Email = model.Email,
                FullName = model.FullName
            };

            try
            {
                var userRegistered = await _userManager.CreateAsync(appUser, model.Password);
                await _userManager.AddToRoleAsync(appUser, model.Roles);
                return Ok(userRegistered);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);
            IdentityOptions _options = new IdentityOptions();

            if(user!=null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var userRole = await _userManager.GetRolesAsync(user);
                var tokenDescr = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, userRole.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(50),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Jwt_Secret.ToString())), SecurityAlgorithms.HmacSha256)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescr);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(token);
            }
            return BadRequest(ModelState);
        }
    }
}
