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

// ⚠️ यहाँ अपने LIVE BACKEND का URL डालना है
const API_URL = 'https://balaji-ride-complete-system.onrender.com/api/bookings';

const BookingScreen = ({ route, navigation }) => {
  const {
    pickup,
    drop,
    distance,
    rideType,
    fare,

    // Pickup coordinates
    pickupLatitude,
    pickupLongitude,

    // Drop coordinates
    dropLatitude,
    dropLongitude,

    // Login के बाद असली customer ID यहाँ से आएगी
    customerId,
  } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const confirmBooking = async () => {
    if (!pickup || !drop) {
      Alert.alert('Error', 'Pickup और Drop location जरूरी है।');
      return;
    }

    if (!rideType) {
      Alert.alert('Error', 'Ride type select करें।');
      return;
    }

    setLoading(true);

    try {
      const newBookingRef =
        'BR-' + Date.now().toString(36).toUpperCase();

      setBookingRef(newBookingRef);


if (!customerId) {
  Alert.alert(
    'Error',
    'Customer login information not found. Please login again.'
  );
  setLoading(false);
  return;
}

const bookingData = {
      const bookingData = {
        bookingRef: newBookingRef,

        // अभी login system connect होने तक fallback
        customerId: customerId,

        rideType: rideType,

        pickupLocation: {
          address: pickup,
          latitude: pickupLatitude || null,
          longitude: pickupLongitude || null,
        },

        dropLocation: {
          address: drop,
          latitude: dropLatitude || null,
          longitude: dropLongitude || null,
        },

        distance: parseFloat(distance) || 0,
        estimatedFare: Number(fare) || 0,

        status: 'requested',
      };

      console.log('Sending booking:', bookingData);

      const response = await axios.post(
        API_URL,
        bookingData,
        {
          timeout: 15000,
        }
      );

      if (response.data) {
        Alert.alert(
          'Booking Confirmed',
          `Reference: ${newBookingRef}\n\nDriver will be assigned shortly.`,
          [
            {
              text: 'Track',
              onPress: () =>
                navigation.navigate('Tracking', {
                  bookingRef: newBookingRef,
                }),
            },
            {
              text: 'Done',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (error) {
      console.error(
        'Booking Error:',
        error?.response?.data || error.message
      );

      Alert.alert(
        'Booking Failed',
        'Booking confirm नहीं हो पाई। कृपया internet और server connection check करें।'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>
          Confirm Your Booking
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Ride Type</Text>

          <Text style={styles.value}>
            {rideType
              ? rideType.charAt(0).toUpperCase() +
                rideType.slice(1)
              : '-'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Pickup</Text>

          <Text style={styles.value}>
            {pickup || '-'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Drop</Text>

          <Text style={styles.value}>
            {drop || '-'}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Distance</Text>

          <Text style={styles.value}>
            {distance || 0} km
          </Text>
        </View>

        <View
          style={[
            styles.detailRow,
            { borderBottomWidth: 0 },
          ]}
        >
          <Text style={styles.label}>
            Estimated Fare
          </Text>

          <Text
            style={[
              styles.value,
              {
                fontSize: 18,
                fontWeight: 'bold',
              },
            ]}
          >
            ₹{fare || 0}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmBooking}
            >
              <Text style={styles.confirmButtonText}>
                ✅ Confirm Booking
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>
                Cancel
              </Text>
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
    flex: 1,
  },

  value: {
    color: '#25D366',
    fontWeight: '600',
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
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
