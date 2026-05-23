import { useEffect, useState } from "react";
import api from "../api/ApiClient";
import "../styles/ProductsCards.css";

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

    api.get(`/api/allcartproducts/${selectedCategory}`)
      .then((res) => setProducts(res.data))
      .catch((err) =>
        console.error("Error fetching products:", err)
      );

  }, [selectedCategory]);

  return (
    <div className="comman-form-card product-cards" >

      {/* Category Scroll */}
      <div className="all-categorys-section" >

        {categories.map((cat) => (
          <div key={cat.categoryId} className="all-categorys" onClick={() => setSelectedCategory(cat.categoryId)}
            style={{
              background:
                selectedCategory === cat.categoryId ? "#2874f0":"#fff",
              color:
                selectedCategory === cat.categoryId ? "#fff" : "#000",
            }}
          >
            {cat.categoryName}
          </div>

        ))}

      </div>

      {/* Product Grid */}
      <div className="product-grid" >
        {products.map((product) => (
          <div key={product.productId} className="products" onClick={() => onProductClick(product)} >

            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt={product.productName}
              className="products-img"
            />

            <h4 className="products-name">
              {product.productName}
            </h4>

            <p className="products-price">
              ₹ {product.price}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
}

export default ProductsCards;