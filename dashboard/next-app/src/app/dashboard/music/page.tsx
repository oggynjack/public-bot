'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MusicSettings {
  defaultVolume: number;
  enable247: boolean;
  enableAutoplay: boolean;
}

export default function MusicSettingsPage() {
  const [settings, setSettings] = useState<MusicSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/music-settings');
        if (!res.ok) {
          throw new Error('Failed to fetch settings');
        }
        const json = await res.json();
        setSettings(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveStatus('Saving...');
    try {
      const res = await fetch('/api/music-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        throw new Error('Failed to save settings');
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
          <h1 className="text-4xl font-bold">Music Settings</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {settings && (
          <form onSubmit={saveSettings} className="bg-gray-800 p-8 rounded-lg">
            <div className="mb-4">
              <label htmlFor="defaultVolume" className="block text-lg font-bold mb-2">
                Default Volume
              </label>
              <input
                type="range"
                id="defaultVolume"
                min="0"
                max="100"
                value={settings.defaultVolume}
                onChange={(e) =>
                  setSettings({ ...settings, defaultVolume: Number(e.target.value) })
                }
                className="w-full"
              />
              <span className="text-lg">{settings.defaultVolume}</span>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enable247}
                  onChange={(e) =>
                    setSettings({ ...settings, enable247: e.target.checked })
                  }
                  className="mr-2"
                />
                Enable 24/7 Mode
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAutoplay}
                  onChange={(e) =>
                    setSettings({ ...settings, enableAutoplay: e.target.checked })
                  }
                  className="mr-2"
                />
                Enable Autoplay
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Settings
            </button>
            {saveStatus && <p className="mt-4">{saveStatus}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
