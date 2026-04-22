import { Outlet, NavLink } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import "../layouts/MainLayout.css";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/users", label: "Users" },
  { path: "/orders", label: "Orders" },
  { path: "/settings", label: "Settings" },
];

export default function MainLayout() {
  const logout = useAuthStore((state) => state.logout);
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
      </main>
    </div>
  );
}
