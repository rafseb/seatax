'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'sea-tax-consent';

function checkConsented(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export default function AdSenseLoader() {
  // Lazy initialization: read localStorage once synchronously at mount
  const [consented, setConsented] = useState(() => {
    if (typeof window === 'undefined') return false;
    return checkConsented();
  });

  useEffect(() => {
    // Listen for consent event from ConsentBanner
    function handleConsent() {
      setConsented(true);
    }
    window.addEventListener('sea-tax-consent', handleConsent);
    return () => window.removeEventListener('sea-tax-consent', handleConsent);
  }, []);

  if (!consented) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6203167402544939"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
