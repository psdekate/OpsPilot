import useUserDelete from "../hooks/useUserDelete";
import "../pages/Users.css";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import EditUserModal from "../components/EditUserModal";
import useUsers from "../hooks/useUsers";
import { useUpdateUser } from "../hooks/useUpdateUser";
import useToastStore from "../store/toastStore";
import { usePermissions } from "../hooks/userPermissions";
import { useAuth } from "../context/AuthContext";
import { useDeleteUser } from "../hooks/useDeleteUser";
import useUserTableState from "../hooks/userUserTableState";
import useUserTableData from "../hooks/useUserTableData";
import useUserEdit from "../hooks/useUserEdit";
import { getUserColumns } from "../config/userTableColumns";
import useUserActions from "../hooks/useUserActions";
import useUserTableActions from "../hooks/useUserTableActions";
import { PERMISSIONS } from "../constants/permissions";

export default function Users() {
  const { isModalOpen, setIsModalOpen, selectedUser, handleEdit } =
    useUserEdit();

  const { isDeleteOpen, setIsDeleteOpen, userToDelete, handleDeleteClick } =
    useUserDelete();

  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const { handleSave, confirmDelete } = useUserActions({
    updateMutation,
    deleteMutation,
    selectedUser,
    userToDelete,
    setIsModalOpen,
    setIsDeleteOpen,
  });

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

  const { handleSort } = useUserTableActions(setSortConfig);

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

  const { user } = useAuth();
  const { hasPermission } = usePermissions(user?.role);

  const columns = getUserColumns({
    canEdit: hasPermission(PERMISSIONS.EDIT_USER),
    canDelete: hasPermission(PERMISSIONS.DELETE_USER),
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

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
