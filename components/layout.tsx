import { ReactElement} from "react";
import Header from "./header";
import Sidebar from "./Sidebar";


export default  function  LayoutWithOutSideBar({children}:{children:ReactElement}){
    return (
       <>
        <Header/>
        <main className="flex flex-col md:flex-row">
            {children}
        </main>
       </>
    )
}

