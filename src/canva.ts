import { fromEvent, map } from "rxjs"

const canvas : HTMLCanvasElement = document.getElementById('reactive-canvas')
var cursorPosition = { x: 0, y: 0 };

const onMouseDown$ = fromEvent(canvas, "mousedown").pipe(
  map( event  => {
    cursorPosition.x =  event?.clientX - canvas?.offsetLeft;
    cursorPosition.y =  event?.clientY - canvas?.offsetTop;
    console.log(cursorPosition)
  })
)
// const onMouseUp$ = fromEvent(canvas, "mouseup")
// const onMouseMove$ = fromEvent(canvas, "mousemove")

onMouseDown$.subscribe();

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.strokeStyle = "white";

canvasContext.beginPath()
canvasContext.moveTo(0, 0)
canvasContext.lineTo(100, 100)
canvasContext.stroke()
canvasContext.closePath()
