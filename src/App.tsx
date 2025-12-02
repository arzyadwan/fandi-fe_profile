// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "./SidebarContext";
import { ThemeProvider } from "./ThemeContext";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";

// Pages
import HomePage from "./pages/HomePage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import TagsPage from "./pages/TagsPage";
import ArchivesPage from "./pages/ArchivesPage";
import AboutPage from "./pages/AboutPage";

// --- Utility: ScrollToTop ---
// Pastikan saat pindah halaman, scroll kembali ke posisi 0
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // State untuk Mobile Sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <ThemeProvider>
        <SidebarProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500/30">
            <div className="flex justify-center mx-auto">
              <div className="shrink-0">
                <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col relative mx-4">
                <Header setIsMenuOpen={setIsMenuOpen} />
                <main className="flex-grow w-full">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/articles" element={<ArticleListPage />} />
                    <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/tags" element={<TagsPage />} />
                    <Route path="/archives" element={<ArchivesPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </main>
              </div>
                 <RightSidebar />
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;