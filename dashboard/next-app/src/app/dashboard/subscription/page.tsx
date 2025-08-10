'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Subscription {
  plan: string;
  status: string;
  nextBillingDate: string;
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch('/api/subscription');
        if (!res.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const json = await res.json();
        setSubscription(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscription();
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
          <h1 className="text-4xl font-bold">Subscription</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        {subscription && (
          <div className="bg-gray-800 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Your Subscription</h2>
            <p className="text-xl">Plan: {subscription.plan}</p>
            <p className="text-xl">Status: {subscription.status}</p>
            <p className="text-xl">Next Billing Date: {subscription.nextBillingDate}</p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-8">
              Cancel Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
