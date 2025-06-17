import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SecondSection from "./components/SecondSection";
import Cursor from "./components/Cursor";
import Loading from "./components/Loading";

import ServiceDetail from "./components/ServiceDetail";
import ServiceCard from "./components/ServiceCard";
import serviceData from "./Data/serviceData";
import VantaHaloBackground from "./components/VantaHaloBackground";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <main>
        <Cursor />
        {loading && <Loading />}

        {!loading && (
          <>
            <Navbar />

            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <SecondSection />

        <section
  style={{
    position: "relative",
    overflow: "hidden",
    padding: "5rem 2rem",
    minHeight: "100vh",
    color: "white",
  }}
>
  <VantaHaloBackground />

  <h2
    style={{
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "3rem",
      position: "relative",
      zIndex: 1,
    }}
  >
    Our Services
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    }}
  >
    {serviceData.map((service, index) => (
      <ServiceCard key={service.id} service={service} index={index} />
    ))}
  </div>
</section>

                  </>
                }
              />

              {/* Service Detail Page */}
              <Route path="/services/:id" element={<ServiceDetail />} />
            </Routes>
          </>
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
