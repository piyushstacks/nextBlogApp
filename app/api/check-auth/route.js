import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the auth cookie
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
  
  return NextResponse.json({ 
    authenticated: isAuthenticated 
  });
} 