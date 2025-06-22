import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    title: "Classic",
    price: "₹3500",
    subtitle: "Single Page Website",
    time: "24 Hours",
    features: [
      "Free Domain Name",
      "Free Web Hosting",
      "1 Page Responsive Design",
      "Google My Business",
      "Social Media Integration",
      "WhatsApp Button Integration",
      "Mobile Friendly Layout",
      "Basic SEO Optimization",
      "Digital Visiting Card",
    ],
    popular: false,
  },
  {
    title: "Standard",
    price: "₹4000",
    subtitle: "Multi Page Website 5 Pages",
    time: "24 Hours",
    features: [
      "Free Domain Name",
      "Free Web Hosting",
      "5 Page Responsive Design",
      "Google My Business",
      "Social Media Integration",
      "WhatsApp Button Integration",
      "Mobile Friendly Layout",
      "Basic SEO Optimization",
      "Digital Visiting Card",
    ],
    popular: false,
  },
  {
    title: "Premium",
    price: "₹6000",
    subtitle: "Premium Website 10 Pages",
    time: "24 Hours",
    features: [
      "Free Domain Name",
      "Free Web Hosting",
      "10 Page Responsive Design",
      "Online Service Booking",
      "Google My Business Support",
      "Payment Gateway",
      "Social Media Integration",
      "WhatsApp Button Integration",
      "Up to 10 Services Page",
      "Mobile Friendly Layout",
      "Standard SEO",
      "Digital Visiting Card",
    ],
    popular: true,
  },
];

const PricingSection = () => {
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const featureRefs = useRef([]);

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

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
    });

    const cubes = Array.from({ length: 200 }, () => {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, -Math.random() * 200);
      scene.add(cube);
      return cube;
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      cubes.forEach((c) => {
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

    const resizeHandler = () => {
      const newW = canvas.clientWidth;
      const newH = canvas.clientHeight;
      renderer.setSize(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const variants = [
      { x: "-100vw", y: 0, rotateZ: 8, skewX: 12 },
      { x: 0, y: "-100vh", rotateZ: -6, skewY: 8 },
      { x: "100vw", y: 0, rotateZ: 10, skewX: -12 },
    ];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const features = featureRefs.current[i] || [];

      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
        .fromTo(
          card,
          { opacity: 0, ...variants[i], scale: 0.6 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateZ: 0,
            skewX: 0,
            skewY: 0,
            scale: 1,
            duration: 1.4,
            ease: "expo.out",
          }
        )
        .fromTo(
          features,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=1.0"
        )
        .fromTo(
          card.querySelector(".choose-button"),
          { opacity: 0, y: 60, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
    });
  }, []);

  return (
    <section className="relative py-24 px-4 bg-black text-white overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-6">
        We give you best <br /> Price Table Package
      </h2>
      <p className="text-center text-lg text-gray-300 mb-4">
        Best Plan for Website Design & Branding & Business Presence
      </p>
      <div className="flex justify-center gap-6 text-cyan-400 font-semibold text-base mt-2 mb-14">
        <a href="#design" className="hover:text-blue-400 transition">
          Combo Website Designing
        </a>
        <a href="#renew" className="hover:text-blue-400 transition">
          Combo Website Renewal
        </a>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="w-full sm:w-[45%] lg:w-[30%] bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-2xl flex flex-col justify-between"
          >
            {plan.popular && (
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full mb-2 uppercase tracking-wide shadow-md">
                Popular
              </div>
            )}
            <div>
              <div className="text-xl font-bold mb-1">{plan.title}</div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-1">
                {plan.price}
              </div>
              <div className="text-gray-400 text-sm">{plan.subtitle}</div>
              <div className="text-gray-500 text-xs mb-3">{plan.time}</div>

              <ul className="mt-4 space-y-1 text-gray-300 text-sm">
                {plan.features.map((f, j) => {
                  if (!featureRefs.current[i]) featureRefs.current[i] = [];
                  return (
                    <li key={j} ref={(el) => (featureRefs.current[i][j] = el)}>
                      {f}
                    </li>
                  );
                })}
              </ul>
            </div>

            <button className="choose-button mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition">
              Choose this plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
