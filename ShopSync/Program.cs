using Microsoft.EntityFrameworkCore;
using ShopSync.Endpoints;
using ShopSync.Data;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ShopSyncContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins(
                                    "https://shopsyncsolution.netlify.app",
                                    "https://localhost:5173"
                                     )
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

app.Run();
