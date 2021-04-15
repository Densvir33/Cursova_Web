using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Interface
{
    public interface IJwtTokenService
    {
        string CreateToken(User user);
    }
}
