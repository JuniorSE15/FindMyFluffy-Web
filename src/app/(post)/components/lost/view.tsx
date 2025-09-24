import { type LostPost, type Post } from '@/types/post';
import { LostHeader } from './widgets/header';
import { LostDetail } from './widgets/detail';
import { LostDescription } from './widgets/description';
import { LostCharacteristics } from './widgets/characteristics';
import { LostReportedSightings } from './widgets/reported-sightings';
import { LostLocation } from './widgets/location';
import { LostContact } from './widgets/contact';
import { LostFooter } from './widgets/footer';

type LostPostViewProps = {
  post: Post;
  lost?: LostPost;
};

export function LostPostView({ post, lost }: LostPostViewProps) {
  return (
    <div className='min-h-screen bg-[#F8F7F4]'>
      <div className='mx-auto max-w-md'>
        <LostHeader post={post} lost={lost} />
        <LostDetail post={post} lost={lost} />
        <LostDescription post={post} />
        <LostCharacteristics post={post} />
        <LostReportedSightings />
        <LostLocation />
        <LostContact />
        <LostFooter />
      </div>
    </div>
  );
}
