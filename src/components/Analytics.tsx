import { useEffect } from 'react';
import { apiUtils } from '../services/api';

interface AnalyticsProps {
  pageName: string;
}

export function Analytics({ pageName }: AnalyticsProps) {
  useEffect(() => {
    // Track page view with our API
    const trackPageView = async () => {
      try {
        await apiUtils.trackPageView(pageName, {
          referrer: document.referrer,
          screenResolution: `${screen.width}x${screen.height}`,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();

    // Also track with Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href,
      });

      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
      });
    }
  }, [pageName]);

  return null;
}

// Track button clicks and other interactions
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  // Track with our API
  apiUtils.trackButtonClick(eventName, parameters);
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Track download clicks
export function trackDownload(browser: 'chrome') {
  // Track with our API
  apiUtils.trackDownloadClick(browser, 'webstore');
  
  // Also track with Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download_click', {
      browser,
      page_location: window.location.href,
    });
  }
}



// Track contact clicks
export function trackContactClick(method: 'email' | 'phone') {
  trackEvent('contact_click', {
    method,
    page_location: window.location.href,
  });
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
