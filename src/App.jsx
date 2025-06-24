import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Cursor from "./components/Cursor";
import Loading from "./components/Loading";
import ServiceDetail from "./components/ServiceDetail";
import ServiceSection from "./components/ServiceSection";
import PortfolioSection from "./components/PortfolioSection";
import PricingSection from "./components/PricingSection";

import AboutPage from "./Pages/AboutPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <main className="bg-black text-white overflow-x-hidden">
        <Cursor />
        {loading && <Loading />}
        {!loading && (
          <>
            <ScrollToTop />
            <Navbar loading={loading} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <AboutSection />
                    <ServiceSection />
                    <PortfolioSection />
                    <PricingSection />
                  </>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
            </Routes>
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
