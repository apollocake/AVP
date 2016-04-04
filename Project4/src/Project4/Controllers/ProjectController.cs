using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
//using Microsoft.Dnx.Compilation.CSharp;
using Project4.ViewModels;
using Project4.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
    //[controller] is .NET binding with [Project]Controller to ->> api/project
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private IList<ProjectViewModel> _projects;
        private ProjectContext _context;

        public ProjectController(ProjectContext context)
        {
            _projects = new List<ProjectViewModel>()
            {
                new ProjectViewModel()
                {
                    Description = "Another fun thingy",
                    Name = "Project 4"
                },

                new ProjectViewModel()
                {
                    Description = "Aweseomeememememememe",
                    Name = "Project 5"
                }
            };
            _context = context;
        }
        // GET: api/project
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            var projects = _context.Projects.ToList();
            return projects;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            JsonResult result = Json(_projects[id]);
            result.StatusCode = (int)HttpStatusCode.Accepted;
            return result;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]ProjectViewModel newProject)
        {
            Response.StatusCode = (int) HttpStatusCode.Created;
            _projects.Add(newProject);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
