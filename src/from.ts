import { from, of, interval } from 'rxjs';

const $fruits = from(['manzana','mango', 'banano'])
const $cars = of('toyoa', 'mazda')

// $fruits.subscribe((value)=> console.log(value))
// $cars.subscribe((value)=> console.log(value))


const $numbers = interval(1000);

// $numbers.subscribe((value) => console.log(value))

