using System;
using System.Data.Entity;


namespace MvcPetShop.Models
{
    public class Pets
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime DoB { get; set; }
        public string Breed { get; set; }
        public decimal Price { get; set; }
    }

    public class PetsDBContext : DbContext
    {
        public DbSet<Pets> Pets { get; set; }
    }

}