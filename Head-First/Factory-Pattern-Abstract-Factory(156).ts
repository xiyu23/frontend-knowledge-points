// 抽象工厂模式： 这个工厂可以创建一组相关的产品，还是像工厂方法一样，父类抽象类声明需要创建哪些产品，子类负责实现。

// 与工厂方法的区别：工厂方法创建一个产品（如Pizza），抽象工厂则创建多个产品（这几个产品一般是相关的，如做Pizza的原料）

// 背景
/*
  同一种产品都会用相同类型的原料，但是具体每个原料可能稍有差异。
  为举例，看书后随便编的。

  比如产品CheesePizza都会用到原料：面团、酱汁、奶酪。
  但是产品奶酪披萨，每个人口味不同，这里可以根据原料的差异，又能够产生多种更具体的CheesePizza。
  面团用特一粉，就是一种具体类型的奶酪披萨，如：TYFCheesePizza
  酱汁用李锦记，就是另一种具体类型的奶酪披萨，如：LJJCheesePizza
  ...
  总之，就是原料也有具体的类型，特一粉 is a 面团、李锦记酱汁 is a 酱汁，等等。

  这样看来，对一种CheesePizza，我们根据原料的不同，可以产生多种不同风味的CheesePizza。
  即对同一个产品，因为其组成部分相同，只是具体每个细节有差异，可以看成是一个产品由多个子产品组成的，每个单独子产品又可以进行分类。
  如此一来，对于一个由M个子产品组成的产品而言，第i个子产品如果有Ni个具体的类别，那么最终产生的产品就会有：
  ~~M * (N1 + N2 +... + Nm) 个。~~
  N1 * N2 * Ni * ... * Nm 个。

  秉承使用Pizza的代码不应该关心Pizza如何创建的的思想，那么理应提供一个createPizza；
  类似的，Pizza会使用这些原料，而每一种原料也会有多种具体类型（继承），Pizza也不应该关心面团如何创建的，那么就应该再提供一个createXXX（xxx就是某一个原料）

  注意到了不，使用Pizza的代码只会有一个CreatePizza；而使用那么多原料的代码（Pizza类），就要有多个CreateXXX。
  将多个CreateXXX放进一个工厂里，让它成为原料创建工厂。
 */

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

/**
 * 
 */
class CheesePizzaStore extends PizzaStore {
  createPizza(type: string): Pizza {
    let ingredientFactory: PizzaIngredientFactory = null;
    let pizza: Pizza = null;
    if (type === 'LJJ') {
      ingredientFactory = new LJJPizzaIngrediantFactory();
    } else if (type === 'TYF') {
      ingredientFactory = new TYFPizzaIngrediantFactory();
    } else {
      throw `CheesePizzaStore does support pizza type: ${type}`;
    }

    pizza = new Pizza(ingredientFactory);

    return pizza;
  }
}

class Pizza {
  name: string;

  // pizza使用到3种原料
  dough: Dough;
  sauce: Sauce;
  cheese: Cheese;

  // 具体原料咋来？交给这个工厂来创建
  ingredientFactory: PizzaIngredientFactory;

  constructor(ingredientFactory: PizzaIngredientFactory) {
    this.dough = ingredientFactory.createDough();
    this.sauce = ingredientFactory.createSauce();
    this.cheese = ingredientFactory.createCheese();
  }

  prepare() {
    console.log(`preparing '${this.name}' pizza...
      dough: ${this.dough}
      sauce: ${this.sauce}
      cheese: ${this.cheese}
    `);
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

/**
 * 抽象工厂方法（其实相比工厂方法模式，这里有多个抽象接口而已）
 */
abstract class PizzaIngredientFactory {
  abstract createDough(): Dough;
  abstract createSauce(): Sauce;
  abstract createCheese(): Cheese;
}

// 继承原料工厂方法抽象类的，这个**子类提供一种具体的原料组合**
// 工厂能创建两种类型的原料组合：LJJ（李锦记）、TYF（特一粉）
class LJJPizzaIngrediantFactory extends PizzaIngredientFactory {
  createDough(): Dough {
    return new LJJDough();
  }

  createSauce(): Sauce {
    return new LJJSauce();
  }

  createCheese(): Cheese {
    return new LJJCheese();
  }
}

class TYFPizzaIngrediantFactory extends PizzaIngredientFactory {
  createDough(): Dough {
    return new TYFDough();
  }

  createSauce(): Sauce {
    return new TYFSauce();
  }

  createCheese(): Cheese {
    return new TYFCheese();
  }
}

class Dough {

}

class LJJDough extends Dough {
  name = '李锦记面团';
}

class TYFDough extends Dough {
  name = '特一粉面团';
}

class Sauce {

}

class LJJSauce extends Sauce {
  name = '李锦记酱汁';
}

class TYFSauce extends Sauce {
  name = '特一粉酱汁';
}

class Cheese {

}

class LJJCheese extends Cheese {
  name = '李锦记奶酪';
}

class TYFCheese extends Cheese {
  name = '特一粉奶酪';
}


//
const cheesePizzaStore: PizzaStore = new CheesePizzaStore();
cheesePizzaStore.orderPizza('LJJ');