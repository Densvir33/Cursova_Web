using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class DiscountDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float DiscountPercent { get; set; }
        public float DiscountMoney { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime StopDate { get; set; }
    }
}
