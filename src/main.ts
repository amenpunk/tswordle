import { fromEvent, Subject } from 'rxjs';
import WORDLIST from '../wordlist.json';

const onKeyDown$ = fromEvent(document, "keydown")
const getRamdomWord = () => WORDLIST[Math.floor(Math.random() * WORDLIST.length)]
const rightWord: string = getRamdomWord();
console.log(rightWord)

let letterIndex: number = 0;
let letterRowIndex: number = 0;
let userAnswer: Array<string> = [];

let letterRows = document.getElementsByClassName('letter-row')

const userWinOrLose$ = new Subject();

const insertLetter = {
  next: (event: KeyboardEvent) => {
    let key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i)) {
      let letterBox: Element = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = key;
      letterBox.classList.add("filled-letter");
      letterIndex++;
      userAnswer.push(key.toUpperCase());
    }
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

const checkWord = {
  next: (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      let final_response = userAnswer.join("");
      if (final_response === rightWord) {
        userWinOrLose$.next("win");
      }
      console.log(final_response)
    }
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(checkWord)
userWinOrLose$.subscribe((value) => {
  let letterRowWined: Element = Array.from(letterRows)[letterRowIndex];
  for (let i = 0; i < 5; i++) {
    letterRowWined.children[i].classList.add('letter-green')
  }

})
