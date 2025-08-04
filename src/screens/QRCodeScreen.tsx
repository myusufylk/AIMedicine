import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

const QRCodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { atm, medicines, totalPrice } = (route.params as any) || {};

  if (!atm || !medicines) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>QR Kod Bilgisi Bulunamadı</Text>
      </View>
    );
  }

  const reservationId = `RES-${Date.now()}`;
  const qrData = JSON.stringify({
    reservationId,
    atmId: atm.id,
    medicines: medicines.map(m => ({ id: m.id, name: m.name })),
    totalPrice,
    timestamp: new Date().toISOString()
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* QR Kod Alanı */}
        <View style={styles.qrContainer}>
          <View style={styles.qrCode}>
            <Text style={styles.qrText}>QR KOD</Text>
            <Text style={styles.qrSubText}>Bu kodu ATM'de okutun</Text>
          </View>
          <Text style={styles.reservationId}>Rezervasyon No: {reservationId}</Text>
        </View>

        {/* ATM Bilgileri */}
        <View style={styles.atmInfoContainer}>
          <Text style={styles.sectionTitle}>ATM Bilgileri</Text>
          <Text style={styles.atmName}>{atm.title}</Text>
          <Text style={styles.atmAddress}>{atm.address}</Text>
          <Text style={styles.atmPhone}>{atm.phone}</Text>
          <Text style={styles.atmHours}>{atm.workingHours}</Text>
        </View>

        {/* Seçilen İlaçlar */}
        <View style={styles.medicinesContainer}>
          <Text style={styles.sectionTitle}>Rezerve Edilen İlaçlar</Text>
          {medicines.map((medicine, index) => (
            <View key={medicine.id} style={styles.medicineItem}>
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <Text style={styles.medicineGeneric}>{medicine.genericName}</Text>
              </View>
              <Text style={styles.medicinePrice}>{medicine.price}₺</Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Toplam:</Text>
            <Text style={styles.totalAmount}>{totalPrice}₺</Text>
          </View>
        </View>

        {/* Talimatlar */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.sectionTitle}>Kullanım Talimatları</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>ATM'ye gidin</Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>QR kod okutma alanına bu kodu gösterin</Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>İlaçlarınızı alın</Text>
          </View>
        </View>
      </ScrollView>

      {/* Alt Butonlar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryButtonText}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.primaryButtonText}>Haritaya Git</Text>
        </TouchableOpacity>
      </View>
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
  qrContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 24,
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
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#e30a17',
    borderStyle: 'dashed',
  },
  qrText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e30a17',
    marginBottom: 8,
  },
  qrSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  reservationId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  atmInfoContainer: {
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
  atmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e30a17',
    marginBottom: 4,
  },
  atmAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  atmPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  atmHours: {
    fontSize: 14,
    color: '#666',
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
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  medicineGeneric: {
    fontSize: 14,
    color: '#666',
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e30a17',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#e30a17',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e30a17',
  },
  instructionsContainer: {
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
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e30a17',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e30a17',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    color: '#e30a17',
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#e30a17',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRCodeScreen; 