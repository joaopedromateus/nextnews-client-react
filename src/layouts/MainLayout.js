import '../index.css';// MainLayout.js

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => (
  <div>
    <Navbar />
      <main>  
        <div className='flex flex-col items-center p-8'>
          {children}
        </div>
      </main>
    <Footer />
  </div>
);

export default MainLayout;
