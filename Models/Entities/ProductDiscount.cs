﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class ProductDiscount
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int DiscountId { get; set; }
        public Discount Discount { get; set; }
    }
}
