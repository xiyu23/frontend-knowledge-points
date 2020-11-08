// 枚举类型码，如果没副作用，可以用类来替代，这样有利于编译时检查

// 一、没有检查时（虽然类型是number，但是并未限制，比如想要限制到0~3呢？代码检查的话就恶心了。想想，怎么能利用编译时的检查呢？）
class PersonWithoutTypeCheck {
  static O = 0
  static A = 1;
  static B = 2;
  static AB = 3;
  
  _bloudGroup: number;
  constructor(bloudGroup: number) {
    this._bloudGroup = bloudGroup;
  }

  getBloodGroup() {
    return this._bloudGroup;
  }

  setBloodGroup(bloudGroup: number) {
    console.log('my blood code changes from ' + this._bloudGroup + ' to ' + bloudGroup);
    this._bloudGroup = bloudGroup;
  }

  log() {
    // console.log(`my blood code is ${this._bloudGroup}`);
    console.log('my blood code is ' + this._bloudGroup);
  }
}

var yuhui = new PersonWithoutTypeCheck(PersonWithoutTypeCheck.O);
yuhui.log(); // my blood code is 0

// actually not as expected
var badPerson = new PersonWithoutTypeCheck(4);
badPerson.log(); // my blood code is 4


// 二、为Person增加类型检查（JS是弱语言类型，没有类型检查，不应该用JS写的。）
// 2.1 首先把枚举参数改为类型，通过限制类型，使得只能引用已定义好的对象
class BloodGroup {
  static O: BloodGroup = new BloodGroup(0);
  static A: BloodGroup = new BloodGroup(1);
  static B: BloodGroup = new BloodGroup(2);
  static AB: BloodGroup = new BloodGroup(3);

  static _bloodGroups: Array<BloodGroup> = [
    BloodGroup.O,
    BloodGroup.A,
    BloodGroup.B,
    BloodGroup.AB,
  ];

  code: number;
  // 唉我擦，怎么写私有构造函数，不让外界实例化这个类呢
  // A. 看来只能用闭包了
  // p.s js/ts不允许将构造函数设置为private
  constructor(code: number) {
    this.code = code;
  }

  getCode() {
    return this.code;
  }

  // static getBloodGroup(code: number): BloodGroup {
  //   if (code < 0 || 3 < code) {
  //     throw new Error(`unexpected code passed into getBloodGroup: ${code}`);
  //   }

  //   return BloodGroup._bloodGroups[code];
  // }
}

// 2.2 修改Person类
class PersonWithTypeCheck {
  _bloudGroup: BloodGroup;
  constructor(bloudGroup: BloodGroup) {
    this._bloudGroup = bloudGroup;
  }

  getBloodGroup(): number {
    return this._bloudGroup.getCode();
  }

  setBloodGroup(bloudGroup: BloodGroup): void {
    // console.log(`my blood code changes from ${this._bloudGroup.getCode()} to ${bloudGroup.getCode()}`);
    console.log('my blood code changes from ' + this._bloudGroup.getCode() + ' to ' + bloudGroup.getCode());
    this._bloudGroup = bloudGroup;
  }

  log(): void {
    // console.log(`my blood code is ${this._bloudGroup.getCode()}`);
    console.log('my blood code is ' + this._bloudGroup.getCode());
  }
}

var yuhui2 = new PersonWithTypeCheck(BloodGroup.A);
yuhui2.log(); // my blood code is 0
yuhui2.setBloodGroup(BloodGroup.O);
yuhui2.log();

// actually not as expected
var badPerson2 = new PersonWithTypeCheck(BloodGroup.AB);
badPerson2.log(); // my blood code is 4
badPerson2.setBloodGroup(BloodGroup.B);
badPerson2.log();