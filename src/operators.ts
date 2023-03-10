import { map, reduce, filter, pluck, startWith, endWith } from 'rxjs/operators';
import { from, Observer, interval, fromEvent, of } from 'rxjs'

const timepassed$ = interval(120).pipe( 
  filter( num => num % 2 == 0)
);

const numbers$ = from([1, 2, 3, 4, 5, 6, 7, 8]).pipe(
  map(num => num * 2 ),
  map(num => num / 2 ),
  reduce((acc, val) => acc+val, 0 ),
);

const showNumbers: Observer<number[]> = {
  next: (val: number) => console.log(val),
  error: () => console.log('error'),
  complete: () => console.log('succes'),
}

// numbers$.subscribe(showNumbers)
// timepassed$.subscribe(console.log)

const mouseMove$ = fromEvent(document, 'mousemove').pipe(
  pluck("clientX")
)

const letters = of("a", "b", "c").pipe(
  endWith("z")
)
letters.subscribe(console.log)

// mouseMove$.subscribe(console.log)
