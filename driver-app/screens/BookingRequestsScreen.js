import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const BookingRequestsScreen = () => {
  const [requests, setRequests] = useState([
    {
      id: '1',
      ref: 'BR-7H2JK3ABC12',
      customer: 'Rahul Singh',
      pickup: 'Station Road, Indore',
      drop: 'City Center, Indore',
      distance: '5.2',
      fare: '₹62',
      time: '2 min away',
    },
  ]);

  const handleAccept = (bookingId) => {
    Alert.alert(
      'Booking Accepted',
      'You have accepted the booking. Head to pickup location.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Remove from requests
            setRequests(requests.filter(r => r.id !== bookingId));
          },
        },
      ]
    );
  };

  const handleReject = (bookingId) => {
    setRequests(requests.filter(r => r.id !== bookingId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.requestCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.bookingRef}>{item.ref}</Text>
        </View>
        <Text style={styles.fare}>{item.fare}</Text>
      </View>

      <View style={styles.routeContainer}>
        <Text style={styles.routeText}>📍 {item.pickup}</Text>
        <Text style={styles.arrowText}>⬇️</Text>
        <Text style={styles.routeText}>🏁 {item.drop}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.details}>📏 {item.distance} km</Text>
        <Text style={styles.details}>⏱️ {item.time}</Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(item.id)}
        >
          <Text style={styles.acceptButtonText}>✅ Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleReject(item.id)}
        >
          <Text style={styles.rejectButtonText}>❌ Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔔 Booking Requests</Text>
        <Text style={styles.requestCount}>{requests.length} new</Text>
      </View>
      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No booking requests</Text>
          <Text style={styles.emptySubtext}>Go online to receive bookings</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  requestCount: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 12,
  },
  requestCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#25D366',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  customerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingRef: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  fare: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 18,
  },
  routeContainer: {
    marginBottom: 10,
  },
  routeText: {
    color: '#fff',
    fontSize: 13,
    marginVertical: 4,
  },
  arrowText: {
    color: '#25D366',
    textAlign: 'center',
    marginVertical: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  details: {
    color: '#aaa',
    fontSize: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#25D366',
    padding: 10,
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
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
  },
});

export default BookingRequestsScreen;