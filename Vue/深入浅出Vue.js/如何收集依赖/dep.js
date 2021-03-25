export default class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    const i = this.subs.indexOf(sub);
    if (-1 < i) {
      this.subs.splice(i, 1);
    } else {
      console.warn(`cannot find sub to remove:`, sub)
    }
  }

  depend() {
    if (window.target) {
      console.log('add depend');
      this.addSub(window.target);
    } else {
      console.warn('no depend put on window.target')
    }
  }
  
  notify(oldVal, newVal) {
    // notify
    for (let i = 0, l = this.subs.length; i < l; i++) {
      this.subs[i].update(oldVal, newVal);
    }
  }
};
