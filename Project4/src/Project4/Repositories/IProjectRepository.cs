using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project4.Models;

namespace Project4.Repositories
{
    public interface IProjectRepository
    {
        void Create(Project project);

        void Delete(int id);

        void Update(Project project);

        IEnumerable<Project> List();

        Project FindById(int id);


        IEnumerable<Project> FindBySearchString(string queryString);
    }
}
