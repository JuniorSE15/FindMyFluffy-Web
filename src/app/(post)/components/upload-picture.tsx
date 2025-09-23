'use client';
import { Button } from '@/components/ui/button';
import { useState, useRef, useCallback } from 'react';
import { Upload, Plus } from 'lucide-react';
import CustomCarousel, { CarouselItem } from './custom-carousel';

type UploadedFile = CarouselItem;

interface UploadPictureProps {
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
}

export default function UploadPicture({
  onFilesChange,
  maxFiles = 5,
  maxFileSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: UploadPictureProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `File type ${file.type} is not supported. Please use JPEG, PNG, or WebP.`;
      }
      if (file.size > maxFileSize * 1024 * 1024) {
        return `File size must be less than ${maxFileSize}MB.`;
      }
      return null;
    },
    [acceptedTypes, maxFileSize],
  );

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const newFiles: UploadedFile[] = [];
      let errorMessage = '';

      // Check if adding these files would exceed the limit
      if (uploadedFiles.length + fileArray.length > maxFiles) {
        errorMessage = `You can only upload up to ${maxFiles} images.`;
        setError(errorMessage);
        return;
      }

      fileArray.forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errorMessage = validationError;
          return;
        }

        // Check if file is already uploaded
        const isDuplicate = uploadedFiles.some(
          (uploadedFile) =>
            uploadedFile.file.name === file.name &&
            uploadedFile.file.size === file.size,
        );

        if (isDuplicate) {
          errorMessage = `File "${file.name}" is already uploaded.`;
          return;
        }

        const id = Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);
        newFiles.push({ id, file, preview });
      });

      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      setError('');
      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);

      // Navigate to the first newly uploaded image
      if (newFiles.length > 0) {
        setCurrentCarouselIndex(uploadedFiles.length);
      }

      // Notify parent component
      if (onFilesChange) {
        onFilesChange(updatedFiles.map((f) => f.file));
      }
    },
    [uploadedFiles, maxFiles, validateFile, onFilesChange],
  );

  const removeFile = (id: string) => {
    const fileToRemove = uploadedFiles.find((f) => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = uploadedFiles.filter((f) => f.id !== id);
    setUploadedFiles(updatedFiles);
    setError('');

    // Notify parent component
    if (onFilesChange) {
      onFilesChange(updatedFiles.map((f) => f.file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='space-y-4'>
      {/* Upload Area - Only show when no images are uploaded */}
      {uploadedFiles.length === 0 && (
        <div
          className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-accent/50'
          } `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className='flex flex-col items-center gap-4'>
            <div className='bg-accent rounded-full p-4'>
              <Upload className='text-muted-foreground h-8 w-8' />
            </div>
            <div className='space-y-2'>
              <p className='text-primary-text text-lg font-medium'>
                Drag & drop your images here
              </p>
              <p className='text-secondary-text text-sm'>
                or click to browse files
              </p>
              <p className='text-muted-foreground text-xs'>
                Supports JPEG, PNG, WebP • Max {maxFileSize}MB per file • Up to{' '}
                {maxFiles} files
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input - always available */}
      <input
        ref={fileInputRef}
        type='file'
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className='hidden'
      />

      {/* Error Message */}
      {error && (
        <div className='bg-destructive/10 border-destructive/20 rounded-xl border p-4'>
          <p className='text-destructive text-sm font-medium'>{error}</p>
        </div>
      )}

      {/* Upload Progress/Success */}
      {uploadedFiles.length > 0 && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-primary-text text-sm font-medium'>
              Uploaded Images ({uploadedFiles.length}/{maxFiles})
            </h3>
            <div className='flex items-center gap-2'>
              {/* Add More Button */}
              {uploadedFiles.length < maxFiles && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openFileDialog();
                  }}
                  className='h-8 text-xs'
                >
                  <Plus className='mr-1 h-3 w-3' />
                  Add
                </Button>
              )}
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  uploadedFiles.forEach((file) =>
                    URL.revokeObjectURL(file.preview),
                  );
                  setUploadedFiles([]);
                  setError('');
                  if (onFilesChange) onFilesChange([]);
                }}
                className='h-8 text-xs'
              >
                Clear All
              </Button>
            </div>
          </div>

          <CustomCarousel
            files={uploadedFiles}
            onRemoveFile={removeFile}
            currentIndex={currentCarouselIndex}
          />
        </div>
      )}
    </div>
  );
}
