using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PrivateUserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
