import { ReportDialog } from '../sighting/report-dialog';

export function LostFooter({ postId }: { postId: string }) {
  return (
    <div className='bg-white px-4 py-4'>
      <div className='mb-2 text-sm font-medium text-gray-900'>
        Have you found this pet?
      </div>

      <ReportDialog postId={postId} />
    </div>
  );
}
