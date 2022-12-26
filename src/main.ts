import { fromEvent } from 'rxjs';

const onKeyDown$ = fromEvent<KeyboardEvent>(document, "keydown")

let letterIndex: number = 0;
let letterRowIndex: number = 0;

let letterRows = document.getElementsByClassName('letter-row')

const insertLetter = {
  next: (event: KeyboardEvent) => {
    let key = event.key;
    if(key.length === 1 && key.match(/[a-z]/i)){
      console.log(key);
      console.log(letterRows)
      let letterBox :HTMLDivElement  = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = key;
      letterBox.classList.add("filled-letter");
      letterIndex++;
    }
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

onKeyDown$.subscribe(insertLetter)
