import { useEffect, useState } from "react";
import "../pages/Users.css";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import EditUserModal from "../components/EditUserModal";
import useUsers from "../hooks/useUsers";
import { useUpdateUser } from "../hooks/useUpdateUser";
import useToastStore from "../store/toastStore";
import { PERMISSIONS } from "../constants/permissions";
import { usePermissions } from "../hooks/userPermissions";

import { useAuth } from "../context/AuthContext";
import { useDeleteUser } from "../hooks/useDeleteUser";
import useUserTableState from "../hooks/userUserTableState";
import useUserTableData from "../hooks/useUserTableData";

export default function Users() {
  const columns = [
    { header: "First Name", accessor: "firstName", sortable: true },
    { header: "Last Name", accessor: "lastName", sortable: true },
    { header: "Email", accessor: "email", sortable: true },
    {
      header: "Actions",
      render: (row) => (
        <>
          {hasPermission(PERMISSIONS.EDIT_USER) && (
            <button onClick={() => handleEdit(row)}>Edit</button>
          )}

          {hasPermission(PERMISSIONS.DELETE_USER) && (
            <button onClick={() => handleDeleteClick(row)}>Delete</button>
          )}
        </>
      ),
    },
  ];

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const itemsPerPage = 8;

  const {
    searchParams,
    setSearchParams,
    userSearch,
    page,
    searchInput,
    setSearchInput,
    sortConfig,
    setSortConfig,
  } = useUserTableState();

  const { data, isLoading, error } = useUsers();
  const users = data?.data?.users || [];
  const { paginatedUsers, totalPages } = useUserTableData(
    users,
    userSearch,
    sortConfig,
    page,
    itemsPerPage,
  );

  const showToast = useToastStore((state) => state.showToast);

  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const { user } = useAuth();
  const { hasPermission } = usePermissions(user?.role);

  function handleSort(key) {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  function handleSave(updatedData) {
    updateMutation.mutate({
      id: selectedUser.id,
      data: updatedData,
    });

    setIsModalOpen(false);
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function handleDeleteClick(user) {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  }

  function confirmDelete() {
    deleteMutation.mutate(userToDelete.id);
    setIsDeleteOpen(false);
  }

  //manually Sync Input with URL
  useEffect(() => {
    setSearchInput(userSearch);
  }, [userSearch]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (users.length === 0) return <p>No users found</p>;

  return (
    <div className="users">
      <div className="users-header">
        <h2>Users</h2>
        <input
          type="text"
          placeholder="enter a name to search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={paginatedUsers}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <div className="button-row">
        <button
          disabled={page === 1}
          onClick={() =>
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", page - 1);
              return params;
            })
          }
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={page === totalPages}
          onClick={() =>
            setSearchParams((prev) => {
              const params = new URLSearchParams(prev);
              params.set("page", page + 1);
              return params;
            })
          }
        >
          Next
        </button>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        isSaving={updateMutation.isPending}
      />
      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete User"
        message={`Delete ${userToDelete?.firstName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
