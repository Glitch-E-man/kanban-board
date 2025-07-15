'use client'

import { useState } from 'react'
import { useSignInEmailPassword } from '@nhost/nextjs'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    signInEmailPassword(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  )
}
