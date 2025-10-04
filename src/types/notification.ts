export const NotificationType = {
  2000: 'system',
  2001: 'match',
  2002: 'comment',
};

export type NotificationBase = {
  title: string;
  description: string;
  createdAt: string;
  type: keyof typeof NotificationType;
};

export type SystemNotification = NotificationBase & {
  title: string;
  description: string;
  createdAt: string;
  type: (typeof NotificationType)[2000];
};

export type MatchNotification = NotificationBase & {
  title: string;
  description: string;
  createdAt: string;
  type: (typeof NotificationType)[2001];
};

export type CommentNotification = NotificationBase & {
  title: string;
  description: string;
  createdAt: string;
  type: (typeof NotificationType)[2002];
};

export type Notification =
  | SystemNotification
  | MatchNotification
  | CommentNotification;

export type NotificationQueryParams = {
  userId?: string;
};
