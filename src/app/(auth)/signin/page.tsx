import { Navigator } from '../components/navigation/navigator';
import { SignInForm } from '../components/form/signin-form';
import { Footer } from '../components/footer/footer';

export default function SignIn() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center px-10 py-6'>
      <Navigator currentPage='Sign In' />
      <div className='mt-20 flex flex-col gap-2 text-center'>
        <h1 className='text-primary text-2xl font-semibold'>Welcome back</h1>
        <p className='text-secondary-text text-sm'>
          Please enter your account here
        </p>
      </div>
      <div className='mt-auto flex h-full w-full flex-col items-center justify-center gap-16'>
        <SignInForm />
        <Footer type='signin' />
      </div>
    </div>
  );
}
