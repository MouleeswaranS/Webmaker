import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Cursor from "./components/Cursor";
import Loading from "./components/Loading";
import ServiceDetail from "./components/ServiceDetail";
import PortfolioSection from "./components/PortfolioSection";
import PricingSection from "./components/PricingSection";
import ShopSection from "./components/ShopSection";
import ContactUs from "./components/ContactUs";

import AboutPage from "./Pages/AboutPage";
import OurServicesPage from "./Pages/OurServicesPage";
import serviceData from "./Data/serviceData";
import ServiceSection from "./components/ServiceSection";
import PricingPage from "./Pages/PricingPage";
import ShopPage from "./Pages/ShopPage"; // ✅ Added
import ContactPage from "./Pages/ContactPage"; // ✅ Added

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]); // ✅ Trigger loader on route change

  return (
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
                  <ServiceSection services={serviceData} />
                  <PortfolioSection />
                  <PricingSection />
                  <ShopSection /> {/* ✅ Home also shows shop */}
                  < ContactUs  />
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<OurServicesPage />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<PortfolioSection />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/shop" element={<ShopPage />} /> {/* ✅ Dedicated shop page */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </>
      )}
    </main>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}