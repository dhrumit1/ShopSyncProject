using Microsoft.EntityFrameworkCore;
using ShopSync.Data;

namespace ShopSync.Endpoints
{
    public static class CartEndpoint
    {
        public static void MapCartEndpoints(this WebApplication app)
        {

            app.MapGet("/api/allcartproducts/{id}", async (string id, ShopSyncContext db) =>
            {
                var category = await db.Categories.FindAsync(id);

                if (category is null)
                    return Results.NotFound("Category not found");

                var products = await db.Products
                    .Where(p => p.CategoryId == id)
                    .Select(p => new
                    {
                        p.ProductId,
                        p.ProductName,
                        p.Price
                    })
                    .ToListAsync();

                return Results.Ok(products);
            });
        }
    }
}
