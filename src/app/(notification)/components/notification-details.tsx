import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { type Notification } from '@/types/notification';

// Basic field component for displaying label-value pairs
export const DetailField: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = '' }) => (
  <div className={className}>
    <span className='text-gray-500'>{label}:</span>
    {children}
  </div>
);

// Specialized field for displaying location with map pin icon
export const LocationField: React.FC<{
  location: string;
  className?: string;
}> = ({ location, className = '' }) => (
  <DetailField label='Location' className={className}>
    <p className='flex items-center gap-1 font-medium'>
      <MapPin className='h-4 w-4' />
      {location}
    </p>
  </DetailField>
);

// Specialized field for displaying monetary rewards
export const RewardField: React.FC<{
  amount: number;
  oldAmount?: number;
  label?: string;
  className?: string;
}> = ({ amount, oldAmount, label = 'Reward', className = '' }) => (
  <DetailField label={label} className={className}>
    <p className='flex items-center gap-1 font-medium text-green-600'>
      <DollarSign className='h-4 w-4' />${amount}
      {oldAmount && (
        <span className='text-xs text-gray-500'>(was ${oldAmount})</span>
      )}
    </p>
  </DetailField>
);

// Badge for displaying confidence levels with color coding
export const ConfidenceBadge: React.FC<{
  confidence: 'low' | 'medium' | 'high';
}> = ({ confidence }) => (
  <span
    className={`rounded-full px-2 py-1 text-xs font-medium ${
      confidence === 'high'
        ? 'bg-green-100 text-green-800'
        : confidence === 'medium'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-gray-100 text-gray-800'
    }`}
  >
    {confidence}
  </span>
);

// Badge for displaying match scores
export const MatchScoreBadge: React.FC<{ score: number }> = ({ score }) => (
  <span className='rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800'>
    {score}%
  </span>
);

// Grid layout wrapper for detail fields
export const DetailsGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className='space-y-4'>
    <div className='grid grid-cols-2 gap-4 text-sm'>{children}</div>
  </div>
);

// Type-specific notification detail components
export const MissingPetDetails: React.FC<{
  notification: Extract<Notification, { type: 'missing_pet' }>;
}> = ({ notification }) => (
  <DetailsGrid>
    <DetailField label='Pet Name'>
      <p className='font-medium'>{notification.petName}</p>
    </DetailField>
    <DetailField label='Type'>
      <p className='font-medium capitalize'>{notification.petType}</p>
    </DetailField>
    <LocationField location={notification.location} className='col-span-2' />
    {notification.bounty && (
      <RewardField amount={notification.bounty} className='col-span-2' />
    )}
  </DetailsGrid>
);

export const FoundPetDetails: React.FC<{
  notification: Extract<Notification, { type: 'found_pet' }>;
}> = ({ notification }) => (
  <DetailsGrid>
    <DetailField label='Pet Type'>
      <p className='font-medium capitalize'>{notification.petType}</p>
    </DetailField>
    <DetailField label='Found by'>
      <p className='font-medium'>{notification.finderName}</p>
    </DetailField>
    <LocationField location={notification.location} className='col-span-2' />
  </DetailsGrid>
);

export const SightingReportDetails: React.FC<{
  notification: Extract<Notification, { type: 'sighting_report' }>;
}> = ({ notification }) => (
  <DetailsGrid>
    <DetailField label='Pet Name'>
      <p className='font-medium'>{notification.petName}</p>
    </DetailField>
    <DetailField label='Reported by'>
      <p className='font-medium'>{notification.reporterName}</p>
    </DetailField>
    <DetailField label='Confidence'>
      <ConfidenceBadge confidence={notification.confidence} />
    </DetailField>
    <LocationField location={notification.location} />
  </DetailsGrid>
);

export const MatchAlertDetails: React.FC<{
  notification: Extract<Notification, { type: 'match_alert' }>;
}> = ({ notification }) => (
  <DetailsGrid>
    <DetailField label='Match Score'>
      <MatchScoreBadge score={notification.matchScore} />
    </DetailField>
    <LocationField location={notification.location} />
  </DetailsGrid>
);

export const BountyUpdateDetails: React.FC<{
  notification: Extract<Notification, { type: 'bounty_update' }>;
}> = ({ notification }) => (
  <DetailsGrid>
    <DetailField label='Pet Name'>
      <p className='font-medium'>{notification.petName}</p>
    </DetailField>
    <RewardField
      amount={notification.newBounty}
      oldAmount={notification.oldBounty}
      label='New Reward'
    />
  </DetailsGrid>
);

// Main component that renders the appropriate detail component based on notification type
export const NotificationDetails: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  switch (notification.type) {
    case 'missing_pet':
      return <MissingPetDetails notification={notification} />;
    case 'found_pet':
      return <FoundPetDetails notification={notification} />;
    case 'sighting_report':
      return <SightingReportDetails notification={notification} />;
    case 'match_alert':
      return <MatchAlertDetails notification={notification} />;
    case 'bounty_update':
      return <BountyUpdateDetails notification={notification} />;
    default:
      return null;
  }
};
