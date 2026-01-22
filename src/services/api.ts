// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  browser: string;
  extensionVersion: string;
  isActive: boolean;
  lastActive: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    analytics: boolean;
  };
  stats: {
    totalSessions: number;
    totalAnalytics: number;
    lastDownload?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  _id: string;
  userId: string;
  eventType: string;
  eventData: any;
  pageUrl?: string;
  browser: string;
  extensionVersion: string;
  sessionId?: string;
  timestamp: string;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    country?: string;
    city?: string;
    timezone?: string;
    screenResolution?: string;
    language?: string;
    referrer?: string;
  };
  performance?: {
    loadTime?: number;
    processingTime?: number;
    memoryUsage?: number;
  };
  errors: {
    hasError: boolean;
    errorMessage?: string;
    errorStack?: string;
    errorType?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Download {
  _id: string;
  userId?: string;
  browser: string;
  platform: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  downloadType: string;
  downloadSource: string;
  extensionVersion: string;
  timestamp: string;
  metadata?: {
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    sessionId?: string;
    pageUrl?: string;
  };
  status: string;
  fileInfo?: {
    size?: number;
    checksum?: string;
    fileName?: string;
  };
  errors: {
    hasError: boolean;
    errorMessage?: string;
    errorCode?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DownloadLinks {
  chrome: {
    webstore: string;
    direct: string;
    version: string;
    size: string;
  };
  firefox: {
    addons: string;
    direct: string;
    version: string;
    size: string;
  };
  edge: {
    webstore: string;
    direct: string;
    version: string;
    size: string;
  };
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// User API functions
export const userApi = {
  // Get all users
  getAll: () => apiRequest<User[]>('/users'),

  // Get user by ID
  getById: (id: string) => apiRequest<User>(`/users/${id}`),

  // Create new user
  create: (userData: {
    name: string;
    email: string;
    browser?: string;
    extensionVersion?: string;
  }) => apiRequest<User>('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  // Update user
  update: (id: string, userData: Partial<User>) => apiRequest<User>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),

  // Delete user
  delete: (id: string) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Analytics API functions
export const analyticsApi = {
  // Get all analytics
  getAll: () => apiRequest<Analytics[]>('/analytics'),

  // Get analytics by user ID
  getByUserId: (userId: string) => apiRequest<Analytics[]>(`/analytics/user/${userId}`),

  // Create new analytics entry
  create: (analyticsData: {
    userId?: string;
    eventType: string;
    eventData?: any;
    pageUrl?: string;
    browser?: string;
    extensionVersion?: string;
    sessionId?: string;
  }) => apiRequest<Analytics>('/analytics', {
    method: 'POST',
    body: JSON.stringify(analyticsData),
  }),

  // Get analytics summary
  getSummary: () => apiRequest('/analytics/summary'),

  // Get analytics by date range
  getByDateRange: (startDate: string, endDate: string) => 
    apiRequest<Analytics[]>(`/analytics/range?startDate=${startDate}&endDate=${endDate}`),
};

// Download API functions
export const downloadApi = {
  // Get all downloads
  getAll: () => apiRequest<Download[]>('/downloads'),

  // Get download by ID
  getById: (id: string) => apiRequest<Download>(`/downloads/${id}`),

  // Create new download record
  create: (downloadData: {
    userId?: string;
    browser: string;
    platform: string;
    userAgent?: string;
    ipAddress?: string;
    country?: string;
    city?: string;
    downloadType: string;
  }) => apiRequest<Download>('/downloads', {
    method: 'POST',
    body: JSON.stringify(downloadData),
  }),

  // Get download statistics
  getStats: () => apiRequest('/downloads/stats/summary'),

  // Get downloads by date range
  getByDateRange: (startDate: string, endDate: string) => 
    apiRequest<Download[]>(`/downloads/stats/range?startDate=${startDate}&endDate=${endDate}`),

  // Get download links
  getLinks: () => apiRequest<DownloadLinks>('/downloads/links'),
};

// Health check
export const healthApi = {
  check: () => apiRequest('/health'),
};

// Utility functions
export const apiUtils = {
  // Track page view
  trackPageView: (pageName: string, additionalData?: any) => {
    return analyticsApi.create({
      eventType: 'page_visited',
      eventData: {
        pageName,
        ...additionalData,
      },
      pageUrl: window.location.href,
      browser: getBrowserInfo(),
      sessionId: getSessionId(),
    });
  },

  // Track button click
  trackButtonClick: (buttonName: string, additionalData?: any) => {
    return analyticsApi.create({
      eventType: 'button_clicked',
      eventData: {
        buttonName,
        ...additionalData,
      },
      pageUrl: window.location.href,
      browser: getBrowserInfo(),
      sessionId: getSessionId(),
    });
  },

  // Track download click
  trackDownloadClick: (browser: string, downloadType: string) => {
    return downloadApi.create({
      browser,
      platform: getPlatformInfo(),
      downloadType,
      userAgent: navigator.userAgent,
      sessionId: getSessionId(),
    });
  },
};

// Helper functions
function getBrowserInfo(): string {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('chrome')) return 'chrome';
  if (userAgent.includes('firefox')) return 'firefox';
  if (userAgent.includes('edge')) return 'edge';
  if (userAgent.includes('safari')) return 'safari';
  return 'other';
}

function getPlatformInfo(): string {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac')) return 'macos';
  if (platform.includes('linux')) return 'linux';
  if (platform.includes('android')) return 'android';
  if (platform.includes('iphone') || platform.includes('ipad')) return 'ios';
  return 'other';
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export default {
  userApi,
  analyticsApi,
  downloadApi,
  healthApi,
  apiUtils,
};
