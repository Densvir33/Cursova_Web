using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.DTO;
using Models.DTO.ResultDTO;
using Models.Entities;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implementation
{
    public class RequirementService : IRequirementService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public RequirementService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CollectionResultDTO< RequirementDTO>> AddRequirement( RequirementDTO Requirement)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();
            //Requirement _newRequirement = _mapper.Map<Requirement>(Requirement);

            Requirement _newRequirement = new Requirement()
            {
                Name = Requirement.Name
            };

            await _context.Requirements.AddAsync(_newRequirement);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

       

        public async Task<CollectionResultDTO< RequirementDTO>> DeleteRequirement(int id)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

            try
            {
                Requirement _Requirement = await _context.Requirements.FirstOrDefaultAsync(x => x.Id == id);
                _context.Requirements.Remove(_Requirement);
                await _context.SaveChangesAsync();
                result.IsSuccessful = true;

            }
            catch (Exception ex)
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
        }

        

        public async Task<CollectionResultDTO< RequirementDTO>> GetRequirementById(int id)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

            Requirement _Requirement = await _context.Requirements.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new  RequirementDTO() { Name = _Requirement.Name, Id = _Requirement.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List< RequirementDTO>>> GetRequirements()
        {
            CollectionResultDTO<List< RequirementDTO>> result = new CollectionResultDTO<List< RequirementDTO>>();

            List<Requirement> Requirements = await _context.Requirements.ToListAsync();

            //result.Data = (Requirements.Select(x => _mapper.Map< RequirementDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = Requirements.Select(x => new  RequirementDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        

        public async Task<CollectionResultDTO< RequirementDTO>> UpdateRequirement( RequirementDTO updateRequirement)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

            try
            {
                Requirement _Requirement = await _context.Requirements.FirstOrDefaultAsync(x => x.Id == updateRequirement.Id);
                _Requirement.Name = updateRequirement.Name;

                _context.Requirements.Update(_Requirement);
                await _context.SaveChangesAsync();

                result.Data = new  RequirementDTO() { Name = _Requirement.Name };
            }
            catch (Exception ex)
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
        }

        
    }
}
