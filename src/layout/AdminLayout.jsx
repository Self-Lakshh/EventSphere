// src/components/AdminLayout.jsx
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        {/* Add other admin links here */}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
