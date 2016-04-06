using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization.Infrastructure;

namespace Project4.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }
        public DateTime DueDate { get; set; }
        public ICollection<Tag> Tags { get; set; }
    }
}
