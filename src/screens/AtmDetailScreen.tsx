import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AtmDetailScreen = () => {
  const route = useRoute();
  // ATM bilgisi navigation parametresinden alınır
  const { atm } = (route.params as any) || {};

  if (!atm) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ATM Bilgisi Bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{atm.name}</Text>
      <Text style={styles.info}>Banka: {atm.bank}</Text>
      <Text style={styles.info}>Adres: {atm.address}</Text>
      <Text style={styles.info}>Çalışma Saatleri: {atm.hours}</Text>
      <Text style={styles.info}>Konum: {atm.latitude}, {atm.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e30a17',
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    color: '#222',
    marginBottom: 8,
  },
});

export default AtmDetailScreen; 