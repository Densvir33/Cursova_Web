using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public bool IsExecuted { get; set; }
        public DateTime Date { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Discount> Discounts { get; set; }

        public Order()
        {
            Products = new List<Product>();
            Discounts = new List<Discount>();
        }
    }
}
