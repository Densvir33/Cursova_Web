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
    public class ProductController : Controller
    {

        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("getAll")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> GetProducts()
        {
            try
            {
                return await _productService.GetProducts();
            }
            catch(Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpGet("{id}")]
        public async Task<ResultDTO> GetProductById([FromRoute]int Id)
        {
            try
            {
                return await _productService.GetProductById(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> DeleteProduct(int Id)
        {
            try
            {
                return await _productService.DeleteProduct(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> UpdateProduct([FromBody]ProductDTO Product)
        {
            try
            {
                return await _productService.UpdateProduct(Product);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ResultDTO> AddProduct([FromBody]ProductDTO Product)
        {
            try
            {
                return await _productService.AddProduct(Product);
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
                return await _productService.Pagination( page,count);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

    }
}
