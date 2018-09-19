export default class Dep {
  constructor() {
    this.subs = []; // 订阅者队列
  }
  addSub(sub) {
    this.subs.push(sub); // 添加订阅者
  }
  notify() {
    // 通知所有的订阅者(Watcher)，触发订阅者的相应逻辑处理
    this.subs.forEach(sub => sub.update());
  }
}
