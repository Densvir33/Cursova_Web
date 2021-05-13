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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("getAll")]
       // [Authorize(Roles = "Admin")]
        public async Task<CollectionResultDTO<List<OrderDTO>>> GetOrders()
        {
            try
            {
                return await _orderService.GetOrders();
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<List<OrderDTO>> { };
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin , User")]
        public async Task<CollectionResultDTO<OrderDTO>> GetOrderById([FromRoute] int Id)
        {
            try
            {
                return await _orderService.GetOrderById(Id);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<OrderDTO> { };
            }
        }

        

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> DeleteOrder(int Id)
        {
            try
            {
                return await _orderService.DeleteOrder(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        public async Task<ResultDTO> UpdateOrder([FromBody] OrderDTO Order)
        {
            try
            {
                return await _orderService.UpdateOrder(Order);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPost]
        public async Task<ResultDTO> AddOrder([FromBody] OrderDTO Order)
        {
            try
            {
                return await _orderService.AddOrder(Order);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpGet]
        public async Task<CollectionResultDTO<OrderDTO>> AddProductToOrder([FromBody] int orderId, int productId)
        {
            try
            {
                return await _orderService.AddProductToOrder(orderId, productId);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<OrderDTO> { };
            }
        }


    }
}
