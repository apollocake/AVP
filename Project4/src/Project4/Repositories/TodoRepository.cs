﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;
using Microsoft.Data.Entity;
using Remotion.Linq.Parsing.Structure.IntermediateModel;

namespace Project4.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }
        public void Create(Todo todo)
        {
            //_context.Todos.Add(todo);
            var todolist = _context.TodoList.Include(z => z.Todos).First(p => p.Id == p.Id);
            todolist.Todos.Add(todo);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var projectToDelete = FindById(id);
            if (projectToDelete != null)
            {
                projectToDelete.Tags.ToList().ForEach(p => _context.Tags.Remove(p));
                _context.Todos.Remove(FindById(id));
                _context.SaveChanges();
            }
        }

        public Todo FindById(int id)
        {

            var todo = _context.Todos.Include(z => z.Tags).First(p => p.Id == id);
            return todo;
        }

        public IEnumerable<Todo> FindBySearchString(string queryString)
        {
            return _context.Todos.Where(p => p.Name.Contains(queryString));
        }

        public IEnumerable<TodoList> List()
        {
            //Include is to bring the child table with the list
            //var todos = _context.Todos.Include(p => p.Tags).ToList();
            //var todos = _context.TodoList.Include(l => l.Todos.Select(p => p.Tags)).ToList();
            var todos = _context.TodoList.Include(l => l.Todos).ThenInclude(z => z.Tags).ToList();
            return todos;
        }

        public void Update(Todo todo)
        {
            var todoToUpdate = FindById(todo.Id);
            todoToUpdate.Name = todo.Name;
            todoToUpdate.State = todo.State;
            todoToUpdate.DueDate = todo.DueDate;
            todoToUpdate.Tags.ToList().ForEach(p => _context.Tags.Remove(p));
            todo.Tags.ToList().ForEach(p => todoToUpdate.Tags.Add(p));
            _context.SaveChanges();
        }

        public void UpdateWarningTime(TodoList todoList)
        {
            var todoListToUpdate = _context.TodoList.First(p => p.Id == p.Id);
            todoListToUpdate.WarningDays = todoList.WarningDays;
            _context.SaveChanges();
        }
    }
}
