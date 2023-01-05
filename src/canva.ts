import { fromEvent } from "rxjs"
import { takeUntil, map, mergeAll } from 'rxjs/operators'

const canvas: HTMLCanvasElement = document.getElementById('reactive-canvas')
var cursorPosition = { x: 0, y: 0 };

const updateCursorPosition = (event: MouseEvent) => {
  cursorPosition.x = event?.clientX - canvas?.offsetLeft;
  cursorPosition.y = event?.clientY - canvas?.offsetTop;
  console.log(cursorPosition)
}

const onMouseDown$ = fromEvent(canvas, "mousedown").pipe(
  map(event => {
    updateCursorPosition(event)
  })
)
const onMouseUp$ = fromEvent(canvas, "mouseup")
const onMouseMove$ = fromEvent(canvas, "mousemove").pipe(takeUntil(onMouseUp$))

onMouseDown$.subscribe();

const canvasContext = canvas.getContext("2d");
canvasContext.lineWidth = 8;
canvasContext.lineJoin = "round";
canvasContext.lineCap = "round";
canvasContext.strokeStyle = "white";


function paintStroke(event: MouseEvent): void {
  canvasContext?.beginPath()
  canvasContext?.moveTo(cursorPosition.x, cursorPosition.y)
  updateCursorPosition(event)
  canvasContext?.lineTo(cursorPosition.x, cursorPosition.y)
  canvasContext?.stroke()
  canvasContext?.closePath()
}


const startPaint$ = onMouseDown$.pipe(
  map(() => onMouseMove$),
  mergeAll()
)

startPaint$.subscribe(paintStroke)
