// 适配器模式：将一个接口适配成客户所希望的样子。
// 具体可分为：对象适配器（实现客户所希望的接口，并has-a被适配者）、类适配器（多重继承客户希望的类、被适配者，适配器覆盖客户希望的类的方法，用被适配者的具体方法来"冒充"所希望的方法）。

interface IDuck {
  quack(): void
}

class DonaldDuck implements IDuck {
  quack() {
    console.log('DonaldDuck quack');
  }
}

interface ITurkey {
  gobble(): void
}

class WildTurkey implements ITurkey {
  gobble() {
    console.log('WildTurkey gobble');
  }
}

// 模式1：客户希望IDuck接口，增加一个"火鸡适配器"来讲"火鸡"适配到"鸭子"
class TurkeyAdapter implements IDuck {
  turkey: ITurkey
  constructor(turkey: ITurkey) {
    this.turkey = turkey;
  }

  quack() {
    this.turkey.gobble(); // 客户调用IDuck定义的'quack'接口，期望鸭子叫，但实际上是适配器包装内的火鸡在叫
  }
}

var turkey = new WildTurkey();
var duck = new TurkeyAdapter(turkey);
duck.quack();


// 模式2：双向适配器
// TODO: ts中怎么写构造函数的重载？
// 据说：ts中允许重载，但是只能有一个实现，且这些重载的形参必须是可兼容的。
// 所以我这里IDuck和ITurkey其实不兼容

class BiAdapter implements IDuck, ITurkey {
  duck: IDuck
  turkey: ITurkey
  constructor(duck: IDuck)
  constructor(turkey: ITurkey) {
    this.turkey = turkey;
  }
  quack() {
    throw new Error("Method not implemented.");
  }
  gobble() {
    throw new Error("Method not implemented.");
  }
  
}

