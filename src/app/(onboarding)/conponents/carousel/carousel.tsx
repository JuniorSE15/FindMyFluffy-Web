import { ONBOARDING_DETAILS } from '@/constants/onboarding';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

interface CarouselProps {
  page: number;
}

export const Carousel: React.FC<CarouselProps> = ({ page }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={page}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
        }}
        className='w-full'
      >
        <Image
          src={ONBOARDING_DETAILS[page].image}
          alt={ONBOARDING_DETAILS[page].title}
          width={100}
          height={100}
          className='h-96 w-full'
        />
      </motion.div>
    </AnimatePresence>
  );
};
