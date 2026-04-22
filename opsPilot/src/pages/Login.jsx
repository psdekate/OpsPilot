import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import "../pages/Login.css";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password should be atleast 6 characters long");
      return;
    }

    setError("");
    login();
    navigate("/");
  }

  return (
    <div className="login-page">
      <h2 style={{ textTransform: "uppercase" }}>Login to continue</h2>
      <form action="" onSubmit={handleSubmit} className="login-form">
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-code">{error}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
