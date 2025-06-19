import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const col = index % 3;
  const row = Math.floor(index / 3);

  // Intersection Observer
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

  // Cool GSAP animation
  useEffect(() => {
    if (inView && cardRef.current && !hasAnimatedIn) {
      const delay = row * 0.2 + col * 0.1;

      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 60,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
          onComplete: () => setHasAnimatedIn(true),
        }
      );
    }
  }, [inView, hasAnimatedIn]);

  // Optional subtle glow on hover
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.08)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => navigate(`/services/${service.id}`),
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        margin: "2rem auto",
        width: "100%",
        maxWidth: "620px",
        backgroundColor: "#1f1f1f",
        color: "#fff",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        opacity: 0,
      }}
    >
      <img
        src={service?.image}
        alt={service?.title}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
          {service?.title}
        </h3>
        <p style={{ fontSize: "1rem", color: "#ccc", lineHeight: "1.6" }}>
          {service?.description?.slice(0, 160)}...
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
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ServiceCard;
