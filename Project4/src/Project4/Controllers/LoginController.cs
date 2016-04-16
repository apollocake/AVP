using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Project4.Models;
using Project4.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private SignInManager<TodoUser> _signInManager;

        public LoginController(SignInManager<TodoUser> signInManager )
        {
            _signInManager = signInManager;
        }
        // GET: api/values
        [HttpPost]
        public async Task<HttpStatusCodeResult> Login([FromBody]LoginViewModel loginViewModel)
        {
            var signinResult = await _signInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, true, false);
            if (!signinResult.Succeeded)
            {
                return new HttpUnauthorizedResult();
            }
            return new HttpOkResult();
        }


    }
}
