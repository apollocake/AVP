using System.Collections.Generic;
using System.IO;

namespace Project4.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Todo Todos { get; set; }
    }
}