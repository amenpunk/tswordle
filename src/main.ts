import { fromEvent } from 'rxjs';

// document.addEventListener('DOMContentLoaded',() => {
//   console.log('document ready')
// })
//
const onMouseMove$ = fromEvent(document, "mousemove")

const observerMouse = {
  next: (event: MouseEvent) => {
    console.log(event)
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

onMouseMove$.subscribe(observerMouse)
