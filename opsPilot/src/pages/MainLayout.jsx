import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <aside>
        <h1>Sidebar</h1>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
