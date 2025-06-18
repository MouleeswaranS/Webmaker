import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);

  const col = index % 3;
  const row = Math.floor(index / 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.4 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && cardRef.current) {
      const delay = row * 0.3 + col * 0.15;
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay,
          ease: "power3.out",
        }
      );
    }
  }, [inView]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap.to(cardRef.current, {
      x: 0,
      y: -100,
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => navigate(`/services/${service.id}`),
    });
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
        background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.1))`,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "white",
        cursor: "pointer",
        height: "100%",
        transition: "transform 0.3s ease",
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* ✅ Thumbnail image added */}
      <img
        src={service?.image}
        alt={service?.title}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "0.75rem",
          marginBottom: "1rem",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      />

      <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        {service?.title}
      </h3>
      <p style={{ opacity: 0.85, lineHeight: 1.6 }}>
        {service?.description?.slice(0, 90)}...
      </p>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
