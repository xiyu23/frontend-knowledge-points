import { sayHello } from './greet'

function showHello(divName: string, name: string) {
  const elem = document.getElementById(divName);
  elem.innerText = sayHello(name);
}

showHello('greeting', 'yuhui is learning ts suit. watchify test3!');

//console.log(sayHello('TypeScript'));

// function hello(compiler: string) {
//   console.log(`hello from ${compiler}`);
// }
// hello('TypeScript');


