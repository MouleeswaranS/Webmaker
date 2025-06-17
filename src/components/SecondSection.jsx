import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VanillaTilt from "vanilla-tilt";
import aboutImage from "../assets/profile.png";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef([]);
  const badgeRef = useRef(null);
  const [startCounts, setStartCounts] = useState([false, false, false, false]);

  useLayoutEffect(() => {
    VanillaTilt.init(imageRef.current, {
      max: 25,
      speed: 500,
      glare: true,
      "max-glare": 0.2,
      scale: 1.05,
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: "-100vw", opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      statsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: i * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              onEnter: () =>
                setStartCounts((prev) => {
                  const updated = [...prev];
                  updated[i] = true;
                  return updated;
                }),
            },
          }
        );
      });

      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.7, y: -20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Galaxy Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = Array.from({ length: 250 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    }));

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden px-4 md:px-12 py-20 md:py-32 text-black bg-[#0a0016]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* 🌊 Dual-layer Wave Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-[400px] animate-[waveBack_12s_ease-in-out_infinite] opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradientBack)"
            d="M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,186.7C840,181,960,203,1080,213.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradientBack" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#2d003d" />
              <stop offset="100%" stopColor="#150021" />
            </linearGradient>
          </defs>
        </svg>

        <svg
          className="absolute bottom-0 w-full h-[400px] animate-[waveFront_8s_ease-in-out_infinite] opacity-50"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradientFront)"
            d="M0,224L60,202.7C120,181,240,139,360,128C480,117,600,139,720,170.7C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradientFront" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#ff79c0" />
              <stop offset="50%" stopColor="#8be9fd" />
              <stop offset="100%" stopColor="#bd93f9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="w-full grid md:grid-cols-2 items-center gap-12 md:gap-16 relative z-10">
        <div className="flex justify-center" ref={imageRef}>
          <div className="rounded-3xl overflow-hidden shadow-2xl group relative">
            <img
              src={aboutImage}
              alt="About Us"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              ref={badgeRef}
              className="absolute top-0 left-0 m-4 px-4 py-2 bg-gradient-to-br from-pink-500 to-purple-600 text-gray-50 rounded-tr-2xl rounded-bl-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
            >
              <div className="text-lg md:text-xl font-extrabold leading-tight">
                10
              </div>
              <div className="text-xs md:text-sm font-semibold">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.3, ease: "easeOut" },
            },
          }}
          className="w-full space-y-6 px-4 md:px-8"
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, x: 150 }, show: { opacity: 1, x: 0 } }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight max-w-3xl"
          >
            Crafting Digital Experiences That Inspire.
          </motion.h2>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl hover:text-yellow-500"
          >
            At Web Makers, we don’t just build websites; we build digital
            identities. Specializing in cutting-edge design and scalable
            development, our mission is to bring your vision to life with
            precision and creativity.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl hover:text-yellow-500"
          >
            We’ve successfully delivered over 150 projects globally, working
            alongside startups, SMEs, and enterprise clients to enhance their
            online presence with tailor-made solutions.
          </motion.p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-24 w-full px-4 md:px-12 relative z-10">
        {[
          { end: 900, suffix: "+", label: "Satisfied Clients" },
          { end: 150, suffix: "+", label: "Projects Delivered" },
          { end: 10, suffix: "+", label: "Years Experience" },
          { end: 12, suffix: "+", label: "Countries Reached" },
        ].map((stat, i) => (
          <div
            key={i}
            ref={(el) => (statsRef.current[i] = el)}
            className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl text-center shadow-xl border border-white/20"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-white">
              {startCounts[i] && <CountUp end={stat.end} duration={3} />}
              {stat.suffix}
            </div>
            <div className="text-white/80 mt-4 text-lg md:text-xl font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
