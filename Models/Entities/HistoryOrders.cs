using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class HistoryOrders
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float Price { get; set; }
        public float Discount { get; set; }
        public float Total { get; set; }
        public bool IsDone { get; set; }
        public virtual User User { get; set; }

    }
}
