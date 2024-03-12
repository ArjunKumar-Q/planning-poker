import { SyntheticEvent, useState } from "react"
import Sidebar from "@/components/Sidebar";
import { getDoc, collection, getDocs, getFirestore,updateDoc,increment,doc,onSnapshot, DocumentData } from "firebase/firestore";

interface State{ values: { current: null|number|string, prev: null|number|string }, reveal: boolean, resultData: DocumentData|undefined; }

function GamerBoard(){
    let [state,setState] = useState<State>({
       values:{
        current:null,
        prev:null,
       },
       reveal:false,
       resultData:undefined
    })
    let store  = getFirestore()

    async function stateHandler(event:any){
        let data = await getDocs(collection(store,'choices'))
        let {id} = event.target;
        if(state.values.current === null){
            setState(prev=>{
                return {
                    ...prev,
                    values:{
                        ...prev.values,
                        ['current']:id,
                    }
                }
            })
            const docPath = doc(store, "choices", 'fs');

            let docx = await updateDoc(docPath,{
              [id]:increment(1)
            });
        }else if(id === state.values.current){
            return ;
        }else{
            setState(prev=>{
                return {
                    ...prev,
                    values:{
                        ['prev']:prev.values.current,
                        ['current']:id
                    }
                }
            })
            const docPath = doc(store, "choices", 'fs');
            let docx = await updateDoc(docPath,{
              [id]:increment(1),
              [state.values.current]:increment(-1)
            });
        }

    }

    async function estimateHandler(){
            let data = await getDoc(doc(store,'choices',"fs"))
            const docPath = doc(store, "choices", 'reveal_estimates');
            let updateDocument = await updateDoc(docPath,{
                show:true
              });
            setState((prev)=>{
            return{
                values:{
                    current:null,
                    prev:null
                },
                reveal:!prev.reveal,
                resultData:data?.data()
            }
        })
    }

    async function resetHandler(){
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
        setState(()=>{
        return{
            values:{
                current:null,
                prev:null
            },
            reveal:false,
            resultData:undefined,
        }
    })  
    }

     
    onSnapshot(doc(store,'choices','reveal_estimates'), async (docu) => {
        let data:any;
        if(docu.data()?.show){
            data = await getDoc(doc(store,'choices',"fs"))
        }
        setState(prev=>{
            return{
                ...prev,
                reveal:docu.data()?.show,
                resultData: data !== undefined && data.data()
            }
        })
    });




    return(
    !state.reveal ?
        (<div className="flex flex-col w-full items-center">
        <div key={'47398'} className="grid p-4 grid-cols-2 grid-row-6 md:grid-cols-4 md:grid-row-3   gap-2 xl:grid-rows-2 xl:grid-cols-6  w-full xl:h-3/4">
            {
                [1,2,3,4,5,8,13,20,40,100,"?"].map((item:string|number,index)=>{
                    return(
                        <>
                        <div key={index+29} className={` ${state.values.current == item ? 'bg-[#455a64] text-white':"bg-[#9f9e9d40]"} p-3 grid place-items-center h-[15vh] md:h-[25vh] xl:h-[30vh] rounded-md `} id={item} onClick={stateHandler}>
                            <span className="text-2xl">
                            {item}
                            </span>
                        </div>
                        </>
                    )
                })
            }
        </div>
        
            <button type="button" className="bg-[#455a64] w-2/5 h-[50px] rounded-full hover:bg-[#2e3b41] text-white text-md font-semibold" onClick={()=>estimateHandler()}>
            REVEAL ESTIMATES
        </button>
      <div className="my-4"></div>
            </div>)
            :(
                <div className="flex flex-col items-center  w-full px-4 my-10   ">
                    <table className="border-2 w-full">
                        <thead className="">
                            <tr className="h-[56px]">
                            <th className="border-4">Period</th>
                            <th className="border-4">Values</th>
                            </tr>
                        </thead>
                        <tbody className="border-4 ">
                           {
                            state.resultData && Object.entries(state.resultData).map(item=>{
                                return(
                                    <>
                                     <tr className="h-[40px] m-2 border-b-4">
                                    <td className=" text-center border-r-4 ">
                                    {item[0]}
                                    </td>
                                    <td className="text-center">
                                    {item[1]}
                                    </td>
                                </tr>
                                    </>
                                )
                                   
                            })
                           }
                        </tbody>
                    </table>
                    <button type="button" className="bg-[#455a64] w-2/5 h-[50px] rounded-full hover:bg-[#2e3b41] text-white text-md font-semibold my-3" onClick={()=>resetHandler()}>RESTART</button>
                </div>
            )
    )
}

export default function Game(){
    return(
        <main
        className={`bg-white w-full flex flex-col lg:flex-row `}
        style={{
          minHeight:'calc(100vh - 56px)',
          maxHeight:"auto"
        }}
      >
        <Sidebar/>
        <GamerBoard/>
        </main>
    )
}



