import './style.css'

import { fromEvent } from 'rxjs'

const onKeyDown$ = fromEvent(document, 'keydown');

const observer = {
  next: (event) => {
    console.log(event.key);
  }
};

onKeyDown$.subscribe(observer);