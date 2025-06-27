import React, { useState, useEffect } from "react";
import PricingSection from "../components/PricingSection";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Cursor from "../components/Cursor";

const PricingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="overflow-x-hidden bg-black text-white">
      <Cursor />
      {loading && <div id="preloader"><Loading /></div>}
      {!loading && (
        <>
          <Navbar loading={false} />
          <PricingSection />
        </>
      )}
    </main>
  );
};

export default PricingPage;
