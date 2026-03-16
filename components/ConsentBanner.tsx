'use client';

import { useState } from 'react';

const CONSENT_KEY = 'sea-tax-consent';

function checkConsented(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

export default function ConsentBanner() {
  // Lazy initialization: read localStorage once synchronously at mount
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !checkConsented();
  });

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      // localStorage unavailable
    }
    window.dispatchEvent(new Event('sea-tax-consent'));
    setVisible(false);
  }

  function handleDecline() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-gray-600">
          We use Google AdSense to show ads. Accept to continue.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
