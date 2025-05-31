import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [tc, setTc] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (tc.length !== 11) {
      Alert.alert('Hata', 'Lütfen geçerli bir T.C. Kimlik Numarası giriniz (11 haneli olmalı).');
      return;
    }
    if (!name || !phone || !email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
      return;
    }
    Alert.alert('Kayıt başarılı!');
    navigation.navigate('Login');
  };

  const handleTcChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    setTc(filtered);
  };

  const handlePhoneChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    setPhone(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.heartbeat}>♥</Text>
        </View>
        <Text style={styles.logoText}>e-İlaç</Text>
      </View>
      <Text style={styles.label}>T.C. Kimlik Numarası</Text>
      <TextInput
        style={styles.input}
        placeholder="T.C. Kimlik Numarası"
        placeholderTextColor="#888"
        value={tc}
        onChangeText={handleTcChange}
        keyboardType="numeric"
        maxLength={11}
      />
      <Text style={styles.label}>Ad Soyad</Text>
      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Telefon</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefon"
        placeholderTextColor="#888"
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        maxLength={11}
      />
      <Text style={styles.label}>E-posta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Şifre</Text>
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e30a17',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  heartbeat: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoText: {
    color: '#e30a17',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    color: '#222',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#222',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#e30a17',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen; 