import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../layouts/MainLayout.css";
import Toast from "../components/Toast";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/users", label: "Users" },
  { path: "/orders", label: "Orders" },
  { path: "/settings", label: "Settings" },
];

export default function MainLayout() {
  const { logout } = useAuth();
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <h2>OpsPilot</h2>
        <nav className="nav-links">
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <button onClick={logout}>Logout</button>
      </aside>
      <main className="main-content">
        <Outlet />
        <Toast />
      </main>
    </div>
  );
}
