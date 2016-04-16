using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace Project4.Models
{
    public class TodoAppSeedData
    {
        private TodoContext _context;
        private Tag _dummyTag1 = new Tag();
        private Tag _dummyTag2 = new Tag();
        private Tag _dummyTag3 = new Tag();
        private Tag _dummyTag4 = new Tag();
        private UserManager<TodoUser> _userManager;

        public TodoAppSeedData(TodoContext context, UserManager<TodoUser> userManager )
        {
            _context = context;
            _userManager = userManager;
            _dummyTag1.Name = "dummy name1";
            _dummyTag2.Name = "dummy name2";
            _dummyTag3.Name = "dummy name1";
            _dummyTag4.Name = "dummy name3";
        }

        public void DeleteDatabase()
        {
            //_context.Remove();
            _context.Database.EnsureDeleted();
            _context.SaveChanges();
        }
        public async Task SeedData()
        {
            if (await _userManager.FindByNameAsync("afton") == null)
            {
                var aftonuser = new TodoUser()
                {
                    UserName = "afton",
                    Email = "amartin33@uco.edu"
                };
                //password is hello2
                var IdentityResult = await _userManager.CreateAsync(aftonuser, "Hello123!");

            }
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
                            Tags = new List<Tag> {_dummyTag1, _dummyTag2}
                        },
                        new Todo()
                        {
                            Name = "Question my life",
                            State = "Completed",
                            DueDate = new DateTime(2016, 3, 25, 12, 0, 0),
                            Tags = new List<Tag> {_dummyTag3, _dummyTag4}
                        },
                        new Todo()
                        {
                            Name = "Take over the world",
                            State = "Completed",
                            DueDate = new DateTime(2016, 3, 25, 12, 0, 0),
                            Tags = new List<Tag> { },
                        }
                    },

                    WarningDays = 2

                });
                _context.SaveChanges();
            }
        }
    }
}
