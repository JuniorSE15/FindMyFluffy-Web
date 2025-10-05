'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, PanInfo } from 'motion/react';

interface CarouselItem {
  id: string;
  file: File;
  preview: string;
}

interface CustomCarouselProps {
  files: CarouselItem[];
  onRemoveFile: (id: string) => void;
  currentIndex?: number;
  showFileInfo?: boolean;
  showRemoveButton?: boolean;
  showNavigation?: boolean;
  showCounter?: boolean;
  showDots?: boolean;
  aspectRatio?: string;
  className?: string;
}

export default function CustomCarousel({
  files,
  onRemoveFile,
  currentIndex: externalCurrentIndex,
  showFileInfo = true,
  showRemoveButton = true,
  showNavigation = true,
  showCounter = true,
  showDots = true,
  aspectRatio = 'aspect-[4/3]',
  className = '',
}: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update internal currentIndex when external prop changes
  useEffect(() => {
    if (externalCurrentIndex !== undefined) {
      setCurrentIndex(externalCurrentIndex);
    }
  }, [externalCurrentIndex]);

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const swipeConfidenceThreshold = 10000;

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? files.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === files.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleDragEnd = (_event: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      goToNext();
    } else if (swipe > swipeConfidenceThreshold) {
      goToPrevious();
    }
  };

  const handleRemove = (id: string) => {
    const removingCurrentIndex = files.findIndex((f) => f.id === id);
    if (
      removingCurrentIndex === currentIndex &&
      currentIndex >= files.length - 1
    ) {
      setCurrentIndex(Math.max(0, files.length - 2));
    } else if (removingCurrentIndex < currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
    onRemoveFile(id);
  };

  if (files.length === 0) return null;

  return (
    <Card className={`relative w-full overflow-hidden ${className}`}>
      <div className='relative w-full'>
        <div className={`relative ${aspectRatio} w-full overflow-hidden`}>
          <motion.div
            className='flex h-full w-full'
            animate={{ x: `${-currentIndex * 100}%` }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ cursor: files.length > 1 ? 'grab' : 'default' }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {files.map((file) => (
              <div
                key={file.id}
                className='relative h-full w-full flex-shrink-0'
              >
                <Image
                  src={file.preview}
                  alt={file.file.name}
                  fill
                  className='pointer-events-none object-cover'
                  sizes='(max-width: 640px) 100vw, 640px'
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>

          {/* Remove button */}
          {showRemoveButton && (
            <Button
              type='button'
              variant='destructive'
              size='sm'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemove(files[currentIndex].id);
              }}
              className='absolute top-2 right-2 z-30 h-8 w-8 p-0 shadow-lg transition-all duration-200 hover:scale-110'
            >
              <X className='h-4 w-4' />
            </Button>
          )}

          {/* Navigation buttons */}
          {showNavigation && files.length > 1 && (
            <>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToPrevious();
                }}
                disabled={isTransitioning}
                className={`bg-background/80 hover:bg-background absolute top-1/2 left-2 z-30 h-8 w-8 -translate-y-1/2 p-0 transition-all duration-200 hover:scale-110 ${isTransitioning ? 'opacity-50' : ''}`}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                type='button'
                variant='secondary'
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToNext();
                }}
                disabled={isTransitioning}
                className={`bg-background/80 hover:bg-background absolute top-1/2 right-2 z-30 h-8 w-8 -translate-y-1/2 p-0 transition-all duration-200 hover:scale-110 ${isTransitioning ? 'opacity-50' : ''}`}
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </>
          )}

          {/* Image counter */}
          {showCounter && files.length > 1 && (
            <div className='absolute bottom-2 left-2 z-20 rounded-md bg-black/70 px-2 py-1'>
              <span className='text-xs text-white'>
                {currentIndex + 1} / {files.length}
              </span>
            </div>
          )}

          {/* Dots indicator */}
          {showDots && files.length > 1 && (
            <div className='absolute right-2 bottom-2 z-20 flex gap-1'>
              {files.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 0.8,
                    opacity: index === currentIndex ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* File info */}
        {showFileInfo && (
          <motion.div
            className='p-4'
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <p className='text-secondary-text truncate text-sm font-medium'>
              {files[currentIndex].file.name}
            </p>
            <p className='text-muted-foreground text-xs'>
              {(files[currentIndex].file.size / 1024 / 1024).toFixed(1)} MB
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

export type { CarouselItem };
