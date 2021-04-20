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
    public class AccountService : IAccountService
    {

        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;
        public AccountService(ApplicationContext context)
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

        public async Task<ResultLoginDTO> Login_(LoginDTO model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!result.Succeeded)
            {
                return new ResultLoginDTO
                {
                    IsSuccessful = false
                };
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new ResultLoginDTO
            {
                IsSuccessful = true,
                Token = _jwtTokenService.CreateToken(user)
            };

        }
    }
}
