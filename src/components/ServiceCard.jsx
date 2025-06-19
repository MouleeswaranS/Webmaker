import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

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
    if (inView && cardRef.current && !hasAnimatedIn) {
      const delay = row * 0.25 + col * 0.15;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          delay,
          ease: "power4.out",
        }
      );

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 30,
        delay: delay + 0.2,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        x: -60,
        delay: delay + 0.4,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(descRef.current, {
        opacity: 0,
        x: 60,
        delay: delay + 0.55,
        duration: 1,
        ease: "expo.out",
        onComplete: () => setHasAnimatedIn(true),
      });
    }
  }, [inView, hasAnimatedIn]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -8,
      boxShadow: "0 0 25px rgba(0, 255, 255, 0.35)",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
      duration: 0.4,
      ease: "power3.out",
      clearProps: "scale,y,boxShadow",
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
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        willChange: "transform, box-shadow, opacity",
        opacity: 0,
      }}
    >
      <img
        ref={imageRef}
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
        <h3
          ref={titleRef}
          style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          {service?.title}
        </h3>
        <p
          ref={descRef}
          style={{ fontSize: "1rem", color: "#ccc", lineHeight: "1.6" }}
        >
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
