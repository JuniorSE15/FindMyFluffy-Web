import { ContactInfo } from '../../contact-info';

type Props = {
  userId: string;
};

export function FoundContact({ userId }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-3 text-sm font-medium text-gray-900'>
        Contact Information
      </div>
      <ContactInfo userId={userId} />
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
