import { EyeOff } from 'lucide-react';

export function LostReportedSightings() {
  return (
    <div className='bg-white px-4 py-4'>
      {/* Title */}
      <div className='mb-2 text-sm font-medium text-gray-900'>
        Reported Sightings
      </div>

      {/* Empty State Card */}
      <div className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500'>
        <EyeOff className='mx-auto mb-2 h-8 w-8 text-gray-400' />
        No Sightings reported yet
      </div>

      {/* Divider */}
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
