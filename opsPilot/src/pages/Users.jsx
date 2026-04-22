import { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import "../pages/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h2>Users</h2>
      <div className="users-list">
        {users.map((user) => (
          <p key={user.id}>{user.firstName}</p>
        ))}
      </div>
    </div>
  );
}
