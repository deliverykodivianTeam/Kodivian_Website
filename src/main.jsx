import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Adjust the path if needed
import LoadingPage from './components/LoadingPage.jsx'; // Make sure the path is correct

const root = createRoot(document.getElementById('root'));

const RootComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Simulate 2 seconds of loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <StrictMode>
      {isLoading ? <LoadingPage /> : <App />}
    </StrictMode>
  );
};

root.render(<RootComponent />);
