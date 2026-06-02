import StatCard from "./StatCard";
import "../components/DashboardMetrics.css";

const metricCards = [
  {
    title: "Total Users",
    key: "totalUsers",
  },
  {
    title: "Admin Users",
    key: "adminUsers",
  },
  {
    title: "Regular Users",
    key: "regularUsers",
  },
];

export default function DashboardMetrics({ metrics }) {
  return (
    <div className="stat-cards">
      {metricCards.map((card) => (
        <StatCard key={card.key} title={card.title} value={metrics[card.key]} />
      ))}
    </div>
  );
}
