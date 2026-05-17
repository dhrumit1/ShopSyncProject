import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import PageContainer from "../components/PageContainer";
import PopupMessage from "../components/PopupMessage";
import "../styles/InvoicePage.css";
import ProductsCards from "../components/ProductsCards";

function InvoicePage() {

  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
  };

  // useEffect(() => {
  //   api.get("/api/customers").then(res => setCustomers(res.data));
  // }, []);
  const searchInvoice = async (invNo) => {
    if (!invNo) return;

    try {
      const res = await api.get(`/api/invoice/${invNo}`);
      const data = res.data;

      // Invoice
      setInvoiceNo(data.invoice.invoiceNo);
      setInvoiceDate(data.invoice.invoiceDate);

      // Customer
      setCustomerId(data.customer.customerId);
      setCustomerName(data.customer.customerName);
      setMobileNumber(data.customer.mobile);
      setAddress(data.customer.address);

      // Invoice Items
      setInvoiceItems(
        data.items.map((i) => ({
          productId: i.productId,
          qty: i.productQty,
          price: i.productPrice,
          total: i.productQty * i.productPrice,
        }))
      );
    } catch (err) {
      showPopup("Invoice not found", "error");
    }
  };

  const totalAmount = invoiceItems.reduce((sum, i) => sum + i.total, 0);

  /* Add product row (temporary demo) */
  const addItem = () => {
    setInvoiceItems((prev) => [
      ...prev,
      {
        productName: "Demo Product",
        qty: 1,
        price: 100,
        total: 100,
      },
    ]);
  };

  // added
  return (
    <PageContainer title="Invoice Details">
      <div className="comman-container">
        {/* TOP SECTION */}
        <div className="invoice-top" style={{ display: "flex", gap: "10px" }}>
          
          <div className="comman-form-card invoice-info">
            <h3 className="heading3">Invoice Info</h3>

            <div className="comman-section">
              <div className="flexrow">
                <label className="required" style={{ width: "100px" }}>
                  Invoice No
                </label>
                <input
                  type="text"
                  value={invoiceNo}
                  maxLength={10}
                  onBlur={() => searchInvoice(invoiceNo)}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  style={{ width: "140px" }}
                  required
                />
                <button
                  className="exbutton"
                  onClick={() => searchInvoice(invoiceNo)}
                  style={{ marginLeft: "5px" }}
                >
                  🔍
                </button>
              </div>

              <div className="flexrow">
                <label style={{ width: "100px" }}>Invoice Date</label>
                <input
                  type="datetime-local"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  style={{ width: "180px" }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="comman-form-card customer-details">
            <h3 className="heading3">Customer Details</h3>

            <div className="comman-section">
              <div className="flexrow">
                <label className="required" style={{ width: "120px" }}>
                  Customer ID
                </label>
                <input
                  type="text"
                  value={customerId}
                  maxLength={10}
                  onChange={(e) => setCustomerId(e.target.value)}
                  style={{ width: "120px" }}
                  required
                />
              </div>

              <div className="flexrow">
                <label style={{ width: "120px" }}>
                  Customer Name
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled
                  style={{ width: "300px" }}
                />
              </div>

            </div>
          </div>

          <div className="comman-form-card bill-summary">
            <h3 className="heading3">Bill Summary</h3>

            <p className="total-amount"><b>Total Amount:</b> ₹ {totalAmount}</p>

            <button
              className="exbutton btn-primary"
              onClick={() => showPopup("Save Data")}
            >
              Save
            </button>
            <button
              className="exbutton btn-primary"
              onClick={() => showPopup("Invoice Generated!")}
              style={{ marginLeft: "5px" }}
            >
              Generate Invoice
            </button>
          </div>
        </div>

        {/* BOTTOM – INVOICE TABLE */}
        <ProductsCards />
      </div>

      <PopupMessage
        show={popup.show}
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup({ ...popup, show: false })}
      />
    </PageContainer>
  );
}

export default InvoicePage;
