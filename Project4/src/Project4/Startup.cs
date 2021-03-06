﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Authentication.Cookies;
//building awareness
using Project4.Models;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Identity.EntityFramework;
//reference clash with Microsoft.Dnx.Compilation.CSharp.ProjectContext and Models.TodoContext
//using Microsoft.Dnx.Compilation.CSharp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Project4.Repositories;

namespace Project4
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services. Bootstrap dependencies across ASP app
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc().AddJsonOptions(opt =>
            {
                opt.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });

            services.AddIdentity<TodoUser, IdentityRole>(
                c =>
                {
                    c.Password.RequiredLength = 3;
                    c.User.RequireUniqueEmail = true;
                    c.Password.RequireNonLetterOrDigit = false;
                    c.Password.RequireUppercase = false;
                    c.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                    {
                        OnRedirectToLogin = ctx =>
                        {
                            if (ctx.Request.Path.StartsWithSegments("/api"))
                            {
                                ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            }
                            return Task.FromResult(0);
                        }
                    };

                }).AddEntityFrameworkStores<TodoContext>();
            services.AddEntityFramework().AddSqlServer().AddDbContext<TodoContext>();
            //dont persist, only for startup
            services.AddTransient<TodoAppSeedData>();
            //when interface is requested provide concrete implementation for decoupling from repository and model
            services.AddScoped<ITodoRepository, TodoRepository>();
            //automapper config for mapping acrooss the app
            var config = new MapperConfiguration(c => {c.AddProfile(new ModelToViewModelProfile());});
            services.AddSingleton<IMapper>(sp => config.CreateMapper());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, TodoAppSeedData seeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseIdentity();
            app.UseMvc();

           //seeder.DeleteDatabase();
           await seeder.SeedData();

        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
