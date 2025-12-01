using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopSync.Models
{
    public class Product
    {
        public string? ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? Description { get; set; }
        public int? Price { get; set; }
        public string? CategoryId { get; set; }

        public Category Category { get; set; }
    }
}
