import React, { useLayoutEffect,useRef,useState}from "react";
import { useEffect } from "react";
import rough from 'roughjs/bundled/rough.esm'
//const document = require('../assets/sample_doc.png')

const generator = rough.generator()

const canvaWidth = 500
const canvaHeight = 809

// const createLine = (x1,y1,x2,y2) =>{
//     const line = generator.line(x1,y1,x2,y2)
//     return {x1,y1,x2,y2,line}
// }

// var box = document.querySelector(".box");
// var pageX = document.getElementById("x");
// var pageY = document.getElementById("y");

// function updateDisplay(event) {
//   pageX.innerText = event.pageX;
//   pageY.innerText = event.pageY;
// }

// box.addEventListener("mousemove", updateDisplay, false);
// box.addEventListener("mouseenter", updateDisplay, false);
// box.addEventListener("mouseleave", updateDisplay, false);

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

export default function DrawCanva (){
    const canvaRef = useRef()
    const [elements, setElements] = useState([])
    const [drawing,setDrawing] = useState(false)
    
    const [canvaPosition,setCanvaPosition] = useState([])

    const updatePosition = () =>{
        let X = getItemPosition(canvaRef)['posX']
        let Y = getItemPosition(canvaRef)['posY']
        setCanvaPosition([X,Y])
        //console.log("on resize : "+canvaPosition)
    }


    //On init : 
    // @init canva position
    // @add event listener
    useEffect(()=>{
        let X = getItemPosition(canvaRef)['posX']
        let Y = getItemPosition(canvaRef)['posY']
        setCanvaPosition([X,Y])

        window.addEventListener("resize",updatePosition)
        return (()=>{
            window.removeEventListener("resize",updatePosition)
        })
    },[])


    // useEffect(()=>{
    //     //setCanvaPosition([X,Y])
    //     console.log("On resize : "+canvaPosition) 
    // },[canvaPosition])
 
    

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