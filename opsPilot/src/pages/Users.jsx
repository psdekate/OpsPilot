import { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import "../pages/Users.css";
import { useMemo } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [users, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* <div className="users-list">
        {users.map((user) => (
          <p key={user.id}>{user.firstName}</p>
        ))}
      </div> */}
      <div className="users-list">
        {/* {!filteredUsers && <p>No users found...</p>} */}
        {filteredUsers.map((user) => (
          <p key={user.id}>{user.firstName}</p>
        ))}
      </div>
    </div>
  );
}
