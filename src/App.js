import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; // Seu arquivo CSS principal
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HealthPage from './pages/HealthPage';
import InternetPage from './pages/InternetPage';
import RegisterPage from './pages/RegisterPage';
import TechnologyPage from './pages/TechnologyPage';
import NewsPage from './pages/NewsPage';
import SecurityPage from './pages/SecurityPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/health' element={<HealthPage />} />
        <Route path='/internet' element={<InternetPage />} />
        <Route path='/technology' element={<TechnologyPage />} />
        <Route path='/Security' element={<SecurityPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/news/:slug' element={<NewsPage />} />

        {/* Outras rotas */}
      </Routes>
    </Router>
  );
};

export default App;
