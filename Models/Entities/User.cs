using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Entities
{
    public class User : IdentityUser
    {
        public virtual UserAdditionalInfo UserAdditionalInfo { get; set; }

    }
}
