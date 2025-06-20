import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const plans = [
  {
    title: "Starter",
    price: "₹3,000",
    features: [
      "Responsive Single Page",
      "Free Domain (1 Yr)",
      "Hosting (1 Yr)",
    ],
    popular: false,
  },
  {
    title: "Professional",
    price: "₹6,000",
    features: [
      "All Starter Features",
      "Google My Business",
      "Digital Visiting Card",
      "SEO Optimized",
    ],
    popular: true,
  },
  {
    title: "Ultimate",
    price: "₹12,000",
    features: [
      "Everything in Pro",
      "Blog Integration",
      "Custom Animations",
      "Priority Support",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [visible, setVisible] = useState(false);

  // Initialize tsparticles
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .pricing-section {
        padding: 8rem 1rem 6rem;
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #fefefe, #f5f7fa);
        color: #111;
      }

      .animated-background {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle at 30% 30%, #ff9ff3, #feca57, #48dbfb, #1dd1a1);
        background-size: 400% 400%;
        animation: gradientAnimation 25s ease infinite;
        z-index: -1;
        filter: blur(80px);
        opacity: 0.12;
      }

      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .pricing-title {
        font-size: 2.8rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 0.5rem;
        color: #222;
      }

      .pricing-subtitle {
        text-align: center;
        font-size: 1.3rem;
        margin-bottom: 3rem;
        color: #555;
      }

      .pricing-cards {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      @media (min-width: 768px) {
        .pricing-cards {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .pricing-card {
        background: #fff;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        transition: transform 0.4s ease, box-shadow 0.4s ease;
        position: relative;
        border: 1px solid #eee;
        will-change: transform;
        perspective: 1000px;
      }

      .pricing-card:hover {
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      }

      .popular-badge {
        position: absolute;
        top: -12px;
        right: 16px;
        background: #00c897;
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .plan-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.7rem;
      }

      .plan-price {
        font-size: 2.2rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        color: #222;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem 0;
      }

      .feature-item {
        margin-bottom: 0.8rem;
        font-size: 1rem;
        color: #444;
      }

      .choose-button {
        background: linear-gradient(to right, #00b894, #00cec9);
        border: none;
        padding: 1rem 1.2rem;
        width: 100%;
        border-radius: 12px;
        font-size: 1.2rem;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .choose-button:hover {
        background: linear-gradient(to left, #00b894, #00cec9);
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();

          gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 100, scale: 0.9, rotateX: 15 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1.5,
              ease: "elastic.out(1, 0.6)",
              stagger: 0.4,
            }
          );
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    };

    sectionRef.current.addEventListener("mousemove", handleMouseMove);
    sectionRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      sectionRef.current?.removeEventListener("mousemove", handleMouseMove);
      sectionRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="animated-background"></div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 30 },
            size: { value: 3 },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.4 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
          },
        }}
        style={{ position: "absolute", inset: 0, zIndex: -1 }}
      />

      <h2 className="pricing-title">Affordable Pricing</h2>
      <p className="pricing-subtitle">
        Transparent plans tailored for your business growth.
      </p>

      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="pricing-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3 className="plan-title">{plan.title}</h3>
            <div className="plan-price">{plan.price}</div>
            <ul className="feature-list">
              {plan.features.map((feature, i) => (
                <li key={i} className="feature-item">{feature}</li>
              ))}
            </ul>
            <button className="choose-button">Choose Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
