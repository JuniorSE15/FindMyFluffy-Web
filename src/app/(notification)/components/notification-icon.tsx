import React from 'react';
import { MapPin, MessageCircle, Heart, RotateCcw } from 'lucide-react';
import { type NotificationType } from '@/types/notification';
import { cn } from '@/lib/utils';

const NOTIFICATION_CONFIG = {
  missing_pet: {
    icon: MapPin,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  found_pet: {
    icon: Heart,
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  sighting_report: {
    icon: MessageCircle,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  match_alert: {
    icon: Heart,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  bounty_update: {
    icon: RotateCcw,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
};

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  type,
  className,
}) => {
  const { icon: Icon, bgColor, iconColor } = NOTIFICATION_CONFIG[type];

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full',
          bgColor,
        )}
      >
        <Icon className={cn('h-5 w-5', iconColor)} />
      </div>
    </div>
  );
};
