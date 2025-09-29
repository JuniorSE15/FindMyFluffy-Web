import { ProfileSection } from '../components/profile-section';
import { TopNavigationBar } from '../components/top-bar';

export default function ProfilePage() {
  return (
    <div className='relative flex h-full flex-col'>
      <div className='sticky top-0 left-0 z-50 w-full'>
        <TopNavigationBar />
      </div>
      <main className='flex-1 overflow-hidden'>
        <ProfileSection
          username='ggg'
          email='aaa'
          profilePictureUrl='https://i.sstatic.net/frlIf.png'
          socialCredits={0}
          creditsEarned={0}
        />
      </main>
    </div>
  );
}
