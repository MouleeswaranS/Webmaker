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

      @keyframes floatUp {
        0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
      }

      .glow-ribbon {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 30%, rgba(0,255,255,0.4) 60%, transparent 80%),
                    linear-gradient(120deg, #00ffff, #ff00cc, #ffcc00, #00ffff);
        background-size: 300% 300%;
        animation: glowingRibbon 18s ease-in-out infinite;
        opacity: 0.15;
        filter: blur(80px);
        mix-blend-mode: screen;
        z-index: 0;
      }

      .particle {
        position: absolute;
        background: rgba(255, 255, 255, 0.08);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        animation: floatUp 14s linear infinite;
        pointer-events: none;
      }

      .gradient-button {
        display: inline-block;
        padding: 0.85rem 1.5rem;
        background-color: #00f0ff;
        color: #000;
        border-radius: 10px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        box-shadow: 0 0 18px #00f0ff, 0 0 28px #ff00cc;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
      }

      .gradient-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 200%;
        height: 100%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: all 0.5s;
      }

      .gradient-button:hover::after {
        left: 100%;
      }

      .gradient-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 24px #00f0ff, 0 0 34px #ff00cc;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!service) {
    return (
      <div className="text-center text-red-500 py-20">Service not found!</div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0b0b0c",
        padding: "6rem 1.5rem 3rem",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div className="glow-ribbon" />

      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 8rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(20px)",
            padding: "3rem",
            borderRadius: "1.5rem",
            maxWidth: "850px",
            width: "100%",
            boxShadow: "0 0 80px rgba(0,255,255,0.05)",
          }}
        >
          {/* Title with outside slide-in from left */}
          <motion.h1
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: "2.75rem",
              marginBottom: "1.5rem",
              color: "#00ffff",
              fontWeight: 700,
              position: "relative",
            }}
          >
            {service.title}
          </motion.h1>

          {/* Paragraph sliding up from bottom */}
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
            style={{ fontSize: "1.2rem", marginBottom: "2rem", lineHeight: "1.8" }}
          >
            {service.description}
          </motion.p>

          {/* Benefits Title */}
          <motion.h3
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
            style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#ff99ff", fontWeight: 600 }}
          >
            Customer Benefits
          </motion.h3>

          {/* Benefits List */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            style={{ marginBottom: "2.5rem", paddingLeft: "1rem" }}
          >
            {service.benefits.map((benefit, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ marginBottom: "0.75rem", fontSize: "1rem" }}
              >
                🌟 {benefit}
              </motion.li>
            ))}
          </motion.ul>

          {/* Button scale in smoothly */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.9, ease: "easeOut" }}
          >
            <Link to="/" className="gradient-button">
              ⬅ Back to Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceDetail;
