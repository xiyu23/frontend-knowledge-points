import Dep from './dep';
import Watcher from './watcher';

const window = {
  target: null,
};

function defineReactive(data, key, val) {
  let dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log(`invoke object's '${key}' getter`);
      dep.depend();
      return val;
    },
    set: function(newVal) {
      if (newVal === val) {
        return;
      }

      dep.notify(val, newVal);
      val = newVal;
    },
  });
}





// source data, actually a vm instance
const data = {
  a: {
    b: {
      c: 1,
    }
  },
  b: 2,
};

// -------------------------Vue---------------------------
// 1. convert data into a watcher
const watcher = new Watcher(data, 'a.b.c', function(newVal, oldVal) {
  console.log(`a.b.c updated from ${oldVal} to ${newVal}`);
});

// 2. set watcher onto window
window.target = watcher;
  
// 3. defineReactive
defineReactive(data, 'a', data.a);



// -------------------------Vue---------------------------

// client1
function client1a() {
  this.update = function(oldVal, newVal) {
    console.log(`client1 update a: ${oldVal} to ${newVal}`);
  }
}
const client1a = new client1a();
window.target = client1a;

console.log(data.a);
data.a = 2;
console.log(data.a);

// client2