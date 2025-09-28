'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow, format } from 'date-fns';
import {
  ArrowLeft,
  Eye,
  Heart,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageSquare,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/constants/notification';
import { type Notification } from '@/types/notification';
import { Button } from '@/components/ui/button';
import { NotificationDetails } from '../../components/notification-details';

const NOTIFICATION_ICONS = {
  missing_pet: <AlertTriangle className='h-6 w-6 text-red-500' />,
  found_pet: <Heart className='h-6 w-6 text-green-500' />,
  sighting_report: <Eye className='h-6 w-6 text-blue-500' />,
  match_alert: <CheckCircle className='h-6 w-6 text-purple-500' />,
  bounty_update: <TrendingUp className='h-6 w-6 text-orange-500' />,
};

const NOTIFICATION_TYPES = {
  missing_pet: 'Missing Pet Alert',
  found_pet: 'Found Pet',
  sighting_report: 'Sighting Report',
  match_alert: 'Potential Match',
  bounty_update: 'Bounty Update',
};

export default function NotificationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const notificationId = params.id as string;
    const found = MOCK_NOTIFICATIONS.find((n) => n.id === notificationId);
    setNotification(found || null);
  }, [params.id]);

  if (!notification) {
    return (
      <div className='flex h-full flex-col bg-gray-50'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='text-center'>
            <h2 className='mb-2 text-lg font-medium text-gray-900'>
              Notification not found
            </h2>
            <p className='mb-4 text-gray-600'>
              The notification you are looking for does not exist.
            </p>
            <Button onClick={() => router.back()} size='sm'>
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col bg-gray-50'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-white px-4 py-4'>
        <div className='flex items-center gap-3'>
          <Button onClick={() => router.back()} variant='ghost' size='sm'>
            <ArrowLeft className='h-5 w-5 text-gray-600' />
          </Button>
          <div className='flex items-center gap-3'>
            {NOTIFICATION_ICONS[notification.type]}
            <div>
              <h1 className='text-lg font-semibold text-gray-900'>
                {NOTIFICATION_TYPES[notification.type]}
              </h1>
              <p className='text-sm text-gray-500'>
                {formatDistanceToNow(new Date(notification.timestamp), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-auto'>
        <div className='space-y-6 p-4'>
          {/* Main Content Card */}
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <h2 className='mb-2 text-xl font-bold text-gray-900'>
              {notification.title}
            </h2>
            <p className='mb-6 text-gray-700'>{notification.message}</p>

            {/* Pet Image */}
            {notification.imageUrl && (
              <div className='mb-6'>
                <div className='relative h-64 w-full overflow-hidden rounded-lg bg-gray-100'>
                  <Image
                    src={notification.imageUrl}
                    alt='Pet'
                    fill
                    className='object-cover'
                  />
                </div>
              </div>
            )}

            {/* Details */}
            <NotificationDetails notification={notification} />

            {/* Timestamp */}
            <div className='mt-6 border-t border-gray-200 pt-6'>
              <p className='text-sm text-gray-500'>
                Received on{' '}
                {format(
                  new Date(notification.timestamp),
                  "MMMM d, yyyy 'at' h:mm a",
                )}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className='rounded-lg border border-gray-200 bg-white p-6'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900'>
              Actions
            </h3>
            <div className='grid grid-cols-2 gap-3'>
              <Button className='bg-interface-primary hover:bg-interface-primary/90 flex items-center justify-center gap-2'>
                <Phone className='h-4 w-4' />
                Contact
              </Button>
              <Button className='bg-interface-secondary hover:bg-interface-secondary/90 flex items-center justify-center gap-2'>
                <MessageSquare className='h-4 w-4' />
                Message
              </Button>
              <Button
                variant='outline'
                className='flex items-center justify-center gap-2'
              >
                <Share2 className='h-4 w-4' />
                Share
              </Button>
              {notification.actionUrl && (
                <Button variant='outline' asChild>
                  <Link
                    href={notification.actionUrl}
                    className='flex items-center justify-center gap-2'
                  >
                    <ExternalLink className='h-4 w-4' />
                    View Post
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
