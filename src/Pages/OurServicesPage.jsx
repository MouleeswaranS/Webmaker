// Pages/OurServicesPage.jsx
import React, { useEffect, useRef } from "react";
import serviceData from "../Data/serviceData";
import ServiceCard from "../components/ServiceCard";
import { useLocation } from "react-router-dom";

const OurServicesPage = () => {
  const cardSectionRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromDetail === true) {
      cardSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="overflow-hidden bg-black text-white">
      <h2 className="text-4xl font-bold text-center pt-20 pb-10">Our Services</h2>

      <section
        ref={cardSectionRef}
        className="py-12 px-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      >
        {serviceData.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            col={index % 3}
            row={Math.floor(index / 3)}
          />
        ))}
      </section>
    </div>
  );
};

export default OurServicesPage;
