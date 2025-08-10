import Link from 'next/link';

const plans = [
  {
    name: 'Premium',
    price: '$5/month',
    features: [
      'Your own bot instance',
      '24/7 hosting',
      'Premium music quality',
      'Customizable bot profile',
      'Access to all music commands',
    ],
  },
  {
    name: 'Premium+',
    price: '$10/month',
    features: [
      'All Premium features',
      'AI-powered music recommendations',
      'Advanced server statistics',
      'Priority support',
    ],
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Plans</h1>
          <Link href="/dashboard" className="text-xl text-blue-400 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">{plan.name}</h2>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
