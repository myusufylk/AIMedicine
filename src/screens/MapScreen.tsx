import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, PermissionsAndroid, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation, useRoute } from '@react-navigation/native';

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

// Örnek ilaç verileri
const dummyMedicines: Medicine[] = [
  { id: 1, name: 'Parol', genericName: 'Parasetamol', stock: 50, price: 15.50 },
  { id: 2, name: 'Aspirin', genericName: 'Asetilsalisilik Asit', stock: 30, price: 12.00 },
  { id: 3, name: 'B12 Vitamini', genericName: 'Siyanokobalamin', stock: 25, price: 45.00 },
  { id: 4, name: 'D Vitamini', genericName: 'Kolekalsiferol', stock: 40, price: 35.00 },
  { id: 5, name: 'C Vitamini', genericName: 'Askorbik Asit', stock: 60, price: 25.00 },
  { id: 6, name: 'Omega 3', genericName: 'Balık Yağı', stock: 20, price: 85.00 },
  { id: 7, name: 'Magnezyum', genericName: 'Magnezyum Sülfat', stock: 35, price: 55.00 },
  { id: 8, name: 'Çinko', genericName: 'Çinko Sülfat', stock: 28, price: 40.00 },
];

// Örnek ATM verileri (ilaç stok bilgileri ile)
const dummyATMs: ATM[] = [
  {
    id: 1,
    title: 'Merkez ATM',
    description: 'Ankara Merkez İlaç ATM',
    coordinate: {
      latitude: 39.9334,
      longitude: 32.8597,
    },
    medicines: [dummyMedicines[0], dummyMedicines[1], dummyMedicines[2], dummyMedicines[3]],
    address: 'Kızılay Meydanı, Ankara',
    phone: '0312 123 45 67',
    workingHours: '08:00 - 22:00'
  },
  {
    id: 2,
    title: 'Şube ATM',
    description: 'Çankaya İlaç ATM',
    coordinate: {
      latitude: 39.9254,
      longitude: 32.8667,
    },
    medicines: [dummyMedicines[1], dummyMedicines[4], dummyMedicines[5], dummyMedicines[6]],
    address: 'Çankaya Mahallesi, Ankara',
    phone: '0312 987 65 43',
    workingHours: '07:00 - 23:00'
  },
  {
    id: 3,
    title: 'Hastane ATM',
    description: 'Numune Hastanesi İlaç ATM',
    coordinate: {
      latitude: 39.9200,
      longitude: 32.8500,
    },
    medicines: [dummyMedicines[0], dummyMedicines[2], dummyMedicines[3], dummyMedicines[7]],
    address: 'Numune Hastanesi Yanı, Ankara',
    phone: '0312 555 44 33',
    workingHours: '24 Saat Açık'
  },
];

const MapScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredATMs, setFilteredATMs] = useState<ATM[]>(dummyATMs);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Route parametrelerini kontrol et
  useEffect(() => {
    const params = route.params as any;
    if (params?.searchQuery) {
      setSearchText(params.searchQuery);
      handleSearch(params.searchQuery);
    }
    if (params?.focusATM) {
      const atm = dummyATMs.find(a => a.id === params.focusATM);
      if (atm) {
        setFilteredATMs([atm]);
        setShowSearchResults(false);
      }
    }
  }, [route.params]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Konum İzni",
          message: "Bu uygulama konumunuza erişmek istiyor",
          buttonNeutral: "Daha Sonra Sor",
          buttonNegative: "İptal",
          buttonPositive: "Tamam"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('Hata', 'Konum izni gerekli');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error.code, error.message);
            Alert.alert('Hata', 'Konum alınamadı');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    getLocation();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredATMs(dummyATMs);
      setShowSearchResults(false);
      return;
    }

    const filtered = dummyATMs.filter(atm => 
      atm.medicines.some(medicine => 
        medicine.name.toLowerCase().includes(text.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(text.toLowerCase())
      )
    );
    
    setFilteredATMs(filtered);
    setShowSearchResults(true);
  };

  const handleMarkerPress = (atm: ATM) => {
    Alert.alert(
      atm.title,
      `${atm.description}\n\nAdres: ${atm.address}\nTelefon: ${atm.phone}\nÇalışma Saatleri: ${atm.workingHours}\n\nMevcut İlaçlar: ${atm.medicines.length} çeşit`,
      [
        {
          text: 'Detaylar',
          onPress: () => navigation.navigate('AtmDetail', { atm }),
        },
        { text: 'Kapat', style: 'cancel' },
      ]
    );
  };

  const renderSearchResult = ({ item }: { item: ATM }) => (
    <TouchableOpacity 
      style={styles.searchResultItem}
      onPress={() => {
        setShowSearchResults(false);
        setSearchText('');
        // Haritayı bu ATM'ye odakla
      }}
    >
      <Text style={styles.searchResultTitle}>{item.title}</Text>
      <Text style={styles.searchResultAddress}>{item.address}</Text>
      <Text style={styles.searchResultMedicines}>
        {item.medicines.filter(med => 
          med.name.toLowerCase().includes(searchText.toLowerCase()) ||
          med.genericName.toLowerCase().includes(searchText.toLowerCase())
        ).map(med => med.name).join(', ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="İlaç ara... (örn: Parol, Aspirin)"
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor="#888"
        />
      </View>

      {/* Arama Sonuçları */}
      {showSearchResults && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={filteredATMs}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id.toString()}
            style={styles.searchResultsList}
          />
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 39.9334,
          longitude: location?.longitude || 32.8597,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {filteredATMs.map((atm) => (
          <Marker
            key={atm.id}
            coordinate={atm.coordinate}
            title={atm.title}
            description={`${atm.medicines.length} çeşit ilaç mevcut`}
            onPress={() => handleMarkerPress(atm)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 300,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchResultsList: {
    borderRadius: 10,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  searchResultAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  searchResultMedicines: {
    fontSize: 12,
    color: '#e30a17',
    fontStyle: 'italic',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen; 