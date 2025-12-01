using System.ComponentModel.DataAnnotations;

namespace ShopSync.Models
{
    public class Category
    {
        public string? CategoryId { get; set; }
        public string? CategoryName { get; set; }

        public List<Product> Products { get; set; }

    }
}
