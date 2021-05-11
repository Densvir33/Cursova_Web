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
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public ProductService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CollectionResultDTO<ProductDTO>> AddProduct(ProductDTO product)
        {
            CollectionResultDTO<ProductDTO> result = new CollectionResultDTO<ProductDTO>();
            //Product _newProduct = _mapper.Map<Product>(product);

            Product _newProduct = new Product()
            {
                Name = product.Name,
                Image = product.Image,
                Mass = product.Mass,
                Price = product.Price,
                Property = product.Property,
                Category = _context.Categories.FirstOrDefault(x => x.Name == product.Category)
            };

            await _context.Products.AddAsync(_newProduct);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        public async Task<CollectionResultDTO<ProductDTO>> DeleteProduct(int id)
        {
            CollectionResultDTO<ProductDTO> result = new CollectionResultDTO<ProductDTO>();

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

        public async Task<CollectionResultDTO<ProductDTO>> GetProductById(int id)
        {
            CollectionResultDTO<ProductDTO> result = new CollectionResultDTO<ProductDTO>();

            Product _product = await _context.Products.Where(x=>x.Id==id).Include(x=>x.Category).FirstAsync();
            

            result.Data = new ProductDTO()
            {
                Name = _product.Name,
                Id = _product.Id,
                Image = _product.Image,
                Mass = _product.Mass,
                Price = _product.Price,
                Property = _product.Property,
                Category = _product.Category!=null?_product.Category.Name : null
            };

            return result;
        }

        public async Task<CollectionResultDTO<List<ProductDTO>>> GetProducts()
        {
            CollectionResultDTO<List<ProductDTO>> result = new CollectionResultDTO<List<ProductDTO>>();

            List<Product> products = await _context.Products.Include(x=>x.Category).ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map<ProductDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new ProductDTO()
            {
                Name = x.Name,
                Id = x.Id,
                Image = x.Image,
                Mass = x.Mass,
                Price = x.Price,
                Property = x.Property,
                Category = x.Category.Name
            }).ToList();

            return result;
        }

        public async Task<CollectionResultDTO<ProductDTO>> UpdateProduct(ProductDTO updateProduct)
        {
            CollectionResultDTO<ProductDTO> result = new CollectionResultDTO<ProductDTO>();

            try
            {
                Product _product = await _context.Products.FirstOrDefaultAsync(x => x.Id == updateProduct.Id);
                _product.Name = updateProduct.Name;
                _product.Category = _context.Categories.FirstOrDefault(x => x.Name == updateProduct.Category);

                _context.Products.Update(_product);
                await _context.SaveChangesAsync();

                result.Data = new ProductDTO()
                {
                    Name = _product.Name,
                    Id = _product.Id,
                    Image = _product.Image,
                    Mass = _product.Mass,
                    Price = _product.Price,
                    Property = _product.Property,
                    Category = _product.Category != null ? _product.Category.Name : null
                };
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
                //List<ProductDTO> cusvm = _context.Products.Include(x => x.Category)
                //    .Skip((page - 1) * count)
                //    .Take(count).ToList()
                //    .Select(c => new ProductDTO
                //    {
                //        Id = c.Id,
                //        Name = c.Name,
                //        Price = c.Price,
                //        Property = c.Property,
                //        Mass = c.Mass,
                //        Category = c.Category.Name,
                //    }).ToList();

                CollectionResultDTO<List<ProductDTO>> result = new CollectionResultDTO<List<ProductDTO>>();
                List<Product> cusvm = await _context.Products.Include(x => x.Category)
                    .Skip((page - 1) * count)
                    .Take(count).ToListAsync();

                result.Message = _context.Products.Count().ToString();
                result.IsSuccessful = true;
                result.Data = cusvm.Select(c => new ProductDTO()
                {
                    Id = c.Id,
                    Name = c.Name,
                    Price = c.Price,
                    Property = c.Property,
                    Mass = c.Mass,
                    //      Category = c.Category.Name,
                }).ToList();

                return result;
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
        public async Task<CollectionResultDTO<List<ProductDTO>>> GetProductsByCategory(string name)
        {
            CollectionResultDTO<List<ProductDTO>> result = new CollectionResultDTO<List<ProductDTO>>();

            List<Product> products = await _context.Products.Include(x => x.Category).Where(x => x.Category.Name == name).ToListAsync();

            //result.Data = (products.Select(x => _mapper.Map<ProductDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = products.Select(x => new ProductDTO()
            {
                Name = x.Name,
                Id = x.Id,
                Image = x.Image,
                Mass = x.Mass,
                Price = x.Price,
                Property = x.Property,
                Category = x.Category.Name
            }).ToList();

            return result;
        }


    }
}
