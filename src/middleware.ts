import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function isValidToken(token: string): Promise<boolean> {
  try {
    const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp > currentTime;
  } catch (e) {
    console.error("토큰 검증 에러:", e);
    return false;
  }
}

async function reissueTokensViaBackend(): Promise<NextResponse | null> {
  try {
    const reissueApiUrl = 'https://api.chaeum.site/api/v1/reissue';

    const response = await fetch(reissueApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      return NextResponse.next();
    } else {
      const errorText = await response.text();
      console.error(`토큰 재발급 실패: ${response.status}, ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const loginPage = '/landing';
  const mainPage = '/';

  const accessToken = request.cookies.get('AccessToken')?.value;
  const refreshToken = request.cookies.get('refresh')?.value;

  let hasValidAccessToken = false;
  let hasValidRefreshToken = false;

  if (accessToken) {
    hasValidAccessToken = await isValidToken(accessToken);
  }
  if (refreshToken) {
    hasValidRefreshToken = await isValidToken(refreshToken);
  }

  const isAuthenticated = hasValidAccessToken || hasValidRefreshToken;

  if (pathname === loginPage && isAuthenticated) {
    return NextResponse.redirect(new URL(mainPage, request.url));
  }
  if (pathname !== loginPage) {
    if (!isAuthenticated) {
      const response = NextResponse.redirect(new URL(loginPage, request.url));
      response.cookies.delete('AccessToken');
      response.cookies.delete('refresh');
      return response;
    }

    if (!hasValidAccessToken && hasValidRefreshToken) {
      const reissueResponse = await reissueTokensViaBackend();

      if (reissueResponse) {
        return reissueResponse;
      } else {
        const response = NextResponse.redirect(new URL(loginPage, request.url));
        response.cookies.delete('AccessToken');
        response.cookies.delete('refresh');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|landing|oauth/redirect|.*\\..*).*)',
  ],
};