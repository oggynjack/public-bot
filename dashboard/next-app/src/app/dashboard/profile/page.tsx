'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BotProfile {
  botName: string;
  avatarUrl: string;
}

export default function BotProfilePage() {
  const [profile, setProfile] = useState<BotProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/bot-profile');
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const json = await res.json();
        setProfile(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveStatus('Saving...');
    try {
      const res = await fetch('/api/bot-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        throw new Error('Failed to save profile');
      }
      const json = await res.json();
      setSaveStatus(json.message);
    } catch (err: any) {
      setSaveStatus(err.message);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-2xl text-red-500">Error: {error}</div>
        <Link href="/dashboard" className="text-xl text-blue-400 hover:underline mt-4">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Bot Profile</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {profile && (
          <form onSubmit={saveProfile} className="bg-gray-800 p-8 rounded-lg">
            <div className="mb-4">
              <label htmlFor="botName" className="block text-lg font-bold mb-2">
                Bot Name
              </label>
              <input
                type="text"
                id="botName"
                value={profile.botName}
                onChange={(e) =>
                  setProfile({ ...profile, botName: e.target.value })
                }
                className="w-full bg-gray-700 text-white p-2 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="avatarUrl" className="block text-lg font-bold mb-2">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatarUrl"
                value={profile.avatarUrl}
                onChange={(e) =>
                  setProfile({ ...profile, avatarUrl: e.target.value })
                }
                className="w-full bg-gray-700 text-white p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Profile
            </button>
            {saveStatus && <p className="mt-4">{saveStatus}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
