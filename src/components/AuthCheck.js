// components/AuthCheck.js
import React from 'react';

const AuthCheck = ({ children }) => {
  // Verifica se o administrador está logado (pode ser uma função que verifica o token no localStorage)
  const isAdminLoggedIn = localStorage.getItem('adminToken') !== null;

  return isAdminLoggedIn ? children : null;
};

export default AuthCheck;
