'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Booking {
  id: string;
  service_type: string;
  customer_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  created_at: string;
}

interface ServiceStats {
  service_name: string;
  total_bookings: number;
  total_revenue: number;
  average_rating: number;
}

interface DashboardStats {
  total_bookings: number;
  total_revenue: number;
  pending_bookings: number;
  confirmed_bookings: number;
  cancelled_bookings: number;
  completed_bookings: number;
  today_bookings: number;
  this_month_revenue: number;
  top_services: ServiceStats[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Calculate stats
      const dashboardStats = calculateStats(bookingsData || []);
      setStats(dashboardStats);
      setBookings(bookingsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookingsData: Booking[]): DashboardStats => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const thisMonth = now.toISOString().slice(0, 7); // YYYY-MM

    const totalBookings = bookingsData.length;
    const totalRevenue = bookingsData.reduce((sum, booking) => sum + booking.price, 0);
    
    const statusCounts = bookingsData.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const todayBookings = bookingsData.filter(booking => 
      booking.date === today
    ).length;

    const thisMonthBookings = bookingsData.filter(booking => 
      booking.date.startsWith(thisMonth)
    );
    const thisMonthRevenue = thisMonthBookings.reduce((sum, booking) => sum + booking.price, 0);

    // Calculate service stats
    const serviceStats = bookingsData.reduce((acc, booking) => {
      const existing = acc.find(s => s.service_name === booking.service_type);
      if (existing) {
        existing.total_bookings++;
        existing.total_revenue += booking.price;
      } else {
        acc.push({
          service_name: booking.service_type,
          total_bookings: 1,
          total_revenue: booking.price,
          average_rating: 4.5 // Placeholder - would come from reviews table
        });
      }
      return acc;
    }, [] as ServiceStats[]).sort((a, b) => b.total_revenue - a.total_revenue);

    return {
      total_bookings: totalBookings,
      total_revenue: totalRevenue,
      pending_bookings: statusCounts.pending || 0,
      confirmed_bookings: statusCounts.confirmed || 0,
      cancelled_bookings: statusCounts.cancelled || 0,
      completed_bookings: statusCounts.completed || 0,
      today_bookings: todayBookings,
      this_month_revenue: thisMonthRevenue,
      top_services: serviceStats.slice(0, 5)
    };
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      setIsAuthenticated(true);
      await fetchDashboardData();
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setBookings([]);
    setStats(null);
  };

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      // Refresh data
      await fetchDashboardData();
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kwetu Place</h1>
            <p className="text-gray-600">Admin Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="admin@kwetuplace.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Content
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kwetu Place Admin</h1>
              <p className="text-sm text-gray-600">Dashboard Management System</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'bookings', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-yellow-500 rounded-full">
                        <i className="fas fa-calendar text-white text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total_bookings}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-500 rounded-full">
                        <i className="fas fa-dollar-sign text-white text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_revenue)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <i className="fas fa-clock text-white text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending_bookings}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-500 rounded-full">
                        <i className="fas fa-shopping-cart text-white text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.this_month_revenue)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Services */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Services</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats.top_services.map((service, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.service_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.total_bookings}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(service.total_revenue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">All Bookings</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(booking.price)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {booking.status === 'pending' && (
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    Confirm
                                  </button>
                                )}
                                {booking.status === 'confirmed' && (
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Complete
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <button
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Analytics</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-4">Booking Status Breakdown</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending:</span>
                          <span className="font-bold text-yellow-600">{stats?.pending_bookings || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confirmed:</span>
                          <span className="font-bold text-green-600">{stats?.confirmed_bookings || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-bold text-blue-600">{stats?.completed_bookings || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancelled:</span>
                          <span className="font-bold text-red-600">{stats?.cancelled_bookings || 0}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-4">Monthly Performance</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Today's Bookings:</span>
                          <span className="font-bold text-purple-600">{stats?.today_bookings || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">This Month Revenue:</span>
                          <span className="font-bold text-green-600">{formatCurrency(stats?.this_month_revenue || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average Booking Value:</span>
                          <span className="font-bold text-blue-600">
                            {stats?.total_bookings ? formatCurrency(stats.total_revenue / stats.total_bookings) : formatCurrency(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">System Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-700 mb-2">Business Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                          <input
                            type="text"
                            defaultValue="Kwetu Place"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                          <input
                            type="email"
                            defaultValue="info@kwetuplace.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            defaultValue="+254 123 456 789"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            defaultValue="Ruiru, Nairobi, Kenya"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
