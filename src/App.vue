<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage  } from "firebase/messaging";


const firebaseConfig = {
  apiKey: 'AIzaSyDStNHEIKuDdNcrYLGcNsYCeIkhUBlHfr8',
  authDomain: 'fit-push-channel.firebaseapp.com',
  projectId: 'fit-push-channel',
  storageBucket: 'fit-push-channel.appspot.com',
  messagingSenderId: '21484993992',
  appId: '1:21484993992:web:3010aefb06f36a59e994fd',
  measurementId: 'G-M0CJRRH78X',
};

let token = ref();


const app = initializeApp(firebaseConfig);


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});

function getFCMToken() {
  return getToken(messaging, { vapidKey: 'BCJIvrnQPckn5xfeHh7Idzu1eal_2o1cvNqilrg3hsuV6SYiBopzOfEUL9QF7mufkAmwE-uBFg-6kkttIBF7wVc' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        token.value = currentToken;

        console.log("Token is:",currentToken);
    } else {
        console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
  });
}

</script>

<template>
  <div>
    <HelloWorld msg="FIT Push Notification" />
    <button @click="getFCMToken">Get Token</button>
    <p>TOKEN</p>
    <p>{{token}}</p>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
