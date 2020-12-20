/**
 * 客户代码只是要遍历所有菜单，其实它并不关心餐品使用什么数据类型保存的，像"早餐是用数组保存的、午餐用Set来保存的"，客户代码并不关心！
 * 客户代码要的，只是我能够遍历你的菜单就行。
 * 
 * 祭出大杀器：迭代器。
 * 
 * 如果我们能让早餐、午餐都给客户代码提供一个迭代器，客户代码只需拿到迭代器进行遍历就可以了，这样就可以将客户代码与餐品的具体实现解耦。
 * 
 * 餐品都应该遵循相同的迭代器接口，以便我们的客户代码针对接口编程，而不是针对实现。（瞧，又一句经典！）
 */

// 首先定义一个迭代器接口。

/**
 * 迭代器接口
 */
interface MyIterator {
  next(): any;
  hasNext(): boolean;
}


// 其次，既然我们需要遍历数组、Set，那么就需要为这两种类型分别提供一个可以遍历它们的迭代器ArrayIterator、SetIterator
/**
 * 数组迭代器
 */
class ArrayIterator implements MyIterator {
  array: Array<any>;
  i: number;
  size: number;

  constructor(array: Array<any>) {
    this.array = array;
    this.i = 0;
    this.size = this.array.length;
  }
  next(): any {
    if (!this.hasNext()) {
      return null;
    }

    return this.array[this.i++];
  }
  hasNext(): boolean {
    if (0 < this.size && this.i < this.size) {
      return true;
    }
    
    return false;
  }
}

/**
 * Set迭代器
 */
class SetIterator implements MyIterator {
  set: Set<any>;
  array: Array<any>; // 我们转换set为array后再遍历，这里不用关心具体怎么做的，主要是想体现Set迭代器是不同于Array迭代器的！
  i: number;
  size: number;

  constructor(set: Set<any>) {
    this.set = set;
    this.array = Array.from(this.set.entries());
    this.i = 0;
    this.size = this.array.length;
  }
  next(): any {
    if (!this.hasNext()) {
      return null;
    }

    return this.array[this.i++][0]; // 注意，这里set.entries()转换为array后，每个元素是一个[value, value]
  }
  hasNext(): boolean {
    if (0 < this.size && this.i < this.size) {
      return true;
    }
    
    return false;
  }
  
}

// 第三步，早餐需要给客户端返回一个支持遍历自己的迭代器

/**
 * 早餐
 */
class Breakfast {
  list: Array<MenuItem> = [];

  constructor() {

  }

  addItem(item: MenuItem): void {
    this.list.push(item);
  }

  getList(): Array<MenuItem> {
    return this.list;
  }

  /**
   * 返回一个早餐的迭代器
   */
  getIterator(): MyIterator {
    return new ArrayIterator(this.list);
  }
}

class MenuItem {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const breakFast = new Breakfast();
breakFast.addItem(new MenuItem('豆浆', 1.5));
breakFast.addItem(new MenuItem('油条', 2.0));

// 第四步，同样地，对午餐也要增加一个获取迭代器的方法

/**
 * 午餐
 */
class Lunch {
  set: Set<MenuItem> = new Set();

  constructor() {

  }

  addItem(item: MenuItem): void {
    this.set.add(item);
  }

  getSet(): Set<MenuItem> {
    return this.set;
  }

  /**
   * 返回一个午餐的迭代器
   */
  getIterator(): MyIterator {
    return new SetIterator(this.set);
  }
}

const lunch = new Lunch();
lunch.addItem(new MenuItem('蒜薹炒肉', 24));
lunch.addItem(new MenuItem('小炒黄牛肉', 30));

// 第五步，现在早餐、午餐都对外提供了能够遍历自己的迭代器，那么此时需要修改客户端代码，使用迭代器遍历，而不用知晓早餐、午餐实现的具体细节。

// 客户代码
class Waitress {
  breakFast: Breakfast;
  lunch: Lunch;

  constructor(breakFast: Breakfast, lunch: Lunch) {
    this.breakFast = breakFast;
    this.lunch = lunch;
  }

  /**
   * 打印餐厅所提供的所有餐点
   */
  printMenus(): void {
    console.log('服务员展示餐厅的所有菜品：');

    // 打印早餐
    console.log('--------------------------');
    console.log('早餐:');
    // 原代码：知道早餐用数组实现的遍历方法
    // const breakFastList = this.breakFast.getList();
    // breakFastList.forEach((item: MenuItem) => {
    //   console.log(`  ${item.name} - ￥${item.price}`);
    // });

    // 现代码：使用迭代器遍历早餐的代码（不需要知道早餐用什么实现的，只知道它支持迭代！）
    const breakFastIterator = this.breakFast.getIterator();
    while(breakFastIterator.hasNext()) {
      const item: MenuItem = breakFastIterator.next(); // Q: ts中强制类型转换咋做？
      console.log(`  ${item.name} - ￥${item.price}`);
    }

    // 打印午餐
    console.log('--------------------------');
    console.log('午餐:');
    // const lunchIterator = this.lunch.getSet().entries();
    // for (const it of Array.from(lunchIterator)) {
    //   console.log(`  ${it[0].name} - ￥${it[0].price}`);
    // }

    const lunchIterator = this.lunch.getIterator();
    while(lunchIterator.hasNext()) {
      const item: MenuItem = lunchIterator.next();
      console.log(`  ${item.name} - ￥${item.price}`);
    }
  }
}

// 客户代码打印菜单
const waitress = new Waitress(breakFast, lunch);
waitress.printMenus();

/**
 * 总结：
 *   相比Iterator-Pattern-Preface.ts中的方法，
 *   1. 遍历更简单：迭代器模式下，我们不需要知道具体菜单的内部实现是如何，只知道它可以遍历！
 *   2. 创建迭代器模式，需要为遍历目标数据结构创建一个迭代器。（相信现在开始，可以更好地理解迭代器了。比如java中内置了可以遍历ArrayList的迭代器，js中set.prototype.entries方法返回的可以遍历set的迭代器，等等）
 * 
 * 问题又来了，这样似乎还是无法避免"每当增加一个菜单，就需要修改客户代码"的命运。
 * 
 * 没关系，下一节的"迭代器组合模式"拯救你！
 * 
 * 见Iterator-And-Composite-Pattern(369).ts
 */