using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IRequirementService
    {
        Task<CollectionResultDTO<List<RequirementDTO>>> GetRequirements();
        Task<CollectionResultDTO<RequirementDTO>> GetRequirementById(int id);
        Task<CollectionResultDTO<RequirementDTO>> AddRequirement(RequirementDTO requirement);
        Task<CollectionResultDTO<RequirementDTO>> UpdateRequirement(RequirementDTO updateRequirement);
        Task<CollectionResultDTO<RequirementDTO>> DeleteRequirement(int id);
    }
}
