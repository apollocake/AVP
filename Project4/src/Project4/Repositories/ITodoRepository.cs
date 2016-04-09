using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;

namespace Project4.Repositories
{
    public interface ITodoRepository
    {
        void Create(Todo todo);

        void Delete(int id);

        void Update(Todo todo);

        IEnumerable<TodoList> List();

        Todo FindById(int id);


        IEnumerable<Todo> FindBySearchString(string queryString);
    }
}
