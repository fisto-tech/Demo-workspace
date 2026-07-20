import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const Hero = () => {
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let isAnimating = false;

    const handleWheel = (e) => {
      // If we are near the top and scrolling down
      if (window.scrollY < 50 && e.deltaY > 0 && !isAnimating) {
        e.preventDefault();
        isAnimating = true;
        
        const section = document.getElementById('marketplace-grid');
        if (section) {
          // Calculate target with a small offset for the sticky header if needed, or exact top
          const targetY = section.getBoundingClientRect().top + window.scrollY;
          
          gsap.to(window, {
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTo: { y: targetY, autoKill: false },
            onComplete: () => {
              setTimeout(() => { isAnimating = false; }, 100);
            }
          });
        } else {
          isAnimating = false;
        }
      } else if (isAnimating) {
        e.preventDefault(); // Block scrolling while animating
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="relative bg-background overflow-hidden border-b border-border bg-mesh-pattern">
      <div className="absolute top-0 left-0 w-full h-full gold-glow pointer-events-none opacity-50"></div>

      {/* Top Right Admin Button */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-8 z-20 scale-90 sm:scale-100 origin-top-right">
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

      <div className="w-[95%] md:w-[80%] lg:w-[60%] min-h-[30vh] lg:min-h-[30vh] max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-12 pb-16 lg:py-6 relative z-10 flex items-center justify-center">
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
