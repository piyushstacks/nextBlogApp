'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Get admin credentials from environment variables
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    // Check if already authenticated
    const authFromStorage = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    if (authFromStorage) {
      try {
        const authData = JSON.parse(authFromStorage);
        if (authData && authData.isAdmin) {
          // Already authenticated, redirect to admin
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Checking credentials...");
      console.log("Input email:", email);
      console.log("Admin email:", ADMIN_EMAIL);
      
      // Simple credential check
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log("Credentials match! Authenticating...");
        
        // Create auth data
        const authData = {
          isAdmin: true,
          email: email,
          timestamp: new Date().toISOString()
        };
        
        // Store auth in localStorage or sessionStorage based on remember me
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('adminAuth', JSON.stringify(authData));
        
        // Also set a cookie for middleware
        document.cookie = `adminAuth=${JSON.stringify(authData)}; path=/; max-age=${rememberMe ? 86400 * 7 : 3600}`;

        toast.success('Signed in successfully!');
        console.log("Redirecting to admin page...");
        
        // Use replace instead of push for more reliable redirection
        setTimeout(() => {
          router.replace('/admin');
        }, 500);
      } else {
        console.log("Invalid credentials");
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? 
          <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium ml-1">Sign up</a>
        </div>
        
        {/* Helper text for demo purposes */}
        <div className="mt-8 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p><strong>Demo credentials:</strong></p>
          <p>Email: admin@example.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
} 