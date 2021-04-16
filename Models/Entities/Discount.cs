using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Entities
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public float DiscountPercent { get; set; }
        public float DiscountMoney { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StopDate { get; set; }

        /*NAV props*/
        public virtual ICollection<ProductDiscount> ProductDiscount { get; set; }
        public virtual ICollection<Category> Categories { get; set; }

        public Discount()
        {
            ProductDiscount = new List<ProductDiscount>();
            Categories = new List<Category>();
        }
    }
}
