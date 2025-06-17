import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import PropTypes from "prop-types";
import ColorfulBackground from "./VantaHaloBackground";

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);

  const col = index % 3;

  // Entry trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Entry animation
  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [inView, index]);

  // Hover 3D tilt effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.07,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    const tl = gsap.timeline({
      onComplete: () => navigate(`/services/${service.id}`),
    });

    const exitAnim = {
      x: col === 0 ? -300 : col === 2 ? 300 : 0,
      scale: col === 1 ? 0 : 1,
      opacity: 0,
      duration: 0.6,
      ease: col === 1 ? "back.in(1.5)" : "power2.inOut",
    };

    tl.to(cardRef.current, exitAnim);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        padding: "1.5rem",
        borderRadius: "1.5rem",
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.1)),
          radial-gradient(circle at top left, rgba(255, 255, 255, 0.15), transparent 60%)
        `,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: `
          0 15px 35px rgba(0, 0, 0, 0.4),
          inset 0 0 30px rgba(255, 255, 255, 0.05),
          0 0 15px rgba(255, 255, 255, 0.05)
        `,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        color: "#fff",
        cursor: "pointer",
        height: "100%",
        transition: "transform 0.3s ease",
        willChange: "transform",
        transformOrigin: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Optional Glow Overlay */}
      <div
        style={{
          position: "absolute",
          top: "-40%",
          left: "-40%",
          width: "180%",
          height: "180%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          
          {service.title}
        </h3>
        <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
          {service.description.slice(0, 90)}...
        </p>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
