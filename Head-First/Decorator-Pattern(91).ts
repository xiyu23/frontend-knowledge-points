/**
 * Component组件(抽象基类)
 */
abstract class Beverage {
  description: string;

  /**
   * getDescription
   */
  public getDescription(): string {
    return this.description;
  }

  /**
   * cost
   */
  public abstract cost(): number;
}

/**
 * Concrete Component(具体被装饰者)
 */
class Espresso extends Beverage {
  constructor() {
    super();

    this.description = 'Espresso';
  }
  public cost(): number {
    return 1.99;
  }
}

/**
 * Concrete Decorator(具体装饰者)
 */
class Mocha extends Beverage {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();

    this.beverage = beverage;
    this.description = `Mocha ${beverage.getDescription()}`;
  }

  /**
   * 装饰后，价格 = 装饰者价格 + 被装饰者价格
   */
  public cost(): number {
    return 0.20 + this.beverage.cost();
  }
}

/**
 * Concrete Decorator(具体装饰者)
 */
class Whip extends Beverage {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();

    this.beverage = beverage;
    this.description = `Whip ${beverage.getDescription()}`;
  }

  /**
   * 装饰后，价格 = 装饰者价格 + 被装饰者价格
   */
  public cost(): number {
    return 0.40 + this.beverage.cost();
  }
}


// Client Code
console.log('-------------------客户端代码使用测试---------------');
// e.g 点一杯Espresso + 抹茶
// 1. 先准备好被装饰的对象
console.log('get Espresso...');
let beverage: Beverage = new Espresso(); // 被装饰者

// 2. 把被装饰者塞进装饰者，用Mocha装饰它，Espresso就变成了Mocha Espresso
console.log('decorate it by Mocha...');
let mochaBeverage: Mocha = new Mocha(beverage);

// 3. 输出结果
let beverageName = mochaBeverage.getDescription();
let beverageCost = mochaBeverage.cost();
console.log(`done! ${beverageName} cost ${beverageCost}`);

// 4. 再加点奶泡（这就是动态附加行为）
let whipMochaBeverage: Whip = new Whip(mochaBeverage);

// 5. 输出结果
beverageName = whipMochaBeverage.getDescription();
beverageCost = whipMochaBeverage.cost();
console.log(`add Whip done! ${beverageName} cost ${beverageCost}`);

/* 
  Q: 装饰者descript、cost很像，为何不搞个抽象类，让它们都去继承它呢
  A: OK，接下来改造一下，靠近书上的模式，这样就可以对装饰者针对接口编程了。
*/


/**
 * Abstract Decorator(抽象装饰者)
 */
abstract class Condiment extends Beverage {
  beverage: Beverage;

  constructor(beverage: Beverage) {
    super();

    this.beverage = beverage;
    this.description = `${this.getCondimentDescription()} ${beverage.getDescription()}`;
  }

  /**
   * 装饰后价格，价格 = 装饰者价格 + 被装饰者价格
   */
  public cost(): number {
    return this.getCondimentCost() + this.beverage.cost();
  }
  
  /**
   * 针对抽象接口编程，由子类实现具体价格
   */
  public abstract getCondimentCost(): number;
  
  /**
   * 针对抽象接口编程，由子类实现具体描述
   */
  public abstract getCondimentDescription(): string;
}


/**
 * Concrete Decorator(具体装饰者)
 */
class Suger extends Condiment {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return 'Suger';
  }

  public getCondimentCost(): number {
    return 0.50;
  }
}

/**
 * Concrete Decorator(具体装饰者)
 */
class Soy extends Condiment {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return 'Soy';
  }

  public getCondimentCost(): number {
    return 1.0;
  }
}

// 改动：增加抽象装饰者，令获取描述的方法为抽象的，子类去实现具体的描述
// 好处：
//   1. 不用在每个子类重复写一遍description的拼接了，因为父类去拼接，其中用到了抽象方法getDescription，推迟到子类实现；
//   2. 同上，也不用写cost的具体计算了，抽象类中针对抽象接口编程，真香！
console.log('-------------------增加抽象装饰者---------------');
console.log('get Espresso...');
const beverage2 = new Espresso();

console.log('decorate it by Sugar...');
const sugerBeverage = new Suger(beverage2);
console.log(`done! ${sugerBeverage.getDescription()} cost ${sugerBeverage.cost()}`);

// 再加个豆浆
console.log('decorate it by Soy...');
const soySugerBeverage = new Soy(sugerBeverage);
console.log(`done! ${soySugerBeverage.getDescription()} cost ${soySugerBeverage.cost()}`);


// 好了，我们接到需求，说想给饮料Beverage区分大中小杯，以收取不同的价格
// 当然，coffee（被装饰者）区分杯大小，调料也要区分。
// 大中小，分别加收0.2,0.15,0.10

// 已知：Beverage中增加了setSize, getSize。

// 见Decorator-Size-Pattern(91).ts