import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';
import Details from '../pages/Details';
import Login from '../pages/Login';
import IframeView from '../pages/IframeView';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/idc" element={<IframeView url="https://demo-idc-workspace.vercel.app/" />} />
        <Route path="/2d-3d-animation" element={<IframeView url="https://2-d-3-d-animation-demo-workspace.vercel.app/" />} />
        <Route path="/applications" element={<IframeView url="https://application-demo-workspace.vercel.app/" />} />
        <Route path="/ar-vr" element={<IframeView url="https://ar-vr-demo-workspace.vercel.app/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
