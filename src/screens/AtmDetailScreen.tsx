import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  stock: number;
  price: number;
}

interface ATM {
  id: number;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  medicines: Medicine[];
  address: string;
  phone: string;
  workingHours: string;
}

const AtmDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { atm } = (route.params as any) || {};
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);

  if (!atm) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ATM Bilgisi Bulunamadı</Text>
      </View>
    );
  }

  const handleMedicineSelect = (medicine: Medicine) => {
    if (selectedMedicines.find(m => m.id === medicine.id)) {
      setSelectedMedicines(selectedMedicines.filter(m => m.id !== medicine.id));
    } else {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
  };

  const handleReservation = () => {
    if (selectedMedicines.length === 0) {
      Alert.alert('Uyarı', 'Lütfen en az bir ilaç seçiniz.');
      return;
    }

    const totalPrice = selectedMedicines.reduce((sum, med) => sum + med.price, 0);
    
    Alert.alert(
      'Rezervasyon Onayı',
      `Seçilen İlaçlar:\n${selectedMedicines.map(med => `• ${med.name} - ${med.price}₺`).join('\n')}\n\nToplam: ${totalPrice.toFixed(2)}₺\n\nRezervasyon yapmak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Rezervasyon Yap', 
          onPress: () => {
            Alert.alert(
              'Başarılı!',
              'Rezervasyonunuz alındı. QR kodunuz oluşturuluyor...',
              [
                {
                  text: 'QR Kod Göster',
                  onPress: () => navigation.navigate('QRCode', { 
                    atm, 
                    medicines: selectedMedicines,
                    totalPrice 
                  })
                },
                { text: 'Tamam' }
              ]
            );
          }
        }
      ]
    );
  };

  const renderMedicineItem = ({ item }: { item: Medicine }) => (
    <TouchableOpacity 
      style={[
        styles.medicineItem,
        selectedMedicines.find(m => m.id === item.id) && styles.selectedMedicineItem
      ]}
      onPress={() => handleMedicineSelect(item)}
    >
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineGeneric}>{item.genericName}</Text>
        <Text style={styles.medicineStock}>Stok: {item.stock} adet</Text>
      </View>
      <View style={styles.medicinePrice}>
        <Text style={styles.priceText}>{item.price}₺</Text>
        {selectedMedicines.find(m => m.id === item.id) && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* ATM Bilgileri */}
        <View style={styles.atmInfoContainer}>
          <Text style={styles.atmTitle}>{atm.title}</Text>
          <Text style={styles.atmDescription}>{atm.description}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Adres:</Text>
            <Text style={styles.infoValue}>{atm.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📞 Telefon:</Text>
            <Text style={styles.infoValue}>{atm.phone}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>🕒 Çalışma Saatleri:</Text>
            <Text style={styles.infoValue}>{atm.workingHours}</Text>
          </View>
        </View>

        {/* İlaç Listesi */}
        <View style={styles.medicinesContainer}>
          <Text style={styles.sectionTitle}>Mevcut İlaçlar ({atm.medicines.length} çeşit)</Text>
          <FlatList
            data={atm.medicines}
            renderItem={renderMedicineItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Rezervasyon Butonu */}
      {selectedMedicines.length > 0 && (
        <View style={styles.reservationContainer}>
          <View style={styles.reservationInfo}>
            <Text style={styles.selectedCount}>
              {selectedMedicines.length} ilaç seçildi
            </Text>
            <Text style={styles.totalPrice}>
              Toplam: {selectedMedicines.reduce((sum, med) => sum + med.price, 0).toFixed(2)}₺
            </Text>
          </View>
          <TouchableOpacity style={styles.reservationButton} onPress={handleReservation}>
            <Text style={styles.reservationButtonText}>Rezervasyon Yap</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  atmInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  atmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e30a17',
    marginBottom: 8,
  },
  atmDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  medicinesContainer: {
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
    marginBottom: 16,
  },
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedMedicineItem: {
    backgroundColor: '#fff3f3',
    borderColor: '#e30a17',
    borderWidth: 1,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  medicineGeneric: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  medicineStock: {
    fontSize: 12,
    color: '#888',
  },
  medicinePrice: {
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e30a17',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e30a17',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reservationContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  reservationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedCount: {
    fontSize: 14,
    color: '#666',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e30a17',
  },
  reservationButton: {
    backgroundColor: '#e30a17',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  reservationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AtmDetailScreen; 