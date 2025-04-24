using API.Data;
using API.Middleware;
using API.Objects;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var Cors = "_cors";

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<JournalContext>(options =>
{
    options.UseSqlite("Data Source=journal.db");
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: Cors,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }
    );
});

builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<JournalContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddTransient<IUserValidator<AppUser>, OptionalEmailUserValidator<AppUser>>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseMiddleware<ExceptionHandler>();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
