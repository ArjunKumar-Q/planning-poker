import { EventHandler, SyntheticEvent, useEffect, useState } from "react";
import { getFirestore,getDocs,collection,doc,deleteDoc,updateDoc,onSnapshot,DocumentData} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Sidebar(){
    let [active_players,setPlayers] = useState<DocumentData[]>([])
    let [state,setState] = useState<string|null>(null)
    let store  = getFirestore()
    let router = useRouter();

    async function gameReset(){
        router.push('/')
            const docPath = doc(store, "choices", 'fs');
            let updateDocument = await updateDoc(docPath,{
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
              await updateDoc(doc(store,'choices','reveal_estimates'),{
                show:false
              })
    }

    async function logoutHandler(e:any){
        await deleteDoc(doc(store,'users',e.target.id))
        localStorage.removeItem('userId')
        router.push('/')
    }

    onSnapshot(collection(store,'users'),(doc)=>{
        let users:any[] = []
        if(doc.size !== 0){
            doc.forEach(item=>{
                let {id} = item
                users.push({id,...item.data()})
            })
        setPlayers(users)
        } else{
            router.push('/')
        }
    })

    useEffect(()=>{
        setState(window.localStorage.getItem('userId'))
        async function fetcher(){
            let players = await getDocs(collection(store,'users'))
            if(players.size !== 0){
                let data:DocumentData[] = [];
                players.forEach(item => {
                    data.push({id:item.id,name:item.data().name})
                });
                setPlayers(data);
            }else{
                router.push('/')
            }
        }
        fetcher()
    },[])

    return(
        <>
        <aside className=" flex justify-center w-full  p-4 lg:w-[500px]">
            <div className="w-full my-2 rounded-md overflow-hidden">
                <div className="bg-[#455a64] h-[40px] w-full flex items-center pl-2">
                    <span className="text-white text-md font-bold ">
                        Players
                    </span>
                </div>
                <div className="bg-[#9f9e9d40] ">
                    {
                        active_players.map((item,index)=>{
                            return(
                                <div className="h-[35px] mb-2 flex justify-between" key={index}>
                                    {item.name}
                                    <button className={`bg-[#455a64] w-auto m-1 rounded text-sm text-white p-1 ${item.id != state ? "hidden":"visible"}`} id={item.id} onClick={logoutHandler}>
                                        Logout
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </aside>
        </>
    )
}