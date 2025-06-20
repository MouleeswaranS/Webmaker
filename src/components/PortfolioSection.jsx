import React, { useEffect, useRef, useState } from "react";
import portfolioData from "../data/portfolioData";
import PortfolioCard from "./PortfolioCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const motionVariants = [
  { y: 150, opacity: 0 },                      // 1. Fade up
  { x: -300, opacity: 0 },                     // 2. Left slide-in
  { x: 300, opacity: 0 },                      // 3. Right slide-in
  { scale: 0.85, opacity: 0 },                 // 4. Zoom-in clean
  { rotation: -10, x: -200, opacity: 0 },      // 5. Rotate in from left
  { rotation: 10, x: 200, opacity: 0 },        // 6. Rotate in from right
  { scale: 0.5, opacity: 0 },                  // 7. Zoom from small
  { scale: 1.5, opacity: 0 },                  // 8. Zoom from large
  { rotation: -45, x: -800, opacity: 0 },      // 9. Spin left
  { rotation: 45, x: 800, opacity: 0 },        // 10. Spin right
  { rotationY: 90, opacity: 0 },               // 11. Y rotate
  { rotationX: 90, opacity: 0 },               // 12. X rotate
  { xPercent: -200, opacity: 0 },              // 13. Off-screen left %
  { xPercent: 200, opacity: 0 },               // 14. Off-screen right %
];

const PortfolioSection = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All Websites");

  const categories = [
    "All Websites",
    "Multi Page Websites",
    "Single Page Websites",
    "Ecommerce Websites",
  ];

  const filteredData = portfolioData.filter(
    (item) => activeCategory === "All Websites" || item.category === activeCategory
  );

  useEffect(() => {
    const slides = gsap.utils.toArray(".portfolio-slide");
    const gridWrapper = document.querySelector(".portfolio-grid-wrapper");

    slides.forEach((slide, i) => {
      const variant = motionVariants[i % motionVariants.length];

      gsap.fromTo(
        slide,
        variant,
        {
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: slide,
            start: "top center+=50",
            end: "bottom center",
            toggleActions: "play reverse play reverse",
            scrub: true,
          },
        }
      );
    });

    gsap.to(gridWrapper, {
      opacity: 1,
      pointerEvents: "auto",
      scrollTrigger: {
        trigger: slides[slides.length - 1],
        start: "bottom center",
        end: "bottom+=300 center",
        toggleActions: "play none none reverse",
        scrub: true,
      },
    });

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        snap: 1 / (filteredData.length - 1),
        scrub: 0.4,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [filteredData.length]);

  return (
    <section
      ref={containerRef}
      className="bg-black w-full relative overflow-hidden"
    >
      <h2 className="text-5xl font-bold text-white text-center pt-16 pb-6 z-10 relative">
        My Portfolio
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 flex-wrap mb-12 z-10 relative">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
              ${activeCategory === cat
                ? "bg-white text-black"
                : "bg-gray-800 text-white hover:bg-gray-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scroll-driven Cards */}
      <div className="relative">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="portfolio-slide min-h-screen flex items-center justify-center z-0"
            style={{
              zIndex: 100 - index,
              paddingTop: "4rem",
              paddingBottom: "4rem",
            }}
          >
            <PortfolioCard item={item} />
          </div>
        ))}
      </div>

      {/* Final Grid View */}
      <div className="portfolio-grid-wrapper opacity-0 pointer-events-none min-h-screen flex items-center justify-center transition-all duration-1000">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
          {filteredData.map((item, index) => (
            <div key={index} className="w-full h-full">
              <PortfolioCard item={item} isGrid />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
