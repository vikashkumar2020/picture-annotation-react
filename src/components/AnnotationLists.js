import { useEffect,useState } from "react";
import { annotation } from "../data/annotation";




export default function AnnotationList () {
    
    const [dataList,setDataList] = useState(annotation)


    function list(element){
        return <>
            <li>
                Type : {element.type}
                <br/>
                Content : {element.content}
            </li>
        </>
    }

    function renderLists (data){
        return data.map(e=>{
            return(
                list(e)
            )
        })
    }

    useEffect(()=>{

    },[dataList])

    return (
        <>
            <h1>this is the list</h1>
            <ul>
                {renderLists(dataList)}
            </ul>
            
        </>
    )
}