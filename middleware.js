import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define public routes
  const isPublicRoute = 
    path === '/' || 
    path.startsWith('/sign-in') ||
    path.startsWith('/sign-up') ||
    path.startsWith('/blogs/') ||
    (path.startsWith('/api/') && !path.startsWith('/api/admin'));
  
  // Check if user is authenticated by looking for the auth cookie
  const authCookie = request.cookies.get('adminAuth');
  let isAuthenticated = false;
  
  if (authCookie?.value) {
    try {
      const authData = JSON.parse(authCookie.value);
      isAuthenticated = authData && authData.isAdmin === true;
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
    }
  }
  
  // If the route is protected and the user is not authenticated, redirect to sign-in
  if (!isPublicRoute && !isAuthenticated) {
    console.log(`Middleware: Redirecting to sign-in from ${path}`);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  
  // If the user is trying to access sign-in but is already authenticated, redirect to admin
  if (path.startsWith('/sign-in') && isAuthenticated) {
    console.log('Middleware: Already authenticated, redirecting to admin');
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 