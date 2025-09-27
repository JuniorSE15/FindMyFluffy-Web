export type NotificationType =
  | 'missing_pet'
  | 'found_pet'
  | 'sighting_report'
  | 'match_alert'
  | 'bounty_update';

export type NotificationStatus = 'unread' | 'read';

export type BaseNotification = {
  id: string;
  type: NotificationType;
  status: NotificationStatus;
  title: string;
  message: string;
  timestamp: string;
  imageUrl?: string;
  actionUrl?: string;
};

export type MissingPetNotification = BaseNotification & {
  type: 'missing_pet';
  petId: number;
  petName: string;
  petType: string;
  location: string;
  bounty?: number;
};

export type FoundPetNotification = BaseNotification & {
  type: 'found_pet';
  petId: number;
  petType: string;
  location: string;
  finderName: string;
};

export type SightingReportNotification = BaseNotification & {
  type: 'sighting_report';
  petId: number;
  petName: string;
  reporterName: string;
  location: string;
  confidence: 'low' | 'medium' | 'high';
};

export type MatchAlertNotification = BaseNotification & {
  type: 'match_alert';
  lostPetId: number;
  foundPetId: number;
  matchScore: number;
  location: string;
};

export type BountyUpdateNotification = BaseNotification & {
  type: 'bounty_update';
  petId: number;
  petName: string;
  oldBounty?: number;
  newBounty: number;
};

export type Notification =
  | MissingPetNotification
  | FoundPetNotification
  | SightingReportNotification
  | MatchAlertNotification
  | BountyUpdateNotification;
