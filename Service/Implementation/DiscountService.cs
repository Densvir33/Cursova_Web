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
    public class DiscountService : IDiscountService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public DiscountService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<CollectionResultDTO<DiscountDTO>> AddDiscount(DiscountDTO discount)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<DiscountDTO>> AddProduct(DiscountDTO product)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();
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

        public Task<CollectionResultDTO<DiscountDTO>> DeleteDiscount(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<DiscountDTO>> DeleteProduct(int id)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
                _context.Products.Remove(_product);
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

        public Task<CollectionResultDTO<DiscountDTO>> GetDiscountById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CollectionResultDTO<List<DiscountDTO>>> GetDiscounts()
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<DiscountDTO>> GetProductById(int id)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new DiscountDTO() { Name = _product.Name, Id = _product.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List<DiscountDTO>>> GetProducts()
        {
            CollectionResultDTO<List<DiscountDTO>> result = new CollectionResultDTO<List<DiscountDTO>>();

            List<Product> products = await _context.Products.ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map<DiscountDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new DiscountDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        public Task<CollectionResultDTO<DiscountDTO>> UpdateDiscount(DiscountDTO updateDiscount)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<DiscountDTO>> UpdateProduct(DiscountDTO updateProduct)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == updateProduct.Id);
                _product.Name = updateProduct.Name;

                _context.Products.Update(_product);
                await _context.SaveChangesAsync();

                result.Data = new DiscountDTO() { Name = _product.Name };
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
