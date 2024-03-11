import Image from "next/image";
import { Inter } from "next/font/google";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection,addDoc,getFirestore, getDocs,doc,getDoc,updateDoc,increment,decrement,setDoc } from "firebase/firestore";





const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let [userName,setUserName] = useState<string>('')
  let router = useRouter()
  let db = getFirestore()
  
   async function adder(){
    const docRef = await addDoc(collection(db, "users"), {
      name: userName
    });
    router.push("/game");
  }




  let changeHandler = (e)=>{
    
    setUserName(e.target.value)
  }

  useEffect(()=>{
    let createCollection = async function(){
      let data = await getDocs(collection(db,'choices'))
      if(!data.size){
        const docRef = doc(db, 'choices', 'fs');
          const newDoc = await setDoc(docRef, {
            '?':0,
            '1':0,
            '2':0,
            '3':0,
            '4':0,
            '5':0,
            '8':0,
            '13':0,
            '20':0,
            '40':0,
            '100':0,
          });
          console.log(docRef.id)
      }
    }
    createCollection()
  },[])
  return (
    <main
      className={`flex bg-white w-full flex text-center justify-center  ${inter.className}`}
      style={{
        height:'calc(100vh - 56px)'
      }}
    >
      <div className="">
        <div className="my-6"></div>
      <h1 className=" font-bold text-xl ">
        Create a planning poker room
      </h1>
      <div className="my-2"></div>
      <h4 className="text-md text-slate-600 ">
      and start estimating with your team right away
      </h4>
      <div className="my-6"></div>
      {/* onKeyDown={e=>e.key==='Enter'?router.push('/game'):null} */}
      <input type="text" placeholder="Please enter your name" className="border-2 pl-3 rounded-md h-[50px] w-4/5" defaultValue={userName} onChange={changeHandler} />
      <div className="my-8"></div>
      <button type="button" className="bg-[#455a64] w-3/5 h-[50px] rounded-full hover:bg-[#2e3b41] text-white text-sm font-semibold" onClick={()=>adder()}>
        CREATE ROOM
      </button>
      </div>
    </main>
  );
}
