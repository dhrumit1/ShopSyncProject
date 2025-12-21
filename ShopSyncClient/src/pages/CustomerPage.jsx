import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import PageContainer from "../components/PageContainer";
import PopupMessage from "../components/PopupMessage";
import "../styles/CategoryPage.css";

function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [editId, setEditId] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
  };

  const loadCustomers = () => {
    api.get("/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || (!editId && !customerId.trim())) return;

    try {
      if (editId) {
        await api.put(`/api/customers/${editId}`, {
          customerName,
          mobileNumber,
          address
        });
        showPopup("Customer updated!", "success");
      } else {
        await api.post("/api/customers", {
          customerId,
          customerName,
          mobileNumber,
          address
        });
        showPopup("Customer added!", "success");
      }

      setCustomerId("");
      setCustomerName("");
      setMobileNumber("");
      setAddress("");
      setEditId(null);

      loadCustomers();
    } catch (err) {
      showPopup(err.message, "error");
    }
  };

  const editCustomer = (c) => {
    setEditId(c.customerId);
    setCustomerId(c.customerId);
    setCustomerName(c.customerName);
    setMobileNumber(c.mobileNumber);
    setAddress(c.address);
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await api.delete(`/api/customers/${id}`);
    showPopup("Customer deleted!", "success");
    loadCustomers();
  };

  return (
    <PageContainer title="Customer Management">
      <div className="comman-container">

        {/* FORM */}
        <div className="comman-form-card">
          <h3 className="heading3">{editId ? "Edit Customer" : "Add Customer"}</h3>

          <form onSubmit={handleSubmit}>

            {!editId && (
              <div className="flexrow">
                <label className="required" style={{ width: "120px" }}>Customer ID</label>
                <input
                  type="text"
                  value={customerId}
                  maxLength={10}
                  onChange={(e) => setCustomerId(e.target.value)}
                  style={{ width: "120px" }}
                  required
                />
              </div>
            )}

            {editId && (
              <div className="flexrow">
                <label className="required" style={{ width: "120px" }}>Customer ID</label>
                <input type="text" value={customerId} disabled style={{ width: "120px" }} />
              </div>
            )}

            <div className="flexrow">
              <label className="required" style={{ width: "120px" }}>Customer Name</label>
              <input
                type="text"
                maxLength={30}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{ width: "350px" }}
              />
            </div>

            <div className="flexrow">
              <label style={{ width: "120px" }}>Mobile Number</label>
              <input
                type="text"
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{ width: "200px" }}
              />
            </div>

            <div className="flexrow">
              <label style={{ width: "120px" }}>Address</label>
              <input
                type="text"
                maxLength={100}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "350px" }}
              />
            </div>

            <button type="submit" className="btn-primary">
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button type="button"
                className="btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setCustomerId("");
                  setCustomerName("");
                  setMobileNumber("");
                  setAddress("");
                }}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* TABLE */}
        <div className="comman-table-card">
          <h3 className="heading3">Customer List</h3>

          <table className="Category-table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c, index) => (
                <tr key={c.customerId}>
                  <td>{index + 1}</td>
                  <td>{c.customerId}</td>
                  <td>{c.customerName}</td>
                  <td>{c.mobileNumber}</td>
                  <td>{c.address}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-edit" onClick={() => editCustomer(c)}>Edit</button>
                    <button className="btn-delete" onClick={() => deleteCustomer(c.customerId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
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

export default CustomerPage;
