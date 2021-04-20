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
        public async Task<CollectionResultDTO< RequirementDTO>> AddProduct( RequirementDTO product)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();
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

        public Task<CollectionResultDTO<RequirementDTO>> AddRequirement(RequirementDTO requirement)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO< RequirementDTO>> DeleteProduct(int id)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

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

        public Task<CollectionResultDTO<RequirementDTO>> DeleteRequirement(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO< RequirementDTO>> GetProductById(int id)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

            Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new  RequirementDTO() { Name = _product.Name, Id = _product.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List< RequirementDTO>>> GetProducts()
        {
            CollectionResultDTO<List< RequirementDTO>> result = new CollectionResultDTO<List< RequirementDTO>>();

            List<Product> products = await _context.Products.ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map< RequirementDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new  RequirementDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        public Task<CollectionResultDTO<RequirementDTO>> GetRequirementById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<CollectionResultDTO<List<RequirementDTO>>> GetRequirements()
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO< RequirementDTO>> UpdateProduct( RequirementDTO updateProduct)
        {
            CollectionResultDTO< RequirementDTO> result = new CollectionResultDTO< RequirementDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == updateProduct.Id);
                _product.Name = updateProduct.Name;

                _context.Products.Update(_product);
                await _context.SaveChangesAsync();

                result.Data = new  RequirementDTO() { Name = _product.Name };
            }
            catch (Exception ex)
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public Task<CollectionResultDTO<RequirementDTO>> UpdateRequirement(RequirementDTO updateRequirement)
        {
            throw new NotImplementedException();
        }
    }
}
