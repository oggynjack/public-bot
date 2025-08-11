'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [botToken, setBotToken] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [status, setStatus] = useState('');

  async function setupBot(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Setting up bot...');
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken, applicationId }),
      });
      if (!res.ok) {
        throw new Error('Failed to setup bot');
      }
      const json = await res.json();
      setStatus(json.message);
      if (json.success) {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setStatus(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Bot Setup</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={setupBot} className="bg-gray-800 p-8 rounded-lg">
          <div className="mb-4">
            <label htmlFor="botToken" className="block text-lg font-bold mb-2">
              Bot Token
            </label>
            <input
              type="text"
              id="botToken"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="applicationId" className="block text-lg font-bold mb-2">
              Application ID
            </label>
            <input
              type="text"
              id="applicationId"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Setup Bot
          </button>
          {status && <p className="mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
}
