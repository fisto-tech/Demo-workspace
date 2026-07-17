import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogOut, FiGlobe, FiMonitor, FiLayers, FiGrid, FiMenu, FiX, FiBox } from 'react-icons/fi';
import logoImg from '../assets/logo.webp';

const Navbar = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Website', icon: <FiGlobe />, path: '/' },
    { label: 'IDC', icon: <FiMonitor />, path: '/idc' },
    { label: '2D 3D Animation', icon: <FiLayers />, path: '/2d-3d-animation' },
    { label: 'Applications', icon: <FiGrid />, path: '/applications' },
    { label: 'AR/VR', icon: <FiBox />, path: '/ar-vr' },
  ].map(link => {
    return { ...link, active: location.pathname === link.path };
  });

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-border shadow-sm flex flex-col"
    >
      <div className="w-full w-[95%] md:w-[85%] max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          <div className="flex items-center gap-2">
            {/* Hamburger Button */}
            <button 
              className="lg:hidden text-gray-300 p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center cursor-pointer group"
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            >
              <div className="px-1 md:px-3 py-1.5 md:py-2 rounded-xl">
                <img src={logoImg} alt="Fist-O Web Logo" className="h-10 md:h-16 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
            </motion.div>
          </div>

          {/* Center Nav Links Desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.label}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    navigate(link.path);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    link.active
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-white/100 hover:text-primary hover:bg-primary/5 border border-transparent'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 md:space-x-4">
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#111111] border-t border-border overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    navigate(link.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 w-full ${
                    link.active
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-textSecondary hover:text-primary border border-transparent'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
