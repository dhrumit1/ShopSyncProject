namespace ShopSync.Models
{
    public class InvoiceDetail
    {
        public string? InvoiceNo { get; set; }
        public int InvoiceSeq { get; set; }
        public string? ProductId { get; set; }
        public int ProductPrice { get; set; }
        public int ProductQty { get; set; }

    }
}
