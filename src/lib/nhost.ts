'use client'

import { NhostClient } from '@nhost/nextjs'

console.log('Subdomain:', process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN)
console.log('Region:', process.env.NEXT_PUBLIC_NHOST_REGION)

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
})
