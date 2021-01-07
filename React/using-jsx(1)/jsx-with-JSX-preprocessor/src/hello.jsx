function Welcome(props) {
  return <h1>hi, {props.name}</h1>;
}

function Hi(props) {
  return (
    <div>
      {props.name}
      {props.children}
    </div>
  );
}

// 在App组件内引用另一个组件Welcome
function App() {
  return (
    <div>
      <Welcome name='yuhui' />
      <Welcome name='yunhui' />
      <Welcome name='xiaohan' />
      <Hi name='this is name'>
        <div>content inside Hi tag</div>
      </Hi>
    </div>
  );
}

const element = <App />