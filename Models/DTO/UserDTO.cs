using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Photo { get; set; }
        public int Age { get; set; }
        public string Property { get; set; }
        public string Adress { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Number { get; set; }
    }
}
