import { FoundPostView } from '@/app/(post)/components/found/view';

type PageProps = {
  params: { post_id: string };
};

export default async function Page({ params }: PageProps) {
  const { post_id } = await params;

  return <FoundPostView postId={post_id} />;
}
