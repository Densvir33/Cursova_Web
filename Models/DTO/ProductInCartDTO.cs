using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class ProductInCartDTO : ProductDTO
    {
        public int Quantity { get; set; }
    }
}
