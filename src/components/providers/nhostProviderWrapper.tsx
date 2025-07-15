'use client'

import { ReactNode } from 'react'
import { NhostProvider } from '@nhost/nextjs'
import { nhost } from '@/lib/nhost'

export default function NhostProviderWrapper({ children }: { children: ReactNode }) {
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>
}