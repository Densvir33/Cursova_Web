using Microsoft.AspNetCore.Mvc;
using Models.DTO;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : Controller
    {

        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await _productService.GetProducts());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetHeroById([FromRoute]int Id)
        {
            return Ok(await _productService.GetProductById(Id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHero(int Id)
        {
            return Ok(await _productService.DeleteProduct(Id));
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateHero([FromBody]ProductDTO hero)
        {
            return Ok(await _productService.UpdateProduct(hero));
        }

        [HttpPost]
        public async Task<IActionResult> AddHero([FromBody]ProductDTO hero)
        {
            return Ok(await _productService.AddProduct(hero));
        }

    }
}
