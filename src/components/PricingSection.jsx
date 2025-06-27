import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import plans from "../Data/plans";

const PricingSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [visible, setVisible] = useState(false);

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
        background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a18cd1);
        background-size: 600% 600%;
        animation: gradientWave 30s ease infinite;
        color: #111;
      }

      @keyframes gradientWave {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .light-streak {
        position: absolute;
        top: -20%;
        left: -60%;
        width: 220%;
        height: 200%;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 60%);
        transform: rotate(25deg);
        animation: streakMove 15s ease-in-out infinite;
        filter: blur(100px);
        z-index: 0;
        pointer-events: none;
      }

      @keyframes streakMove {
        0% { transform: translateX(-60%) rotate(25deg); opacity: 0.1; }
        50% { transform: translateX(10%) rotate(25deg); opacity: 0.2; }
        100% { transform: translateX(60%) rotate(25deg); opacity: 0.1; }
      }

      .pricing-title {
        font-size: 3rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 0.5rem;
        position: relative;
        z-index: 2;
        color: #fff;
      }

      .pricing-subtitle {
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 3rem;
        color: #f0f0f0;
        position: relative;
        z-index: 2;
      }

      .pricing-cards {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        position: relative;
        z-index: 2;
      }

      @media (min-width: 768px) {
        .pricing-cards {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .pricing-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.25);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transform-style: preserve-3d;
      }

      .pricing-card:nth-child(2) {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.4);
      }

      .pricing-card:nth-child(3) {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .popular-badge {
        position: absolute;
        top: -12px;
        right: 16px;
        background: #ff6b6b;
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 0.3rem 0.7rem;
        border-radius: 999px;
        z-index: 2;
      }

      .plan-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
      }

      .plan-price {
        font-size: 2.2rem;
        font-weight: 800;
        color: #ffd166;
      }

      .plan-description {
        font-size: 1rem;
        color: #f0f0f0;
        line-height: 1.5;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .feature-item {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #eee;
      }

      .choose-button {
        background: linear-gradient(to right, #00f2fe, #4facfe);
        border: none;
        padding: 1rem 1.2rem;
        width: 100%;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .choose-button:hover {
        background: linear-gradient(to left, #00f2fe, #4facfe);
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();

          cardsRef.current.forEach((card, index) => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: index * 0.2 });

            tl.from(card, {
              y: -150,
              opacity: 0,
              duration: 1.2,
              ease: "power4.out"
            })
            .from(card.querySelector(".plan-title"), {
              opacity: 0,
              y: 40,
              duration: 0.4,
            }, "-=0.6")
            .from(card.querySelector(".plan-price"), {
              opacity: 0,
              y: 40,
              duration: 0.4,
            }, "-=0.5")
            .from(card.querySelector(".plan-description"), {
              opacity: 0,
              y: 40,
              duration: 0.4,
            }, "-=0.4")
            .from(card.querySelectorAll(".feature-item"), {
              opacity: 0,
              y: 30,
              stagger: 0.08,
              duration: 0.3,
            }, "-=0.3")
            .from(card.querySelector(".choose-button"), {
              opacity: 0,
              scale: 0.9,
              duration: 0.4,
            }, "-=0.2");
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <div className="light-streak" />
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 20 },
            size: { value: 3 },
            move: { enable: true, speed: 0.4 },
            opacity: { value: 0.15 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
          },
        }}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      <h2 className="pricing-title">Simple Pricing, Standout Result</h2>
      <p className="pricing-subtitle">
        Start small, grow fast. Our pricing is as efficient as your sales team should be.
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
            <p className="plan-description">{plan.description}</p>
            <ul className="feature-list">
              {plan.features.map((feature, i) => (
                <li key={i} className="feature-item">{feature}</li>
              ))}
            </ul>
            <button className="choose-button">{plan.buttonText || "Start Plan"}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
