import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <footer className="bg-[#c0c4b6] text-black py-6 mt-0 overflow-hidden text-center">
      <div className="w-[95%] md:w-[90%] max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-sm font-medium text-[#444]">
        <p>&copy; 2025 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
