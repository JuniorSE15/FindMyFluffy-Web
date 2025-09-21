import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  AuthResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
} from '@/types/auth';
import {
  getSessionAction,
  loginAction,
  registerAction,
} from '@/services/auth.service';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const router = useRouter();
  const { session, setSession, isAuthenticated, logout } = useAuthStore();

  const { mutate: registerMutation, isPending: isRegisterPending } =
    useMutation<void, Error, RegisterRequestDto>({
      mutationFn: async (data: RegisterRequestDto) => {
        await registerAction(data);
      },
      onSuccess: () => {
        toast.success('User registered successfully!', {
          description: 'You can now log in with your new account.',
        });
        router.push('/signin');
      },
      onError: (error) => {
        toast.error('Register failed: ', {
          description:
            error instanceof Error ? error.message : 'Please try again later.',
        });
      },
    });

  const { mutate: loginMutation, isPending: isLoginPending } = useMutation<
    AuthResponseDto,
    Error,
    LoginRequestDto
  >({
    mutationFn: async (data: LoginRequestDto): Promise<AuthResponseDto> => {
      try {
        const response = await loginAction(data);

        if (!response) {
          throw new Error('Login failed: No response data');
        }

        return response;
      } catch (error) {
        console.error(error);
        throw error instanceof Error ? error : new Error('Login failed');
      }
    },
    onSuccess: async (data) => {
      if (data.accessToken.value && data.refreshToken.value && data.expiresIn) {
        // expires in "01:00:00" format - convert to milliseconds
        console.log('expiresIn', data.expiresIn);
        const [hours, minutes, seconds] = data.expiresIn.split(':').map(Number);
        const expiresInMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
        const expiresIn = new Date(Date.now() + expiresInMs);
        Cookies.set('access_token', data.accessToken.value, {
          expires: expiresIn,
        });
        Cookies.set('refresh_token', data.refreshToken.value);
        // setAccessToken(data.accessToken.value);
        // setRefreshToken(data.refreshToken.value);
        // setIsAuthenticated(true);

        const session = await getSessionAction();
        if (!session) {
          throw new Error('Login failed: Invalid session data');
        }
        setSession(session);
      } else {
        throw new Error('Login failed: Invalid response data');
      }

      toast.success('Logged in successfully!', {
        description: 'You can now access your account.',
      });
      router.push('/');
    },
    onError: (error) => {
      toast.error('Login failed: ', {
        description:
          error instanceof Error ? error.message : 'Please try again later.',
      });
    },
  });

  return {
    registerMutation,
    isRegisterPending,
    loginMutation,
    isLoginPending,
    session,
    logout,
    isAuthenticated,
  };
};
