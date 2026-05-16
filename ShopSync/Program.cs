using Microsoft.EntityFrameworkCore;
using ShopSync.Endpoints;
using ShopSync.Data;
using DotNetEnv;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = Environment.GetEnvironmentVariable("NEON_CONNECTION");

builder.Services.AddDbContext<ShopSyncContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("https://shopsyncproject.onrender.com")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

// Map endpoint groups
app.MapCategoryEndpoints();
app.MapProductEndpoints();
app.MapCustomerEndpoints();
app.MapInvoiceEndpoints();

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

app.Urls.Add($"http://*:{port}");

app.Run();
