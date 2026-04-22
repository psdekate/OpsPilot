import { useEffect, useState } from "react";
import { getUsers } from "../services/usersApi";
import "../pages/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
