import { from, fromEvent, interval } from 'rxjs';
import { map, mergeAll, mergeMap, mergeWith } from 'rxjs/operators';


const onClick$ = fromEvent(document, 'click').pipe(
  map(event => event.type)
)

const onMouseMove$ = fromEvent(document, 'mousemove').pipe(
  map(event => event.type)
)

// onClick$.subscribe(console.log)
// onMouseMove$.subscribe(console.log)

const documentEvent$ = onMouseMove$.pipe(
  mergeWith(onClick$)
)

documentEvent$.subscribe( (value) => {
    console.log('obs', value )
})


const onKeyPress$ = fromEvent(document,'keypress').pipe(
  map( ( event ) => 'keypress:'+ event.key)
)

const onKeyDown$ = fromEvent(document,'keydown').pipe(
  map( ( event ) => 'keydown:'+ event.key)
)


const orderSuperior$ =  onKeyPress$.pipe(map(() => interval(1000)))
const primerOrder$ = orderSuperior$.pipe( mergeAll() )

primerOrder$.subscribe(console.log)


const letters$ = from(['a','b','c'])

const result$ = letters$.pipe(
  mergeMap( letter => interval(1000).pipe( map(second => letter + second) ) )
)

result$.subscribe(console.log)
