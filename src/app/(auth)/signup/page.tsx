import { Navigator } from '../components/navigation/navigator';
import { SignUpForm } from '../components/form/signup-form';
import { Footer } from '../components/footer/footer';

export default function SignUp() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center px-10 py-6'>
      <Navigator currentPage='Sign Up' />
      <div className='mt-12 flex flex-col gap-2 text-center'>
        <h1 className='text-primary text-2xl font-semibold'>Welcome</h1>
        <p className='text-secondary-text text-sm'>
          Please enter your account here
        </p>
      </div>
      <div className='mt-20 flex h-full w-full flex-col items-center justify-center'>
        <SignUpForm />
      </div>
      <div className='mt-auto'>
        <Footer type='signup' />
      </div>
    </div>
  );
}
