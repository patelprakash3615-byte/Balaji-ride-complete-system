import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([
    {
      id: '1',
      customer: 'Priya Sharma',
      from: 'Station Road',
      to: 'City Center',
      fare: '₹60',
      status: 'completed',
      date: '2024-01-12',
      rating: 4.8,
    },
    {
      id: '2',
      customer: 'Rajesh Kumar',
      from: 'Airport',
      to: 'Downtown Hotel',
      fare: '₹150',
      status: 'completed',
      date: '2024-01-11',
      rating: 4.5,
    },
    {
      id: '3',
      customer: 'Sneha Patel',
      from: 'Market Street',
      to: 'Tech Park',
      fare: '₹85',
      status: 'cancelled',
      date: '2024-01-10',
      rating: null,
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
    <View style={styles.bookingItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.customerName}>{item.customer}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.route}>📍 {item.from} → {item.to}</Text>
      <View style={styles.itemFooter}>
        <Text style={styles.fare}>{item.fare}</Text>
        {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📋 My Trips</Text>
      </View>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  bookingItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#25D366',
    borderWidth: 1,
    borderColor: '#333',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  customerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  status: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  route: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fare: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rating: {
    color: '#ffc107',
    fontSize: 12,
  },
  date: {
    color: '#777',
    fontSize: 11,
  },
});

export default BookingsScreen;