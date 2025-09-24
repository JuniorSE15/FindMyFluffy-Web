import { MOCK_FEED_POSTS, MOCK_LOST_POSTS } from '@/constants/post';
import { type LostPost, type Post } from '@/types/post';
import { LostPostView } from '@/app/(post)/components/lost/view';

type PageProps = {
  params: { post_id: string };
};

export default function Page({ params }: PageProps) {
  const postId = Number(params.post_id);

  const post: Post | undefined = MOCK_FEED_POSTS.find(
    (p) => p.id === postId && p.is_lost,
  );
  const lostDetails: LostPost | undefined = MOCK_LOST_POSTS.find(
    (lp) => lp.post_Id === postId,
  );

  if (!post) {
    return (
      <div className='p-4 text-sm text-gray-600'>Lost post not found.</div>
    );
  }

  return <LostPostView post={post} lost={lostDetails} />;
}
