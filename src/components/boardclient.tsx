
'use client';
import React, { useState, useEffect } from 'react';
import { useAuthenticationStatus, useSignInEmailPassword, useSignUpEmailPassword } from '@nhost/nextjs';
import Board from './board';
import Navbar from '@/components/navbar';



export default function BoardClient() {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const { signInEmailPassword, isLoading: signingIn, error: signInError } = useSignInEmailPassword();
  const { signUpEmailPassword, isLoading: signingUp, error: signUpError } = useSignUpEmailPassword();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) {
      await signUpEmailPassword(email, password);
    } else {
      await signInEmailPassword(email, password);
    }
  };

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-500">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <p className="text-center">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      
      <div className="flex items-center justify-center h-screen bg-gray-500">
        <form
          onSubmit={handleAuth}
          className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-sm"
        >
          <h2 className="text-xl font-semibold text-center text-black">
            {isSigningUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
          <button
            type="submit"
            disabled={signingIn || signingUp}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {signingIn || signingUp
              ? 'Processing...'
              : isSigningUp
              ? 'Create Account'
              : 'Log In'}
          </button>
          {(signInError || signUpError) && (
            <p className="text-red-500 text-sm text-center">
              {(signInError || signUpError)?.message}
            </p>
          )}
          <p
            onClick={() => setIsSigningUp((prev) => !prev)}
            className="text-sm text-center text-blue-600 cursor-pointer"
          >
            {isSigningUp
              ? 'Already have an account? Sign In'
              : 'Don’t have an account? Sign Up'}
          </p>
        </form>
      </div>
    );
  }


  // 🔓 Authenticated: show the board
  
  return(
    <>
      <Navbar />
      <Board />
    </>
  ) 
}
