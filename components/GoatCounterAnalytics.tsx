'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Dashboard: https://rafseb.goatcounter.com — GoatCounter is cookie-less and
// stores no personal data, so it loads for all visitors without consent.
const GOATCOUNTER_ENDPOINT = 'https://rafseb.goatcounter.com/count';

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; title?: string; event?: boolean }) => void;
    };
  }
}

function countPageView() {
  // location.pathname includes the /seatax basePath, unlike usePathname()
  window.goatcounter?.count({ path: location.pathname });
}

export default function GoatCounterAnalytics() {
  const pathname = usePathname();

  // Auto-count is disabled (no_onload) because App Router client navigation
  // doesn't reload the page; count on every pathname change instead. Query
  // params are intentionally ignored — the calculator rewrites them on every
  // input change, which is not a new page view.
  useEffect(() => {
    countPageView();
  }, [pathname]);

  return (
    <Script
      data-goatcounter={GOATCOUNTER_ENDPOINT}
      data-goatcounter-settings='{"no_onload": true}'
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
      // The first pathname effect fires before the script has loaded and is a
      // no-op, so the initial page view is counted here instead.
      onLoad={countPageView}
    />
  );
}
