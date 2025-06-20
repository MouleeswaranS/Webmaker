import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Float,
  Box,
  Sparkles,
} from "@react-three/drei";
import serviceData from "../Data/serviceData";
import ServiceCard from "./ServiceCard";

const HologramBackground = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 0,
    }}
  >
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={50} depth={40} count={1000} factor={4} fade />
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Box args={[2, 2, 2]}>
          <meshStandardMaterial
            emissive="#00ffff"
            color="#ffffff"
            metalness={0.6}
            roughness={0.1}
          />
        </Box>
      </Float>
      <Sparkles count={100} speed={0.5} size={5} color="#00ffff" />
      <OrbitControls autoRotate enableZoom={false} />
    </Canvas>
  </div>
);

const ServiceSection = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "3rem 1rem",
        backgroundColor: "black",
        color: "white",
        zIndex: 1,
      }}
    >
      <HologramBackground />

      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        Our Services
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem", // Slightly increased gap
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {serviceData.map((service, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          return (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              col={col}
              row={row}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ServiceSection;
