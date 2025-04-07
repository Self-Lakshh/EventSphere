import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layout/AdminLayout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
// import Users from './views/Users';
// import Events from './views/Events';
// import Forms from './views/Forms';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* <Route path="users" element={<Users />} />
          <Route path="events" element={<Events />} />
          <Route path="forms" element={<Forms />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
