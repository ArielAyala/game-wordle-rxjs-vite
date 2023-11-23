import './style.css'
import { fromEvent } from 'rxjs'

const letterRows = document.getElementsByClassName('letter-row');

let letterIndex = 0;
let letterRowIndex = 0;

const onKeyDown$ = fromEvent(document, 'keydown');

const insertLetterObserver = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i) ) {
      console.log(letterRows);
      let letterBox = Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add('filled-letter');
      letterIndex++;
    }
  }
};

onKeyDown$.subscribe(insertLetterObserver);