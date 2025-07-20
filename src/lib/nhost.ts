'use client'

import { NhostClient } from '@nhost/nextjs'

const subdomain = process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN;
const region = process.env.NEXT_PUBLIC_NHOST_REGION;

if (!subdomain || !region) {
  throw new Error(`
    Missing Nhost configuration! Check:
    1. Does your .env.local file exist in the project root?
    2. Are variables prefixed with NEXT_PUBLIC_?
    3. Have you restarted the Next.js server after changing .env files?
  `);
}

export const nhost = new NhostClient({
  subdomain,
  region,
});