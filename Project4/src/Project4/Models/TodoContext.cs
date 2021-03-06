﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;

namespace Project4.Models
{
    public class TodoContext : IdentityDbContext<TodoUser>
    {
        public TodoContext()
        {
            Database.EnsureCreated();
        }
        public DbSet<TodoList> TodoList { get; set; }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Startup.Configuration["Data:TodoAppConnectionString"];
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}
