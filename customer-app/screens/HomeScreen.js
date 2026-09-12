import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [distance, setDistance] = useState('');
  const [rideType, setRideType] = useState('bike');
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);

  const rates = { bike: 12, auto: 10, taxi: 15 };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Get address from coordinates
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = `${reverseGeocode[0].city}, ${reverseGeocode[0].region}`;
        setPickup(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateFare = () => {
    if (!distance || distance <= 0) {
      Alert.alert('Error', 'Please enter valid distance');
      return;
    }
    const calculatedFare = parseFloat(distance) * rates[rideType];
    setFare(calculatedFare);
  };

  const bookRide = () => {
    if (!pickup || !drop || !distance) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    navigation.navigate('Booking', {
      pickup,
      drop,
      distance,
      rideType,
      fare,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚗 Balaji Ride</Text>
        <Text style={styles.headerSubtitle}>Book Your Ride Now</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickup}
          onChangeText={setPickup}
        />
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={getLocation}
        >
          <Text style={styles.gpsButtonText}>📍 Use GPS</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 15 }]}>🏁 Drop Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter drop location"
          value={drop}
          onChangeText={setDrop}
        />

        <Text style={[styles.label, { marginTop: 15 }]}>🚘 Choose Ride</Text>
        <View style={styles.rideOptions}>
          {['bike', 'auto', 'taxi'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.rideCard, rideType === type && styles.rideCardActive]}
              onPress={() => setRideType(type)}
            >
              <Text style={styles.rideIcon}>
                {type === 'bike' ? '🏍️' : type === 'auto' ? '🚙' : '🚕'}
              </Text>
              <Text style={styles.rideName}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
              <Text style={styles.ridePrice}>₹{rates[type]}/km</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 15 }]}>📏 Distance (km)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter distance"
          value={distance}
          onChangeText={setDistance}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity style={styles.calcButton} onPress={calculateFare}>
          <Text style={styles.calcButtonText}>💰 Calculate Fare</Text>
        </TouchableOpacity>

        {fare && (
          <View style={styles.fareBox}>
            <Text style={styles.fareAmount}>₹{fare.toFixed(0)}</Text>
            <Text style={styles.fareDetails}>
              {distance} km × ₹{rates[rideType]}/km
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.bookButton} onPress={bookRide}>
          <Text style={styles.bookButtonText}>✅ Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    color: '#25D366',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#0f0f0f',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
  },
  gpsButton: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  gpsButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rideOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  rideCard: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  rideCardActive: {
    borderColor: '#25D366',
    backgroundColor: 'rgba(37, 211, 102, 0.1)',
  },
  rideIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  rideName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  ridePrice: {
    color: '#25D366',
    fontSize: 11,
    marginTop: 2,
  },
  calcButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  calcButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fareBox: {
    backgroundColor: '#0f0f0f',
    borderWidth: 1,
    borderColor: '#25D366',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  fareAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#25D366',
    marginBottom: 4,
  },
  fareDetails: {
    color: '#aaa',
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: '#ff9800',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;