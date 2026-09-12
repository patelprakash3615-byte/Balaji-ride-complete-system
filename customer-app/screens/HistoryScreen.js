import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const HistoryScreen = () => {
  const [bookings, setBookings] = useState([
    {
      id: '1',
      ref: 'BR-7H2JK3ABC12',
      ride: 'Bike',
      from: 'Station Road',
      to: 'City Center',
      fare: '₹150',
      status: 'completed',
      date: '2024-01-12',
    },
    {
      id: '2',
      ref: 'BR-7H2JK3ABC11',
      ride: 'Taxi',
      from: 'Airport',
      to: 'Hotel Downtown',
      fare: '₹500',
      status: 'completed',
      date: '2024-01-10',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#25D366';
      case 'cancelled':
        return '#f44336';
      default:
        return '#ff9800';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyRide}>{item.ride}</Text>
        <Text style={[styles.historyStatus, { color: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.historyRoute}>📍 {item.from} → {item.to}</Text>
      <View style={styles.historyFooter}>
        <Text style={styles.historyFare}>{item.fare}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 Booking History</Text>
      </View>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    padding: 12,
  },
  historyItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#25D366',
    borderWidth: 1,
    borderColor: '#333',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyRide: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  historyStatus: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  historyRoute: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyFare: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 14,
  },
  historyDate: {
    color: '#777',
    fontSize: 11,
  },
});

export default HistoryScreen;