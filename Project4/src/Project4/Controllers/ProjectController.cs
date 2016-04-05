using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Mvc;
//using Microsoft.Dnx.Compilation.CSharp;
using Project4.ViewModels;
using Project4.Models;
using Project4.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
    //[controller] is .NET binding with [Project]Controller to ->> api/project
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private IProjectRepository _repository;
        private IMapper _mapper;

        public ProjectController(IProjectRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<ProjectViewModel> Get()
        {
            //get model data
            var projects = _repository.List();
            //automapper will map Projects to ProjectViewModel and Req...Model and using the relationships of ProjectViewModel
            //it also kills circular relationships for serializability and your OO will look like View Models as far as relationships
            var mappedProjects = _mapper.Map<IEnumerable<ProjectViewModel>>(projects);
            return mappedProjects;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Project Get(int id)
        {
            return _repository.FindById(id);
        }

        // GET api/project/search/{queryId}
        [HttpGet("search/{queryString}")]
        public IEnumerable<Project> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Project newProject)
        {
            Response.StatusCode = (int) HttpStatusCode.Created;
            _repository.Create(newProject);
        }

        // PUT api/project
        [HttpPut()]
        public void Put([FromBody]Project newProject)
        {
            _repository.Update(newProject);
        }

        // DELETE api/project/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}
