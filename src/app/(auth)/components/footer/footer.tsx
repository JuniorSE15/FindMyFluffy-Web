import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const Footer: React.FC<{
  type: 'signin' | 'signup';
}> = ({ type }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-secondary-text'>Or continue with</p>
      <div className='mt-6 flex flex-row items-center justify-center gap-4'>
        <Link href='#'>
          <Image
            src='/images/auth/google-icon.svg'
            alt='Google'
            width={54}
            height={54}
            className='size-14 cursor-pointer'
          />
        </Link>
        <Link href='#'>
          <Image
            src='/images/auth/facebook-icon.svg'
            alt='Facebook'
            width={54}
            height={54}
            className='size-14 cursor-pointer'
          />
        </Link>
      </div>
      <p className='text-secondary-text mt-3'>
        {type === 'signin'
          ? "Don't have an account?"
          : 'Already have an account?'}
        <Link href={type === 'signin' ? '/signup' : '/signin'}>
          <Button variant='link' className='text-interface-primary pr-0'>
            {type === 'signin' ? 'Sign Up' : 'Sign In'}
          </Button>
        </Link>
      </p>
    </div>
  );
};
