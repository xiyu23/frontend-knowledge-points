import { logLog } from "../../utils/logger";

class Parent extends React.Component {
  constructor(props) {
    logLog('Parent::ctor');
    super(props);
    this.state = {date: new Date()};
  }
}