import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import StatsCard from './components/StatsCard';
import BookingsList from './components/BookingsList';
import DriversList from './components/DriversList';
import RevenueChart from './components/RevenueChart';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    completedBookings: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchStats();
    fetchBookings();
    fetchDrivers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data.bookings);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await axios.get('/api/drivers');
      setDrivers(response.data.drivers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🚗 Balaji Ride Admin Dashboard</h1>
        <div className="header-actions">
          <span className="user-info">👤 Admin</span>
        </div>
      </header>

      <nav className="admin-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          📋 Bookings
        </button>
        <button
          className={`nav-btn ${activeTab === 'drivers' ? 'active' : ''}`}
          onClick={() => setActiveTab('drivers')}
        >
          👥 Drivers
        </button>
        <button
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📈 Analytics
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-view">
            <div className="stats-grid">
              <StatsCard
                title="Total Users"
                value={stats.totalUsers}
                icon="👥"
              />
              <StatsCard
                title="Total Drivers"
                value={stats.totalDrivers}
                icon="🚗"
              />
              <StatsCard
                title="Total Bookings"
                value={stats.totalBookings}
                icon="📋"
              />
              <StatsCard
                title="Completed Rides"
                value={stats.completedBookings}
                icon="✅"
              />
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <h3>Recent Bookings</h3>
                <BookingsList bookings={bookings.slice(0, 5)} />
              </div>
              <div className="card">
                <h3>Revenue Overview</h3>
                <RevenueChart />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-view">
            <h2>All Bookings</h2>
            <BookingsList bookings={bookings} />
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="drivers-view">
            <h2>Driver Management</h2>
            <DriversList drivers={drivers} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view">
            <h2>Analytics & Reports</h2>
            <RevenueChart />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;