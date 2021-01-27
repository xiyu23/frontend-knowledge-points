const { useState } = React;

function HelloEveryone(props) {
  console.log('function component inited');
  const [names, setNames] = useState(props.names);

  // something happened
  function kill(name) {
    console.log(`killing ${name} ...`);
    let j = -1;
    for (let i = 0, l = names.length; i < l; i++) {
      if (name === names[i]) {
        j = i;
        break;
      }
    }
    if (j === -1) {
      console.error(`cannot find ${name} in names(len = ${names.length}): ${JSON.stringify(names)}`);
      return;
    }


    names.splice(j, 1); // remove this guy
    
    // won't work
    // setNames(names);

    // works, but why?
    setNames([...names]);

    console.log(`set names to(len=${names.length}): ${JSON.stringify(names)}`);
  }

  const welcomeAll = names.map(name => <h1 onClick={() => kill(name)}>{name}</h1>);
  return welcomeAll;
}

// 1. why not work?
// const [names, setNames] = useState(props.names);
// setNames(names);
// const welcomeAll = props.names.map(name => <h1 onClick={() => kill(name)}>{name}</h1>);

// use props for rendering the function component, but you are altering the STATE. and the state does not change since
// you cannot alter a state of type Array like that.

// 2. why also not work?
// const [names, setNames] = useState(props.names);
// setNames([...names]);
// const welcomeAll = props.names.map(name => <h1 onClick={() => kill(name)}>{name}</h1>);

// the `names` state is changed correctly but be warn! you are using the `props` to render the UI.
// Although the React triggers an update on this component for the changed `state`, but UI wont be updated
// since the data it depends on(which is `props`) has not been touched!

// 2. how to make it work though?
// const [names, setNames] = useState(props.names);
// setNames([...names]);

// use `names` defined by `useState` hook to render the UI
// const welcomeAll = names.map(name => <h1 onClick={() => kill(name)}>{name}</h1>);

