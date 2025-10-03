import { Skeleton } from '@/components/ui/skeleton';

// Header Skeleton Component
function HeaderSkeleton() {
  return (
    <div className='bg-white'>
      {/* Top bar with back button */}
      <div className='flex items-center justify-between px-4 py-4'>
        <Skeleton className='h-5 w-5 rounded-full' />
      </div>

      {/* Title & time on same row */}
      <div className='flex items-center justify-between px-4 pb-1'>
        <Skeleton className='h-6 w-2/3' />
        <Skeleton className='h-4 w-20' />
      </div>

      {/* Tag */}
      <div className='px-4 pb-3'>
        <Skeleton className='h-6 w-16 rounded-full' />
      </div>

      {/* Image carousel */}
      <div className='mb-2 px-4'>
        <Skeleton className='h-64 w-full rounded-lg' />
      </div>

      {/* Footer actions */}
      <div className='px-4 pb-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            <Skeleton className='h-5 w-5 rounded-full' />
            <Skeleton className='h-4 w-4' />
          </div>
          <Skeleton className='h-5 w-5 rounded-full' />
        </div>
      </div>
      <div className='h-2 w-full bg-[#F8F7F4]' />
    </div>
  );
}

// Detail Skeleton Component
function DetailSkeleton() {
  return (
    <div className='bg-white px-4 py-3'>
      <Skeleton className='mb-1 h-6 w-1/3' />
      <div className='mb-3 space-y-2'>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-1/2' />
        </div>
      </div>
      <Skeleton className='h-12 w-full rounded-lg' />
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Description Skeleton Component
function DescriptionSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <Skeleton className='mb-2 h-5 w-1/4' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Characteristics Skeleton Component
function CharacteristicsSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <Skeleton className='mb-3 h-5 w-1/3' />
      <div className='grid grid-cols-2 gap-6 text-sm'>
        {/* Row 1 */}
        <div>
          <div className='mb-1 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-12' />
          </div>
          <Skeleton className='h-4 w-16' />
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-8' />
          </div>
          <Skeleton className='h-4 w-8' />
        </div>
        {/* Row 2 */}
        <div>
          <div className='mb-1 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-10' />
          </div>
          <Skeleton className='h-4 w-12' />
        </div>
        <div>
          <div className='mb-1 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-14' />
          </div>
          <Skeleton className='h-4 w-20' />
        </div>
        {/* Row 3 */}
        <div>
          <div className='mb-1 flex items-center gap-2'>
            <Skeleton className='h-4 w-4 rounded-full' />
            <Skeleton className='h-4 w-12' />
          </div>
          <Skeleton className='h-4 w-24' />
        </div>
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Reported Sightings Skeleton Component
function ReportedSightingsSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-5 w-1/3' />
        <Skeleton className='h-4 w-16' />
      </div>
      <div className='mt-2 space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-2/3' />
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Location Skeleton Component
function LocationSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <Skeleton className='mb-2 h-5 w-1/4' />
      <Skeleton className='h-32 w-full rounded-lg' />
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Contact Skeleton Component
function ContactSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <Skeleton className='mb-2 h-5 w-1/4' />
      <div className='space-y-3'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex-1'>
            <Skeleton className='mb-1 h-4 w-1/3' />
            <Skeleton className='h-3 w-1/4' />
          </div>
        </div>
        <Skeleton className='h-10 w-full rounded-lg' />
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}

// Footer Skeleton Component
function FooterSkeleton() {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-8 w-24 rounded-lg' />
        <Skeleton className='h-8 w-8 rounded-full' />
      </div>
    </div>
  );
}

export function PostSkeleton() {
  return (
    <div className='min-h-screen bg-[#201f1a]'>
      <div className='mx-auto'>
        <HeaderSkeleton />
        <DetailSkeleton />
        <DescriptionSkeleton />
        <CharacteristicsSkeleton />
        <ReportedSightingsSkeleton />
        <LocationSkeleton />
        <ContactSkeleton />
        <FooterSkeleton />
      </div>
    </div>
  );
}
