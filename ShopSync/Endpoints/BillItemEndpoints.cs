//using Microsoft.EntityFrameworkCore;
//using ShopSync.Data;
//using ShopSync.Models;

//namespace ShopSync.Endpoints
//{
//    public static class BillItemEndpoints
//    {
//        public static void MapBillItemEndpoints(this WebApplication app)
//        {
//            app.MapGet("/api/billitems", async (ShopSyncContext db) =>
//    await db.BillItems
//        .Include(i => i.Bill)
//        .Include(i => i.Product)
//        .ToListAsync());

//            // ✅ Get bill items by BillId
//            app.MapGet("/api/billitems/bybill/{billId}", async (int billId, ShopSyncContext db) =>
//                await db.BillItems
//                    .Where(i => i.BillId == billId)
//                    .Include(i => i.Product)
//                    .ToListAsync());

//            // ✅ Add new bill item
//            app.MapPost("/api/billitems", async (BillItem item, ShopSyncContext db) =>
//            {
//                db.BillItems.Add(item);
//                await db.SaveChangesAsync();
//                return Results.Created($"/billitems/{item.BillItemId}", item);
//            });

//            // ✅ Update bill item
//            app.MapPut("/api/billitems/{id}", async (int id, BillItem updatedItem, ShopSyncContext db) =>
//            {
//                var item = await db.BillItems.FindAsync(id);
//                if (item is null) return Results.NotFound();

//                item.BillId = updatedItem.BillId;
//                item.ProductId = updatedItem.ProductId;
//                item.Quantity = updatedItem.Quantity;
//                item.UnitPrice = updatedItem.UnitPrice;

//                await db.SaveChangesAsync();
//                return Results.Ok(item);
//            });

//            // ✅ Delete bill item
//            app.MapDelete("/billitems/{id}", async (int id, ShopSyncContext db) =>
//            {
//                var item = await db.BillItems.FindAsync(id);
//                if (item is null) return Results.NotFound();

//                db.BillItems.Remove(item);
//                await db.SaveChangesAsync();
//                return Results.NoContent();
//            });
//        }
//    }
//}
