using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project4.Models
{
    public class ProjectAppSeedData
    {
        private ProjectContext _context;

        public ProjectAppSeedData(ProjectContext context)
        {
            _context = context;
        }

        public void DeleteDatabase()
        {
            //_context.Remove();
            _context.Database.EnsureDeleted();
            _context.SaveChanges();
        }
        public void SeedData()
        {
            if (!_context.Projects.Any())
            {
                _context.Add(new Project()
                {
                    Name = "Project 44",
                    Description = "My favorite martian",
                    DueDate = new DateTime(2016,3,23,12,0,0)
                });
                _context.Add(new Project()
                {
                    Name = "Project 66",
                    Description = "Angular projesadfgewrfsdch",
                    DueDate = new DateTime(2016, 3, 25, 12, 0, 0)

                });
                _context.SaveChanges();
            }
        }

    }
}
