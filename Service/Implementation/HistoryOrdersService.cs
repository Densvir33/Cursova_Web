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
    public class HistoryOrdersService : IHistoryOrdersService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationContext _context;
        public HistoryOrdersService(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<CollectionResultDTO<HistoryOrdersDTO>> AddHistoryOrders(HistoryOrdersDTO HistoryOrders)
        {
            CollectionResultDTO<HistoryOrdersDTO> result = new CollectionResultDTO<HistoryOrdersDTO>();
            //HistoryOrders _newHistoryOrders = _mapper.Map<HistoryOrders>(HistoryOrders);

            HistoryOrders _newHistoryOrders = new HistoryOrders()
            {
                User = await _context.Users.FirstOrDefaultAsync(x => x.Id == HistoryOrders.UserId),
                Date = HistoryOrders.Date,
                Price = HistoryOrders.Price,
                Discount = HistoryOrders.Discount,
                Total = HistoryOrders.Total,
                IsDone = HistoryOrders.IsDone

            };

            await _context.HistoryOrderss.AddAsync(_newHistoryOrders);
            await _context.SaveChangesAsync();

            result.IsSuccessful = true;

            return result;

        }

        public async Task<CollectionResultDTO<HistoryOrdersDTO>> DeleteHistoryOrders(int id)
        {
            CollectionResultDTO<HistoryOrdersDTO> result = new CollectionResultDTO<HistoryOrdersDTO>();

            try
            {
                HistoryOrders _HistoryOrders = await _context.HistoryOrderss.FirstOrDefaultAsync(x => x.Id == id);
                _context.HistoryOrderss.Remove(_HistoryOrders);
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

        public async Task<CollectionResultDTO<HistoryOrdersDTO>> GetHistoryOrdersById(int id)
        {
            CollectionResultDTO<HistoryOrdersDTO> result = new CollectionResultDTO<HistoryOrdersDTO>();

            HistoryOrders _HistoryOrders = await _context.HistoryOrderss.FirstOrDefaultAsync(x => x.Id == id);

            result.Data = new HistoryOrdersDTO()
            {
                Discount = _HistoryOrders.Discount,
                Price = _HistoryOrders.Price,
                Date = _HistoryOrders.Date,
                Total = _HistoryOrders.Total,
                IsDone = _HistoryOrders.IsDone
            };

            return result;
        }

        public async Task<CollectionResultDTO<List<HistoryOrdersDTO>>> GetHistoryOrderss(string id)
        {
            CollectionResultDTO<List<HistoryOrdersDTO>> result = new CollectionResultDTO<List<HistoryOrdersDTO>>();
            List<HistoryOrders> HistoryOrderss = await _context.HistoryOrderss.Where(x => x.User.Id == id).ToListAsync();
            result.Data = HistoryOrderss.Select(x => new HistoryOrdersDTO()
            {
                Date = x.Date,
                Price = x.Price,
                Discount = x.Discount,
                Total = x.Total,
                IsDone = x.IsDone
            }).ToList();
            return result;
        }
    }
}
