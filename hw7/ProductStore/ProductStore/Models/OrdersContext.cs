using System.Data.Entity;

namespace ProductStore.Models
{
    public class OrdersContext : DbContext
    {
        
        public OrdersContext()
            : base("name=OrdersContext")
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
