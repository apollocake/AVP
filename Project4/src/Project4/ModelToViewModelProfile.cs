using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Project4.Models;
using Project4.ViewModels;

namespace Project4
{
    public class ModelToViewModelProfile : Profile
    {
        protected override void Configure()
        {
            //create OO mapping automation from Model to ViewModels by prop name
            CreateMap<Todo, TodoViewModel>();
            CreateMap<Tag, TagViewModel>();
        }
    }
}
