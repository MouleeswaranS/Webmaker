import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/Webmaker-Icon-01.jpg'; // replace with your logo path

const Loading = () => {
  const loaderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        // Animate out after short delay
        gsap.to(loaderRef.current, {  
          opacity: 0,
          y: '-100%',
          duration: 1,
          delay: 0.5,
          onComplete: () => setIsVisible(false),
        });
      },
    });

    tl.fromTo(
      '.loader-logo',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8 }
    ).fromTo(
      '.loader-text',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3 },
      '-=0.4'
    );
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center space-y-4 text-center"
    >
      <img
        src={logo}
        alt="Logo"
        className="loader-logo w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
      />
      <h1 className="loader-text text-3xl sm:text-5xl font-bold">
        Webmakerz 
      </h1>
      <p className="loader-text text-lg sm:text-xl text-gray-300">
        Crafting Modern Websites 
      </p>
    </div>
  );
};

export default Loading;
