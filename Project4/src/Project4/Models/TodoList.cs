using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization.Infrastructure;

namespace Project4.Models
{
    public class TodoList
    {
        public int Id { get; set; }

        public int WarningDays { get; set; }
        public ICollection<Todo> Todos { get; set; }

        public string Username { get; set; }
    
    }
}
