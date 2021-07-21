import React, { ChangeEvent, useEffect, useState } from 'react';
import { logInfo } from '../../../../utils/logger';
import Child from '../child';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Parent() {
  logInfo('Parent runs with props');

  const [step, setStep] = useState<number>(1);
  const [isShow, setIsShow] = useState<boolean>(false);

  // const [count, setCount] = useState(0);
  useEffect(() => {
    logInfo('Parent rendered done, do effects');
    return () => {
      logInfo('Parent cleanup');
    };
  });
  const onStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStep(parseInt(e.target.value, 10));
  };
  return (
    <div>
      <h1>This is Parent</h1>
      <input type='number' value={step} onChange={onStepChange}/>
      <button onClick={() => setIsShow(!isShow)}>{isShow ? 'Hide' : 'Show'} Child</button>
      {
        isShow && <>
        <h2>This is Child</h2>
        <Child step={step} />
        </>
      }
    </div>
  );
}

export default Parent;
