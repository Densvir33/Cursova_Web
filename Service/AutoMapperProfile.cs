using AutoMapper;
using Models.DTO;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
                //.ForMember(x=>x.Name, opt=>opt.MapFrom(y=>y.Name))                
                //.ForMember(x => x.Image, opt => opt.MapFrom(y => y.Image))
                //.ForMember(x => x.Mass, opt => opt.MapFrom(y => y.Mass))
                //.ForMember(x => x.Price, opt => opt.MapFrom(y => y.Price))
                //.ForMember(x => x.Property, opt => opt.MapFrom(y => y.Property))
                //.ForMember(x => x.Category, opt => opt.MapFrom(y => y.Category));


            CreateMap<ProductDTO, Product>().ForMember(x => x.Name, opt => opt.MapFrom(y => y.Name))
                .ForMember(x => x.Image, opt => opt.MapFrom(y => y.Image))
                .ForMember(x => x.Mass, opt => opt.MapFrom(y => y.Mass))
                .ForMember(x => x.Price, opt => opt.MapFrom(y => y.Price))
                .ForMember(x => x.Property, opt => opt.MapFrom(y => y.Property))
                .ForMember(x => x.Category, opt => opt.MapFrom(y => y.Category)); 
        }
    }
}
