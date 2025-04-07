// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setLoading(false);

    verifyToken(token).then(valid => {
      setAuthorized(valid);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  return authorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
