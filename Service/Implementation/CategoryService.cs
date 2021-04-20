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
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public CategoryService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<CollectionResultDTO<CategoryDTO>> AddCategory(CategoryDTO category)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<CategoryDTO>> AddProduct(CategoryDTO product)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();
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

        public Task<CollectionResultDTO<CategoryDTO>> DeleteCategory(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<CategoryDTO>> DeleteProduct(int id)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

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

        public Task<CollectionResultDTO<List<CategoryDTO>>> GetCategories()
        {
            throw new NotImplementedException();
        }

        public Task<CollectionResultDTO<CategoryDTO>> GetCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<CategoryDTO>> GetProductById(int id)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

            Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new CategoryDTO() { Name = _product.Name, Id = _product.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List<CategoryDTO>>> GetProducts()
        {
            CollectionResultDTO<List<CategoryDTO>> result = new CollectionResultDTO<List<CategoryDTO>>();

            List<Product> products = await _context.Products.ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map<CategoryDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new CategoryDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        public Task<CollectionResultDTO<CategoryDTO>> UpdateCategory(CategoryDTO updateCategory)
        {
            throw new NotImplementedException();
        }

        public async Task<CollectionResultDTO<CategoryDTO>> UpdateProduct(CategoryDTO updateProduct)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == updateProduct.Id);
                _product.Name = updateProduct.Name;

                _context.Products.Update(_product);
                await _context.SaveChangesAsync();

                result.Data = new CategoryDTO() { Name = _product.Name };
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
