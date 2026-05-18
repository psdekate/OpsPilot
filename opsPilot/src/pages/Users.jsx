import { isValidElement, useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import "../pages/Users.css";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DataTable from "../components/DataTable";
import ConfirmModal from "../components/ConfirmModal";

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

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const userSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 8;
  const [searchInput, setSearchInput] = useState(userSearch);

  function handleDeleteClick(user) {
    setUserToDelete(false);
    setIsDeleteOpen(true);
  }

  function confirmDelete() {
    setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
    setIsDeleteOpen(false);
    setToastMessage("User deleted successfully");
  }

  const filteredUsers = useMemo(() => {
    const query = userSearch.toLowerCase().trim();

    if (!query) return users;

    return users.filter((user) => user.firstName.toLowerCase().includes(query));
  }, [users, userSearch]);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

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

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await getUsers();
        setUsers(res.data.users);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
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
      <DataTable columns={columns} data={paginatedUsers} />
      {toastMessage && <div>{toastMessage}</div>}
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
