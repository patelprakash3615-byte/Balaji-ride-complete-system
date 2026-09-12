# 🚗 Balaji Ride - Complete System

A full-stack ride-sharing application with Customer App, Driver App, Admin Dashboard, and Backend API.

## 📋 Project Structure

```
Balaji-ride-complete-system/
├── backend/                 # Node.js Express API
├── customer-app/            # React Native (Customer)
├── driver-app/              # React Native (Driver)
├── admin-dashboard/         # React Admin Panel
├── database/                # MongoDB Schemas
└── docs/                    # Documentation
```

## 🎯 Features

### Customer App
- ✅ Live GPS Location
- ✅ Book Rides (Bike, Auto, Taxi)
- ✅ Real-time Tracking
- ✅ Payment (Razorpay)
- ✅ Ratings & Reviews
- ✅ Booking History
- ✅ Support Tickets
- ✅ Profile Management

### Driver App
- ✅ Accept/Reject Bookings
- ✅ Live Location Sharing
- ✅ Navigation (Google Maps)
- ✅ Earnings Dashboard
- ✅ Ratings System
- ✅ Trip History

### Admin Dashboard
- ✅ Real-time Analytics
- ✅ Driver Management
- ✅ Customer Management
- ✅ Payment Tracking
- ✅ Support Tickets
- ✅ Revenue Reports

### Backend API
- ✅ User Authentication (JWT)
- ✅ Booking Management
- ✅ Real-time GPS Tracking
- ✅ Payment Processing
- ✅ Push Notifications
- ✅ Admin APIs

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Mobile**: React Native, Expo
- **Admin**: React, Redux
- **Payment**: Razorpay
- **Maps**: Google Maps API
- **Notifications**: Firebase Cloud Messaging
- **Real-time**: Socket.io

## 📱 Installation

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Customer App
```bash
cd customer-app
npm install
expo start
```

### Driver App
```bash
cd driver-app
npm install
expo start
```

### Admin Dashboard
```bash
cd admin-dashboard
npm install
npm start
```

## 🔐 Environment Variables

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
GOOGLE_MAPS_API=your_google_maps_api
FIREBASE_CONFIG=your_firebase_config
PORT=5000
```

## 📊 Database Models

- User (Customer)
- Driver
- Booking
- Payment
- Rating
- Support Ticket

## 🚀 Deployment

- Backend: Heroku / AWS
- Mobile: Play Store / App Store
- Admin: Vercel / Netlify

## 📞 Support

Phone: +91 7073811051
WhatsApp: https://wa.me/917073811051
Email: support@balajiride.com

## 📄 License

MIT License - 2024 Balaji Ride

---

**Author**: patelprakash3615-byte
**Version**: 1.0.0
**Last Updated**: 2024