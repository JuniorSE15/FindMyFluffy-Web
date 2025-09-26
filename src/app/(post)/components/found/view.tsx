import { type Post } from '@/types/post';
import { FoundHeader } from './widgets/header';
import { FoundDetail } from './widgets/details';
import { FoundDescription } from './widgets/description';
import { FoundCharacteristics } from './widgets/characteristics';
import { FoundLocation } from './widgets/location';
import { FoundContact } from './widgets/contact';

type FoundPostViewProps = {
  post: Post;
};

export function FoundPostView({ post }: FoundPostViewProps) {
  return (
    <div className='min-h-screen bg-[#F8F7F4]'>
      <div className='mx-auto'>
        <FoundHeader post={post} /> {/* safe to reuse */}
        <FoundDetail post={post} />
        <FoundDescription post={post} />
        <FoundCharacteristics post={post} />
        <FoundLocation />
        <FoundContact />
      </div>
    </div>
  );
}
