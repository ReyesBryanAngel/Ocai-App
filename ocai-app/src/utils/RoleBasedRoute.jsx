import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalData } from '../contexts/GlobalDataProvider';
import secureLocalStorage from 'react-secure-storage';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { role } = useGlobalData();
  const storageRole = secureLocalStorage.getItem('userRole');

  if (!role && !storageRole) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role) && !allowedRoles.includes(storageRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;
