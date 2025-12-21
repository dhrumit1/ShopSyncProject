using Microsoft.EntityFrameworkCore;
using ShopSync.Data;
using ShopSync.Models;

namespace ShopSync.Endpoints
{
    public static class InvoiceEndpoints
    {
        public static void MapInvoiceEndpoints(this WebApplication app)
        {
            //app.MapGet("/api/bills", async (ShopSyncContext db) =>
            //    await db.Bills.Include(b => b.Customer).ToListAsync());

            // ✅ Get bill by Id (with customer and items)
            //app.MapGet("/api/bills/{id}", async (int id, ShopSyncContext db) =>
            //    await db.Bills
            //        .Include(b => b.Customer)
            //        .Include(b => b.BillItems)
            //        .ThenInclude(i => i.Product)
            //        .FirstOrDefaultAsync(b => b.BillId == id) is Bill bill
            //        ? Results.Ok(bill)
            //        : Results.NotFound());

            // ✅ Create new bill
            //app.MapPost("/api/bills", async (Bill bill, ShopSyncContext db) =>
            //{
            //    bill.BillDate = DateTime.Now;
            //    db.Bills.Add(bill);
            //    await db.SaveChangesAsync();
            //    return Results.Created($"/bills/{bill.BillId}", bill);
            //});

            // ✅ Update bill
            //app.MapPut("/api/bills/{id}", async (int id, Bill updatedBill, ShopSyncContext db) =>
            //{
            //    var bill = await db.Bills.FindAsync(id);
            //    if (bill is null) return Results.NotFound();

            //    bill.CustomerId = updatedBill.CustomerId;
            //    bill.TotalAmount = updatedBill.TotalAmount;
            //    bill.BillDate = updatedBill.BillDate;

            //    await db.SaveChangesAsync();
            //    return Results.Ok(bill);
            //});

            // ✅ Delete bill
            //app.MapDelete("/api/bills/{id}", async (int id, ShopSyncContext db) =>
            //{
            //    var bill = await db.Bills.FindAsync(id);
            //    if (bill is null) return Results.NotFound();

            //    db.Bills.Remove(bill);
            //    await db.SaveChangesAsync();
            //    return Results.NoContent();
            //});
        }
    }
}
