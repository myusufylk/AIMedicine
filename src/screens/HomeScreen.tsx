import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  
  // Örnek kullanıcı adı
  const userName = 'Ahmet Yılmaz';

  // Örnek hızlı arama ilaçları
  const quickSearchMedicines = [
    'Parol', 'Aspirin', 'B12 Vitamini', 'D Vitamini', 'C Vitamini'
  ];

  // Örnek yakındaki ATM'ler
  const nearbyATMs = [
    { id: 1, name: 'Merkez ATM', distance: '0.5 km', medicines: 4 },
    { id: 2, name: 'Şube ATM', distance: '1.2 km', medicines: 4 },
    { id: 3, name: 'Hastane ATM', distance: '2.1 km', medicines: 4 },
  ];

  // Örnek aktif rezervasyonlar
  const activeReservations = [
    { id: 'RES-123456', medicine: 'Parol', atm: 'Merkez ATM', status: 'Hazır' },
    { id: 'RES-123457', medicine: 'B12 Vitamini', atm: 'Şube ATM', status: 'Beklemede' },
  ];

  const handleQuickSearch = (medicine: string) => {
    setSearchText(medicine);
    navigation.navigate('Map', { searchQuery: medicine });
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('Map', { searchQuery: searchText });
    } else {
      Alert.alert('Uyarı', 'Lütfen arama yapmak istediğiniz ilacı yazın.');
    }
  };

  const handleATMNavigation = (atmId: number) => {
    navigation.navigate('Map', { focusATM: atmId });
  };

  const handleReservationDetail = (reservationId: string) => {
    // QR kod sayfasına yönlendir
    navigation.navigate('QRCode', { reservationId });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>♥</Text>
          <Text style={styles.title}>e-İlaç</Text>
        </View>
        <Text style={styles.welcome}>Hoş geldiniz, {userName}!</Text>
      </View>

      {/* Arama Bölümü */}
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>İlaç Ara</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="İlaç adı veya etken madde..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Ara</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hızlı Arama */}
      <View style={styles.quickSearchSection}>
        <Text style={styles.sectionTitle}>Hızlı Arama</Text>
        <View style={styles.quickSearchContainer}>
          {quickSearchMedicines.map((medicine, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickSearchItem}
              onPress={() => handleQuickSearch(medicine)}
            >
              <Text style={styles.quickSearchText}>{medicine}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ana Butonlar */}
      <View style={styles.mainButtonsSection}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.mainButtonIcon}>🏥</Text>
          <Text style={styles.mainButtonTitle}>ATM Bul</Text>
          <Text style={styles.mainButtonSubtitle}>Yakındaki ilaç ATM'lerini gör</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => Alert.alert('Rezervasyonlar', 'Aktif rezervasyonlarınızı görüntüleyin')}
        >
          <Text style={styles.mainButtonIcon}>📋</Text>
          <Text style={styles.mainButtonTitle}>Rezervasyonlarım</Text>
          <Text style={styles.mainButtonSubtitle}>Aktif rezervasyonlarınız</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('AtmDetail')}
        >
          <Text style={styles.mainButtonIcon}>👤</Text>
          <Text style={styles.mainButtonTitle}>Profilim</Text>
          <Text style={styles.mainButtonSubtitle}>Hesap bilgileriniz</Text>
        </TouchableOpacity>
      </View>

      {/* Yakındaki ATM'ler */}
      <View style={styles.nearbySection}>
        <Text style={styles.sectionTitle}>Yakındaki ATM'ler</Text>
        {nearbyATMs.map((atm) => (
          <TouchableOpacity
            key={atm.id}
            style={styles.atmItem}
            onPress={() => handleATMNavigation(atm.id)}
          >
            <View style={styles.atmInfo}>
              <Text style={styles.atmName}>{atm.name}</Text>
              <Text style={styles.atmDistance}>{atm.distance}</Text>
            </View>
            <View style={styles.atmDetails}>
              <Text style={styles.atmMedicines}>{atm.medicines} çeşit ilaç</Text>
              <Text style={styles.atmAction}>Git →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Aktif Rezervasyonlar */}
      {activeReservations.length > 0 && (
        <View style={styles.reservationsSection}>
          <Text style={styles.sectionTitle}>Aktif Rezervasyonlar</Text>
          {activeReservations.map((reservation) => (
            <TouchableOpacity
              key={reservation.id}
              style={styles.reservationItem}
              onPress={() => handleReservationDetail(reservation.id)}
            >
              <View style={styles.reservationInfo}>
                <Text style={styles.reservationId}>{reservation.id}</Text>
                <Text style={styles.reservationMedicine}>{reservation.medicine}</Text>
                <Text style={styles.reservationATM}>{reservation.atm}</Text>
              </View>
              <View style={styles.reservationStatus}>
                <Text style={[
                  styles.statusText,
                  reservation.status === 'Hazır' ? styles.statusReady : styles.statusPending
                ]}>
                  {reservation.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Alt Bilgi */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>24 saat hizmetinizdeyiz</Text>
        <Text style={styles.footerSubtext}>e-İlaç ile sağlığınız güvende</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 36,
    color: '#e30a17',
    marginRight: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    color: '#e30a17',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  welcome: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  searchSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#e30a17',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickSearchSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickSearchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickSearchItem: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e30a17',
  },
  quickSearchText: {
    color: '#e30a17',
    fontSize: 14,
    fontWeight: '500',
  },
  mainButtonsSection: {
    margin: 16,
    gap: 12,
  },
  mainButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  mainButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mainButtonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  nearbySection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  atmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  atmInfo: {
    flex: 1,
  },
  atmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  atmDistance: {
    fontSize: 14,
    color: '#666',
  },
  atmDetails: {
    alignItems: 'flex-end',
  },
  atmMedicines: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  atmAction: {
    fontSize: 14,
    color: '#e30a17',
    fontWeight: 'bold',
  },
  reservationsSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reservationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reservationInfo: {
    flex: 1,
  },
  reservationId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reservationMedicine: {
    fontSize: 16,
    color: '#e30a17',
    marginBottom: 2,
  },
  reservationATM: {
    fontSize: 14,
    color: '#666',
  },
  reservationStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusReady: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },
  statusPending: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
  },
  footer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen; 