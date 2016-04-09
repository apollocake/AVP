using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
    public class TodoList
    {
        public int Id { get; set; }

        public int WarningDays { get; set; }
        public ICollection<Todo> Todos { get; set; }
    
    }
}
