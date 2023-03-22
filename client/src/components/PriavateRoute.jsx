import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component }) => {
  return localStorage.getItem('accessToken') ? (
    Component
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;
