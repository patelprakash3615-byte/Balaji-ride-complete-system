import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const EarningsScreen = () => {
  const [earnings, setEarnings] = useState({
    today: '₹650',
    thisWeek: '₹4,200',
    thisMonth: '₹15,800',
    total: '₹45,320',
  });

  const [trips, setTrips] = useState({
    today: 8,
    thisWeek: 42,
    thisMonth: 156,
    total: 523,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 My Earnings</Text>
      </View>

      <View style={styles.earningsGrid}>
        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>Today</Text>
          <Text style={styles.cardValue}>{earnings.today}</Text>
          <Text style={styles.cardSubtitle}>{trips.today} trips</Text>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>This Week</Text>
          <Text style={styles.cardValue}>{earnings.thisWeek}</Text>
          <Text style={styles.cardSubtitle}>{trips.thisWeek} trips</Text>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>This Month</Text>
          <Text style={styles.cardValue}>{earnings.thisMonth}</Text>
          <Text style={styles.cardSubtitle}>{trips.thisMonth} trips</Text>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>Total</Text>
          <Text style={styles.cardValue}>{earnings.total}</Text>
          <Text style={styles.cardSubtitle}>{trips.total} trips</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📊 Performance</Text>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Average Rating</Text>
          <Text style={styles.performanceValue}>⭐ 4.8/5.0</Text>
        </View>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Acceptance Rate</Text>
          <Text style={styles.performanceValue}>✅ 95%</Text>
        </View>
        <View style={styles.performanceRow}>
          <Text style={styles.performanceLabel}>Cancellation Rate</Text>
          <Text style={styles.performanceValue}>❌ 2%</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🏆 Incentives</Text>
        <View style={styles.incentive}>
          <Text style={styles.incentiveText}>🏍 Complete 10 trips today → Bonus ₹100</Text>
          <Text style={styles.incentiveProgress}>Progress: 8/10</Text>
        </View>
        <View style={styles.incentive}>
          <Text style={styles.incentiveText}>⭐ Maintain 4.8+ rating → ₹200/week</Text>
          <Text style={styles.incentiveProgress}>✅ Achieved</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawButtonText}>💳 Withdraw Earnings</Text>
      </TouchableOpacity>
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
    padding: 16,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  earningsCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#25D366',
    alignItems: 'center',
  },
  cardLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  cardValue: {
    color: '#25D366',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  card: {
    backgroundColor: '#1a1a1a',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    color: '#25D366',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  performanceLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  performanceValue: {
    color: '#25D366',
    fontWeight: 'bold',
  },
  incentive: {
    backgroundColor: '#0f0f0f',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ff9800',
  },
  incentiveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
  },
  incentiveProgress: {
    color: '#25D366',
    fontSize: 11,
  },
  withdrawButton: {
    backgroundColor: '#25D366',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    margin: 12,
    marginBottom: 20,
  },
  withdrawButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EarningsScreen;