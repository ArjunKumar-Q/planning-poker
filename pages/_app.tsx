import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBnDXTMxMixtiS-nCFxqcHUso-f7izNI9c",
  authDomain: "poker-50a1f.firebaseapp.com",
  projectId: "poker-50a1f",
  storageBucket: "poker-50a1f.appspot.com",
  messagingSenderId: "413958523238",
  appId: "1:413958523238:web:5644ea0c22686c262520a7",
  measurementId: "G-C9DDTZYZCB"
};


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}


