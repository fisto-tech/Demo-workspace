import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IframeView = ({ url }) => {
  if (!url) {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col flex-grow"
    >
     <iframe
  src={url}
  className="w-full flex-grow border-none h-[calc(100vh+20px)] md:h-[calc(100vh+4px)]"
  title="Demo Iframe"
  allowFullScreen
/>
    </motion.div>
  );
};

export default IframeView;
