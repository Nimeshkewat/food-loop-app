import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <h2>MainLayout Header</h2>
    </div>
  );
}

export default MainLayout;
