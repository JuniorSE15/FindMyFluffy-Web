import React from 'react';
import { MessageCircle, Heart, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const NOTIFICATION_CONFIG = {
  2000: {
    icon: RotateCcw,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  2001: {
    icon: Heart,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  2002: {
    icon: MessageCircle,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
};

interface NotificationIconProps {
  type: 2000 | 2001 | 2002;
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
