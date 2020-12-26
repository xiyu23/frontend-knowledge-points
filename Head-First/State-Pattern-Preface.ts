/**
 * 状态模式：
 * 对象有很多状态，事件会触发状态之间的变迁，对象状态改变也会改变它的行为。
 * 
 * 背景：
 * 假设有一个糖果机，投入硬币、转动曲柄，就可以吐出一个糖果。当然了，要考虑糖果机是否还有糖，没糖的时候应该支持人家把钱拿回去。
 * 
 * 
 */

class GumballMachine {
  count: number;
  state: number; // 0 - 无硬币， 1 - 有硬币， 2 - 开始发糖

  constructor(count: number) {
    this.setCount(count);
    this.setState(0);
  }

  getCount(): number {
    return this.count;
  }

  setCount(count: number): void {
    this.count = count;
  }

  getState(): number {
    return this.state;
  }

  setState(s: number): void {
    this.state = s;
  }

  insertCoin() {
    if (this.getState() === 0) {
      console.log('you insert coin, waiting for next action...');
      this.setState(1);
    } else if (this.getState() === 1) {
      console.warn('you have inserted a coin, you cannot insert another coin');
    } else if (this.getState() === 2) {
      console.warn('distributing gumball, you cannot insert coin');
    }
  }

  returnCoin() {
    if (this.getState() === 0) {
      console.warn('you have not inserted coin, can not get coin back');
    } else if (this.getState() === 1) {
      console.log('get your coin back');
      this.setState(0);
    } else if (this.getState() === 2) {
      console.warn('distributing gumball, you cannot get coin back');
    }
  }

  turnCrank() {
    if (this.getState() === 0) {
      console.warn('you have not inserted coin');
    } else if (this.getState() === 1) {
      console.log('you turned the crank, waiting for gumball...');
      this.setState(2);

      // #1 转动曲柄后，开始发糖。但这个发糖需要判断：
      if (0 < this.getCount()) {
        // 糖出来了
        console.log('gumball comes rolling out the slot');
        this.setCount(this.getCount() - 1);
        this.setState(0);
      } else {
        // 没有糖了
        console.warn('Oops, out of gumballs!');
        this.setState(1);
      }
    } else if (this.getState() === 2) {
      console.warn('distributing gumball, you cannot turn crank again');
    }
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


// 看出啥问题来了吗？
/**
 * 1. state应该定义成类型，起码枚举也比Magic Number好
 * 2. 每个动作都要判断所有state，这个动作一般只在某些状态下才会有意义，经常其实只对N个状态中的个别才感兴趣
 * 3. state 2 好像没啥用？#1 这里是否可以在state=2设置后，调用一下发糖的函数（#1），那么#1其实就相当于一个动作了，即state==2时，执行这个发糖函数才有意义。
 *    那么这里就会增加state==2，并且把#1独立出去成为一个发糖动作。
 * 
 * 
 */

/*

解决3的方案：

turnCrank() {
  if (this.getState() === 0) {
    console.warn('you have not inserted coin');
  } else if (this.getState() === 1) {
    console.log('you turned the crank, waiting for gumball...');
    this.setState(2);
    this.distributeGumball();
  } else if (this.getState() === 2) {
    console.warn('distributing gumball, you cannot turn crank again');
  }
}

distributeGumball() {
  if (this.getState() === 0) {
    console.warn('you have not inserted coin');
  } else if (this.getState() === 1) {
    console.warn('you have inserted a coin, waiting for turning the crank...');
  } else if (this.getState() === 2) {
    console.log('distributing gumball...');
    // 转动曲柄后，开始发糖。但这个发糖需要判断：
    if (0 < this.getCount()) {
      // 糖出来了
      console.log('gumball comes rolling out the slot');
      this.setCount(this.getCount() - 1);
      this.setState(0);
    } else {
      // 没有糖了
      console.warn('Oops, out of gumballs!');
      this.setState(1);
    }
  }
}

*/


// 每个动作都要判断所有可能的状态，如果此时新增一个状态的话，我们就要在当前所有动作中增加这个新状态的判断逻辑，这就是违反了
// **对修改关闭，对扩展开放**原则呀。
// so，状态模式save you！如果能把每个状态隔离起来，新增状态不会去碰现存的状态，岂不美哉？
// 把纵向的修改，用水平的方式来替代（我自己想的）。
// 纵向是指，我们新增个状态，会在类中所有动作函数中修改，看起来是从上到下，纵向跨越了好多个函数；
// 横向是指，我们为每个特有的状态都实现它对不同动作的反应，并封装成一个类，那么这些状态类应该是平等的关系，即水平。
// 糖果机同样维护一个变量表示状态，但是这个状态不再简单地是一个int，而是一个**状态对象**！
// 当糖果机有一个动作需要执行时，就可以委托给当前的状态对象去做，因为这些状态对象必须实现了共同的接口，而这些接口就是糖果机中所有的动作！
// 
// OK，开始撸代码。
// 见 State-Pattern(410).ts