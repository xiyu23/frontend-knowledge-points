async function hello(props) {
  await sleep(5);
  return (
  <h1>Hello world! {props.name}</h1>
  );
}

function sleep(n) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('');
    }, n * 1000);
  });
}

export default hello;
