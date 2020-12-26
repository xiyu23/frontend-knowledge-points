// 定义State接口
interface State {
  insertCoin(): void;
  returnCoin(): void;
  turnCrank(): void;
  distributeGumball(): void;
}

class NoCoinState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertCoin(): void {
    console.log('you insert coin, waiting for next action...');
    this.gumballMachine.setState(this.gumballMachine.getHasCoinState());
  }
  returnCoin(): void {
    console.warn('you have not inserted coin, can not get coin back');
  }
  turnCrank(): void {
    console.warn('you have not inserted coin, can not turn crank');
  }
  distributeGumball(): void {
    console.warn('you have not inserted coin, wont distribute gumball');
  }
  
}

class HasCoinState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertCoin(): void {
    console.warn('you have inserted a coin, you cannot insert another coin');
  }
  returnCoin(): void {
    console.log('get your coin back');
    this.gumballMachine.setState(this.gumballMachine.getNoCoinState());
  }
  turnCrank(): void {
    console.log('you turned the crank, waiting for gumball...');
    this.gumballMachine.setState(this.gumballMachine.getDistributeState());
  }
  distributeGumball(): void {
    console.warn('you have inserted a coin, waiting for turning the crank...');
  }
  
}

class DistributeState implements State {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertCoin(): void {
    console.warn('distributing gumball, you cannot insert coin');
  }
  returnCoin(): void {
    console.warn('distributing gumball, you cannot get coin back');
  }
  turnCrank(): void {
    console.warn('distributing gumball, you cannot turn crank again');
  }
  distributeGumball(): void {
    console.log('distributing gumball...');
    // 转动曲柄后，开始发糖。但这个发糖需要判断：
    if (0 < this.gumballMachine.getCount()) {
      // 糖出来了
      console.log('gumball comes rolling out the slot');
      this.gumballMachine.setCount(this.gumballMachine.getCount() - 1);
      this.gumballMachine.setState(this.gumballMachine.getNoCoinState());
    } else {
      // 没有糖了
      console.warn('Oops, out of gumballs!');
      this.gumballMachine.setState(this.gumballMachine.getHasCoinState());
    }
  }
  
}


class GumballMachine {
  count: number;
  state: State;
  noCoinState: NoCoinState;
  hasCoinState: HasCoinState;
  distributeState: DistributeState;

  constructor(count: number) {
    this.setCount(count);

    this.noCoinState = new NoCoinState(this);
    this.hasCoinState = new HasCoinState(this);
    this.distributeState = new DistributeState(this);
    
    this.setState(this.getNoCoinState());
  }

  getCount(): number {
    return this.count;
  }

  setCount(count: number): void {
    this.count = count;
  }

  getState(): State {
    return this.state;
  }

  setState(s: State): void {
    this.state = s;
  }

  getNoCoinState(): NoCoinState {
    return this.noCoinState;
  }

  getHasCoinState(): HasCoinState {
    return this.hasCoinState;
  }

  getDistributeState(): DistributeState {
    return this.distributeState;
  }

  insertCoin() {
    this.getState().insertCoin();
  }

  returnCoin() {
    this.getState().returnCoin();
  }

  turnCrank() {
    this.getState().turnCrank();
    this.getState().distributeGumball();
  }
}

// 客户端代码，使用糖果机的测试
const gumballMachine = new GumballMachine(2);
gumballMachine.returnCoin();
gumballMachine.turnCrank();
gumballMachine.insertCoin();
gumballMachine.insertCoin();
gumballMachine.returnCoin();
gumballMachine.insertCoin();
gumballMachine.turnCrank();

console.log('-----------------------')

gumballMachine.turnCrank();
gumballMachine.insertCoin();
gumballMachine.turnCrank();

console.log('-----------------------')

gumballMachine.turnCrank();
gumballMachine.insertCoin();
gumballMachine.turnCrank();
gumballMachine.turnCrank();
gumballMachine.turnCrank();
gumballMachine.returnCoin();

// 总结：行为随着对象内部状态的改变而改变。
//      状态模式让维护变得容易，比如之前提到的新增一个状态，此时只需要新建一个类，不用管其他状态类。