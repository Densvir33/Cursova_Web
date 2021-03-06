using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Entities
{
    public class UserInfo
    {
        [Key]
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Photo { get; set; }
        public int Age { get; set; }
        public string Property { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Number { get; set; }

        /*Navigation Property*/

        public virtual User User { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public UserInfo()
        {
            Orders = new List<Order>();
        }
    }
}
