import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { initializeApp } from "firebase/app";
import { getFirestore,connectFirestoreEmulator } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAwgS2JpAbyhkSM4aLnlxTk0ZQW8hG_17Q",
    authDomain: "poker-clone-d8f8f.firebaseapp.com",
    databaseURL: "https://poker-clone-d8f8f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "poker-clone-d8f8f",
    storageBucket: "poker-clone-d8f8f.appspot.com",
    messagingSenderId: "151876336184",
    appId: "1:151876336184:web:cd6b1867f0e17496f044cd",
    measurementId: "G-ZNS6E4R58P"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  connectFirestoreEmulator(db,'127.0.0.1',8080)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}


