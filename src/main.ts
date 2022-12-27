import { fromEvent, Observable, Observer, Subject } from 'rxjs';
import WORDLIST from '../wordlist.json';

const onKeyDown$: Observable<Event> = fromEvent(document, "keydown")
const getRamdomWord = () => WORDLIST[Math.floor(Math.random() * WORDLIST.length)]
const rightWord: string = getRamdomWord();
console.log(rightWord)
const messageText = document.getElementById("message-text")

let letterIndex: number = 0;
let letterRowIndex: number = 0;
let userAnswer: Array<string> = [];

let letterRows = document.getElementsByClassName('letter-row')

const userWinOrLose$ = new Subject();

const insertLetter: Observer<KeyboardEvent> = {
  next: (event: KeyboardEvent) => {
    let key = event.key;
    if (key.length === 1 && key.match(/[a-z]/i)) {
      let letterBox: Element = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      if (!letterBox) return
      letterBox.textContent = key;
      letterBox.classList.add("filled-letter");
      letterIndex++;
      userAnswer.push(key.toUpperCase());
    }
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

const checkWord: Observer<KeyboardEvent> = {
  next: (event: KeyboardEvent) => {
    if (event.key === 'Enter') {

      let rightWordArray : string[] = Array.from(rightWord)

      for (let i = 0; i < 5; i++) {
        let letterColor = "";
        let letterBox = Array.from(letterRows)[letterRowIndex].children[i];
        let letterPosition = Array.from(rightWord).indexOf(userAnswer[i])
        if (letterPosition === -1) {
          letterColor = 'letter-grey';
        } else {
          if (rightWordArray[i] === userAnswer[i]){
             letterColor='letter-green'
          }else{
             letterColor='letter-yellow'
          }
        }
        letterBox.classList.add(letterColor);
      }

      if (userAnswer.length === 5) {
        letterIndex = 0;
        userAnswer = [];
        letterRowIndex++;
      } else {
        messageText.textContent = "te faltan palabras";
      }


      let final_response = userAnswer.join("");
      if (final_response === rightWord) {
        userWinOrLose$.next("win");
      }
    }
  },
  complete: () => console.log('complete'),
  error: (e: Error) => console.error('error', e.message),
}

const deleteWord: Observer<KeyboardEvent> = {
  next: (event: KeyboardEvent) => {
    if (event.key === 'Backspace' && letterIndex !== 0) {
      let currentRow = letterRows[letterRowIndex];
      let letterBox = currentRow.children[letterIndex - 1];
      letterBox.textContent = '';
      letterBox.classList.remove("filled-letter")
      letterIndex--;
      userAnswer.pop();
    }
  },
  error: console.log,
  complete: console.log,
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(checkWord)
onKeyDown$.subscribe(deleteWord);

userWinOrLose$.subscribe((value) => {
  messageText.textContent = "Ganaste!!!";
  let letterRowWined: Element = Array.from(letterRows)[letterRowIndex];
  for (let i = 0; i < 5; i++) {
    letterRowWined.children[i].classList.add('letter-green')
  }

})
