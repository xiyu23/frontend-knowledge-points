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
    this.state = {
      date: new Date(),
    };
  }
  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}