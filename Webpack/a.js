function foo(tasks) {
  console.log(`start ${tasks.length} tasks...`);
  let promise = Promise.resolve('');
  for (let i = 0, l = tasks.length; i < l; i++) {
    promise = promise.then(async () => {
      return await tasks[i]();
    });
  }
  return promise;
}

function sleep(n) {
  return () => {
      return new Promise((res) => {
      console.log(`sleep ${n}s...`);
      setTimeout(() => {
        console.log('wake up');
        res();
      }, n * 1000);
    });
  }
}

var tasks = [sleep(3), sleep(1), sleep(2)];

// foo(tasks).then(() => {
//   console.log('all done');
// });

async function bar(tasks) {
  // for (const task of tasks) {
  for (let i = 0; i < tasks.length; i++) {
    await tasks[i]();
  }
}

bar(tasks);