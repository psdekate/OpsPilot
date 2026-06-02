import { useMemo } from "react";

export default function useDashboardMetrics(users) {
  return useMemo(() => {
    return {
      totalUsers: users.length,
      adminUsers: users.filter((user) => user.role === "admin").lenght,
      regularUsers: users.filter((user) => user.role !== "admin").lenght,
    };
  }, [users]);
}
