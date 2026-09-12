import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const EarningsScreen = () => {
  const [earnings, setEarnings] = useState([
    {
      id: '1',
      date: '2024-01-12',
      rides: 8,
      amount: '₹1,200',
      status: 'Paid',
    },
    {
      id: '2',
      date: '2024-01-11',
      rides: 6,
      amount: '₹900',
      status: 'Paid',
    },
    {
      id: '3',
      date: '2024-01-10',
      rides: 5,
      amount: '₹750',
      status: 'Pending',
    },
  ]);

  const totalEarnings = earnings.reduce((sum, e) => {
    const amount = parseInt(e.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const renderItem = ({ item }) => (
    <View style={styles.earningCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.date}>📅 {item.date}</Text>
          <Text style={styles.rides}>{item.rides} rides</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text
            style={[
              styles.status,
              {
                color: item.status === 'Paid' ? '#25D366' : '#ff9800',
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Earnings</Text>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Earnings</Text>
        <Text style={styles.totalAmount}>₹{totalEarnings.toLocaleString()}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>19</Text>
            <Text style={styles.statLabel}>Total Rides</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹150</Text>
            <Text style={styles.statLabel}>Avg per Ride</Text>
          </View>
        </View>
      </View>

      <Text style={styles.historyTitle}>History</Text>
      <FlatList
        data={earnings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawButtonText}>💳 Withdraw Earnings</Text>
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
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  totalCard: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#25D366',
  },
  totalLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#25D366',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 4,
  },
  historyTitle: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 12,
    marginTop: 12,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  earningCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  rides: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#25D366',
    fontWeight: 'bold',
    fontSize: 14,
  },
  status: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4,
  },
  withdrawButton: {
    backgroundColor: '#25D366',
    margin: 12,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EarningsScreen;