using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class HistoryOrdersDTO
    {
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
        public float Discount { get; set; }
        public float Total { get; set; }
        public bool IsDone { get; set; }
    }
}
