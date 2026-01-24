import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfMdbqax0DxqhY70gsY86jGtHrsux5A78",
  authDomain: "readland-787c6.firebaseapp.com",
  projectId: "readland-787c6",
  storageBucket: "readland-787c6.firebasestorage.app",
  messagingSenderId: "1057169147840",
  appId: "1:1057169147840:web:c795b076ca8f90f5dd6a25",
  measurementId: "G-DKC8NEXB8E",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("Permission status:", permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BGt7Gf6tZdQLGD6RgsUxT6AuT2Ikan6_OeA_6F66KAbwwxGJOIQXEwuHrF_05hH44lWuEyXkR2-7Rs197DQxB18",
    });
    console.log(token);
  }
};
