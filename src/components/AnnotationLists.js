import { annotation } from "../data/annotation";

export default function AnnotationList () {
    
    
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

    return (
        <>
            <h1>this is the list</h1>
            <ul>
                {renderLists(annotation)}
            </ul>
            
        </>
    )
}