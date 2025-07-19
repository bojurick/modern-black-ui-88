
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <div className="flex items-center group">
      <motion.div 
        className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center overflow-hidden relative" 
        whileHover={{
          scale: 1.05
        }} 
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-red-400" />
        <motion.div 
          className="absolute" 
          animate={{
            rotate: [0, 10, 0]
          }} 
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl font-bold text-white">E</span>
        </motion.div>
      </motion.div>
      <div className="flex flex-col ml-2">
        <motion.span 
          className="text-lg font-semibold text-white" 
          initial={{
            opacity: 0,
            x: -5
          }} 
          animate={{
            opacity: 1,
            x: 0
          }} 
          transition={{
            delay: 0.2
          }}
        >
          Essence
        </motion.span>
        <span className="text-xs text-red-400">98% UNC</span>
      </div>
    </div>
  );
};

export default Logo;
