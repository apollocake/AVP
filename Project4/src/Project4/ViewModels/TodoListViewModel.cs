using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.ViewModels
{
    public class TodoListViewModel
    {
        public int Id { get; set; }

        public int WarningDays { get; set; }
        public IEnumerable<TodoViewModel> Todos { get; set; }
    }
}
