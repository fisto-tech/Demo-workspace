import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IframeView = ({ url }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!url) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // The container takes exactly the remaining screen height and hides overflow
      className="w-full relative overflow-hidden h-[calc(100vh-80px)] md:h-[calc(100vh-96px)]"
    >
     <iframe
      src={url}
      // The iframe is slightly taller than the container (e.g. + 60px) to crop out its bottom icons
      className="absolute top-0 left-0 w-full border-none h-[calc(100%-0px)]" style={{pointerEvents: "auto"}}
      title="Demo Iframe"
      allowFullScreen
     />
    </motion.div>
  );
};

export default IframeView;
