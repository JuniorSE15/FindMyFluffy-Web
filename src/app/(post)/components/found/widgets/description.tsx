import { FoundPetPostResponse } from '@/types/post';

type Props = { description: string };

export function FoundDescription({ description }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>Description</div>
      <p className='text-sm leading-6 text-gray-600'>{description}</p>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
