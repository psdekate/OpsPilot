import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogin() {
    console.log("login clicked");

    login({ name: "Piyush", role: "admin" });
    console.log("After login");
    window.location.href = "/users";
    console.log("After navigate");
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login as Admin</button>
    </div>
  );
}
