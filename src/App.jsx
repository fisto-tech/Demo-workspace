import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WebsiteProvider } from './context/WebsiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { FiMaximize, FiArrowUp } from 'react-icons/fi';
import Preloader from './components/Preloader';
import logoImg from './assets/logo.webp';

const FullScreenToggle = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button 
      onClick={toggleFullScreen}
      className="fixed bottom-2 right-2 p-2 z-[9999] opacity-0 hover:opacity-20 transition-opacity duration-300 cursor-pointer text-gray-500"
      title="Developer Fullscreen Mode"
    >
      <FiMaximize size={16} />
    </button>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 z-[100] bg-primary text-background rounded-full shadow-lg transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
      title="Back to Top"
    >
      <FiArrowUp size={20} />
    </button>
  );
};



function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasAccess, setHasAccess] = React.useState(
    localStorage.getItem('site_access') === 'true'
  );
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setHasAccess(true);
      localStorage.setItem('site_access', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111111] p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <img src={logoImg} alt="Logo" className="h-16 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </div>
          <h2 className="text-2xl font-bold text-center text-textPrimary mb-6">Protected Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-[#050505] border border-white/10 rounded-xl text-textPrimary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dark text-background font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              Access Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <WebsiteProvider>
        <HashRouter>
          {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
          <div className="flex flex-col min-h-screen bg-background relative">
            <Navbar />
            <div className="flex-grow">
              <AppRoutes />
            </div>
            <Footer />
            <FullScreenToggle />
            <BackToTop />
          </div>
        </HashRouter>
      </WebsiteProvider>
    </AuthProvider>
  );
}

export default App;
