import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
  // Örnek kullanıcı adı
  const userName = 'Ahmet Yılmaz';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>♥</Text>
        <Text style={styles.title}>e-İlaç</Text>
      </View>
      <Text style={styles.welcome}>Hoş geldiniz, {userName}!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reçetelerim</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>İlaçlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Profilim</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
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
    fontSize: 20,
    color: '#222',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#e30a17',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 