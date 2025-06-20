import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const plans = [
  { title: "Starter", price: "₹3,000", features: ["Responsive Single Page", "Free Domain (1 Yr)", "Hosting (1 Yr)"], popular: false },
  { title: "Professional", price: "₹6,000", features: ["All Starter Features", "Google My Business", "Digital Visiting Card", "SEO Optimized"], popular: true },
  { title: "Ultimate", price: "₹12,000", features: ["Everything in Pro", "Blog Integration", "Custom Animations", "Priority Support"], popular: false },
];

const PricingSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .pricing-section {
        position: relative;
        overflow: hidden;
        background: #000;
        color: white;
        padding: 8rem 1rem 6rem;
        text-align: center;
      }

      canvas.fly-bg {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        z-index: 0;
      }

      .gradient-heading {
        font-size: 2.8rem;
        font-weight: 800;
        position: relative;
        display: inline-block;
        color: transparent;
        background-image: linear-gradient(90deg, #ff6ec4, #7873f5);
        -webkit-background-clip: text;
        background-clip: text;
        margin-bottom: 1rem;
      }

      .gradient-heading::after {
        content: '';
        position: absolute;
        top: 0; left: -75%;
        height: 100%;
        width: 50%;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
        transform: skewX(-20deg);
        animation: shimmer 2.5s infinite;
      }

      @keyframes shimmer {
        0% { left: -75%; }
        100% { left: 125%; }
      }

      .pricing-subtitle {
        font-size: 1.2rem;
        color: #ccc;
        margin-bottom: 1rem;
      }

      .pricing-links a {
        margin: 0 1rem;
        color: #ff6ec4;
        font-weight: 600;
        text-decoration: underline;
      }

      .pricing-cards {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        max-width: 1200px;
        margin: 3rem auto 0;
        padding: 0 1rem;
      }

      @media(min-width:768px){ .pricing-cards { grid-template-columns:repeat(3,1fr); } }

      @keyframes gradientShift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      .pricing-card {
        background: linear-gradient(135deg, #09FFD6FF, #02335DFF, #5F0462FF, #150DFAFF);
        background-size: 300% 300%;
        animation: gradientShift 10s ease infinite;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        padding: 2rem;
        backdrop-filter: blur(10px);
        transition: transform 0.3s, box-shadow 0.3s;
        transform-style: preserve-3d;
        transform-origin: center;
        position: relative;
        overflow: hidden;
      }

      .pricing-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      }

      .pricing-card::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.4);
        border-radius: inherit;
        z-index: 0;
      }

      .pricing-card > * {
        position: relative;
        z-index: 1;
      }

      .popular-badge {
        position: absolute;
        top: -12px;
        right: 16px;
        background: #00c897;
        color: white;
        padding: 0.3rem 0.7rem;
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 999px;
      }

      .plan-title {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }

      .plan-price {
        font-size: 2rem;
        margin-bottom: 1rem;
        font-weight: 800;
      }

      .feature-list {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;
        color: #fff;
      }

      .feature-item {
        margin-bottom: 0.6rem;
      }

      .choose-button {
        background: linear-gradient(to right, #00b894, #00cec9);
        padding: 1rem;
        border: none;
        color: #fff;
        font-weight: 600;
        border-radius: 12px;
        width: 100%;
        cursor: pointer;
        transition: transform 0.3s;
      }

      .choose-button:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.fromTo(
          cardsRef.current,
          {
            opacity: 0,
            scale: 0.5,
            y: 100,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.2,
          }
        );
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    const cubeCount = 200;
    const cubes = [];
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 0.5 });

    for (let i = 0; i < cubeCount; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, -Math.random() * 200);
      scene.add(cube);
      cubes.push(cube);
    }

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach(c => {
        c.position.z += 0.5;
        if (c.position.z > 10) {
          c.position.z = -200;
          c.position.x = (Math.random() - 0.5) * 50;
          c.position.y = (Math.random() - 0.5) * 30;
        }
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section ref={sectionRef} className="pricing-section">
      <canvas ref={canvasRef} className="fly-bg" />
      <h2 className="gradient-heading">We give you best <br /> Price Table Package</h2>
      <p className="pricing-subtitle">Best Plan for Website Design & Branding & Business Presence</p>
      <div className="pricing-links">
        <a href="#design">Combo Website Designing</a>
        <a href="#renew">Combo Website Renewal</a>
      </div>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} className="pricing-card" ref={el => (cardsRef.current[index] = el)}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <div className="plan-title">{plan.title}</div>
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
