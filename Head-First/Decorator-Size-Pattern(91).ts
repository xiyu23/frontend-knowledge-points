/**
 * Component组件(抽象基类)
 */
abstract class Beverage {
  description: string;
  size: number; // 1 - small, 2 - medium, 3 - large  TODO(yuhui): 2020.12.12 22:41 Sat, Replay it with Types

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

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): void {
    let sizeName = '';
    if (size === 1) {
      sizeName = 'small';
    } else if (size === 2) {
      sizeName = 'medium';
    } else if (size === 3) {
      sizeName = 'large';
    }
    console.log(`want a bottle of ${sizeName} size`);
    this.size = size;
  }

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
    return 1.99 + this.getExtra();
  }

  /**
   * Espresso具体类，根据杯容量有不同的额外收费
   */
  public getExtra(): number {
    let extra: number = 0;
    if (this.getSize() === 1) {
      extra = 1;
    } else if (this.getSize() === 2) {
      extra = 1.5;
    } else if (this.getSize() === 3) {
      extra = 2.0;
    }

    return extra;
  }
}

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

  public getSize(): number {
    return this.beverage.getSize();
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
class Mocha extends Condiment {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return 'Mocha';
  }

  public getCondimentCost(): number {
    return 0.20 + this.getExtra();
  }

  /**
   * Mocha具体类，根据杯容量有不同的额外收费
   */
  public getExtra(): number {
    let extra: number = 0;
    if (this.getSize() === 1) {
      extra = 0.25;
    } else if (this.getSize() === 2) {
      extra = 0.35;
    } else if (this.getSize() === 3) {
      extra = 0.4;
    }

    return extra;
  }
}

/**
 * Concrete Decorator(具体装饰者)
 */
class Whip extends Condiment {
  constructor(beverage: Beverage) {
    super(beverage);
  }

  public getCondimentDescription(): string {
    return 'Whip';
  }

  public getCondimentCost(): number {
    return 0.40 + this.getExtra();
  }

  /**
   * Whip具体类，根据杯容量有不同的额外收费
   */
  public getExtra(): number {
    let extra: number = 0;
    if (this.getSize() === 1) {
      extra = 0.3;
    } else if (this.getSize() === 2) {
      extra = 0.4;
    } else if (this.getSize() === 3) {
      extra = 0.5;
    }

    return extra;
  }
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
    return 0.50 + this.getExtra();
  }

  /**
   * Sugar具体类，根据杯容量有不同的额外收费
   */
  public getExtra(): number {
    let extra: number = 0;
    if (this.getSize() === 1) {
      extra = 0.1;
    } else if (this.getSize() === 2) {
      extra = 0.15;
    } else if (this.getSize() === 3) {
      extra = 0.2;
    }

    return extra;
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
    return 1.0 + this.getExtra();
  }

  /**
   * Soy具体类，根据杯容量有不同的额外收费
   */
  public getExtra(): number {
    let extra: number = 0;
    if (this.getSize() === 1) {
      extra = 0.3;
    } else if (this.getSize() === 2) {
      extra = 0.4;
    } else if (this.getSize() === 3) {
      extra = 0.5;
    }

    return extra;
  }
}

/*
 改完了，发现以下问题：
 1. 每个具体的调料类，都要根据杯大小确定不同的额外收费额度，这没问题，但是重复写**结构相同的**getExtra，似乎不合理；
 A1. getExtra中都有判断大中小杯的逻辑，这个可以PUSH UP，提到抽象父类中，让父类暴露3个接口：getExtraOnSmall, getExtraOnMedium, getExtraOnLarge
 子类只需要去实现这3个接口，它们**不用关心大中小杯的判断逻辑**！
 2. 这个size的需求，我们需要改调料抽象父类、所有子类，一定要这样吗，有没有更好的扩展方法？
 A2. 反正我暂时没想到。（2020.12.12 22:34 Sat)
 3. 装饰模式的好处！客户端代码改动非常小，见#3。
*/



// Client Code
console.log('-------------------客户端代码使用测试---------------');
// e.g 点一个大杯Espresso + 抹茶
// 1. 先准备好被装饰的对象
console.log('get Espresso...');
let beverage: Beverage = new Espresso(); // 被装饰者
beverage.setSize(3); // #3 size需求后，客户端只用设置size即可，其他代码都不需要改动！

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
