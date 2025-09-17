import React from 'react';
import { motion } from 'motion/react';

interface DotIndicatorProps {
  index: number;
  total: number;
  onClick: (index: number) => void;
}

export const DotIndicator: React.FC<DotIndicatorProps> = ({
  index,
  total,
  onClick,
}) => {
  return (
    <div className='flex items-center justify-center gap-[3px]'>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-2 rounded-full ${index === i ? 'bg-interface-secondary' : 'bg-[#D9D9D9]'}`}
          animate={{
            width: index === i ? 24 : 8,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
};
