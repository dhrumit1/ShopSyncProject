import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import PageContainer from "../components/PageContainer";
import PopupMessage from "../components/PopupMessage";
import ProductsCards from "../components/ProductsCards";
import "../styles/CartPage.css";

function CartPage() {

  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setcustomerName] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
  };

  // const totalAmount = invoiceItems.reduce((sum, i) => sum + i.total, 0);

  return (

    <PageContainer title="Product Cart">
      <div className="comman-container">
        {/* TOP SECTION */}
        <div className="cart-top">
          <div className="comman-form-card customer-details">
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
                <label className="customername" style={{ width: "300px" }}>ABCD</label>
              </div>

              <div className="flexrow">
                <label className="total-amountlable" style={{ width: "120px" }}>
                  Total Amount
                </label>
                <label className="total-amountprice">
                  ₹ {100}
                </label>
              </div>

              <div className="flexrow">
                <button className="exbutton btn-primary" onClick={() => showPopup("Save Data")}>
                  Save
                </button>
                <button className="exbutton btn-primary" onClick={() => showPopup("Invoice Generated!")} style={{ marginLeft: "5px" }}>
                  Generate Invoice
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM – Category And Products */}
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

export default CartPage;
