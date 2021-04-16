using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO.IdentityDTO
{
    public class RegisterDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }        
        public string PhoneNumber { get; set; }        
        
    }
}
