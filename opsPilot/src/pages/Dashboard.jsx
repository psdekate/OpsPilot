import "../pages/Dashboard.css";
import useUsers from "../hooks/useUsers";
import DashboardMetrics from "../components/DashboardMetrics";
import { useMemo, useState } from "react";
import DashboardSection from "../components/DashboardSection";
import RecentActivity from "../components/RecentActivity";
import useDashboardMetrics from "../hooks/useDashboardMetrics";

export default function Dashboard() {
  const { data, isLoading, error } = useUsers();
  const users = data?.data?.users || [];

  const metrics = useDashboardMetrics(users);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load dashboard</p>;
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <DashboardSection title="User Metrics">
        <DashboardMetrics metrics={metrics} />
      </DashboardSection>
      <DashboardSection title="Activity">
        <RecentActivity />
      </DashboardSection>
    </div>
  );
}
