using Microsoft.AspNetCore.Identity;
using Models.DTO.IdentityDTO;
using Models.DTO.ResultDTO;
using Models.Entities;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implementation
{
    class AccountService : IAccountService
    {

        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;
        public AccountService( ApplicationContext context)
        {
            _context = context;
        }

        public Task<CollectionResultDTO<LoginDTO>> Login(LoginDTO user)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<RegisterDTO>> Register(RegisterDTO newUser)
        {
            User user = new User()
            {
                Email = newUser.Email,
                PhoneNumber = newUser.PhoneNumber,
                UserName = newUser.Email
            };
            await _userManager.CreateAsync(user, newUser.Password);
            UserInfo ui = new UserInfo()
            {
                Id = user.Id,
                FullName = newUser.UserName
            };
            await _context.UserInfos.AddAsync(ui);
            await _context.SaveChangesAsync();

            return new CollectionResultDTO<RegisterDTO>
            {
                IsSuccessful = true
            };
        }





    }
}
