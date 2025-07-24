'use client'

import { useSignOut } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const { signOut } = useSignOut()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('')
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
    >
      Sign Out
    </button>
  )
}