import { Eye } from 'lucide-react';

export function LostFooter() {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>
        Have you found this pet?
      </div>

      <button
        className='flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-orange-900'
        style={{ backgroundColor: '#f0d3b8' }}
      >
        <Eye className='h-5 w-5 text-orange-900' />
        Click here to report found pet
      </button>
    </div>
  );
}
