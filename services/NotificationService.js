// import React, { useEffect } from 'react';
// import { Platform, PermissionsAndroid, Alert, Button, View } from 'react-native';
// import PushNotification from 'react-native-push-notification';

// const App = () => {
//   // Function to request notification permission
//   const requestNotificationPermission = async () => {
//     if (Platform.OS === 'android') {
//       // For Android, we need to request permission manually
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Notification permission granted');
//       } else {
//         console.warn('Notification permission denied');
//       }
//     } else if (Platform.OS === 'ios') {
//       // For iOS, you can use PushNotification to request permission
//       PushNotification.requestPermissions().then((response) => {
//         if (response) {
//           console.log('iOS Notification permission granted');
//         } else {
//           console.warn('iOS Notification permission denied');
//         }
//       });
//     } else {
//       console.warn('Unknown platform. No native notification permission handling available.');
//     }
//   };

//   // Function to trigger a test notification
//   const triggerNotification = () => {
//     PushNotification.localNotification({
//       title: 'Test Notification',
//       message: 'This is a test notification!',
//     });
//   };

//   // Call requestPermission when the component mounts
//   useEffect(() => {
//     requestNotificationPermission();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Trigger Notification" onPress={triggerNotification} />
//     </View>
//   );
// };

// export default App;
