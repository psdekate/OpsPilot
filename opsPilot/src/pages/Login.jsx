import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../pages/Login.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 chars"),
});

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  function onSubmit(data) {
    login();
    navigate("/");
  }

  return (
    <div className="login-page">
      <h2 style={{ textTransform: "uppercase" }}>Login to continue</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className="error-code">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-code">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
