(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(name) {
    return "Hello from " + name;
}
exports.sayHello = sayHello;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function showHello(divName, name) {
    var elem = document.getElementById(divName);
    elem.innerText = greet_1.sayHello(name);
}
showHello('greeting', 'yuhui is learning ts suit. watchify test3!');
//console.log(sayHello('TypeScript'));
// function hello(compiler: string) {
//   console.log(`hello from ${compiler}`);
// }
// hello('TypeScript');
},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZ3JlZXQudHMiLCJzcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsU0FBZ0IsUUFBUSxDQUFDLElBQVk7SUFDbkMsT0FBTyxnQkFBYyxJQUFNLENBQUM7QUFDOUIsQ0FBQztBQUZELDRCQUVDOzs7O0FDRkQsaUNBQWtDO0FBRWxDLFNBQVMsU0FBUyxDQUFDLE9BQWUsRUFBRSxJQUFZO0lBQzlDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxTQUFTLENBQUMsVUFBVSxFQUFFLDRDQUE0QyxDQUFDLENBQUM7QUFFcEUsc0NBQXNDO0FBRXRDLHFDQUFxQztBQUNyQywyQ0FBMkM7QUFDM0MsSUFBSTtBQUNKLHVCQUF1QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBmdW5jdGlvbiBzYXlIZWxsbyhuYW1lOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYEhlbGxvIGZyb20gJHtuYW1lfWA7XHJcbn0iLCJpbXBvcnQgeyBzYXlIZWxsbyB9IGZyb20gJy4vZ3JlZXQnXHJcblxyXG5mdW5jdGlvbiBzaG93SGVsbG8oZGl2TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGl2TmFtZSk7XHJcbiAgZWxlbS5pbm5lclRleHQgPSBzYXlIZWxsbyhuYW1lKTtcclxufVxyXG5cclxuc2hvd0hlbGxvKCdncmVldGluZycsICd5dWh1aSBpcyBsZWFybmluZyB0cyBzdWl0LiB3YXRjaGlmeSB0ZXN0MyEnKTtcclxuXHJcbi8vY29uc29sZS5sb2coc2F5SGVsbG8oJ1R5cGVTY3JpcHQnKSk7XHJcblxyXG4vLyBmdW5jdGlvbiBoZWxsbyhjb21waWxlcjogc3RyaW5nKSB7XHJcbi8vICAgY29uc29sZS5sb2coYGhlbGxvIGZyb20gJHtjb21waWxlcn1gKTtcclxuLy8gfVxyXG4vLyBoZWxsbygnVHlwZVNjcmlwdCcpO1xyXG5cclxuXHJcbiJdfQ==
