import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import plans from "../Data/plans";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    // Inject styles
    const style = document.createElement("style");
    style.innerHTML = `
      .pricing-section {
        padding: 8rem 1rem 6rem;
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
        background-size: 400% 400%;
        animation: gradientWave 20s ease infinite;
        color: #333;
      }

      @keyframes gradientWave {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .pricing-title {
        font-size: 3rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 0.5rem;
        color: #222;
        z-index: 2;
        position: relative;
      }

      .pricing-subtitle {
        text-align: center;
        font-size: 1.25rem;
        margin-bottom: 3rem;
        color: #444;
        z-index: 2;
        position: relative;
      }

      .pricing-cards {
        display: grid;
        gap: 2rem;
        grid-template-columns: repeat(3, 1fr);
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        position: relative;
        z-index: 2;
      }

      .pricing-card {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
        justify-content: space-between;
        color: #222;
        position: relative;
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
      }

      .plan-title {
        font-size: 1.8rem;
        font-weight: 700;
        color: #111;
        text-align: center;
      }

      .plan-price {
        font-size: 2.4rem;
        font-weight: 800;
        color: #333;
        text-align: center;
      }

      .plan-description {
        font-size: 1rem;
        color: #444;
        text-align: center;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
        flex: 1;
      }

      .feature-item {
        font-size: 1rem;
        color: #555;
        text-align: center;
        margin-bottom: 0.5rem;
      }

      .choose-button {
        background: linear-gradient(to right, #00f2fe, #4facfe);
        border: none;
        padding: 1rem 1.2rem;
        width: 100%;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 600;
        color: #111;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .choose-button:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);

    const title = sectionRef.current.querySelector(".pricing-title");
    const subtitle = sectionRef.current.querySelector(".pricing-subtitle");

    const loopTextAnimation = () => {
      const tl = gsap.timeline();
      tl.set(title, { y: "-100vh", opacity: 0 })
        .set(subtitle, { y: "100vh", opacity: 0 })
        .to(title, {
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out",
        })
        .to(subtitle, {
          y: 0,
          opacity: 1,
          duration: 1.6,
          ease: "power4.out"
        }, "-=1.3")
        .to({}, { duration: 4.5 })
        .to(title, {
          y: "-100vh",
          opacity: 0,
          duration: 1.4,
          ease: "power2.in"
        })
        .to(subtitle, {
          y: "100vh",
          opacity: 0,
          duration: 1.4,
          ease: "power2.in",
          onComplete: loopTextAnimation
        }, "-=1.2");
    };

    const runCardLoop = () => {
      cardsRef.current.forEach((card, index) => {
        const directions = [
          { x: "-120vw", opacity: 0 },
          { y: "-120vh", opacity: 0 },
          { x: "120vw", opacity: 0 },
        ];
        const from = directions[index % directions.length];

        const animateCard = () => {
          const tl = gsap.timeline();

          tl.set(card, from)
            .to(card, {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: "power4.out",
            })
            .fromTo(card.querySelector(".plan-title"), { y: -50, opacity: 0 }, {
              y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }, "-=1.0")
            .fromTo(card.querySelector(".plan-price"), { x: -80, opacity: 0 }, {
              x: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }, "-=0.8")
            .fromTo(card.querySelector(".plan-description"), { x: 80, opacity: 0 }, {
              x: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }, "-=0.8")
            .fromTo(card.querySelectorAll(".feature-item"), { y: 40, opacity: 0 }, {
              y: 0, opacity: 1, stagger: 0.1, duration: 0.6
            }, "-=0.6")
            .fromTo(card.querySelector(".choose-button"), { y: 60, opacity: 0 }, {
              y: 0, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)"
            }, "-=0.4")
            .to({}, { duration: 4 })
            .to(card, {
              ...from,
              opacity: 0,
              duration: 1.6,
              ease: "power3.in",
              onComplete: animateCard
            });

          return tl;
        };

        animateCard();
      });
    };

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: false,
      onEnter: () => {
        loopTextAnimation();
        runCardLoop();
      },
    });
  }, []);

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 40 },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.1 },
            color: { value: ["#ffffff", "#ffd166", "#00f2fe"] },
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
            <button className="choose-button">
              {plan.buttonText || "Start Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
