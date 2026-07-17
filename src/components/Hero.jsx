import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

const Hero = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="relative bg-background overflow-hidden border-b border-border bg-mesh-pattern">
      <div className="absolute top-0 left-0 w-full h-full gold-glow pointer-events-none opacity-50"></div>

      {/* Top Right Admin Button */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20">
        {isAdmin ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-xs tracking-widest uppercase font-bold text-black bg-white hover:bg-gray-200 rounded-full transition-colors shadow-md"
          >
            <FiLogOut className="mr-2" />
            Logout
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-5 py-2 text-xs tracking-widest uppercase font-bold text-black bg-white hover:bg-gray-200 rounded-full transition-colors shadow-md"
          >
            Admin Login
          </motion.button>
        )}
      </div>

      <div className="w-[95%] md:w-[80%] lg:w-[60%] min-h-[30vh] lg:min-h-[30vh] max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:py-6 relative z-10 flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-textPrimary leading-tight mb-6">
              We design digital experiences that make <span className="text-primary block mt-2 sm:inline sm:mt-0">Brands</span> impossible to ignore 
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-textSecondary mb-10 max-w-2xl font-light leading-relaxed">
              Professional websites that help businesses attract premium customers
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('marketplace-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-10 py-4 border border-transparent text-sm md:text-base tracking-widest uppercase font-bold rounded-full shadow-[0_0_30px_rgba(197,160,89,0.25)] text-background bg-primary hover:bg-primary-dark transition-all duration-300"
            >
              Explore Collection
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
