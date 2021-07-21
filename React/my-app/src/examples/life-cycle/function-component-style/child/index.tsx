import React, { useEffect, useState } from 'react';
import { logInfo } from '../../../../utils/logger';

export interface IChildProps {
  step?: number;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Child(props: IChildProps) {
  logInfo(`Child runs with props: ${JSON.stringify(props)}`);

  const [count, setCount] = useState(0);
  useEffect(() => {
    logInfo('Child rendered done, do effects');
    document.title = `Clicked Times: ${count}`;
    return () => {
      logInfo(`Child cleanup ${count}`);
    };
  }, [count]);
  useEffect(() => {
    logInfo('Child rendered done');
    return () => {
      logInfo('Child cleanup');
    };
  });
  return (
    <div>
      <h1>you have clicked {count} times</h1>
      <button onClick={() => setCount(count + (props.step || 1))}>+</button>
    </div>
  );
}

export default Child;
