import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import PageContainer from "../components/PageContainer";
import "../styles/CategoryPage.css";
import PopupMessage from "../components/PopupMessage";


function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success"
  });

  // Load categories
  const loadCategories = () => {
    api
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
  };

  // Add or Update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim() || (!editId && !categoryId.trim())) return;

    try {
      if (editId) {
        // Update (ID cannot change)
        await api.put(`/api/categories/${editId}`, {
          categoryName,
        });
        showPopup("Category updated successfully!", "success");
      } else {
        // Create
        await api.post("/api/categories", {
          categoryId,
          categoryName,
        });
        showPopup("Category added successfully!", "success");
      }

      // Reset
      setCategoryId("");
      setCategoryName("");
      setEditId(null);
      loadCategories();
    } catch (err) {
      console.error(err);

      let strErrorMessage = "Something went wrong!";

      if (err.message) {
        strErrorMessage = err.message;
      }

      showPopup(strErrorMessage, "error");
    }
  };

  // Edit button
  const editCategorie = (cat) => {
    setEditId(cat.categoryId);
    setCategoryId(cat.categoryId);
    setCategoryName(cat.categoryName);
  };

  // Delete category
  const deleteCategorie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    await api.delete(`/api/categories/${id}`);
    showPopup("Category deleted successfully!", "success");
    loadCategories();
  };

  return (
    <PageContainer title="Category Management">
      <div className="comman-container">

        {/* FORM CARD */}
        <div className="comman-form-card">
          <h3 className="heading3">{editId ? "Edit Category" : "Add Category"}</h3>

          <form onSubmit={handleSubmit}>

            {/* When add Cateory */}
            
            {!editId && (
              <>
                <div className="flexrow">
                <label className="required" style={{ width: "115px"}}>Category ID</label>
                <input type="text" className="required-field categoryid" value={categoryId} maxLength={5} onChange={(e) => setCategoryId(e.target.value)} required />
                </div>
              </>
            )}

            {/* During edit — show ID but disabled */}
            {editId && (
              <>
                <div className="flexrow">
                <label className="required" style={{ width: "115px"}}>Category ID</label>
                <input type="text" className="required-field categoryid" value={categoryId} disabled />
                </div>
              </>
            )}

            {/* CATEGORY NAME FIELD */}
            <div className="flexrow">
            <label className="required" style={{ width: "115px" }}>Category Name</label>
            <input type="text" className="required-field categoryname" value={categoryName} maxLength={30} onChange={(e) => setCategoryName(e.target.value)} />
            </div>

            <button type="submit" className="exbutton btn-primary">{editId ? "Update" : "Add"}</button>

            {editId && (
              <button type="button" className="exbutton btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setCategoryId("");
                  setCategoryName("");
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="comman-table-card">
          <h3 className="heading3">Category List</h3>

          <table className="Category-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Category ID</th>
                <th>Category Name</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.categoryId}>
                  <td>{index + 1}</td>
                  <td>{cat.categoryId}</td>
                  <td>{cat.categoryName}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="exbutton btn-edit"
                      onClick={() => editCategorie(cat)}
                    >
                      Edit
                    </button>

                    <button
                      className="exbutton btn-delete"
                      onClick={() => deleteCategorie(cat.categoryId)}
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

export default CategoryPage;
