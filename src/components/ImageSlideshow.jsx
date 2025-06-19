import React, { useEffect, useRef } from "react";


const images = [
  {
    src: img1,
    position: { top: "10%", left: "5%" },
    rotation: -10,
    from: { x: "-100vw", y: "-100vh" },
  },
  {
    src: img2,
    position: { top: "20%", right: "8%" },
    rotation: 8,
    from: { x: "100vw", y: "-100vh" },
  },
  {
    src: img3,
    position: { bottom: "10%", left: "12%" },
    rotation: -6,
    from: { x: "-100vw", y: "100vh" },
  },
  {
    src: img4,
    position: { bottom: "20%", right: "8%" },
    rotation: -6,
    from: { x: "100vw", y: "100vh" },
  },
];

const ImageSlideshow = () => {
  const imgRefs = useRef([]);

  useEffect(() => {
    imgRefs.current.forEach((el, index) => {
      const from = images[index].from;

      gsap.fromTo(
        el,
        {
          x: from.x,
          y: from.y,
          autoAlpha: 0,
          scale: 0.8,
        },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 8, // ultra slow
          ease: "power4.out",
          delay: index * 1.2,
          onComplete: () => {
            gsap.to(el, {
              y: 15,
              repeat: -1,
              yoyo: true,
              duration: 4,
              ease: "sine.inOut",
            });
          },
        }
      );
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute"
          style={{ ...img.position }}
        >
          <img
            ref={(el) => (imgRefs.current[index] = el)}
            src={img.src}
            alt={`floating-${index}`}
            className="w-11 md:w-25 rounded-xl shadow-lg opacity-90"
            style={{ transform: `rotate(${img.rotation}deg)` }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlideshow; 
