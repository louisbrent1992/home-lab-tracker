import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  let deviceId = request.cookies.get('tracker_device_id')?.value

  // If no device tracking cookie exists, generate a persistent UUID to track their individual progress anonymously
  if (!deviceId) {
    deviceId = crypto.randomUUID()
    
    // Expose the new cookie to the immediate initial server-render request
    const requestHeaders = new Headers(request.headers)
    const existingCookies = requestHeaders.get('Cookie') || ''
    requestHeaders.set('Cookie', `${existingCookies}; tracker_device_id=${deviceId}`)
    
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    
    // Set cookie persistently in the user's browser (expires in 1 year)
    response.cookies.set('tracker_device_id', deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax'
    })
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
