﻿using Microsoft.AspNetCore.Mvc;
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
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [HttpGet("getAll")]
        public async Task<ResultDTO> GetDiscounts()
        {
            try
            {
                return await _discountService.GetDiscounts();
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpGet("{id}")]
        public async Task<ResultDTO> GetDiscountById([FromRoute] int Id)
        {
            try
            {
                return await _discountService.GetDiscountById(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpDelete("{id}")]
        public async Task<ResultDTO> DeleteDiscount(int Id)
        {
            try
            {
                return await _discountService.DeleteDiscount(Id);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPatch]
        public async Task<ResultDTO> UpdateDiscount([FromBody] DiscountDTO Discount)
        {
            try
            {
                return await _discountService.UpdateDiscount(Discount);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }

        [HttpPost]
        public async Task<ResultDTO> AddDiscount([FromBody] DiscountDTO Discount)
        {
            try
            {
                return await _discountService.AddDiscount(Discount);
            }
            catch (Exception ex)
            {
                return new ResultDTO { };
            }
        }
    }
}
