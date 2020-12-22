/**
 * 迭代器与组合模式：
 * 组合(Composite)本身也是一种模式方法，它让我们可以将对象组合成树的形式来表达"整体-部分"层次结构。
 * 组合可以让客户代码以一致的方式处理对象集合和个别的对象。
 * 
 * 很抽象对吧，拿例子来说。
 * 
 * 现在中餐新增了一道菜——甜点。
 * 
 * 甜点又包含了很多种类：糖水、冰淇淋、蛋糕。
 * 
 * 我们现在希望客户代码也能打印出甜点的这些菜单。而最关键的是，**希望客户代码只管遍历，不需要知道遍历中的某个对象到底是"又一个菜单"，还是"一个具体的菜单项"**。
 * 
 * 即，遍历过程中，遇到的每一项可能为菜单，也可能为具体的菜单项。
 * 
 * 有了这个思路，我们就可以祭出继承体系，面对接口编程了：让菜单、菜单项都从同一个父类继承。
 * 
 * 在书中，这个父类抽象地称之为: **组件(Component)**。
 * 
 * 而具体的一个菜单项，称之为Leaf；将菜单项都组合在一起管理的，称之为Composite。
 *
 */

/**
 * 菜单组件基类
 */
abstract class MenuComponent {
  public abstract getName(): string;
  public abstract getPrice(): number;
  public abstract add(menuComponent: MenuComponent): void;
  public abstract getIterator(): MyIterator;
}

/**
 * 具体的菜单项，即Leaf节点
 */
class MenuItem extends MenuComponent {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }
  public getPrice(): number {
    return this.price;
  }

  /**
   * 具体的菜单项是叶子节点，这个add其实没有意义。
   * 虽然似乎不太符合is-a的语义，但是为了这种模式，这是一种折衷方案。
   * @param menuComponent 
   */
  public add(menuComponent: MenuComponent): void {
    throw new Error("Method not supported in Leaf Node.");
  }
  public getIterator(): MyIterator {
    return new NullIterator();
  }
}

/**
 * 包含一群菜单项的菜单，即内部节点
 */
class Menu extends MenuComponent {
  name: string; // 菜单名称
  list: Array<MenuComponent>; // 因为菜单既可以包含菜单，也可以包含子菜单，故应声明为基类类型

  constructor(name: string) {
    super();
    this.name = name;
    this.list = [];
  }

  public getName(): string {
    return this.name;
  }
  /**
   * 菜单本身没有价格的含义，因此这里不实现
   */
  public getPrice(): number {
    throw new Error("Method not supported in Composite Node.");
  }
  public add(menuComponent: MenuComponent): void {
    this.list.push(menuComponent);
  }
  public getIterator(): MyIterator {
    // 给组合迭代器传入遍历菜单的迭代器，具体怎么处理组合，由对方控制
    return new CompositeIterator(new ArrayIterator(this.list));
  }
}

/**
 * 迭代器接口
 */
interface MyIterator {
  next(): any;
  hasNext(): boolean;
}

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
 * 叶节点(也就是具体的一个菜单项）不支持迭代，所以给它定义一个特殊的Null迭代器。
 */
class NullIterator implements MyIterator{
  next() {
    throw new Error("NullIterator does not support next.");
  }
  hasNext() {
    return false;
  }
}

/**
 * 组合迭代器，用于遍历菜单。
 * 它拿到一个数组遍历器(这个数组中的元素类型不同，有叶节点和内部节点)，以深度优先遍历的形式去遍历数组所描述的一棵树。
 * 遇到叶节点返回，遇到内部节点，先将这个节点的迭代器push入栈，而后返回这个节点的next（即一定是它的第一个叶节点）
 * 
 * 记住：栈中的元素都是一个用来遍历菜单项的迭代器，即它们都有孩子
 */
class CompositeIterator implements MyIterator {
  stack: Stack<MyIterator>;

  constructor(iterator: MyIterator) {
    this.stack = new Stack<MyIterator>();
    this.stack.push(iterator);
  }

  next(): MenuComponent {
    if (!this.hasNext()) {
      return null;
    }

    // 这个元素可能是叶节点，也可能是内部节点
    const menuComponent = this.stack.peek().next();
    if (menuComponent instanceof Menu) {
      this.stack.push(menuComponent.getIterator());
      return this.next();
    } else {
      return menuComponent;
    }
  }
  hasNext(): boolean {
    if (this.stack.isEmpty()) {
      return false;
    }

    if (!this.stack.peek().hasNext()) {
      this.stack.pop();
      return this.hasNext();
    }

    return true;
  }
}

class Stack<T> {
  stack: Array<T> = [];
  public pop(): T {
    if (this.isEmpty()) {
      return null;
    }

    const peekElem = this.stack.splice(this.stack.length - 1, 1)[0];
    // console.log(`pop ${peekElem} from stack`);
    return peekElem;
  }

  public push(elem: T): void {
    // console.log(`push ${elem} onto stack`);
    this.stack.push(elem);
  }

  public isEmpty(): boolean {
    return this.stack.length === 0;
  }

  public peek(): T {
    if (this.isEmpty()) {
      return null;
    }

    return this.stack[this.stack.length - 1];
  }

  public print(): void {
    console.log(`current stack(${this.stack.length}):`);
    for (let i = this.stack.length - 1; 0 <= i; i--) {
      console.log(`stack[${i}]: ${this.stack[i]}`);
    }
  }
}

// stack test
// const testStack = new Stack<number>();
// testStack.push(3);
// testStack.push(5);
// testStack.pop();
// testStack.pop();
// testStack.pop();
// testStack.pop();
// testStack.print();
// testStack.push(3);
// testStack.push(4);
// testStack.push(1);
// testStack.push(2);
// testStack.print();






// 为餐厅增加早餐、午餐
const breakFastMenu = new Menu('早餐');
const douJiang = new MenuItem('豆浆', 1.5);
const youTiao = new MenuItem('油条', 1);
breakFastMenu.add(douJiang);
breakFastMenu.add(youTiao);

const lunchMenu = new Menu('午餐');
const suanTai = new MenuItem('蒜薹炒肉', 24);
const xiaoChaoHuangNiu = new MenuItem('小炒黄牛肉', 32);
lunchMenu.add(suanTai);
lunchMenu.add(xiaoChaoHuangNiu);

// 客户端代码希望展示菜单
/**
 * 有了迭代器与组合模式，我们修改客户代码关于餐厅打印所有菜单的方式。
 * 只接受一个MenuComponent，它提供了一个迭代器可以帮助我们遍历"菜单"这棵树。
 */
class Waitress {
  menus: MenuComponent;
  constructor() {
    this.menus = new Menu("总菜单"); // 菜单之中可以有菜单、菜单项，套娃。所以可以在根部定义一个Menu类型的变量。
  }
  /**
   * 添加菜单组件（可以是组合即内部节点，也可以是具体的项即叶节点）
   * @param menuComponent 菜单组件
   */
  add(menuComponent: MenuComponent): void {
    this.menus.add(menuComponent);
  }
  print(): void {
    const iterator = this.menus.getIterator();
    while (iterator.hasNext()) {
      const item = iterator.next();
      console.log(`${item.name} - ￥${item.price}`);
    }
  }
}

const waitress = new Waitress();
waitress.add(breakFastMenu);
waitress.add(lunchMenu);

// waitress.print();

// 给午餐加上甜点子菜单
const sweetieMenu = new Menu('甜点菜单');
sweetieMenu.add(new MenuItem('冰淇淋', 2.5));
sweetieMenu.add(new MenuItem('酸奶', 3.0));
sweetieMenu.add(new MenuItem('鲜牛奶', 9.0));
lunchMenu.add(sweetieMenu);

// 午餐再加一个菜单项
lunchMenu.add(new MenuItem('油泼面', 15));

waitress.print();
