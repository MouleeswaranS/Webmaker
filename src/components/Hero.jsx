import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import googleLogo from "../assets/Google2.jpg";
import noteImg from "../assets/Notes1.png";
import penImg from "../assets/pen.png";
import highlighterImg from "../assets/highlighter.png";
import ipadImg from "../assets/Ipad.png";
import plantImg from "../assets/plant.png";

// Tech logos
import reactLogo from "../assets/image1.png";
import tailwindLogo from "../assets/image2.png";
import gsapLogo from "../assets/image3.png";
import framerLogo from "../assets/image4.png";

const HeroSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [bulletIndex, setBulletIndex] = useState(0);

  const titleRef = useRef(null);
  const bulletRef = useRef(null);
  const googleGroupRef = useRef(null);
  const noteRef = useRef(null);
  const penRef = useRef(null);
  const highlighterRef = useRef(null);
  const ipadRef = useRef(null);
  const plantRef = useRef(null);
  const carRef = useRef(null);
  const techOrbitRef = useRef(null);

  const slides = [
    {
      title: "Be Brave.",
      bullets: [
        "🌐 WEB DESIGNING",
        "🛒 E Commerce Development",
        "📍 GOOGLE MY BUSINESS",
        "📲 SOCIAL MEDIA MANAGEMENT",
      ],
      background: "bg-gradient-to-br from-green-700 to-lime-600",
      showGoogle: true,
    },
    {
      title: "Web Design",
      bullets: ["✨ Purposeful Design", "🎨 Pixel Precision", "🚀 Cinematic Delivery"],
      background: "bg-gradient-to-br from-blue-800 to-sky-600",
      showGoogle: true,
    },
  ];

  const currentSlide = slides[slideIndex ];

  useEffect(() => {
    const split = new SplitType(titleRef.current, { types: "chars" });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: "back.out(1.7)", 
    });

    gsap.to(split.chars, {
      backgroundImage:
        "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.9), rgba(255,255,255,0.1))",
      backgroundSize: "200% 100%", 
      backgroundClip: "text",
      textFillColor: "transparent",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      duration: 2,
      ease: "none",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });

    return () => split.revert();
  }, [slideIndex]);

  useEffect(() => {
    gsap.fromTo(
      bulletRef.current,
      { y: 200, opacity: 0, scale: 0.8, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)", 
        duration: 1.2,
        ease: "expo.out",
        onComplete: () => {
          gsap.to(bulletRef.current, {
            scale: 1.03,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut",
          });
        },
      }
    );

    const emoji = bulletRef.current.querySelector("span");

    if (emoji) {
      gsap.fromTo(
        emoji,
        { y: 0 },
        { y: -10, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 }
      );
    }

    const bulletTimer = setTimeout(() => {
      setBulletIndex((prev) => (prev + 1) % currentSlide.bullets.length);
    }, 4000);

    return () => clearTimeout(bulletTimer);
  }, [bulletIndex, slideIndex]);

  useEffect(() => {
    const slideTimer = setTimeout(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
      setBulletIndex(0);
    }, 10000);
    return () => clearTimeout(slideTimer);
  }, [slideIndex]);

  useEffect(() => {
    if (currentSlide.showGoogle && googleGroupRef.current) {
      gsap.fromTo(
        googleGroupRef.current,
        { x:"-150%",opacity: 0, rotation: -45 },
        { x: 0,opacity: 1, rotation: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [slideIndex]);

  useEffect(() => {
    if (!techOrbitRef.current) return;

    const orbit = techOrbitRef.current;
    gsap.killTweensOf(orbit);

    if (slideIndex !== 0) {
      gsap.fromTo(
        orbit,
        {opacity: 1, scale: 2},
        {
         opacity: 0,
          scale: 0.2,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => {
            gsap.fromTo(
              orbit,
              {opacity: 0, scale: 0.2, rotate: 0},
              {
               opacity: 1,
                scale: 2,
                rotate: 0,
                duration: 1.4,
                ease: "power4.out",
                delay: 0.4,
              }
            );

            gsap.to(orbit, {
              rotate: 360,
              duration: 40,
              repeat: -1,
              ease: "linear",
              transformOrigin: "50% 50%"
            });
          },
        }
      );
    } else {
      gsap.fromTo(
        orbit,
        {opacity: 0, scale: 0.2, rotate: -90},
        {opacity: 1, scale: 2, rotate: 0, duration: 1.8, ease: "power4.out", delay: 1.2}
      );

      gsap.to(orbit, {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%"
      });
    }
  }, [slideIndex]);

  useEffect(() => {
    if (noteRef.current) {
      gsap.fromTo(
        noteRef.current,
        { x: -200, y: 100,opacity: 0, scale: 0.8 },
        { x: 0, y: 0,opacity: 1, scale: 1.1, duration: 1.6, ease: "power2.out", delay: 0.6 }
      );
    }

    if (penRef.current) {
      gsap.fromTo(
        penRef.current,
        { x: -300, y: 100, rotate: -720,opacity: 0 },
        { x: 0, y: -10, rotate: 0,opacity: 1, duration: 1.8, ease: "back.out(1.7)", delay: 1.2 }
      );
    }

    if (highlighterRef.current) {
      gsap.fromTo(
        highlighterRef.current,
        { x: -400, y: 200, rotation: -270, scale: 0.6,opacity: 0 },
        { x: 0, y: -20, rotation: 0, scale: 1.1,opacity: 1, duration: 1.8, ease: "back.out(1.7)", delay: 1.7 }
      );
    }

    if (ipadRef.current) {
      gsap.fromTo(
        ipadRef.current,
        { x: 200, y: 300, scale: 0.6,opacity: 0 },
        { x: 0, y: 0, scale: 1.2,opacity: 1, duration: 1.8, ease: "back.out(1.7)", delay: 1.3 }
      );
    }

    if (plantRef.current) {
      gsap.fromTo(
        plantRef.current,
        { x: 200, y: -200, rotate: 45, scale: 0.8,opacity: 0 },
        { x: 0, y: 0, rotate: 0, scale: 1.1,opacity: 1, duration: 2.2, ease: "power4.out", delay: 0.7 }
      );
      gsap.to(plantRef.current, {
        y:"-=10",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
        delay: 2.5,
      });
      gsap.to(plantRef.current, {
        rotate: 360,
        duration: 120,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%", 
        delay: 2.5,
      });
    }

    if (carRef.current) {
      gsap.fromTo(
        carRef.current,
        { x: -300, y: -200, rotate: -20, scale: 0.8,opacity: 0 },
        { x: 0, y: 0, rotate: 0, scale: 1.1,opacity: 1, duration: 2.2, ease: "power4.out", delay: 0.9 }
      );
      gsap.to(carRef.current, {
        y: "+=10",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
        delay: 2.5,
      });
    }
  }, [slideIndex]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25;
      const y = (e.clientY - innerHeight / 2) / 25;

      gsap.to(plantRef.current, { x: x, y: y, duration: 0.5 });
      gsap.to(carRef.current, { x: -x, y: y, duration: 0.5 });
      gsap.to(ipadRef.current, { x: x * 0.5, y: y * 0.5, duration: 0.5 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 transition-colors duration-1000 ${currentSlide.background} overflow-hidden`}>
      <Particles
        id="tsparticles"
        className="absolute w-full h-full z-0 pointer-events-none"
        init={loadFull}
        options={{ 
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 30 },
            color: { value: "#ffffff" },
            opacity: { value: 0.3 },
            size: { value: 2 },
            move: { enable: true, speed: 0.4 },
          },
        }}
      />

      {/* Orbiting Logos */}
      <div className="absolute top-40 left-25 z-30 pointer-events-none">
        <div
          ref={techOrbitRef}
          className="relative w-[13rem] h-[13rem]" 
          style={{ transformOrigin: "center center" }}>
          <img src={reactLogo} className="absolute top-0 left-1/2 w-16 h-16 -translate-x-1/2 rounded-full shadow-lg shadow-cyan-400/30" />
          <img src={tailwindLogo} className="absolute bottom-0 left-1/2 w-16 h-16 -translate-x-1/2 rounded-full shadow-lg shadow-sky-400/40" />
          <img src={gsapLogo} className="absolute left-0 top-1/2 w-16 h-16 -translate-y-1/2 rounded-full shadow-lg shadow-lime-400/40" />
          <img src={framerLogo} className="absolute right-0 top-1/2 w-16 h-16 -translate-y-1/2 rounded-full shadow-lg shadow-indigo-400/40" />
        </div>
      </div>

      {/* Decorations */}
      <img ref={plantRef} src={plantImg} className="absolute -top-[120px] right-[-100px] w-[550px] rotate-[-6deg] z-0 opacity-0 pointer-events-none" />

      <img ref={noteRef} src={noteImg} className="absolute -bottom-[180px] -left-[80px] w-[470px] rotate-[-6deg] z-10 opacity-0 pointer-events-none" />

      <img ref={penRef} src={penImg} className="absolute -bottom-[5px] -left-[30px] w-[160px] z-20 opacity-0 pointer-events-none" />

      <img ref={highlighterRef} src={highlighterImg} className="absolute -bottom-[50px] -left-[120px] w-[280px] rotate-[15deg] z-30 opacity-0 pointer-events-none" />

      <img ref={ipadRef} src={ipadImg} className="absolute bottom-[-160px] right-[-100px] w-[370px] z-10 opacity-0 pointer-events-none rotate-[6deg]" />

      {/* Main Text */}
      <div className="text-center px-4 max-w-[95vw] z-40">
        {currentSlide.showGoogle && (
          <div ref={googleGroupRef} className="flex flex-col items-center mb-20 scale-150 md:scale-[2.3]opacity-0">
            <img src={googleLogo} className="w-20 mb-3 rounded-full drop-shadow-xl" />
            <p className="font-light tracking-wider uppercase text-3xl text-gray-600">
              Google Partner
            </p>
          </div>
        )}

        <h1 ref={titleRef} className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-12 drop-shadow-2xl">
          {currentSlide.title}
        </h1>

        <div>
          <div
            key={bulletIndex}
            ref={bulletRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black whitespace-nowrap overflow-hidden tracking-tight drop-shadow-2xl text-white">
            <span>{currentSlide.bullets[bulletIndex]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

