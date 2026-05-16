import { useEffect, useState } from "react";
import api from "../api/ApiClient";

function ProductsCards({ onProductClick }) {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Load Categories
  useEffect(() => {

    api.get("/api/categories")
      .then((res) => {

        setCategories(res.data);

        // Auto select first category
        if (res.data.length > 0) {
          setSelectedCategory(res.data[0].categoryId);
        }

      })
      .catch((err) =>
        console.error("Error fetching categories:", err)
      );

  }, []);

  // Load Products based on selected category
  useEffect(() => {

    // Prevent API call if category not selected
    if (!selectedCategory) return;

    api.get(`/api/categoryproducts/${selectedCategory}`)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        console.error("Error fetching products:", err)
      );

  }, [selectedCategory]);

  return (
    <div
      className="comman-form-card"
      style={{ marginTop: "15px" }}
    >

      {/* Category Scroll */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          paddingBottom: "10px",
          marginBottom: "15px",
        }}
      >

        {categories.map((cat) => (

          <div
            key={cat.categoryId}

            onClick={() =>
              setSelectedCategory(cat.categoryId)
            }

            style={{
              minWidth: "100px",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",

              background:
                selectedCategory === cat.categoryId
                  ? "#2874f0"
                  : "#fff",

              color:
                selectedCategory === cat.categoryId
                  ? "#fff"
                  : "#000",

              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {cat.categoryName}
          </div>

        ))}

      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >

        {products.map((product) => (

          <div
            key={product.productId}

            onClick={() => onProductClick(product)}

            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >

            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt={product.productName}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />

            <h4
              style={{
                marginTop: "10px",
                fontSize: "15px",
              }}
            >
              {product.productName}
            </h4>

            <p
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              ₹ {product.price}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
}

export default ProductsCards;