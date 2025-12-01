//using Microsoft.EntityFrameworkCore;
//using ShopSync.Data;
//using ShopSync.Models;

//namespace ShopSync.Endpoints
//{
//    public static class CustomerEndpoints
//    {
//        public static void MapCustomerEndpoints(this WebApplication app)
//        {
//            // ✅ Get all customers
//            app.MapGet("/api/customers", async (ShopSyncContext db) =>
//                await db.Customers.ToListAsync());

//            // ✅ Get customer by Id
//            app.MapGet("/api/customers/{id}", async (int id, ShopSyncContext db) =>
//                await db.Customers.FindAsync(id) is Customer customer
//                    ? Results.Ok(customer)
//                    : Results.NotFound());

//            // ✅ Add new customer
//            app.MapPost("/api/customers", async (Customer customer, ShopSyncContext db) =>
//            {
//                db.Customers.Add(customer);
//                await db.SaveChangesAsync();
//                return Results.Created($"/customers/{customer.CustomerId}", customer);
//            });

//            // ✅ Update existing customer
//            app.MapPut("/api/customers/{id}", async (int id, Customer updatedCustomer, ShopSyncContext db) =>
//            {
//                var customer = await db.Customers.FindAsync(id);
//                if (customer is null) return Results.NotFound();

//                customer.CustomerName = updatedCustomer.CustomerName;
//                customer.Email = updatedCustomer.Email;
//                customer.Phone = updatedCustomer.Phone;
//                customer.Address = updatedCustomer.Address;

//                await db.SaveChangesAsync();
//                return Results.Ok(customer);
//            });

//            // ✅ Delete customer
//            app.MapDelete("/api/customers/{id}", async (int id, ShopSyncContext db) =>
//            {
//                var customer = await db.Customers.FindAsync(id);
//                if (customer is null) return Results.NotFound();

//                db.Customers.Remove(customer);
//                await db.SaveChangesAsync();
//                return Results.NoContent();
//            });
//        }
//    }
//}
