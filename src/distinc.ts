import { of, fromEvent } from 'rxjs';
import { 
  distinct, debounceTime, auditTime,throttleTime, sampleTime
} from 'rxjs/operators';

const numbers$ = of(1,2,3,3,4).pipe(
  distinct()
)

console.log(numbers$);

const onClick$ = fromEvent(document,"click").pipe(
  sampleTime(4000)
)

onClick$.subscribe(console.log)
