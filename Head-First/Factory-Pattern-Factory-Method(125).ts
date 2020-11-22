// 工厂方法模式：不同于简单工厂，这种模式下，通过继承的方式，将创建产品的代码移动到子类实现。

abstract class PizzaStore {
  constructor() {
  }

  orderPizza(type: string): void {
    // #1 不管具体是什么pizza，我们只是面向pizza接口编程，只知道返回的pizza支持下面的方法即可
    const pizza: Pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
  }

  abstract createPizza(type: string): Pizza; // must be implemented in derived classes
}

class NYPizzaStore extends PizzaStore {
  /**
   * 子类负责创建产品
   * @param type
   */
  createPizza(type: string): Pizza {
    let pizza: Pizza = null;

    switch (type) {
      case 'cheese':
        pizza = new NYCheesePizza();
        break;

      case 'clam':
        pizza = new NYClamPizza();
        break;

      default:
        throw `unsupported pizza type: ${type}`;
    }
    return pizza;
  }
}

class Pizza {
  name: string;
  
  prepare() {
    console.log(`preparing '${this.name}' pizza...`);
  }

  bake() {
    console.log('baking...');
  }

  cut() {
    console.log('cut...');
  }

  box() {
    console.log('boxing..., done');
  }
}

class NYCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = 'NY-Cheese';
  }
}

class NYClamPizza extends Pizza {
  constructor() {
    super();
    this.name = 'NY-Clam';
  }
}


// 客户代码START
const pizzaStore: PizzaStore = new NYPizzaStore();
pizzaStore.orderPizza('cheese');
pizzaStore.orderPizza('clam');
// 客户代码END

/*
总结：
很明显可以看到，相比于简单工厂，工厂方法模式的好处是：
将创建产品的代码通过继承的方式，放在了子类来实现，子类可以创建一类产品，这样就可以有多个子类，有一定的“分类”作用。
不像简单工厂，它负责生产所有的产品，可能越写越大。


*/