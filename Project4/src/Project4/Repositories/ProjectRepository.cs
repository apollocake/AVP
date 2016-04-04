using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;

namespace Project4.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private ProjectContext _context;

        public ProjectRepository(ProjectContext context)
        {
            _context = context;
        }
        public void Create(Project project)
        {
            _context.Projects.Add(project);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var projectToDelete = FindById(id);
            if (projectToDelete != null)
            {
                _context.Projects.Remove(FindById(id));
                _context.SaveChanges();
            }
        }

        public Project FindById(int id)
        {

            var project = _context.Projects.First(p => p.Id == id);
            return project;

        }

        public IEnumerable<Project> FindBySearchString(string queryString)
        {
            return _context.Projects.Where(p => p.Name.Contains(queryString));
        }

        public IEnumerable<Project> List()
        {
            var projects = _context.Projects.ToList();
            return projects;
        }

        public void Update(Project project)
        {
            var projectToUpdate = FindById(project.Id);
            projectToUpdate.Name = project.Name;
            projectToUpdate.Description = project.Description;
            projectToUpdate.DueDate = projectToUpdate.DueDate;
            _context.SaveChanges();
        }
    }
}
