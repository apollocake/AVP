using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.ViewModels
{
    public class TodoViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public string DueDate { get; set; }
        public IEnumerable<TagViewModel> Tags { get; set; }
    }
}
