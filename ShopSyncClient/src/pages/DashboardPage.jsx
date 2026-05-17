import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import PageContainer from "../components/PageContainer";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  const items = [
    { title: "Categories", image: "/icons/categories.svg", path: "/categories" },
    { title: "Products", image: "/icons/products.svg", path: "/products" },
    { title: "Customers", image: "/icons/customers.svg", path: "/customers" },
    { title: "Billing", image: "/icons/billing.svg", path: "/Invoice" },
    { title: "Reports", image: "/icons/reports.svg", path: "/reports" },
  ];

  return (
    <PageContainer title="Dashboard">
    <div className="dashboard-page">
      <div className="cards-grid">
        {items.map(i => (
          <DashboardCard
            key={i.path}
            title={i.title}
            image={i.image}
            onClick={() => navigate(i.path)}
          />
        ))}
      </div>
    </div>
    </PageContainer>
  );
};

export default DashboardPage;
