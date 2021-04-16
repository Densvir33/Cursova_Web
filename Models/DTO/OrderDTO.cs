using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsExecuted { get; set; }

    }
}
