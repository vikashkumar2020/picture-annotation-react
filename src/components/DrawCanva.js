import React, { useLayoutEffect,useRef,useState}from "react";
import { useEffect } from "react";
import rough from 'roughjs/bundled/rough.esm'

// get doc dimension
const doc = require('../assets/sample_doc.png')
const generator = rough.generator()


const createRectangle = (x1,y1,x2,y2) =>{
    const roughtElement = generator.rectangle(x1,y1,x2-x1,y2-y1)
    return {x1,y1,x2,y2,roughtElement}
}

const getItemPosition = (itemRef) =>{
    const posX = itemRef.current.offsetLeft
    const posY = itemRef.current.offsetTop
    return {posX,posY}
    // return {'posX':posX,'posY':posY}
}

export default function DrawCanva (props){
    const {width} = props
    const pictureRef = useRef()
    const canvaRef = useRef()

    const [elements, setElements] = useState([])
    const [drawing,setDrawing] = useState(false)
    const [canvaPosition,setCanvaPosition] = useState([])
    const [ratio, setRatio] = useState(1)

    const updatePosition = () =>{
        let X = getItemPosition(canvaRef)['posX']
        let Y = getItemPosition(canvaRef)['posY']
        setCanvaPosition([X,Y])
        //console.log("on resize : "+canvaPosition)
    }

    // on picture mount, resize canvas
    useEffect(()=>{
        setRatio(width/pictureRef.current.naturalWidth)
        canvaRef.current.width = pictureRef.current.width || pictureRef.current.naturalWidth
        canvaRef.current.height = pictureRef.current.naturalHeight*ratio|| pictureRef.current.height || pictureRef.current.naturalHeight
        console.log("ratio  :"+ratio)
    },[pictureRef,width,ratio])

    //On init : 
    // @init canva position
    // @add event listener
    useEffect(()=>{
        const canvas = document.getElementById("canvas")
        const context = canvas.getContext("2d")
        context.clearRect(0,0,canvas.width,canvas.height)
        const docPic = document.getElementById("docPic")
        context.drawImage(docPic,0,0,pictureRef.current.width,pictureRef.current.height*ratio);

        let X = getItemPosition(canvaRef)['posX']
        let Y = getItemPosition(canvaRef)['posY']
        setCanvaPosition([X,Y])

        window.addEventListener("resize",updatePosition)
        return (()=>{
            window.removeEventListener("resize",updatePosition)
        })
    },[])

    
    // update canva frame
    useLayoutEffect(()=>{
        const canvas = document.getElementById("canvas")
        const context = canvas.getContext("2d")
        const roughtCanvas = rough.canvas(canvas)
        const docPic = document.getElementById("docPic")

        context.clearRect(0,0,canvas.width,canvas.height)
        context.drawImage(docPic,0,0,pictureRef.current.width,pictureRef.current.height*ratio);
        elements.forEach(element=>{
            roughtCanvas.draw(element.roughtElement)
        })
    },[elements])

    const handleMouseDown = (event)=>{
        setDrawing(true)
        // const {clientX,clientY} = event
        const pageX = event.pageX
        const pageY = event.pageY
        const canvaX = canvaPosition[0]
        const canvaY = canvaPosition[1]

        const x = pageX-canvaX
        const y = pageY-canvaY

        const element = createRectangle(x,y,x,y)

        setElements((previousState)=>[...previousState,element])
    }

    const handleMouseMove = (event)=>{
        if(!drawing) return
        
        // const {clientX,clientY} = event //mouse relatif position by canvas posision
        
        const index = elements.length -1
        const {x1,y1} = elements[index]

        const pageX = event.pageX           //mouse relatif position by pointer in page posision
        const pageY = event.pageY

        const canvaX = canvaPosition[0]
        const canvaY = canvaPosition[1]

        const x = pageX-canvaX
        const y = pageY-canvaY

        const updatedElement = createRectangle(x1,y1,x,y)
        
        const elementCopy = [...elements]
        elementCopy[index] = updatedElement

        setElements(elementCopy)
    }

    const handleMouseUp = () =>{
        setDrawing(false)
    }

    return (
        <>
            <canvas 
                id="canvas" 
                style={{
                    border:'solid 0.5px grey',
                    backgroundImage : "url('./sample_doc.png')"
                }} 
                width={width}
                
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={canvaRef}
                >
                Canvas 
            </canvas>

            <img 
                id="docPic" 
                ref={pictureRef} 
                src={doc} 
                style={{display:"none"}} 
                width={width}
                
                alt="Document pic"
                />
        </>
    )
}