import { MOCK_FEED_POSTS } from '@/constants/post';
import { type Post } from '@/types/post';
import { FoundPostView } from '@/app/(post)/components/found/view';

type PageProps = {
  params: { post_id: string };
};

export default function Page({ params }: PageProps) {
  const postId = Number(params.post_id);

  const post: Post | undefined = MOCK_FEED_POSTS.find(
    (p) => p.id === postId && !p.is_lost,
  );

  if (!post) {
    return (
      <div className='p-4 text-sm text-gray-600'>Found post not found.</div>
    );
  }

  return <FoundPostView post={post} />;
}
