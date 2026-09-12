import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const NavigationScreen = ({ navigation }) => {
  const [currentLocation] = useState({ latitude: 23.1815, longitude: 79.9864 });
  const [pickupLocation] = useState({ latitude: 23.1825, longitude: 79.9874 });
  const [eta] = useState('5 min');
  const [distance] = useState('2.5 km');

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 23.1815,
          longitude: 79.9864,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={currentLocation} title="Your Location" pinColor="green" />
        <Marker coordinate={pickupLocation} title="Pickup Location" pinColor="blue" />
        <Polyline
          coordinates={[currentLocation, pickupLocation]}
          strokeColor="#25D366"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.navigationCard}>
        <View style={styles.navigationInfo}>
          <Text style={styles.navigationLabel}>Pickup Location</Text>
          <Text style={styles.navigationAddress}>Station Road, Ahmedabad</Text>
          <Text style={styles.navigationDistance}>📋 {distance}</Text>
        </View>

        <View style={styles.etaSection}>
          <Text style={styles.etaLabel}>ETA</Text>
          <Text style={styles.etaValue}>{eta}</Text>
        </View>

        <TouchableOpacity style={styles.navigateButton}>
          <Text style={styles.navigateButtonText}>🗺️ Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  map: {
    flex: 1,
  },
  navigationCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  navigationInfo: {
    marginBottom: 16,
  },
  navigationLabel: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  navigationAddress: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  navigationDistance: {
    color: '#aaa',
    fontSize: 12,
  },
  etaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  etaLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  etaValue: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 18,
  },
  navigateButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NavigationScreen;