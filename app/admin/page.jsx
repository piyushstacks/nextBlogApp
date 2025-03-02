'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for authentication in localStorage or sessionStorage
        const authFromStorage = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
        
        if (!authFromStorage) {
          console.log("No auth data in storage, redirecting to sign-in");
          router.replace('/sign-in');
          return;
        }
        
        try {
          const authData = JSON.parse(authFromStorage);
          
          // Verify with the server
          const response = await fetch('/api/check-auth');
          const data = await response.json();
          
          if (data.authenticated && authData && authData.isAdmin) {
            console.log("Authentication verified");
            setIsAuthenticated(true);
            setAdminData(authData);
          } else {
            console.log("Authentication failed, redirecting to sign-in");
            toast.error('Authentication failed. Please sign in again.');
            router.replace('/sign-in');
          }
        } catch (error) {
          console.error('Error parsing auth data:', error);
          router.replace('/sign-in');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuth');
    
    // Also clear the cookie
    document.cookie = 'adminAuth=; path=/; max-age=0';
    
    toast.success('Signed out successfully');
    router.replace('/sign-in');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen">Checking authentication...</div>;
  }

  return (
    <div className='flex flex-col justify-center items-center p-10 min-h-screen'>
      <h1 className="text-4xl font-bold mb-8">Welcome to Admin Panel</h1>
      
      <div className="bg-green-100 p-6 rounded-lg border border-green-300 mb-6">
        <p className="mb-2">You are signed in as: <strong>{adminData?.email}</strong></p>
        <p>Authentication timestamp: {new Date(adminData?.timestamp).toLocaleString()}</p>
      </div>
      
      <button 
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
