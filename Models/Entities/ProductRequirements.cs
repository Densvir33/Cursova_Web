using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class ProductRequirements
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int RequirementId { get; set; }
        public Requirement Requirement { get; set; }
    }
}
