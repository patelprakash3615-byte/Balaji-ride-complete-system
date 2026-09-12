import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const DashboardScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 23.1815,
    longitude: 79.9864,
  });
  const [upcomingBooking, setUpcomingBooking] = useState({
    id: '1',
    customerName: 'Priya Sharma',
    pickup: 'Station Road',
    drop: 'City Center',
    distance: '5 km',
    fare: '₹60',
    rating: 4.8,
  });
  const [totalEarnings, setTotalEarnings] = useState('₹2,450');
  const [acceptedTrips, setAcceptedTrips] = useState(8);

  useEffect(() => {
    startLocationTracking();
  }, []);

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      // Start tracking location
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      Alert.alert('Online', 'You are now online and visible to customers');
    } else {
      Alert.alert('Offline', 'You are offline');
    }
  };

  const acceptBooking = () => {
    Alert.alert('Booking Accepted', 'Head to pickup location', [
      {
        text: 'Navigate',
        onPress: () => navigation.navigate('Navigation'),
      },
      { text: 'Later' },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back!</Text>
          <Text style={styles.subGreeting}>Driver Mode</Text>
        </View>
        <View style={styles.statusToggle}>
          <Text style={[styles.statusText, isOnline && { color: '#25D366' }]}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          <Switch value={isOnline} onValueChange={toggleOnline} />
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          pinColor="green"
        />
      </MapView>

      {upcomingBooking && isOnline && (
        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingCustomer}>{upcomingBooking.customerName}</Text>
            <Text style={styles.bookingRating}>⭐ {upcomingBooking.rating}</Text>
          </View>

          <View style={styles.bookingLocation}>
            <Text style={styles.location}>📍 {upcomingBooking.pickup}</Text>
            <Text style={styles.location}>🏁 {upcomingBooking.drop}</Text>
          </View>

          <View style={styles.bookingDetails}>
            <Text style={styles.detail}>{upcomingBooking.distance}</Text>
            <Text style={styles.detail}>{upcomingBooking.fare}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.acceptButton} onPress={acceptBooking}>
              <Text style={styles.acceptButtonText}>✅ Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>❌ Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!upcomingBooking && isOnline && (
        <View style={styles.waitingCard}>
          <Text style={styles.waitingText}>⏳ Waiting for bookings...</Text>
        </View>
      )}
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
    padding: 16,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subGreeting: {
    fontSize: 12,
    color: '#000',
    marginTop: 2,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  map: {
    flex: 1,
  },
  bookingCard: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#25D366',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  bookingCustomer: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingRating: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  bookingLocation: {
    marginBottom: 12,
  },
  location: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 4,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detail: {
    color: '#25D366',
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  waitingCard: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  waitingText: {
    color: '#25D366',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;