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
    public class DiscountService : IDiscountService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public DiscountService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }

       

        public async Task<CollectionResultDTO<DiscountDTO>> AddDiscount(DiscountDTO Discount)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();
            //Discount _newDiscount = _mapper.Map<Discount>(Discount);

            Discount _newDiscount = new Discount()
            {
                Name = Discount.Name
            };

            await _context.Discounts.AddAsync(_newDiscount);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        

        public async Task<CollectionResultDTO<DiscountDTO>> DeleteDiscount(int id)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            try
            {
                Discount _Discount = await _context.Discounts.FirstOrDefaultAsync(x => x.Id == id);
                _context.Discounts.Remove(_Discount);
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

       

        public async Task<CollectionResultDTO<DiscountDTO>> GetDiscountById(int id)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            Discount _Discount = await _context.Discounts.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new DiscountDTO() { Name = _Discount.Name, Id = _Discount.Id };

            return result;
        }

        public async Task<CollectionResultDTO<List<DiscountDTO>>> GetDiscounts()
        {
            CollectionResultDTO<List<DiscountDTO>> result = new CollectionResultDTO<List<DiscountDTO>>();

            List<Discount> Discounts = await _context.Discounts.ToListAsync();

            //result.Data = (Discounts.Select(x => _mapper.Map<DiscountDTO>(x))).ToList();
            //category = AutoMapper.Mapper.Map<CategoriesViewModel, Categoies>(viewModel, category);

            result.Data = Discounts.Select(x => new DiscountDTO() { Name = x.Name, Id = x.Id }).ToList();

            return result;
        }

        

        public async Task<CollectionResultDTO<DiscountDTO>> UpdateDiscount(DiscountDTO updateDiscount)
        {
            CollectionResultDTO<DiscountDTO> result = new CollectionResultDTO<DiscountDTO>();

            try
            {
                Discount _Discount = await _context.Discounts.FirstOrDefaultAsync(x => x.Id == updateDiscount.Id);
                _Discount.Name = updateDiscount.Name;

                _context.Discounts.Update(_Discount);
                await _context.SaveChangesAsync();

                result.Data = new DiscountDTO() { Name = _Discount.Name };
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
