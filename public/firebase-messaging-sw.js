// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  'https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js'
)

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyDStNHEIKuDdNcrYLGcNsYCeIkhUBlHfr8',
  authDomain: 'fit-push-channel.firebaseapp.com',
  projectId: 'fit-push-channel',
  storageBucket: 'fit-push-channel.appspot.com',
  messagingSenderId: '21484993992',
  appId: '1:21484993992:web:3010aefb06f36a59e994fd',
  measurementId: 'G-M0CJRRH78X',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = payload.notification.title || 'Fallback title'
  const notificationOptions = {
    body: payload.notification.body || 'Fallback body',
    // icon: '/favicon-32x32.png',
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
