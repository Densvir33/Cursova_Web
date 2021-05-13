using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Image { get; set; }
        public string Property { get; set; }
        public float Mass { get; set; }
        public string Category { get; set; }
        public int orderId { get; set; }

    }
}
