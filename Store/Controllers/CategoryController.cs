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
        public async Task<ResultDTO> GetCategorys()
        {
            try
            {
                return await _categoryService.GetCategories();
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpGet("{id}")]
        public async Task<ResultDTO> GetCategoryById([FromRoute] int Id)
        {
            try
            {
                return await _categoryService.GetCategoryById(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpDelete("{id}")]
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
    }
}
