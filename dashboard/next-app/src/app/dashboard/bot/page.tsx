'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BotInstance {
  botName: string;
  defaultVolume: number;
  enable247: boolean;
  enableAutoplay: boolean;
}

interface BotStatus {
  status: string;
  uptime: number;
}

interface Stats {
  guilds: number;
  users: number;
  songsPlayed: number;
}

interface DashboardData {
  botInstance: BotInstance;
  botStatus: BotStatus;
  stats: Stats;
}

export default function BotManagementPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          <h1 className="text-4xl font-bold">Bot Management</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Bot Info</h2>
              <p>Name: {data.botInstance.botName}</p>
              <p>Status: <span className={`font-bold ${data.botStatus.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>{data.botStatus.status}</span></p>
              <p>Uptime: {new Date(data.botStatus.uptime * 1000).toISOString().substr(11, 8)}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Stats</h2>
              <p>Servers: {data.stats.guilds}</p>
              <p>Users: {data.stats.users}</p>
              <p>Songs Played: {data.stats.songsPlayed}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Actions</h2>
              <div className="flex flex-col space-y-4">
                <Link href="/dashboard/music" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">
                  Music Settings
                </Link>
                <Link href="/dashboard/profile" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">
                  Bot Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
