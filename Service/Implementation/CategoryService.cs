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

        

        public async Task<CollectionResultDTO<CategoryDTO>> AddCategory(CategoryDTO Category)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();
            //Category _newCategory = _mapper.Map<Category>(Category);

            Category _newCategory = new Category()
            {
                Name = Category.Name
            };

            await _context.Categories.AddAsync(_newCategory);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        

        public async Task<CollectionResultDTO<CategoryDTO>> DeleteCategory(int id)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

            try
            {
                Category _Category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
                _context.Categories.Remove(_Category);
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

        

        public async Task<CollectionResultDTO<CategoryDTO>> GetCategoryById(int id)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

            Category _Category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new CategoryDTO() { 
                Name = _Category.Name,
                Id = _Category.Id,
            };

            return result;
        }

        public async Task<CollectionResultDTO<List<CategoryDTO>>> GetCategories()
        {
            CollectionResultDTO<List<CategoryDTO>> result = new CollectionResultDTO<List<CategoryDTO>>();

            List<Category> Categories = await _context.Categories.ToListAsync();

            //result.Data = (Categories.Select(x => _mapper.Map<CategoryDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = Categories.Select(x => new CategoryDTO() {
                Name = x.Name,
                Id = x.Id 
            }).ToList();

            return result;
        }

        public async Task<CollectionResultDTO<CategoryDTO>> UpdateCategory(CategoryDTO updateCategory)
        {
            CollectionResultDTO<CategoryDTO> result = new CollectionResultDTO<CategoryDTO>();

            try
            {
                Category _Category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == updateCategory.Id);
                _Category.Name = updateCategory.Name;

                _context.Categories.Update(_Category);
                await _context.SaveChangesAsync();

                result.Data = new CategoryDTO() { Name = _Category.Name };
            }
            catch (Exception ex)
            {
                result.IsSuccessful = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public async Task<ResultDTO> Pagination(int page = 1, int count = 6) //Передається з фронтенда !!!!
        {
            try
            {
                //int pageSize = 3;
                List<ProductDTO> cusvm = _context.Products.Include(x => x.Category)
                    .Skip((page - 1) * count)
                    .Take(count).ToList()
                    .Select(c => new ProductDTO
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Price = c.Price,
                        Property = c.Property,
                        Mass = c.Mass,
                        Category = c.Category.Name,
                    }).ToList();

                return new CollectionResultDTO<ProductDTO> { };
            }
            catch (Exception ex)
            {
                return new ResultDTO
                {
                    IsSuccessful = false,
                    Message = ex.Message
                };
            }
        }

    }
}
