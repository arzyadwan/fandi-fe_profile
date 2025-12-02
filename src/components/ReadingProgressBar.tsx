// src/components/ReadingProgressBar.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const isArticleDetailPage = location.pathname.startsWith('/articles/'); 

  const handleScroll = () => {
    if (!isArticleDetailPage) return;

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (totalHeight > 0) {
      const newProgress = (scrolled / totalHeight) * 100;
      setProgress(newProgress);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isArticleDetailPage]);

  if (!isArticleDetailPage) return null;

  return (
    // Wadah absolute untuk menempel di bagian bawah Header
    <div className="absolute bottom-0 left-0 right-0 h-1"> 
      <div 
        className="h-full bg-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-100 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ReadingProgressBar;