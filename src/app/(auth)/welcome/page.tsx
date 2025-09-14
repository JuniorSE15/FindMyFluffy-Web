import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Welcome() {
  return (
    <div className='bg-secondary-bg flex min-h-screen w-full flex-col items-center justify-center px-10 py-6'>
      <div className='flex h-full flex-col items-center gap-20'>
        <div className='flex items-center justify-center overflow-hidden'>
          <Image
            src={'/images/auth/pet-welcome.svg'}
            alt={'Welcome to Find My Fluffy'}
            width={100}
            height={100}
            className='h-96 w-full'
          />
        </div>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Link href='/signin'>
            <Button
              variant='outline'
              className={`bg-secondary-bg text-primary-foreground hover:bg-secondary-bg/80 w-64 cursor-pointer rounded-full border-2 py-6 text-base font-medium transition-all duration-300 ease-in-out`}
              size='lg'
            >
              Sign In
            </Button>
          </Link>
          <span className='text-xs font-light text-white'>
            Don&apos;t have an account?
          </span>
          <Link href='/signup'>
            <Button
              variant='default'
              className={`text-secondary-bg w-64 cursor-pointer rounded-full bg-white py-6 text-base font-medium transition-all duration-300 ease-in-out hover:bg-white/80`}
              size='lg'
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
