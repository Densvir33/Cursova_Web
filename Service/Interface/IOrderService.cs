using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IOrderService
    {
        Task<CollectionResultDTO<List<OrderDTO>>> GetOrders();
        Task<CollectionResultDTO<OrderDTO>> GetOrderById(int id);
        Task<CollectionResultDTO<OrderDTO>> AddOrder(OrderDTO order);
        Task<CollectionResultDTO<OrderDTO>> UpdateOrder(OrderDTO updateOrder);
        Task<CollectionResultDTO<OrderDTO>> DeleteOrder(int id);
    }
}
