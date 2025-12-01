//namespace ShopSync.Models
//{
//    public class Bill
//    {
//        public int BillId { get; set; }
//        public DateTime BillDate { get; set; } = DateTime.Now;
//        public decimal TotalAmount { get; set; }

//        // Foreign Key → Customer
//        public int CustomerId { get; set; }
//        public Customer? Customer { get; set; }

//        // Foreign Key → User (shopkeeper who created it)
//        public int UserId { get; set; }
//        public User? User { get; set; }

//        // Relationship
//        public ICollection<BillItem>? BillItems { get; set; }
//    }
//}
