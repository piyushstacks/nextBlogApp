import Slidebar from "@/components/AdminComponents/Slidebar";

export default function Layout({children}){
    return(
        <>
            <div className="flex">
                <Slidebar/>
            </div>
            {children}
        </>
    )
}