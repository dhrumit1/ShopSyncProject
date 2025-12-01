using Microsoft.EntityFrameworkCore;
using ShopSync.Data;
using ShopSync.Models;

namespace ShopSync.Endpoints
{
    public static class ProductEndpoints
    {
        public static void MapProductEndpoints(this WebApplication app)
        {
            // 🔹 Get all products (with Category info)
            app.MapGet("/api/products", async (ShopSyncContext db) =>
                await db.Products.Include(p => p.Category).Select(p => new
                                                          {
                                                            p.ProductId,
                                                            p.ProductName,
                                                            p.Description,
                                                            p.Price,
                                                            p.CategoryId,
                                                            CategoryName = p.Category.CategoryName
                                                          }).ToListAsync()
            );

            // 🔹 Get product by Id (with Category info)
            app.MapGet("/api/products/{id}", async (string id, ShopSyncContext db) =>
            {
                var product = await db.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.ProductId == id);

                return product is not null ? Results.Ok(product) : Results.NotFound();
            });

            // 🔹 Create a new product
            app.MapPost("/api/products", async (Product product, ShopSyncContext db) =>
            {
                // Check if Category exists
                var categoryExists = await db.Categories.AnyAsync(c => c.CategoryId == product.CategoryId);
                if (!categoryExists)
                    return Results.BadRequest($"Category with ID {product.CategoryId} does not exist.");

                db.Products.Add(product);
                await db.SaveChangesAsync();
                return Results.Created($"/api/products/{product.ProductId}", product);
            });

            // 🔹 Update a product
            app.MapPut("/api/products/{id}", async (string id, Product updatedProduct, ShopSyncContext db) =>
            {
                var product = await db.Products.FindAsync(id);
                if (product is null)
                    return Results.NotFound();

                product.ProductName = updatedProduct.ProductName;
                product.Description = updatedProduct.Description;
                product.Price = updatedProduct.Price;
                product.CategoryId = updatedProduct.CategoryId;

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            // 🔹 Delete a product
            app.MapDelete("/api/products/{id}", async (string id, ShopSyncContext db) =>
            {
                var product = await db.Products.FindAsync(id);
                if (product is null)
                    return Results.NotFound();

                db.Products.Remove(product);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });
        }
    }
}
