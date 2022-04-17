import React, { useLayoutEffect,useRef,useState}from "react";
import { useEffect } from "react";
import rough from 'roughjs/bundled/rough.esm'
//const document = require('../assets/sample_doc.png')

const generator = rough.generator()

const canvaWidth = 500
const canvaHeight = 809


const createLine = (x1,y1,x2,y2) =>{
    const line = generator.line(x1,y1,x2,y2)
    return {x1,y1,x2,y2,line}
}

const createRectangle = (x1,y1,x2,y2) =>{
    const roughtElement = generator.rectangle(x1,y1,x2-x1,y2-y1)
    return {x1,y1,x2,y2,roughtElement}

}

const getItemPosition = (itemRef) =>{
    const itemX = itemRef.current.offsetLeft
    const itemY = itemRef.current.offsetRight
    return {itemX,itemY}
}

export default function DrawCanva (){
    const canvaRef = useRef()

    const [elements, setElements] = useState([])
    const [drawing,setDrawing] = useState(false)
    const {itemX,itemY} =  getItemPosition(canvaRef)
    const [canvaPosition,setCanvaPosition] = useState({itemX,itemY})
    

    // get initial position
    useEffect(()=>{
        getItemPosition(canvaRef)
        console.log(canvaPosition)
    },[])

    // get updated position
    useEffect(()=>{
        window.addEventListener("resize",()=>{
            const {itemX,itemY} = getItemPosition(canvaRef)
            console.log(itemX,itemY)
        })
    },[])

    // update canva frame
    useLayoutEffect(()=>{
        const canvas = document.getElementById("canvas")
        const context = canvas.getContext("2d")
        context.clearRect(0,0,canvas.width,canvas.height)

        const roughtCanvas = rough.canvas(canvas)
        elements.forEach(element=>{
            roughtCanvas.draw(element.roughtElement)
        })

        // const rect = generator.rectangle(10,10,100,100)
        // const line = generator.line(10,10,110,110)
        // roughtCanvas.draw(rect)
        // roughtCanvas.draw(line)
    },[elements])

    const handleMouseDown = (event)=>{
        setDrawing(true)
        const {clientX,clientY} = event
        
        const element = createRectangle(clientX,clientY,clientX,clientY)
        setElements((previousState)=>[...previousState,element])
    }

    const handleMouseMove = (event)=>{
        if(!drawing) return
        
        const {clientX,clientY} = event
    
        const index = elements.length -1
        const {x1,y1} = elements[index]
        const updatedElement = createRectangle(x1,y1,clientX,clientY)
        
        const elementCopy = [...elements]
        elementCopy[index] = updatedElement

        setElements(elementCopy)
        //console.log(clientX,clientY)
    }

    const handleMouseUp = () =>{
        setDrawing(false)
    }

    return (
        <>
            <canvas 
                id="canvas" 
                style={{backgroundColor:'#f5f5f5',border:'solid 0.5px grey'}} 
                width={canvaWidth} 
                height={canvaHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={canvaRef}
                >
                Canvas
            </canvas>
        </>
    )
}