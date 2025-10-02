import { NextRequest, NextResponse } from 'next/server';
import { getSessionAction } from './services/auth.service';
import { Session } from './types/auth';

const PUBLIC_ROUTES = ['/onboarding', '/welcome', '/signin', '/signup', '/'];

async function getSession(): Promise<Session | null> {
  try {
    const response = await getSessionAction();

    return response || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  // const isPublicRoute = true;
  const isAuthenticated = request.cookies.get('access_token')?.value;

  // If it's a public route, allow access without session validation
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check if user has access token
  if (!isAuthenticated) {
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('access_token');
    return response;
  }

  // For protected routes with access token, validate the session
  const session = await getSession();
  if (!session) {
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('access_token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
