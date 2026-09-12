import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';
let socket;

const DriverHomeScreen = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [rating, setRating] = useState(4.8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeSocket();
    startLocationTracking();
  }, []);

  const initializeSocket = () => {
    socket = io(SOCKET_URL);
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('new_booking', (data) => {
      Alert.alert('New Booking!', `Pickup: ${data.pickupLocation.address}`);
    });
  };

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000 },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentLocation({ latitude, longitude });
          
          // Emit location to server
          if (socket && isOnline) {
            socket.emit('driver_location', {
              driverId: 'driver123',
              latitude,
              longitude,
              timestamp: new Date(),
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOnlineStatus = async () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      Alert.alert('Online', '✅ You are now online and receiving bookings');
    } else {
      Alert.alert('Offline', '❌ You are now offline');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚗 Driver Dashboard</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <Switch
            value={isOnline}
            onValueChange={toggleOnlineStatus}
            trackColor={{ false: '#555', true: '#25D366' }}
            thumbColor={isOnline ? '#fff' : '#f4f3f4'}
          />
          <Text style={[styles.statusText, { color: isOnline ? '#25D366' : '#f44336' }]}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Earnings</Text>
          <Text style={styles.statValue}>₹{earnings}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Rides</Text>
          <Text style={styles.statValue}>{totalRides}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Rating</Text>
          <Text style={styles.statValue}>⭐ {rating}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Location</Text>
        {currentLocation ? (
          <Text style={styles.locationText}>
            📍 {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
          </Text>
        ) : (
          <ActivityIndicator size="large" color="#25D366" />
        )}
      </View>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpButtonText}>❓ Get Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    backgroundColor: '#25D366',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 8,
  },
  statusLabel: {
    color: '#000',
    fontWeight: 'bold',
    marginRight: 8,
  },
  statusText: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardTitle: {
    color: '#25D366',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
  },
  helpButton: {
    backgroundColor: '#333',
    margin: 12,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DriverHomeScreen;