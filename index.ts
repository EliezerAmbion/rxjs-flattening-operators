// ---------- concatMap HTTP request ----------
// import { fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { concatMap, map } from 'rxjs/operators';

// const endpointInput: HTMLInputElement =
//   document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     )
//   )
//   .subscribe((value) => console.log(value.response));

// ---------- concatMap HTTP request ERROR HANDLING (incorrect way) ----------
// import { EMPTY, fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { catchError, concatMap, map } from 'rxjs/operators';

// const endpointInput: HTMLInputElement =
//   document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// fromEvent(fetchButton, 'click')
//   .pipe(
//     map(() => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     ),
//     catchError(() => EMPTY)
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (err) => console.log('Error:', err),
//     complete: () => console.log('Completed'),
//   });

// ---------- concatMap HTTP request ERROR HANDLING (correct way) ----------
import { EMPTY, fromEvent, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, concatMap, map } from 'rxjs/operators';

const endpointInput: HTMLInputElement =
  document.querySelector('input#endpoint');
const fetchButton = document.querySelector('button#fetch');

fromEvent(fetchButton, 'click')
  .pipe(
    map(() => endpointInput.value),
    concatMap((value) =>
      ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
        catchError((error) => of(`Could not fetch data: ${error}`))
      )
    )
  )
  .subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log('Error:', err),
    complete: () => console.log('Completed'),
  });
