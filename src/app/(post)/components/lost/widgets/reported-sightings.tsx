import { usePost } from '@/hooks/usePost';
import { EyeOff } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { GetLocation } from '../../location/get-location';
import { PostImage } from '@/components/post/post-images-corousel';

export function LostReportedSightings({ postId }: { postId: string }) {
  const { timelines, isTimelinesLoading } = usePost({
    postId,
  });

  return (
    <div className='bg-white px-4 py-6'>
      {/* Header */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>
          Reported Sightings
        </h3>
        <p className='mt-1 text-sm text-gray-500'>
          Latest 3 sightings and reports for this lost pet (most recent first)
        </p>
      </div>

      {/* Content */}
      <div className='space-y-4'>
        {isTimelinesLoading || !timelines ? (
          <div className='space-y-3'>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='rounded-lg border border-gray-200 bg-white p-4'
              >
                <Skeleton className='mb-2 h-4 w-3/4' />
                <Skeleton className='h-3 w-1/2' />
              </div>
            ))}
          </div>
        ) : timelines.length === 0 ? (
          <div className='rounded-lg border border-gray-200 bg-gray-50 p-8 text-center'>
            <EyeOff className='mx-auto mb-4 h-12 w-12 text-gray-400' />
            <h4 className='mb-1 text-sm font-medium text-gray-900'>
              No Sightings Yet
            </h4>
            <p className='text-sm text-gray-500'>
              Be the first to report a sighting of this pet
            </p>
          </div>
        ) : (
          <div className='max-h-[400px] space-y-4 overflow-y-auto rounded-lg border border-gray-200 p-4'>
            {timelines
              .slice()
              .reverse()
              .slice(0, 3)
              .map((timeline, index) => (
                <div
                  key={timeline.id}
                  className='group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md'
                >
                  {/* Timeline Item Header */}
                  <div className='mb-3 flex items-start justify-between'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600'>
                        {index + 1}
                      </div>
                      <span className='text-sm font-medium text-gray-900'>
                        Sighting Report
                      </span>
                    </div>
                    {timeline.fnlDatetime && (
                      <span className='text-xs text-gray-500'>
                        {new Date(timeline.fnlDatetime).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          },
                        )}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className='mb-4'>
                    <p className='text-sm leading-relaxed text-gray-700'>
                      {timeline.description}
                    </p>
                  </div>

                  {/* Images */}
                  {Array.isArray(timeline.images) &&
                    timeline.images.length > 0 && (
                      <div className='mb-4'>
                        <div className='grid grid-cols-3 gap-2'>
                          {timeline.images.slice(0, 3).map((img, imgIndex) => {
                            const isLastVisible =
                              imgIndex === 2 && timeline.images.length > 3;
                            const remaining = Math.max(
                              timeline.images.length - 3,
                              0,
                            );
                            return (
                              <div
                                key={img + imgIndex}
                                className='relative aspect-square overflow-hidden rounded-md'
                              >
                                <PostImage
                                  image={img}
                                  props={{
                                    fill: true,
                                    className: 'object-cover',
                                    sizes: '(max-width: 768px) 33vw, 200px',
                                    priority: false,
                                  }}
                                />
                                {isLastVisible && remaining > 0 && (
                                  <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                                    <span className='text-sm font-semibold text-white'>
                                      +{remaining}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Location */}
                  <div className='mb-3'>
                    <GetLocation
                      latitude={timeline.latitude}
                      longitude={timeline.longitude}
                    />
                  </div>

                  {/* Footer */}
                  <div className='flex items-center justify-between border-t border-gray-100 pt-3'>
                    <div className='flex items-center space-x-2 text-xs text-gray-500'>
                      <svg
                        className='h-3 w-3'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                      <span>Location reported</span>
                    </div>
                    <div className='text-xs text-gray-400'>
                      ID: {timeline.id.slice(0, 8)}...
                    </div>
                  </div>
                </div>
              ))}
            {timelines.length > 3 && (
              <div className='mt-4 text-center'>
                <button className='text-sm text-blue-600 hover:text-blue-800 hover:underline'>
                  View all {timelines.length} sightings →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
