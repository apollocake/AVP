using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
    public class TodoAppSeedData
    {
        private TodoContext _context;
        private Tag _dummyTag1 = new Tag();
        private Tag _dummyTag2 = new Tag();

        public TodoAppSeedData(TodoContext context)
        {
            _context = context;
            _dummyTag1.Name = "dummy name1";
            _dummyTag2.Name = "dummy name2";
        }

        public void DeleteDatabase()
        {
            //_context.Remove();
            _context.Database.EnsureDeleted();
            _context.SaveChanges();
        }
        public void SeedData()
        {
            if (!_context.TodoList.Any())
            {

                _context.Add(new TodoList()
                {
                    Todos = new List<Todo>
                    {
                        new Todo()
                        {
                            Name = "Dig in the garbage",
                            State = "Active",
                            DueDate = new DateTime(2016, 3, 23, 12, 0, 0),
                            Tags = new List<Tag> {_dummyTag1, _dummyTag2},
                        },
                        new Todo()
                        {
                            Name = "Question my life",
                            State = "Completed",
                            DueDate = new DateTime(2016, 3, 25, 12, 0, 0)
                        },
                        new Todo()
                        {
                            Name = "Take over the world",
                            State = "Deleted",
                            DueDate = new DateTime(2016, 3, 25, 12, 0, 0)
                        }
                    },

                    WarningDays = 5

                });
               _context.SaveChanges();
            }
        }
    }
}
