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
    public class HistoryOrdersController : ControllerBase
    {
        private readonly IHistoryOrdersService _historyOrdersService;

        public HistoryOrdersController(IHistoryOrdersService historyOrdersService)
        {
            _historyOrdersService = historyOrdersService;
        }

        [HttpGet("getAll")]
        [Authorize(Roles = "Admin , User")]
        public async Task<CollectionResultDTO<List<HistoryOrdersDTO>>> GetHistoryOrderss(string id)
        {
            try
            {
                return await _historyOrdersService.GetHistoryOrderss(id);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<List<HistoryOrdersDTO>> { };
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin , User")]
        public async Task<CollectionResultDTO<HistoryOrdersDTO>> GetHistoryOrdersById([FromRoute] int Id)
        {
            try
            {
                return await _historyOrdersService.GetHistoryOrdersById(Id);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<HistoryOrdersDTO> { };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> DeleteHistoryOrders(int Id)
        {
            try
            {
                return await _historyOrdersService.DeleteHistoryOrders(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        [Authorize(Roles = "Admin")]
       

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> AddHistoryOrders([FromBody] HistoryOrdersDTO HistoryOrders)
        {
            try
            {
                return await _historyOrdersService.AddHistoryOrders(HistoryOrders);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }
    }
}
