using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcPetShop.Startup))]
namespace MvcPetShop
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
