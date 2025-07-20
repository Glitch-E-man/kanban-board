'use client';
import dynamic from 'next/dynamic';

const BoardClient = dynamic(() => import('./boardclient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <p className="text-center">Loading board...</p>
      </div>
    </div>
  )
});

export default BoardClient;