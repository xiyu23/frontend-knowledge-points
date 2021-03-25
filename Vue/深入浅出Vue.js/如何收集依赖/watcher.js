import parsePath from './parsePath';

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    // 问题：每次get都会push这个watcher作为依赖，那岂不是会重复很多？？
    window.target = this;
    const value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value;
  }

  update() {
    const oldVal = this.value;
    const newVal = this.get();
    this.value = newVal;
    this.cb.call(this.vm, newVal, oldVal);
  }
};

