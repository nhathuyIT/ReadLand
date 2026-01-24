importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js",
);
const firebaseConfig = {
  apiKey: "AIzaSyCfMdbqax0DxqhY70gsY86jGtHrsux5A78",
  authDomain: "readland-787c6.firebaseapp.com",
  projectId: "readland-787c6",
  storageBucket: "readland-787c6.firebasestorage.app",
  messagingSenderId: "1057169147840",
  appId: "1:1057169147840:web:c795b076ca8f90f5dd6a25",
  measurementId: "G-DKC8NEXB8E",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
