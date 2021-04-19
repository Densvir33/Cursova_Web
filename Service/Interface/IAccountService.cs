using Models.DTO;
using Models.DTO.IdentityDTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IAccountService
    {
        Task<CollectionResultDTO<LoginDTO>> Login(LoginDTO user);
        Task<CollectionResultDTO<RegisterDTO>> Register(RegisterDTO newUser);

    }
}
