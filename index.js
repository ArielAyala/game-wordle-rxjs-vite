import "./style.css";
import { Subject, fromEvent } from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");
const messageText = document.getElementById("message-text");

let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];

const getRandomWord = () =>
  WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
let rightWord = getRandomWord();
console.log(rightWord);

const userWinOrLoose$ = new Subject();

const onKeyDown$ = fromEvent(document, "keydown");

const insertLetterObserver = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase();
    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox =
        Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      userAnswer.push(pressedKey);
      letterIndex++;
    }
  },
};

const deleteLetterObserver = {
  next: (event) => {
    const pressedKey = event.key;
    if (pressedKey === "Backspace") {
      let currentRow = Array.from(letterRows)[letterRowIndex];
      let letterBox = currentRow.children[letterIndex - 1];
      letterBox.textContent = "";
      letterBox.classList.remove("filled-letter");
      userAnswer.pop();
      letterIndex--;
    }
  },
};

const checkWordObserver = {
  next: (event) => {
    if (event.key === "Enter") {
      const rightWordArray = Array.from(rightWord);

      if (userAnswer.length != 5) {
        messageText.textContent = "Some letters are missing";
        return;
      }

      for (let i = 0; i < 5; i++) {
        let letterColor = "";
        let letterBox = Array.from(letterRows)[letterRowIndex].children[i];
        console.log(letterBox);
        let letterPosition = rightWordArray.indexOf(userAnswer[i]);
        console.log(letterPosition);

        if (letterPosition === -1) {
          letterColor = "letter-grey";
        } else {
          if (rightWordArray[i] === userAnswer[i]) {
            letterColor = "letter-green";
          } else {
            letterColor = "letter-yellow";
          }
        }
        letterBox.classList.add(letterColor);
      }

      if (userAnswer.length === 5) {
        letterIndex = 0;
        userAnswer = [];
        letterRowIndex++;
      } 

      if (userAnswer.join("") === rightWord) {
        userWinOrLoose$.next();
      }
      
    }
  },
};

onKeyDown$.subscribe(insertLetterObserver);
onKeyDown$.subscribe(deleteLetterObserver);
onKeyDown$.subscribe(checkWordObserver);

userWinOrLoose$.subscribe(() => {
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add("letter-green");
  }
});
