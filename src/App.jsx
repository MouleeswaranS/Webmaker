import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SecondSection from "./components/SecondSection";
import Cursor from "./components/Cursor";
import Loading from "./components/Loading";
import ServiceDetail from "./components/ServiceDetail";
import ServiceSection from "./components/ServiceSection";

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
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <SecondSection />
                    <ServiceSection /> {/* ✅ Use directly here */}
                  </>
                }
              />
              <Route path="/services/:id" element={<ServiceDetail />} />
            </Routes>
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
