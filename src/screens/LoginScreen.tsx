import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [tc, setTc] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (tc.length !== 11) {
      Alert.alert('Hata', 'Lütfen geçerli bir T.C. Kimlik Numarası giriniz (11 haneli olmalı).');
      return;
    }
    if (!password) {
      Alert.alert('Hata', 'Lütfen şifrenizi giriniz.');
      return;
    }
    Alert.alert('Giriş yapıldı!');
    navigation.navigate('Home');
  };

  const handleTcChange = (text: string) => {
    const filtered = text.replace(/[^0-9]/g, '');
    setTc(filtered);
  };

  const handleEdevletLogin = () => {
    Alert.alert('e-Devlet ile giriş!');
  };

  return (
    <View style={styles.container}>
      {/* e-İlaç nabız simgesi */}
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
      <Text style={styles.label}>e-İlaç Şifresi</Text>
      <TextInput
        style={styles.input}
        placeholder="e-İlaç Şifresi"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.edevletButton} onPress={handleEdevletLogin}>
        <Text style={styles.edevletButtonText}>e-Devlet ile Giriş Yap</Text>
      </TouchableOpacity>
      <View style={styles.linksRow}>
        <TouchableOpacity>
          <Text style={styles.link}>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <Text style={styles.dot}>·</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  edevletButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e30a17',
    marginBottom: 16,
  },
  edevletButtonText: {
    color: '#e30a17',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  link: {
    color: '#e30a17',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginHorizontal: 4,
  },
  dot: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 2,
  },
});

export default LoginScreen; 
