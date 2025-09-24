export function LostContact() {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Contact information
      </div>
      <div className='space-y-2 text-sm'>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <span className='text-gray-600'>Natsuki Subaru</span>
        </div>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <span className='text-gray-600'>988-888-8888</span>
        </div>
        <div className='flex items-center justify-between rounded-md border border-gray-200 p-3'>
          <span className='text-gray-600'>example@email.com</span>
        </div>
      </div>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
