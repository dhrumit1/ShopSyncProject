using Microsoft.EntityFrameworkCore;
using ShopSync.Models;

namespace ShopSync.Data
{
    public class ShopSyncContext : DbContext
    {
        public ShopSyncContext(DbContextOptions<ShopSyncContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetail { get; set; }
        //public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Invoice>().HasKey(i => i.InvoiceNo);

            modelBuilder.Entity<InvoiceDetail>().HasKey(i => new { i.InvoiceNo, i.InvoiceSeq });
        }

    }
}
