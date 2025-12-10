import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import DashboardPage from "./pages/DashboardPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
