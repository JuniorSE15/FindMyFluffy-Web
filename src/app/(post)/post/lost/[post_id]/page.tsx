import { LostPostView } from '@/app/(post)/components/lost/view';

type PageProps = {
  params: { post_id: string };
};

export default async function Page({ params }: PageProps) {
  const { post_id } = await params;

  return <LostPostView postId={post_id} />;
}
