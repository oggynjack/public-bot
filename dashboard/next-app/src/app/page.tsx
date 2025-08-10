'use client';

import Link from 'next/link';

export default function HomePage() {
  async function login() {
    await fetch('/api/login');
    window.location.href = '/dashboard';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to the new dashboard!</h1>
      <div className="flex space-x-4">
        <button
          onClick={login}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <Link
          href="/dashboard"
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
