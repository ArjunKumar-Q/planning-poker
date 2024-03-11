import { useEffect, useState } from "react";
import { getFirestore,getDocs,collection,doc,deleteDoc,updateDoc} from "firebase/firestore";
import { useRouter } from "next/router";

export default function Sidebar(){
    let [active_players,setPlayers] = useState([])
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

    async function logoutHandler(e:React.MouseEventHandler){
        await deleteDoc(doc(store,'users',e.target.id))
        setPlayers(prev=>{
            let update = [...prev].filter(item=>item.id !== e.target.id)
            if (update.length === 0) gameReset()
            return update
        })
    }

    useEffect(()=>{
        let players = async function(){
            let querySnapshot =  await getDocs(collection(store, "users"));
            if(querySnapshot.size !== 0){
                let users = []
                querySnapshot.forEach((doc) => {
                    let {id} = doc
                    users.push({id,...doc.data()})
                });
                setPlayers(users)
            }else{
                router.push('/')
            }
        }
        players();
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
                                    <button className="bg-[#455a64] w-auto m-1 rounded text-sm text-white p-1" id={item.id} onClick={logoutHandler}>
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