import React from 'react';
import Navbar from '@components/ui/Navbar';
import Footer from '@components/ui/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Outlet /> {/* This will render the child routes */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
