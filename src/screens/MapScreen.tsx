import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const ATM_DATA = [
  {
    id: 1,
    name: 'ATM 1',
    bank: 'Ziraat Bankası',
    address: 'İstiklal Cad. No:10, Beyoğlu/İstanbul',
    hours: '7/24 Açık',
    latitude: 41.0082,
    longitude: 28.9784
  },
  {
    id: 2,
    name: 'ATM 2',
    bank: 'Garanti BBVA',
    address: 'Bağdat Cad. No:200, Kadıköy/İstanbul',
    hours: '7/24 Açık',
    latitude: 41.0151,
    longitude: 28.9795
  },
  {
    id: 3,
    name: 'ATM 3',
    bank: 'İş Bankası',
    address: 'Atatürk Bulvarı No:50, Şişli/İstanbul',
    hours: '08:00-22:00',
    latitude: 41.0128,
    longitude: 28.9635
  },
];

const MapScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.0082,
          longitude: 28.9784,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {ATM_DATA.map(atm => (
          <Marker
            key={atm.id}
            coordinate={{ latitude: atm.latitude, longitude: atm.longitude }}
            title={atm.name}
            onPress={() => navigation.navigate('AtmDetail', { atm })}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen; 