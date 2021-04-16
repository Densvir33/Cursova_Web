using System;
using System.Collections.Generic;
using System.Text;

namespace Models.DTO.ResultDTO
{
    public class CollectionResultDTO<T>: ResultDTO
    {
        public ICollection<T> Data { get; set; }
    }
}
