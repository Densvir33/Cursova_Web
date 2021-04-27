using Models.DTO;
using Models.DTO.ResultDTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IHistoryOrdersService
    {
        Task<CollectionResultDTO<List<HistoryOrdersDTO>>> GetHistoryOrderss(string id);
        Task<CollectionResultDTO<HistoryOrdersDTO>> GetHistoryOrdersById(int id);
        Task<CollectionResultDTO<HistoryOrdersDTO>> AddHistoryOrders(HistoryOrdersDTO HistoryOrders);
        Task<CollectionResultDTO<HistoryOrdersDTO>> DeleteHistoryOrders(int id);
    }
}
