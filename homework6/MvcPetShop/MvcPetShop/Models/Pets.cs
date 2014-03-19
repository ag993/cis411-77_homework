using System;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;


namespace MvcPetShop.Models
{
    public class Pets
    {
        public int ID { get; set; }
        public string Name { get; set; }

        [Display(Name = "DoB")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DoB { get; set; }
        public string Breed { get; set; }
        public decimal Price { get; set; }
    }

    public class PetsDBContext : DbContext
    {
        public DbSet<Pets> Pets { get; set; }
    }

}