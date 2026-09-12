import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const BookingScreen = ({ route, navigation }) => {
  const { pickup, drop, distance, rideType, fare } = route.params;
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const confirmBooking = async () => {
    setLoading(true);
    try {
      const newBookingRef = 'BR-' + Date.now().toString(36).toUpperCase();
      setBookingRef(newBookingRef);

      // API call to create booking
      const response = await axios.post('http://localhost:5000/api/bookings', {
        customerId: 'user123', // Replace with actual user ID
        rideType,
        pickupLocation: { address: pickup },
        dropLocation: { address: drop },
        distance: parseFloat(distance),
        estimatedFare: fare,
      });

      if (response.data.success) {
        Alert.alert(
          'Booking Confirmed',
          `Reference: ${newBookingRef}\n\nDriver will be assigned shortly.`,
          [
            {
              text: 'Track',
              onPress: () => navigation.navigate('Tracking'),
            },
            {
              text: 'Done',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to confirm booking');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confirm Your Booking</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Ride Type</Text>
          <Text style={styles.value}>
            {rideType.charAt(0).toUpperCase() + rideType.slice(1)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Pickup</Text>
          <Text style={styles.value}>{pickup}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Drop</Text>
          <Text style={styles.value}>{drop}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{distance} km</Text>
        </View>

        <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Estimated Fare</Text>
          <Text style={[styles.value, { color: '#25D366', fontSize: 18 }]}>
            ₹{fare}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#25D366" style={{ marginTop: 20 }} />
        ) : (
          <>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmBooking}
            >
              <Text style={styles.confirmButtonText}>✅ Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 12,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#25D366',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  value: {
    color: '#25D366',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BookingScreen;