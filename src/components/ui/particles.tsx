
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  speed?: number;
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 40,
  color = "hsl(var(--primary))",
  speed = 1
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: quantity }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            opacity: Math.random() * 0.5 + 0.1,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%"
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [Math.random() * 0.5 + 0.1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 15 / speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
