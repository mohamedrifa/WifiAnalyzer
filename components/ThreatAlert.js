import React, { useEffect } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';

const ThreatAlert = ({ threatMessage, onDismiss }) => {
  useEffect(() => {
    if (threatMessage) {
      Alert.alert(
        "Security Alert",
        threatMessage,
        [
          {
            text: "OK",
            onPress: () => onDismiss(),
          },
        ],
        { cancelable: false }
      );
    }
  }, [threatMessage]);

  return (
    <View style={styles.container}>
      {threatMessage ? (
        <Text style={styles.alertText}>{threatMessage}</Text>
      ) : (
        <Text style={styles.safeText}>Your network appears safe.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffe0e0',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  alertText: {
    color: '#d9534f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  safeText: {
    color: '#4caf50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ThreatAlert;
