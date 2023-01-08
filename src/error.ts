import { of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';


const letters$ = of('a', 'b', 'c','d').pipe(
  map((letter) => {
    if(letter == "c" ){
      x = 4;
    }
    return letter;
  }),
  retry(3),
  catchError((error) => of('ERROR: ', error.message) )
)

letters$.subscribe(console.log)
