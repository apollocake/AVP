using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//building awareness
using Project4.Models;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
//reference clash with Microsoft.Dnx.Compilation.CSharp.ProjectContext and Models.ProjectContext
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
                        
            services.AddEntityFramework().AddSqlServer().AddDbContext<ProjectContext>();
            //dont persist, only for startup
            services.AddTransient<ProjectAppSeedData>();
            //when interface is requested provide concrete implementation for decoupling
            services.AddScoped<IProjectRepository, ProjectRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ProjectAppSeedData seeder)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler();

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseMvc();

            //seeder.DeleteDatabase();
            seeder.SeedData();

        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
