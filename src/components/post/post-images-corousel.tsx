import Image, { ImageProps } from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useState, useEffect, type MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

interface PostImagesCorouselProps {
  images: string[];
}

interface PostImageProps {
  image: string;
  props?: Omit<ImageProps, 'src' | 'alt'>;
}

export const PostImagesCorousel: React.FC<PostImagesCorouselProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const hasMultiple = images.length > 1;

  // Guard: no images provided
  if (!images || images.length === 0) {
    return (
      <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-200' />
    );
  }
  const goPrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-200'>
      <PostImage image={images[currentIndex]} />
      {hasMultiple ? (
        <>
          <button
            type='button'
            onClick={goPrev}
            className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60'
            aria-label='Previous image'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button
            type='button'
            onClick={goNext}
            className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white hover:bg-black/60'
            aria-label='Next image'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
          <div className='absolute right-2 bottom-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white'>
            {currentIndex + 1} / {images.length}
          </div>
        </>
      ) : null}
    </div>
  );
};

export const PostImage = ({ image, props }: PostImageProps) => {
  console.log('image', image);
  const { accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (image && accessToken) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images/${image}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.blob())
        .then((data) => {
          const url = URL.createObjectURL(data);
          setImageUrl(url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setIsLoading(false);
    };
  }, [image, accessToken]);

  return (
    // Only render when we have a valid blob URL to avoid empty src
    imageUrl ? (
      <Image
        src={imageUrl}
        alt={image}
        fill
        className='object-cover'
        loading={isLoading ? 'eager' : 'lazy'}
        {...props}
      />
    ) : null
  );
};
