using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IDiscountService
    {
        Task<CollectionResultDTO<List<DiscountDTO>>> GetDiscounts();
        Task<CollectionResultDTO<DiscountDTO>> GetDiscountById(int id);
        Task<CollectionResultDTO<DiscountDTO>> AddDiscount(DiscountDTO discount);
        Task<CollectionResultDTO<DiscountDTO>> UpdateDiscount(DiscountDTO updateDiscount);
        Task<CollectionResultDTO<DiscountDTO>> DeleteDiscount(int id);
    }
}
