using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Models.DTO.ResultDTO;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequirementController : ControllerBase
    {
        private readonly IRequirementService _requirementService;

        public RequirementController(IRequirementService requirementService)
        {
            _requirementService = requirementService;
        }

        [HttpGet("getAll")]
        public async Task<CollectionResultDTO<List<RequirementDTO>>> GetRequirements()
        {
            try
            {
                return await _requirementService.GetRequirements();
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<List<RequirementDTO>> { };
            }
        }

        [HttpGet("{id}")]
        public async Task<CollectionResultDTO<RequirementDTO>> GetRequirementById([FromRoute] int Id)
        {
            try
            {
                return await _requirementService.GetRequirementById(Id);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<RequirementDTO> { };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> DeleteRequirement(int Id)
        {
            try
            {
                return await _requirementService.DeleteRequirement(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> UpdateRequirement([FromBody] RequirementDTO Requirement)
        {
            try
            {
                return await _requirementService.UpdateRequirement(Requirement);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> AddRequirement([FromBody] RequirementDTO Requirement)
        {
            try
            {
                return await _requirementService.AddRequirement(Requirement);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

    }
}
