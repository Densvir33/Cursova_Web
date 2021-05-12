using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models.DTO.IdentityDTO;
using Models.DTO.ResultDTO;
using Models.Entities;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace Service.Implementation
{
    public class AccountService : IAccountService
    {

        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJwtTokenService _jwtTokenService;
        
        public AccountService(ApplicationContext context, UserManager<User> userManager, SignInManager<User> signInManager, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = jwtTokenService;
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

        public async Task<ResultLoginDTO> Login(LoginDTO model)
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


        public async Task<CollectionResultDTO<UserDTO>> GetUserById(string id)
        {
            CollectionResultDTO<UserDTO> result = new CollectionResultDTO<UserDTO>();

            User _user = await _context.Users.Include(x=>x.UserInfo).FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new UserDTO()
            {
                Id= _user.UserInfo.Id,
                Adress = _user.UserInfo.Adress,
                Age = _user.UserInfo.Age,
                Email= _user.UserInfo.Email,
                FullName= _user.UserInfo.FullName,
                Number =_user.UserInfo.Number,
                Photo =_user.UserInfo.Photo,
                Token=_user.UserInfo.Token
            };

            return result;
        }


    }
}
