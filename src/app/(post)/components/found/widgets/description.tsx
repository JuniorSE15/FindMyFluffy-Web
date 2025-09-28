import { type Post } from '@/types/post';

type Props = { post: Post };

export function FoundDescription({ post }: Props) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>Description</div>
      <p className='text-sm leading-6 text-gray-600'>{post.description}</p>
      <div className='mt-4 h-px w-full bg-gray-200' />
    </div>
  );
}
