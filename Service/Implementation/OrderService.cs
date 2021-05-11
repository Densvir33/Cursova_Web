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
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public OrderService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }

       

        public async Task<CollectionResultDTO<OrderDTO>> AddOrder(OrderDTO Order)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();
            //Order _newOrder = _mapper.Map<Order>(Order);

            Order _newOrder = new Order()
            {
                Name = Order.Name
            };

            await _context.Orders.AddAsync(_newOrder);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        //public async Task<CollectionResultDTO<OrderDTO>> AddProductToOrder(int orderID, int productID)
        //{
        //    CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();
        //    Order _newOrder = _mapper.Map<Order>(Order);



        //    result.IsSuccessful = true;
        //    return result;

        //}



        public async Task<CollectionResultDTO<OrderDTO>> DeleteOrder(int id)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            try
            {
                Order _Order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
                _context.Orders.Remove(_Order);
                await _context.SaveChangesAsync();
                result.IsSuccessful = true;
                
            }
            catch(Exception ex) 
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
        }

        

        

        public async Task<CollectionResultDTO<OrderDTO>> GetOrderById(int id)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            Order _Order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new OrderDTO() { 
                Name = _Order.Name,
                Id = _Order.Id,
                Date = _Order.Date,
                IsExecuted = _Order.IsExecuted
            };

            return result;
        }

        public async Task<CollectionResultDTO<List<OrderDTO>>> GetOrders()
        {
            CollectionResultDTO<List<OrderDTO>> result = new CollectionResultDTO<List<OrderDTO>>();

            List<Order> Orders = await _context.Orders.ToListAsync();

            //result.Data = (Orders.Select(x => _mapper.Map<OrderDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = Orders.Select(x => new OrderDTO() {
                Name = x.Name,
                Id = x.Id,
                Date = x.Date,
                IsExecuted = x.IsExecuted
            }).ToList();

            return result;
        }

        public async Task<CollectionResultDTO<OrderDTO>> UpdateOrder(OrderDTO updateOrder)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            try
            {
                Order _Order = await _context.Orders.FirstOrDefaultAsync(x => x.Id == updateOrder.Id);
                _Order.Name = updateOrder.Name;

                _context.Orders.Update(_Order);
                await _context.SaveChangesAsync();

                result.Data = new OrderDTO() { Name = _Order.Name };
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
