'use client';
import { useUserData } from '@nhost/nextjs'
import LogoutButton from './logout'
import Link from 'next/link'

export default function Navbar() {
  const user = useUserData()

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white p-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
          Kanban Board
        </Link>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:inline text-gray-300">
              {user.displayName || user.email?.split('@')[0]}
            </span>
          )}
          <LogoutButton />
        </div>
      </div>
    </nav>
  )
}