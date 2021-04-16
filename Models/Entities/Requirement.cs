using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Entities
{
    public class Requirement
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public virtual ICollection<ProductRequirements> ProductRequirements { get; set; }
        public virtual ICollection<Product> ProductsWithDiscount { get; set; }

        public Requirement()
        {
            ProductRequirements = new List<ProductRequirements>();
            ProductsWithDiscount = new List<Product>();
        }
    }
}
