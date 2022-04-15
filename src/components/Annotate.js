import React, {useLayoutEffect,useState}from "react";
import { RoughCanvas } from "roughjs/bin/canvas";
import rough from 'roughjs/bundled/rough.esm'
//const document = require('../assets/sample_doc.png')

const generator = rough.generator()

const canvaWidth = 500
const canvaHeight = 809

export default function Annotate (){
    useLayoutEffect(()=>{
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext("2d")

        const roughtCanvas = rough.canvas(canvas)
        const rect = generator.rectangle(10,10,100,100)
        const line = generator.line(10,10,110,110)
        roughtCanvas.draw(rect)
        roughtCanvas.draw(line)
    })

    return (
        <>
            <canvas 
                id="canvas" 
                style={{backgroundColor:'#f5f5f5',border:'solid 0.5px grey'}} 
                width={canvaWidth} 
                height={canvaHeight}>


                Canvas
            </canvas>
        </>
    )
}