// pages/PortfolioPage.jsx
import React, { useEffect, useRef, useState } from "react";
import PortfolioData from "../Data/PortfolioData";
import PortfolioCard from "../components/PortfolioCard";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cursor from "../components/Cursor";
import Loading from "../components/Loading";

const PortfolioPage = () => {
  const sectionRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (location.state?.fromNav || location.state?.reloadKey) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="overflow-x-hidden bg-black text-white">
      <Cursor />
      {loading && <div id="preloader"><Loading /></div>}
      {!loading && (
        <>
          <Navbar loading={loading} />
          <h2 className="text-4xl font-bold text-center pt-20 pb-10">Our Portfolio</h2>
          <section
            ref={sectionRef}
            className="py-12 px-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          >
            {PortfolioData.map((item, index) => (
              <PortfolioCard key={index} item={item} isGrid={true} />
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default PortfolioPage;
