import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ restricted, component: Component }) => {
  return localStorage.getItem('accessToken') && restricted ? (
    <Navigate to="/account" />
  ) : (
    Component
  );
};

export default PublicRoute;
