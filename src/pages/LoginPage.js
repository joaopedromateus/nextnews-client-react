// client/src/app/login/page.tsx
'use client';
import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Variável de estado para controlar autenticação
  const [redirectMessage, setRedirectMessage] = useState('');

  useEffect(() => {
    // Verifique se o usuário já está logado
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Define como autenticado se tiver um token
      setRedirectMessage('Você já está autenticado. Redirecionando para a página de admin...');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 2000);
    }
  }, []); // Executar apenas uma vez, quando o componente é montado

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 500) {
        console.error('Erro no servidor');
      } else if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true); // Define como autenticado após o login bem-sucedido
        setRedirectMessage('Você já está autenticado. Redirecionando para a página de admin...');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } else {
        setErrorMessage('Senha incorreta'); // Define a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg mt-[70px] p-6 w-96">
        <h1 className="text-2xl font-semibold mb-4 text-black">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black font-medium">
              Nome de usuário:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-md px-3 py-2 border text-black w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black font-medium">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md px-3 py-2 text-black border w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full">
            Login
          </button>
        </form>
        {errorMessage && (
          <p className="text-red-500 mt-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
