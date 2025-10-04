'use client';
import Image from 'next/image';

interface ProfileSectionProps {
  username: string;
  email: string;
  profilePictureUrl: string;
  socialCredits: number;
  creditsEarned: number;
}

export const ProfileSection = ({
  username,
  email,
  profilePictureUrl,
  socialCredits,
  creditsEarned,
}: ProfileSectionProps) => {
  return (
    <section className='flex flex-col items-center bg-white p-6 shadow-md'>
      <div className='relative h-24 w-24'>
        <Image
          src={profilePictureUrl}
          alt={`${username}'s profile picture`}
          fill
          className='rounded-full object-cover'
        />
      </div>
      <h2 className='text-primary-text mt-4 text-xl font-semibold'>
        {username}
      </h2>
      <p className='text-secondary-text text-sm'>{email}</p>

      <div className='mt-6 flex w-full justify-around'>
        <div className='flex flex-col items-center'>
          <span className='text-primary-text text-lg font-bold'>
            {socialCredits}
          </span>
          <span className='text-secondary-text text-sm'>Social Credits</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-primary-text text-lg font-bold'>
            {creditsEarned}
          </span>
          <span className='text-secondary-text text-sm'>Points</span>
        </div>
      </div>
    </section>
  );
};
