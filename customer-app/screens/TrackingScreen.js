import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const TrackingScreen = () => {
  const [driverLocation, setDriverLocation] = useState({
    latitude: 23.1815,
    longitude: 79.9864,
  });
  const [customerLocation, setCustomerLocation] = useState({
    latitude: 23.1815,
    longitude: 79.9864,
  });
  const [driverInfo, setDriverInfo] = useState({
    name: 'Raj Kumar',
    vehicle: 'Hero Honda',
    plate: 'GJ01AB1234',
    rating: 4.8,
  });
  const [eta, setEta] = useState('5 min');

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
        <Marker
          coordinate={customerLocation}
          title="Your Location"
          pinColor="blue"
        />
        <Marker
          coordinate={driverLocation}
          title="Driver Location"
          pinColor="green"
        />
      </MapView>

      <View style={styles.bottomSheet}>
        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <View style={styles.driverAvatar}>
              <Text style={styles.avatarText}>RK</Text>
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driverInfo.name}</Text>
              <Text style={styles.driverRating}>⭐ {driverInfo.rating}</Text>
              <Text style={styles.driverVehicle}>
                {driverInfo.vehicle} • {driverInfo.plate}
              </Text>
            </View>
          </View>

          <View style={styles.etaBox}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>{eta}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>📞 Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.messageButtonText}>💬 Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>📍 Share</Text>
          </TouchableOpacity>
        </View>
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
  bottomSheet: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  driverRating: {
    color: '#ffc107',
    fontSize: 12,
    marginTop: 2,
  },
  driverVehicle: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  etaBox: {
    alignItems: 'center',
  },
  etaLabel: {
    color: '#aaa',
    fontSize: 11,
  },
  etaValue: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    flex: 1,
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TrackingScreen;