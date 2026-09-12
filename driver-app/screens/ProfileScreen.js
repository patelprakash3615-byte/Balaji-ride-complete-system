import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const [profile, setProfile] = React.useState({
    name: 'Raj Kumar Singh',
    phone: '+91 9876543210',
    email: 'raj@example.com',
    vehicle: 'Hero Honda Activa',
    plate: 'GJ01AB1234',
    license: 'DL1234567890',
    rating: 4.8,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RK</Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.rating}>⭐ {profile.rating} (245 ratings)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>👤 Personal Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{profile.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{profile.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🚂 Vehicle Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Vehicle</Text>
          <Text style={styles.value}>{profile.vehicle}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Registration</Text>
          <Text style={styles.value}>{profile.plate}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>License</Text>
          <Text style={styles.value}>{profile.license}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>⚙️ Settings</Text>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>🔐 Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>🔔 Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>📞 Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Text style={styles.settingText}>📋 Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutOption}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
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
    paddingTop: 40,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  rating: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
  },
  value: {
    color: '#25D366',
    fontWeight: 'bold',
  },
  settingOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingText: {
    color: '#fff',
    fontSize: 14,
  },
  logoutOption: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f44336',
    marginTop: 8,
  },
  logoutText: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ProfileScreen;