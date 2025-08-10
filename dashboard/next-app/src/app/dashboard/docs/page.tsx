import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
          <p className="text-xl mb-4">
            Welcome to your new music bot! Here's how to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>Invite the bot to your server.</li>
            <li>Use the `/play` command to start playing music.</li>
            <li>Use the `/help` command to see all available commands.</li>
          </ol>

          <h2 className="text-3xl font-bold mt-8 mb-4">Commands</h2>
          <p className="text-xl mb-4">
            Here are some of the most common commands:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>`/play [song name or url]` - Plays a song.</li>
            <li>`/skip` - Skips the current song.</li>
            <li>`/queue` - Shows the current queue.</li>
            <li>`/pause` - Pauses the music.</li>
            <li>`/resume` - Resumes the music.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
