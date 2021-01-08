// function Clock(props) {
//   let timeString = new Date().toLocaleTimeString();
//   setInterval(() => {
//     timeString = new Date().toLocaleTimeString();
//   }, 1000);

//   return (
//     <div>
//       <h2>It is {timeString}.</h2>
//     </div>
//   );
// }

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.timerID = 0;
    this.state = {
      date: new Date(),
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    this.timerID = 0;
  }
  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}