namespace ShopSync.Models
{
    public class InvoiceResponseDto
    {
        public Invoice? Invoice { get; set; }
        public Customer? Customer { get; set; }
        public List<InvoiceDetail>? Items { get; set; }
    }
}
