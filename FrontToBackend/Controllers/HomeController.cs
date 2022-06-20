using Microsoft.AspNetCore.Mvc;

namespace FrontToBackend.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
