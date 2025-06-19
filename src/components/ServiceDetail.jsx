import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import serviceData from "../Data/serviceData";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData.find((item) => item.id === parseInt(id));

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes glowingRibbon {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .glow-ribbon {
        position: absolute;
        inset: 0;
        z-index: 0;
        background: radial-gradient(ellipse at center, transparent 30%, rgba(0,255,255,0.4) 60%, transparent 80%),
                    linear-gradient(120deg, #00ffff, #ff00cc, #ffcc00, #00ffff);
        background-size: 300% 300%;
        animation: glowingRibbon 15s ease-in-out infinite;
        opacity: 0.3;
        filter: blur(40px);
        mix-blend-mode: screen;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!service) {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        Service not found!
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "6rem 1.5rem 2rem",
        overflow: "hidden",
        color: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#0c0c0c",
      }}
    >
      {/* Glowing animated background */}
      <div className="glow-ribbon" />

      {/* Centered container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 8rem)", // adjusts for nav height
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            width: "100%",
            padding: "2.5rem",
            background: "rgba(0, 0, 0, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "1.25rem",
            boxShadow: "0 0 40px rgba(0, 255, 255, 0.05)",
            backdropFilter: "blur(16px)",
          }}
        >
          <h1 style={{ fontSize: "2.75rem", marginBottom: "1rem", color: "#00ffff" }}>
            {service.title}
          </h1>

          <p style={{ fontSize: "1.15rem", marginBottom: "2rem", lineHeight: "1.8" }}>
            {service.description}
          </p>

          <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#ff99ff" }}>
            Customer Benefits
          </h3>

          <ul style={{ marginBottom: "2.5rem", paddingLeft: "1rem" }}>
            {service.benefits.map((benefit, i) => (
              <li key={i} style={{ marginBottom: "0.75rem", fontSize: "1rem" }}>
                🌟 {benefit}
              </li>
            ))}
          </ul>

          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "0.85rem 1.5rem",
              backgroundColor: "#00f0ff",
              color: "#000",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 0 12px #00f0ff",
              transition: "transform 0.25s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⬅ Back to Services
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceDetail;
