using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Filters;

//using Microsoft.Dnx.Compilation.CSharp;
using Project4.ViewModels;
using Project4.Models;
using Project4.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Project4.Controllers
{
    //[controller] is .NET binding with [Todo]Controller to ->> api/todo
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private ITodoRepository _repository;
        private IMapper _mapper;

        public TodoController(ITodoRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        // GET: api/todo
        [HttpGet]
        public IEnumerable<TodoListViewModel> Get()
        {
            //get model data
            var todos = _repository.List();
            //automapper will map Todo to TodoViewModel and Tag...Model and using the relationships of TodoViewModel
            //it also kills circular relationships from models for serializability and your OO will look like View Models as far as relationships
            var mappedTodos = _mapper.Map<IEnumerable<TodoListViewModel>>(todos);
            return mappedTodos;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Todo Get(int id)
        {
            return _repository.FindById(id);
        }

        // GET api/todo/search/{queryId}
        [HttpGet("search/{queryString}")]
        public IEnumerable<Todo> Search(string queryString)
        {
            return _repository.FindBySearchString(queryString);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Todo newTodo)
        {
            Response.StatusCode = (int) HttpStatusCode.Created;
            _repository.Create(newTodo);
        }

        // PUT api/todo
        [HttpPut()]
        public void Put([FromBody]Todo newTodo)
        {
            _repository.Update(newTodo);
        }

        //add put for time upddate
        // PUT api/todo
        [HttpPut("warning")]
        public void Put([FromBody]TodoList newTodoList)
        {
            _repository.UpdateWarningTime(newTodoList);
        }

        // DELETE api/todo/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }
    }
}
