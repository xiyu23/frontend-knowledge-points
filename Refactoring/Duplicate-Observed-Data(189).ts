// 将界面表现类中的业务逻辑抽离，放在一个被称作"领域类"里。并且这里用到了观察者模式

// 方法一：最直接的设计方法：业务逻辑直接写在界面类里
class UI {
  a: number;
  b: number;

  constructor() {
    this.a = 0;
    this.b = 0;
  }

  onInputChangeOnA(val: number): void {
    console.log(`a changes from ${this.a} to ${val}`);
    this.a = val;

    const sum: number = this.a + this.b; // #1
    
    console.log(`${this.a} + ${this.b} = ${sum}`);
  }

  onInputChangeOnB(val: number): void {
    console.log(`b changes from ${this.b} to ${val}`);
    this.b = val;

    const sum: number = this.a + this.b; // #2
    
    console.log(`${this.a} + ${this.b} = ${sum}`);
  }
}

// 上面这个类可以假想是简单的加法运算：视图提供了2个input，最后会显示a+b的结果。
// 其实#1、#2就是业务逻辑，与视图是无关的。这样写就是将视图界面和业务逻辑耦合在了一起。
// 重构它，将这两个解耦！

// 方法二：解耦View和业务逻辑，创建一个"领域类"（是不是就称之为ViewModel？？）
// 1.把View中耦合的业务逻辑数据，copy到领域类里，并提供给View方法来修改这些数据
// 2.结合观察者模式

interface IObserver {
  update(ob: IObservable, args: any): void
}

interface IObservable {
  addObserver(observer: IObserver): void
  removeObserver(observer: IObserver): void
  notifyObservers(): void
}

class DomainModel implements IObservable {
  a: number;
  b: number;
  sum: number;
  observers: Set<IObserver>;
  
  constructor() {
    this.a = 0;
    this.b = 0;
    this.sum = this.a + this.b;
    this.observers = new Set<IObserver>();
  }

  addObserver(observer: IObserver): void {
    this.observers.add(observer);

    // 是不是更新下比较好？
    // observer.update(this, {
    //   a: this.a,
    //   b: this.b,
    //   sum: this.sum,
    // });
  }

  removeObserver(observer: IObserver): void {
    this.observers.delete(observer);
  }

  notifyObservers(): void {
    this.observers.forEach(entry => {
      // Q1：如何设定需要更新的数据？
      entry.update(this, {
        a: this.a,
        b: this.b,
        sum: this.sum,
      });
    })
  }

  setA(val: number): void {
    console.log(`[model] a changes from ${this.a} to ${val}`);
    this.a = val;
    this.sum = this.a + this.b;
    console.log(`[model] ${this.a} + ${this.b} = ${this.sum}`);
    this.notifyObservers();
  }

  setB(val: number): void {
    console.log(`[model] b changes from ${this.b} to ${val}`);
    this.b = val;
    this.sum = this.a + this.b;
    console.log(`[model] ${this.a} + ${this.b} = ${this.sum}`);
    this.notifyObservers();
  }
}

class UI2 implements IObserver {
  a: number;
  b: number;
  sum: number;

  model: DomainModel;

  constructor(observable: DomainModel) {
    this.a = 0;
    this.b = 0;
    this.sum = this.a + this.b;
    this.model = observable;
    
    // 向model注册观察者
    this.model.addObserver(this);
    this.update(this.model, null);
  }

  update(ob: IObservable, args: any): void {
    // #3 这里观察者就需要知道DomainModel的实现，不然就不知道args是什么
    const { a = 0, b = 0, sum = 0 } = args || {};

    // #4 这里更新视图，注意数据是来源于被观察者，是经过它一波blabla计算的，视图拿到后就可以更新
    // p.s 至于视图怎么更新，就与业务逻辑无关了，这样的设计可以用同一份业务逻辑代码，却可以接上各种不同的UI。是不是有点感觉了？
    this.seta(a);
    this.setb(b);
    this.setsum(sum);
  }

  onInputChangeOnA(val: number): void {
    console.log(`[view] a changes to ${val}`);
    this.model.setA(val); // #1 这里调用了被观察者，告诉他视图发生了变化（即视图变化导致a改变），让负责处理业务逻辑的被观察者进行处理
  }

  onInputChangeOnB(val: number): void {
    console.log(`[view] b changes to ${val}`);
    this.model.setB(val); // #2 同#1
  }

  /**
   * UI操作，更新视图数据：a
   * @param val
   */
  seta(val: number) {
    console.log(`[view] a changes from ${this.a} to ${val}`);
    this.a = val;
  }

  /**
   * UI操作，更新视图数据：b
   * @param val
   */
  setb(val: number) {
    console.log(`[view] b changes from ${this.b} to ${val}`);
    this.b = val;
  }

  /**
   * UI操作，更新视图数据：sum
   * @param val
   */
  setsum(val: number) {
    console.log(`[view] sum changes from ${this.sum} to ${val}`);
    this.sum = val;
  }
}

// client code example

// 1.创建实例，并让视图去has-a领域类，即视图观察领域类
const model = new DomainModel(); // 领域类（负责处理业务逻辑）
const ui2 = new UI2(model); // 视图类 has-a 领域类
// model.addObserver(ui2); // output: 0 + 0 = 0    Q：被观察者来add？

// 2.试试视图更新的效果
ui2.onInputChangeOnA(1); // output: 1 + 0 = 1
ui2.onInputChangeOnB(3); // output: 1 + 3 = 4


