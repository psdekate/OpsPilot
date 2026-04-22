import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import "../pages/Login.css";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().password(6, "Minimum 6 chars"),
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

  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [error, setError] = useState("");

  //   function handleSubmit(e) {
  //     e.preventDefault();

  //     if (!email.includes("@")) {
  //       setError("Invalid email");
  //       return;
  //     }

  //     if (password.length < 6) {
  //       setError("Password should be atleast 6 characters long");
  //       return;
  //     }

  //     setError("");
  //     login();
  //     navigate("/");
  //   }

  return (
    <div className="login-page">
      <h2 style={{ textTransform: "uppercase" }}>Login to continue</h2>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter your email"
            {...register("email")}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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
