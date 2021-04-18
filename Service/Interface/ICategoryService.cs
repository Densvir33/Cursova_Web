using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface ICategoryService
    {
        Task<CollectionResultDTO<List<CategoryDTO>>> GetCategories();
        Task<CollectionResultDTO<CategoryDTO>> GetCategoryById(int id);
        Task<CollectionResultDTO<CategoryDTO>> AddCategory(CategoryDTO category);
        Task<CollectionResultDTO<CategoryDTO>> UpdateCategory(CategoryDTO updateCategory);
        Task<CollectionResultDTO<CategoryDTO>> DeleteCategory(int id);
    }
}
