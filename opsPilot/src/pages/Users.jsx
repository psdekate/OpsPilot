import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../services/usersApi";
import "../pages/Users.css";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";
import EditUserModal from "../components/EditUserModal";
import useToastStore from "../store/toastStore";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Users() {
  const columns = [
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Email", accessor: "email" },
    {
      header: "Actions",
      render: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDeleteClick(row)}>Delete</button>
        </>
      ),
    },
  ];

  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  // const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const userSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 8;
  const [searchInput, setSearchInput] = useState(userSearch);

  const showToast = useToastStore((state) => state.showToast);
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const users = data?.data?.users || [];
  const [localUsers, setLocalUsers] = useState([]);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      showToast("User deleted successfully");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      showToast("User updated successfully");
    },
  });

  function handleSave(updatedData) {
    updateMutation.mutate({
      id: selectedUser.id,
      data: updatedData,
    });

    setIsModalOpen(false);
    // setLocalUsers((prev) =>
    //   prev.map((user) =>
    //     user.id === selectedUser.id ? { ...user, ...updatedData } : user,
    //   ),
    // );

    setIsModalOpen(false);

    showToast("User updated successfully");
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
    // setLocalUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
    setIsDeleteOpen(false);
    // showToast("User deleted successfully");
  }

  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase().trim();

    if (!query) return localUsers;

    return localUsers.filter((user) =>
      user.firstName.toLowerCase().includes(query),
    );
  }, [localUsers, userSearch]);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    if (localUsers.length) {
      setLocalUsers(localUsers);
    }
  }, [localUsers]);

  //to remove toast message automatically
  // useEffect(() => {
  //   if (!toastMessage) return;
  //   const timer = setTimeout(() => {
  //     setToastMessage("");
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [toastMessage]);

  //debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("search", searchInput);
        params.set("page", 1);
        return params;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  //manually Sync Input with URL
  useEffect(() => {
    setSearchInput(userSearch);
  }, [userSearch]);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       setLoading(true);
  //       const res = await getUsers();
  //       setUsers(res.data.users);
  //     } catch (err) {
  //       setError("Failed to fetch users");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (localUsers.length === 0) return <p>No users found</p>;

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
      <DataTable columns={columns} data={paginatedUsers} />
      {/* {toastMessage && <div>{toastMessage}</div>} */}
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
