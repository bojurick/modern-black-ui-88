
import React from 'react';
import { motion } from 'framer-motion';

interface GridBackgroundProps {
  className?: string;
  lineColor?: string;
  animated?: boolean;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ 
  className = "", 
  lineColor = "rgba(255, 255, 255, 0.05)",
  animated = true
}) => {
  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        mask: 'radial-gradient(circle at center, black 40%, transparent 90%)'
      }}
    >
      {animated && (
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ 
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{ 
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: `
              linear-gradient(${lineColor} 1px, transparent 1px),
              linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}
    </div>
  );
};

export default GridBackground;
