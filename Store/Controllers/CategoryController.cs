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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService CategoryService)
        {
            _categoryService = CategoryService;
        }

        [HttpGet("getAll")]
        public async Task<CollectionResultDTO<List<CategoryDTO>>> GetCategorys()
        {
            try
            {
                return await _categoryService.GetCategories();
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<List<CategoryDTO>> { };
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<CollectionResultDTO<CategoryDTO>> GetOrderById([FromRoute] int Id)
        {
            try
            {
                return await _categoryService.GetCategoryById(Id);
            }
            catch (Exception ex)
            {
                return new CollectionResultDTO<CategoryDTO> { };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> DeleteCategory(int Id)
        {
            try
            {
                return await _categoryService.DeleteCategory(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> UpdateCategory([FromBody] CategoryDTO Category)
        {
            try
            {
                return await _categoryService.UpdateCategory(Category);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> AddCategory([FromBody] CategoryDTO Category)
        {
            try
            {
                return await _categoryService.AddCategory(Category);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }
        

        [HttpGet]
        public async Task<ResultDTO> Pagination(int page, int count)
        {
            try
            {
                return await _categoryService.Pagination(page, count);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

    }
}
