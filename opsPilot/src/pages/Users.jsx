import { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import "../pages/Users.css";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const userSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 8;
  const [searchInput, setSearchInput] = useState(userSearch);

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
      <div className="users-list">
        {paginatedUsers.map((user) => (
          <p key={user.id}>{user.firstName}</p>
        ))}
      </div>
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
    </div>
  );
}
