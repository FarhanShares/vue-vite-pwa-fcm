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

  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then(() => {
      // notification.addEventListener('notificationclick', () => {
      //   window.open('https://follow.it', '_blank')
      // })
    })

  // self.addEventListener('notificationclick', function (event) {
  //   console.log('on click notification', event)
  //   window.open('https://follow.it', '_blank')
  //   // event.notification.close()
  //   // event.waitUntil(clients.openWindow('https://follow.it'))
  // })

  // Notification click event listener
  self.addEventListener('notificationclick', (e) => {
    console.log('on click notification', e)
    const url = 'https://follow.it'
    // Close the notification popout
    e.notification.close()
    // Get all the Window clients
    e.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientsArr) => {
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          // windowClient.url === e.notification.data.url
          windowClient.url === url ? (windowClient.focus(), true) : false
        )
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus)
          clients
            // .openWindow(e.notification.data.url)
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
      })
    )
  })
})
