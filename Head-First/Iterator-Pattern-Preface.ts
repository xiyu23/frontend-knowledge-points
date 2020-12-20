/**
 * 迭代器模式：
 * 当你需要遍历几个集合，而这几个集合的类型又不完全相同，就要不得不面临对每个集合都单独遍历一遍的痛苦。
 * 迭代器模式能够让你从痛苦中解脱，不需要关心这些集合的内部实现，只需要知道"这些个集合都可以通过迭代器来遍历"的就足够了。
 */

 /**
  * 有一家餐厅提供早餐、午餐如下：
  * 早餐：豆浆、油条、胡辣汤
  * 
  * 你来到餐厅，想看下它的菜单。
  */
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

// 你来到餐厅，想看下它的菜单。
// Client Code 客户代码（既然是迭代器模式，重点关注遍历哈！）
const breakFastList = breakFast.getList();
console.log('--------------------------');
console.log('早餐:');
breakFastList.forEach((item: MenuItem) => {
  console.log(`  ${item.name} - ￥${item.price}`);
});

// OK，到此都没啥问题。

/**
 * 餐厅现在新增了午餐，有蒜薹炒肉、小炒黄牛肉，但是这份午餐菜单和早餐菜单略有不同：
 * 早餐使用数组来存储；
 * 午餐使用Set来存储。
 * 
 * 此时菜单应该包含两种：
 * 早餐：豆浆、油条
 * 午餐：蒜薹炒肉、小炒黄牛肉
 * 
 */
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
}

const lunch = new Lunch();
lunch.addItem(new MenuItem('蒜薹炒肉', 24));
lunch.addItem(new MenuItem('小炒黄牛肉', 30));

// 第二天，你来到餐厅，想再看下菜单。
// 你很是期待。
console.log('--------------------------');
console.log('午餐:');
// **你知道午餐使用set来保存，那么遍历方法也就不同于数组了**
// 注意到了吗，其实你得知道对方的细节（午餐类），这样才好遍历。
// 如果又来一个晚餐，你就得再写一个遍历！我们要解决的，就是**尽可能地不修改客户代码**。
const lunchIterator = lunch.getSet().entries();
// 注意：坑！这里如果tsc的target不是ES6+，那么不能直接用for...of施加于迭代器。可以先用Array.from把迭代器转换为Array。
for (const it of Array.from(lunchIterator)) {
  console.log(`  ${it[0].name} - ￥${it[0].price}`);
}

// 不错，现在看到了早餐、午餐这两个菜单，查看菜单代码看起来像这样（服务员作为客户代码，提供所有菜单）
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
    const breakFastList = this.breakFast.getList();
    breakFastList.forEach((item: MenuItem) => {
      console.log(`  ${item.name} - ￥${item.price}`);
    });

    // 打印午餐
    console.log('--------------------------');
    console.log('午餐:');
    const lunchIterator = this.lunch.getSet().entries();
    for (const it of Array.from(lunchIterator)) {
      console.log(`  ${it[0].name} - ￥${it[0].price}`);
    }
  }
}

// 客户代码打印菜单
const waitress = new Waitress(breakFast, lunch);
waitress.printMenus();
  
// 问题来了：如果餐厅发展壮大，现在又提供晚餐了，怎么办？
// 很显然，我们必须要打开客户代码Waitress类，修改printMenus这个方法（当然还需要增加一个新的成员变量来表示晚餐），再增加对晚餐的遍历打印。
// 这违反了设计模式中一直所秉承的"类设计应该对修改关闭，对扩展开放"。即提供晚餐是新的需求，我们要对现有代码进行扩展：新增一个晚餐类是必须要做的，但是应当尽可能避免再将触手
// 伸向客户代码Waitress类，最好保证客户代码不需要改动。

// 怎么做呢？见Iterator-Pattern(336).ts