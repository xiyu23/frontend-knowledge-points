import React from 'react';
import { logInfo } from '../../../../utils/logger';

export interface IChildProps {
  id: string;
}

export class Child extends React.Component<IChildProps> {
  constructor(props: IChildProps) {
    super(props);
    logInfo(`child-${this.props.id}::ctor`);
    // this.state = {
    //   initialCount: props.num,
    // };
  }

  componentDidMount() {
    logInfo(`child-${this.props.id}::componentDidMount`);
  }

  componentDidUpdate() {
    logInfo(`child-${this.props.id}::componentDidUpdate`);
  }

  componentWillUnmount() {
    logInfo(`child-${this.props.id}::componentWillUnmount`);
  }

  render() {
    console.log(`child-${this.props.id}::render`);
    return <div>I am child</div>;
  }
}
