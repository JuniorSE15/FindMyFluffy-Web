import { PlusIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

export const LostFoundPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className='fixed inset-0 z-40 h-full w-full bg-[#D9D9D9]/60'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onClose()}
    >
      <div className='fixed bottom-0 z-50 flex h-full w-full items-end justify-center gap-12 pb-28'>
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <>
              <LostFoundItem type='lost' onClose={onClose} />
              <LostFoundItem type='found' onClose={onClose} />
            </>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const LostFoundItem = ({
  type,
  onClose,
}: {
  type: 'lost' | 'found';
  onClose: () => void;
}) => {
  return (
    <motion.div
      key='found'
      className='bg-primary-bg flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-full p-4'
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClose()}
    >
      {type === 'lost' ? (
        <PlusIcon size={24} className='text-white' />
      ) : (
        <Image
          src='/images/navigation/white-paw.svg'
          alt='Pet'
          width={64}
          height={64}
          className='size-6 text-white'
        />
      )}
      <span className='text-sm font-bold text-white'>{type}</span>
    </motion.div>
  );
};
