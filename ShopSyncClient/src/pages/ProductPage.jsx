import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import PageContainer from "../components/PageContainer";
import PopupMessage from "../components/PopupMessage";
import "../styles/ProductPage.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [categoryId, setCategoryId] = useState("");

  const [editId, setEditId] = useState(null);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
  };

  // Load product list + categories
  const loadProducts = () => {
    api.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const loadCategories = () => {
    api.get("/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Save / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim() || !categoryId.trim()) return;

    try {
      if (editId) {
        // Update
        await api.put(`/api/products/${editId}`, {
          productName,
          description,
          price: Number(price),
          categoryId
        });

        showPopup("Product updated successfully!");
      } else {
        // Create
        await api.post("/api/products", {
          productId,
          productName,
          description,
          price: Number(price),
          categoryId
        });

        showPopup("Product added successfully!");
      }

      // Reset
      setProductId("");
      setProductName("");
      setDescription("");
      setPrice("0");
      setCategoryId("");
      setEditId(null);

      loadProducts();
    } catch (err) {
      console.error(err);
      let errMsg = err?.message || "Something went wrong!";
      showPopup(errMsg, "error");
    }
  };

  const editProduct = (p) => {
    setEditId(p.productId);

    setProductId(p.productId);
    setProductName(p.productName);
    setDescription(p.description || "");
    setPrice(p.price || "0");
    setCategoryId(p.categoryId);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    await api.delete(`/api/products/${id}`);
    showPopup("Product deleted successfully!");
    loadProducts();
  };

  return (
    <PageContainer title="Products Management">
      <div className="comman-container">

        {/* FORM CARD */}
        <div className="comman-form-card">
          <h3 className="heading3">{editId ? "Edit Product" : "Add Product"}</h3>

          <form onSubmit={handleSubmit}>

            {/* PRODUCT ID FIELD (only in add mode) */}
            {!editId && (
              <div className="flexrow">
                <label className="required" style={{ width: "110px" }}>Product ID</label>
                <input type="text" value={productId} maxLength={10} required onChange={(e) => setProductId(e.target.value)} style={{ width: "150px" }} />
              </div>
            )}

            {/* Product ID disabled in edit mode */}
            {editId && (
              <div className="flexrow">
                <label className="required" style={{ width: "110px" }}>Product ID</label>
                <input type="text" value={productId} disabled style={{ width: "150px" }} />
              </div>
            )}

            {/* PRODUCT NAME */}
            <div className="flexrow">
              <label className="required" style={{ width: "110px" }}>Product Name</label>
              <input type="text" value={productName} maxLength={30} required onChange={(e) => setProductName(e.target.value)} style={{ width: "430px" }} />
            </div>

            {/* DESCRIPTION */}
            <div className="flexrow">
              <label style={{ width: "110px" }}>Description</label>
              <input 
                type="text"
                value={description}
                maxLength={50}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "350px" }}
              />
            </div>

            {/* PRICE */}
            <div className="flexrow">
              <label style={{ width: "110px" }}>Price</label>
              <input 
                type="number"
                value={price}
                maxLength={10}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "120px" }}
              />
            </div>

            {/* CATEGORY DROPDOWN */}
            <div className="flexrow">
              <label className="required" style={{ width: "110px" }}>Category</label>
              <select
                value={categoryId}
                required
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ width: "180px" }}
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.categoryId} value={c.categoryId}>
                    {c.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn-primary" type="submit">
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                className="btn-secondary"
                type="button"
                onClick={() => {
                  setEditId(null);
                  setProductId("");
                  setProductName("");
                  setDescription("");
                  setPrice("0");
                  setCategoryId("");
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="comman-table-card">
          <h3 className="heading3">Product List</h3>

          <table className="Product-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr key={p.productId}>
                  <td>{index + 1}</td>
                  <td>{p.productId}</td>
                  <td>{p.productName}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>{p.categoryName}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-edit" onClick={() => editProduct(p)}>
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteProduct(p.productId)}
                    >
                      Delete
                    </button>
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

export default ProductPage;