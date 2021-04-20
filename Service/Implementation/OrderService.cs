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

        public Task<CollectionResultDTO<OrderDTO>> AddOrder(OrderDTO order)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<OrderDTO>> AddProduct(OrderDTO product)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();
            //Product _newProduct = _mapper.Map<Product>(product);

            Product _newProduct = new Product()
            {
                Name = product.Name
            };

            await _context.Products.AddAsync(_newProduct);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        public Task<CollectionResultDTO<OrderDTO>> DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<OrderDTO>> DeleteProduct(int id)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
                _context.Products.Remove(_product);
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

        public Task<CollectionResultDTO<OrderDTO>> GetOrderById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CollectionResultDTO<List<OrderDTO>>> GetOrders()
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<OrderDTO>> GetProductById(int id)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new OrderDTO() { Name = _product.Name, Id = _product.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List<OrderDTO>>> GetProducts()
        {
            CollectionResultDTO<List<OrderDTO>> result = new CollectionResultDTO<List<OrderDTO>>();

            List<Product> products = await _context.Products.ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map<OrderDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new OrderDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        public Task<CollectionResultDTO<OrderDTO>> UpdateOrder(OrderDTO updateOrder)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<OrderDTO>> UpdateProduct(OrderDTO updateProduct)
        {
            CollectionResultDTO<OrderDTO> result = new CollectionResultDTO<OrderDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == updateProduct.Id);
                _product.Name = updateProduct.Name;

                _context.Products.Update(_product);
                await _context.SaveChangesAsync();

                result.Data = new OrderDTO() { Name = _product.Name };
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
