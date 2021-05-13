using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Entities
{
   public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public float Price { get; set; }
        public string Image { get; set; }
        public string Property { get; set; }
        public float Mass { get; set; }
        public int OrderId { get; set; }


        /*NAV props*/

        public virtual Category Category { get; set; }

        public virtual ICollection<ProductDiscount> ProductDiscount { get; set; }
        public virtual ICollection<ProductRequirements> ProductRequirements { get; set; }

        public virtual Order Order { get; set; }
        public Product()
        {
            ProductDiscount = new List<ProductDiscount>();
            ProductRequirements = new List<ProductRequirements>();
            Order = new Order();
        }
    }
}
