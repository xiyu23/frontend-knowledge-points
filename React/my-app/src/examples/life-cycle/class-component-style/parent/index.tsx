import React from 'react';
import { logInfo } from '../../../../utils/logger';
import { Child } from '../child/idnex';

export class Parent extends React.Component {
  constructor(props: any) {
    logInfo('parent::ctor');
    super(props);
    // this.state = {
    //   initialCount: props.num,
    // };
  }

  componentDidMount() {
    logInfo('parent::componentDidMount');
  }

  componentDidUpdate() {
    logInfo('parent::componentDidUpdate');
  }

  componentWillUnmount() {
    logInfo('parent::componentWillUnmount');
  }

  render() {
    console.log("parent::render");
    // console.log("Parent render start");
    //     const c = <Child />;
    //     console.log("Parent render end");
    //     return c;
    return (
      <>
        <div>I am parent</div>
        <Child id='C0'/>
        <Child id='C1'/>
      </>
    );
  }
}
