import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import DashboardPage from "./pages/DashboardPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/Invoice" element={<InvoicePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
