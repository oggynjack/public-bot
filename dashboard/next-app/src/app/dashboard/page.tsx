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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [botControlStatus, setBotControlStatus] = useState('');

  async function controlBot(action: string) {
    setBotControlStatus(`Sending ${action} command...`);
    try {
      const res = await fetch(`/api/bot/${action}`, { method: 'POST' });
      if (!res.ok) {
        throw new Error(`Failed to ${action} bot`);
      }
      const json = await res.json();
      setBotControlStatus(json.message);
      // refresh data
      fetchData();
    } catch (err) {
      setBotControlStatus(err.message);
    }
  }

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

  useEffect(() => {
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
        <Link href="/" className="text-xl text-blue-400 hover:underline mt-4">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            <Link href="/dashboard/docs" className="text-xl text-blue-400 hover:underline">
              Docs
            </Link>
            <Link href="/dashboard/subscription" className="text-xl text-blue-400 hover:underline">
              Subscription
            </Link>
            <Link href="/dashboard/bot" className="text-xl text-blue-400 hover:underline">
              Bot Management
            </Link>
            <Link href="/dashboard/music" className="text-xl text-blue-400 hover:underline">
              Music Settings
            </Link>
            <Link href="/dashboard/plans" className="text-xl text-blue-400 hover:underline">
              Plans
            </Link>
            <Link href="/" className="text-xl text-blue-400 hover:underline">
              Go to Home
            </Link>
            <button
              onClick={async () => {
                await fetch('/api/logout');
                window.location.href = '/';
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">{data.botInstance.botName}</h2>
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
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p>24/7 Mode: {data.botInstance.enable247 ? 'Enabled' : 'Disabled'}</p>
              <p>Autoplay: {data.botInstance.enableAutoplay ? 'Enabled' : 'Disabled'}</p>
              <p>Default Volume: {data.botInstance.defaultVolume}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Bot Control</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => controlBot('start')}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Start
                </button>
                <button
                  onClick={() => controlBot('stop')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Stop
                </button>
                <button
                  onClick={() => controlBot('restart')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Restart
                </button>
              </div>
              {botControlStatus && <p className="mt-4">{botControlStatus}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
