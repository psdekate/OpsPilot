import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../constants/permissions";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin(role) {
    login({ name: "Piyush", role });

    navigate("/users");
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={() => handleLogin(ROLES.ADMIN)}>Login as Admin</button>

      <button onClick={() => handleLogin(ROLES.VIEWER)}>Login as Viewer</button>
    </div>
  );
}
