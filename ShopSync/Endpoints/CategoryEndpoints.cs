using Microsoft.EntityFrameworkCore;
using ShopSync.Data;
using ShopSync.Models;

namespace ShopSync.Endpoints
{
    public static class CategoryEndpoints
    {
        public static void MapCategoryEndpoints(this WebApplication app)
        {

            app.MapGet("/api/categories", async (ShopSyncContext db) =>
                await db.Categories.ToListAsync()
            );

            app.MapGet("/api/categories/{id}", async (string id, ShopSyncContext db) =>
                await db.Categories.FindAsync(id) is Category category ? Results.Ok(category) : Results.NotFound()
            );

            app.MapPost("/api/categories", async (Category category, ShopSyncContext db) =>
            {
                db.Categories.Add(category);
                await db.SaveChangesAsync();
                return Results.Created($"/api/categories/{category.CategoryId}", category);
            });

            app.MapPut("/api/categories/{id}", async (string id, Category updatedCategory, ShopSyncContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                category.CategoryName = updatedCategory.CategoryName;

                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            app.MapDelete("/api/categories/{id}", async (string id, ShopSyncContext db) =>
            {
                var category = await db.Categories.FindAsync(id);
                if (category is null) return Results.NotFound();

                db.Categories.Remove(category);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

        }
    }
}
