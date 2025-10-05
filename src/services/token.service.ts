import { cookies } from 'next/headers';
import { AuthResponseDto } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5259';

export async function refreshTokenAction(): Promise<AuthResponseDto | null> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${BASE_URL}/api/Auth/refresh`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Refresh failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as AuthResponseDto;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
}
