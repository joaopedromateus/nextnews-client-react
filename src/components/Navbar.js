//next-news-project\client\src\app\components\Navbar.tsx
'use client'
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Lógica de verificação de login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
      
    <header className="h-[60px] bg-gradient-to-r from-[#121532] to-[#121253] text-white w-[100%] flex flex-row text-white justify-center items-center ">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="/" className="hover:text-gray-300">
              Últimas Notícias
            </a>
          </li>
          <li>
            <a href="/security" className="hover:text-gray-300">
              Segurança
            </a>
          </li>
          <li>
            <a href="/technology/" className="hover:text-gray-300">
              Tecnologia
            </a>
          </li>
          <li>
            <a href="/health" className="hover:text-gray-300">
              Saúde
            </a>
          </li>
          <li>
            <a href="/internet" className="hover:text-gray-300">
              Internet
            </a>
          </li>  
          {/* Login info */}
        {loggedIn && (
          <a href="/admin" className="pl-[100px] text-green-500">Adm View</a>
      )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
