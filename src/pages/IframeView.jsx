import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IframeView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get('url');

  if (!url) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col flex-grow min-h-[calc(100vh-96px)]"
    >
      <iframe 
        src={url} 
        className="w-full flex-grow border-none" 
        title="Demo Iframe"
        allowFullScreen
        style={{ height: 'calc(100vh - 80px)' }} // Default fallback
      />
    </motion.div>
  );
};

export default IframeView;
