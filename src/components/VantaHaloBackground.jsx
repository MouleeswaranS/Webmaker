import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";

const VantaHaloBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          baseColor: 0x1a1a59,
          backgroundColor: 0x131a43,
          amplitudeFactor: 1.5,
          xOffset: 0.2,
          yOffset: 0.2,
          size: 1.2,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    />
  );
};

export default VantaHaloBackground;
