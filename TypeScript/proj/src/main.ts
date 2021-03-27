// import { sayHello } from './greet'

// function showHello(divName: string, name: string) {
//   const elem = document.getElementById(divName);
//   elem.innerText = sayHello(name);
// }

// showHello('greeting', 'yuhui is learning ts suit. watchify test3!');

//console.log(sayHello('TypeScript'));

// function hello(compiler: string) {
//   console.log(`hello from ${compiler}`);
// }
// hello('TypeScript');

type compRes = -1 | 0 | 1;
function foo(a: number, b: number): -1 | 0 | 1 {
  if (a === b) {
    return 0;
  }

  return a - b < 0 ? -1 : 1;
}

console.log(foo(1, 2));
console.log(foo(1, 1));
console.log(foo(2, 1));