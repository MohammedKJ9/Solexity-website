import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Download, TrendingUp, Activity, Globe, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  browser: string;
  isActive: boolean;
  lastActive: string;
}

interface Analytics {
  _id: string;
  eventType: string;
  browser: string;
  timestamp: string;
}

interface Download {
  _id: string;
  browser: string;
  platform: string;
  status: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersRes, analyticsRes, downloadsRes] = await Promise.all([
        fetch('/api/users').then(res => res.json()),
        fetch('/api/analytics').then(res => res.json()),
        fetch('/api/downloads').then(res => res.json()),
      ]);

      setUsers(usersRes.data || []);
      setAnalytics(analyticsRes.data || []);
      setDownloads(downloadsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate insights
  const insights = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalAnalytics: analytics.length,
    totalDownloads: downloads.length,
    successfulDownloads: downloads.filter(d => d.status === 'completed').length,
    successRate: downloads.length > 0 ? Math.round((downloads.filter(d => d.status === 'completed').length / downloads.length) * 100) : 0,
    topBrowser: analytics.length > 0 ? 
      Object.entries(analytics.reduce((acc, event) => {
        acc[event.browser] = (acc[event.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)).sort(([,a], [,b]) => b - a)[0]?.[0] : 'N/A',
    recentActivity: analytics.filter(event => {
      const eventDate = new Date(event.timestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - eventDate.getTime()) / (1000 * 60 * 60);
      return hoursDiff < 24;
    }).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-4">
            {error}
          </div>
          <button 
            onClick={fetchData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solexity Admin Dashboard</h1>
          <p className="text-gray-600">Real-time insights and analytics for your AI extension</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{insights.totalUsers}</p>
                <p className="text-sm text-green-600">{insights.activeUsers} active</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analytics Events</p>
                <p className="text-3xl font-bold text-gray-900">{insights.totalAnalytics}</p>
                <p className="text-sm text-blue-600">{insights.recentActivity} today</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Downloads</p>
                <p className="text-3xl font-bold text-gray-900">{insights.totalDownloads}</p>
                <p className="text-sm text-green-600">{insights.successfulDownloads} successful</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{insights.successRate}%</p>
                <p className="text-sm text-gray-600">Top: {insights.topBrowser}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'analytics', name: 'Analytics', icon: Activity },
                { id: 'downloads', name: 'Downloads', icon: Download }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {analytics.slice(0, 5).map((event) => (
                        <div key={event._id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Activity className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{event.eventType}</p>
                            <p className="text-sm text-gray-500">{event.browser} • {new Date(event.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Most Popular Browser</span>
                        <span className="font-semibold text-gray-900">{insights.topBrowser}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Active Users</span>
                        <span className="font-semibold text-green-600">{insights.activeUsers}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="text-gray-600">Today's Events</span>
                        <span className="font-semibold text-blue-600">{insights.recentActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <span className="text-sm text-gray-500">{users.length} total users</span>
                </div>
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">{user.browser}</span>
                        {user.isActive ? (
                          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full flex items-center">
                            <XCircle className="w-3 h-3 mr-1" />
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Events</h3>
                  <span className="text-sm text-gray-500">{analytics.length} total events</span>
                </div>
                <div className="grid gap-4">
                  {analytics.slice(0, 10).map((event) => (
                    <div key={event._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Activity className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{event.eventType}</p>
                          <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{event.browser}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Download Records</h3>
                  <span className="text-sm text-gray-500">{downloads.length} total downloads</span>
                </div>
                <div className="grid gap-4">
                  {downloads.slice(0, 10).map((download) => (
                    <div key={download._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Download className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{download.browser} on {download.platform}</p>
                          <p className="text-sm text-gray-500">{new Date(download.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {download.status === 'completed' ? (
                          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        ) : download.status === 'initiated' ? (
                          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Initiated
                          </span>
                        ) : (
                          <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full flex items-center">
                            <XCircle className="w-3 h-3 mr-1" />
                            Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium transform hover:scale-105"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
