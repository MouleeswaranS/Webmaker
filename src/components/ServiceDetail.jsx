import React from "react";
import { useParams, Link } from "react-router-dom";
import serviceData from "../Data/serviceData";
import { motion } from "framer-motion";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData.find((item) => item.id === parseInt(id));

  if (!service) {
    return <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>Service not found!</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        padding: "4rem 2rem",
        background: "#f9f9ff",
        color: "#333",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{service.title}</h1>
        <p style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>{service.description}</p>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Customer Benefits:</h3>
        <ul style={{ marginBottom: "2rem" }}>
          {service.benefits.map((benefit, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>✅ {benefit}</li>
          ))}
        </ul>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#6366f1",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ⬅ Back to Services
        </Link>
      </div>
    </motion.section>
  );
};

export default ServiceDetail;
