using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IProductService
    {
        Task<CollectionResultDTO<List<ProductDTO>>> GetProducts();
        Task<CollectionResultDTO<ProductDTO>> GetProductById(int id);
        Task<CollectionResultDTO<ProductDTO>> AddProduct(ProductDTO product);
        Task<CollectionResultDTO<ProductDTO>> UpdateProduct(ProductDTO updateProduct);
        Task<CollectionResultDTO<ProductDTO>> DeleteProduct(int id);
        Task<CollectionResultDTO<List<ProductDTO>>> GetProductsByCategory(string name);
        Task<ResultDTO> Pagination(int page,int count);

    }
}
