import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Platform 
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WiFiScanner = () => {
  const [wifiList, setWifiList] = useState([]);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const locationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (locationPermission === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          Alert.alert('Permission Denied', 'Location permission is required to scan Wi-Fi networks.');
        }
      } else {
        Geolocation.requestAuthorization('whenInUse').then((status) => {
          if (status === 'granted') {
            setHasLocationPermission(true);
          } else {
            Alert.alert('Permission Denied', 'Location permission is required to scan Wi-Fi networks.');
          }
        });
      }
    };

    requestPermissions();
  }, []);

  const loadWifiList = async () => {
    if (!hasLocationPermission) {
      Alert.alert('Permission Denied', 'Location permission not granted.');
      return;
    }

    try {
      const wifiNetworks = await WifiManager.loadWifiList();
      if (wifiNetworks && wifiNetworks.length > 0) {
        setWifiList(wifiNetworks);
      } else {
        Alert.alert('No Networks Found', 'No Wi-Fi networks found.');
      }
    } catch (error) {
      console.error('Wi-Fi List Error:', error);
      Alert.alert('Error', 'Failed to load Wi-Fi networks.\n' + error);
    }
  };

  const checkSafety = (security) => {
    return security.includes('WPA') || security.includes('WPA2') ? 'Safe' : 'Not Safe';
  };

  const getSignalColor = (level) => {
    if (level >= -59) return 'green'; // Strong
    if (level >= -79) return 'orange'; // Moderate
    return 'red'; // Weak
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wi-Fi Scanner</Text>

      {/* Gradient Button */}
      <TouchableOpacity onPress={loadWifiList} activeOpacity={0.8}>
        <LinearGradient colors={['#007AFF', '#004E92']} style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan Wi-Fi</Text>
        </LinearGradient>
      </TouchableOpacity>

      {wifiList.length > 0 ? (
        <FlatList
          data={wifiList}
          keyExtractor={(item) => item.BSSID}
          renderItem={({ item }) => (
            <View style={styles.networkCard}>
              <Text style={styles.ssid}>{item.SSID || 'Unknown SSID'}</Text>
              <Text style={styles.bssid}>BSSID: {item.BSSID}</Text>
              <Text style={[styles.signal, { color: getSignalColor(item.level) }]}>
                Signal: {item.level} dBm
              </Text>
              <Text style={styles.security}>Security: {item.capabilities}</Text>
              <Text style={[styles.status, checkSafety(item.capabilities) === 'Safe' ? styles.safe : styles.unsafe]}>
                {checkSafety(item.capabilities)}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noWifiText}>No Wi-Fi networks found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#0D1B2A', // Dark Blue Background
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  scanButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  networkCard: {
    backgroundColor: '#1B263B', // Darker Blue Card
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  ssid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bssid: {
    fontSize: 14,
    color: '#A8A8A8',
    marginBottom: 5,
  },
  signal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  security: {
    fontSize: 14,
    color: '#A8A8A8',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  safe: {
    color: '#0FFF50',
  },
  unsafe: {
    color: '#FF3131',
  },
  noWifiText: {
    fontSize: 16,
    color: '#A8A8A8',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WiFiScanner;
