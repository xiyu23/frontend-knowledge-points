// 简单工厂方法：其实就是将各种判断创建具体对象的if-else，移动到一个函数里。

// 工厂方法：负责创建具体对象的方法就叫做工厂方法。
// 客户代码：就是使用者，比如这个订餐代码(PizzaStore中的orderPizza方法)中使用到了简单工厂，用它来创建pizza，那么"简单工厂"的客户就是"订餐代码"。

class SimpleFactory {
  createPizza(type: string) : Pizza {
    let pizza: Pizza = null;

    switch (type) {
      case 'cheese':
        pizza = new CheesePizza();
        break;

      case 'clam':
        pizza = new ClamPizza();
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

class CheesePizza extends Pizza {
  constructor() {
    super();
    this.name = 'Cheese';
  }
}

class ClamPizza extends Pizza {
  constructor() {
    super();
    this.name = 'Clam';
  }
}

// 客户代码 START
class PizzaStore {
  pizzaFactory: SimpleFactory;

  constructor(factory: SimpleFactory) {
    this.pizzaFactory = factory;
  }

  orderPizza(type: string): void {
    // #1 不管具体是什么pizza，我们只是面向pizza接口编程，只知道返回的pizza支持下面的方法即可
    const pizza: Pizza = this.createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
  }

  createPizza(type: string): Pizza {
    return this.pizzaFactory.createPizza(type);
  }
}

// 测试：
const simpleFactory = new SimpleFactory();
const pizzaStore = new PizzaStore(simpleFactory);
pizzaStore.orderPizza('clam');
pizzaStore.orderPizza('cheese');

// 客户代码 END


