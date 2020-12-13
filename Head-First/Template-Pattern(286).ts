/**
 * 模板模式，是指设定了一组操作(一个算法的骨架)后，这些操作都可以被具体的子类实现，
 * 从而实现在不改变这组算法结构的情况下，实现不同的算法。
 */

/**
 * 以蒸米饭和煮稀饭为例，步骤分别如下：
 * 
 * 蒸米饭
 * 1. 将米淘干净
 * 2*. 加入1.2倍的水
 * 3*. 设置电饭锅模式为柴火饭
 * 
 * 煮稀饭
 * 1. 将米淘干净
 * 2*. 加入10倍的水
 * 3*. 设置电饭锅模式为煮粥
 * 
 * 可以看到，大体步骤相同，但是2、3步略有差异：
 * 第2步都是加水，只是量不同；
 * 第3步都是设置电饭锅模式，只是模式不同。
 * 
 * 我们可以对这3个步骤形成一个模板，让具体的两个子类去决定'加多少水'、'设置成什么模式'。
 */

/**
 * 蒸米饭(也可以叫煮嘛)，好吧就叫做米饭吧
 */
abstract class CookRice {
  /**
   * 做米饭的模板算法
   */
  public cook(): void {
    if (!this.isRiceAvailable()) { // 控制算法的运行，子类可以决定这里的走向。
      console.warn('没米了，做不了。');
      return;
    }

    this.wash(); // 固定不变，一致的操作
    this.addWater(); // 抽象方法，子类实现
    this.setCookerMode(); // 抽象方法，子类实现
    this.onCookComplete();
  }

  /**
   * js中怎么让它成为不可被子类覆盖的？
   */
  public wash(): void {
    console.log('淘米...');
  }

  public abstract addWater(): void;
  public abstract setCookerMode(): void;

  /**
   * hook. 还有米吗？给一个默认实现。
   */
  public isRiceAvailable(): boolean {
    return true;
  }

  /**
   * hook. 做好后触发的钩子。
   */
  public onCookComplete(): void {
    // 空的实现，子类可以自行选择是否覆盖
  }
}

/**
 * 蒸米饭
 */
class SteamedRice extends CookRice{
  public addWater(): void {
    console.log('add x1.2 water against rice');
  }
  public setCookerMode(): void {
    console.log('set cooker mode to 柴火饭');
  }
  public onCookComplete(): void {
    console.log('米饭蒸好了！deliver the SteamedRice to family');
  }
}

/**
 * 煮白米稀饭
 */
class RicePorridge extends CookRice{
  public addWater(): void {
    console.log('add x10 water against rice');
  }
  public setCookerMode(): void {
    console.log('set cooker mode to 煮稀饭');
  }
  public onCookComplete(): void {
    console.log('稀饭煮好了！deliver the RicePorridge to family');
  }
  public isRiceAvailable(): boolean {
    return false;
  }
}

// 客户代码，测试一下
console.log('笑：雨宝，去给老娘蒸个米饭！');
console.log('雨：娘娘遵命！');
let cookRice: CookRice = new SteamedRice();
cookRice.cook();

console.log('--------------later--------------');

console.log('笑：再给老娘煮个白米稀饭！');
console.log('雨：狗人吃得了这么多嘛？！');
cookRice = new RicePorridge();
cookRice.cook();

/**
 * 第二阶段：hook
 * 
 * 就是经常看到钩子，比如一些框架都提供了页面生命周期钩子，我们可以在这些钩子中去做一些事情。
 * 
 * 我们也可以在父类算法中合适的位置增加钩子，子类可以自行决定是否实现、做一些想做的事情。
 */