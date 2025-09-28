import { UserCircle, Phone, Mail } from 'lucide-react';

export function LostContact() {
  return (
    <div className='bg-white px-4 py-4'>
      {/* Title */}
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Contact Information
      </div>

      {/* Contact details */}
      <div className='space-y-3 text-sm text-gray-600'>
        <div className='flex items-center space-x-2'>
          <UserCircle className='h-5 w-5 text-gray-400' />
          <span>Natsuki Subaru</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Phone className='h-5 w-5 text-gray-400' />
          <span>088-888-8888</span>
        </div>
        <div className='flex items-center space-x-2'>
          <Mail className='h-5 w-5 text-gray-400' />
          <span>emt@xxx.com</span>
        </div>
      </div>

      {/* Divider */}
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
