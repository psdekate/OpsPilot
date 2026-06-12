import { useMemo } from "react";

export default function useUserTableData(
  users,
  userSearch,
  sortConfig,
  page,
  itemsPerPage,
) {
  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase().trim();

    if (!query) return users;

    return users.filter((user) => user.firstName.toLowerCase().includes(query));
  }, [users, userSearch]);
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase();
      const bValue = b[sortConfig.key]?.toString().toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredUsers, sortConfig]);
  const paginatedUsers = sortedUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return {
    filteredUsers,
    sortedUsers,
    paginatedUsers,
    totalPages,
  };
}
