using FrontToBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FrontToBackend.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }
        public DbSet<Slider> sliders { get; set; }
    }
}
