import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import WifiScanner from './components/WiFiScanner';
import ThreatAlert from './components/ThreatAlert';
import { requestNotificationPermission } from './services/NotificationService';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  const [scanning, setScanning] = useState(false);
  const [threatMessage, setThreatMessage] = useState(null);

  useEffect(() => {
    requestNotificationPermission;
  }, []);

  const handleThreatDetected = (threat) => {
    setThreatMessage(threat);
  };

  return (
    <View style={styles.container}>
      {!scanning && (<Text style={styles.header}>Wi-Fi Scanner</Text>)}
      <TouchableOpacity onPress={() => setScanning(!scanning)} style={styles.buttonContainer}>
        <LinearGradient colors={['#007AFF', '#004E92']} style={styles.button}>
          <Text style={styles.buttonText}>
            {scanning ? 'Stop Scanning' : 'Start Scanning'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {scanning && <WifiScanner onThreatDetected={handleThreatDetected} />}
      {threatMessage && (
        <ThreatAlert threatMessage={threatMessage} onDismiss={() => setThreatMessage(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5, // For Android shadow effect
  },
  button: {
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


