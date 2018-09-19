import { observe } from './observer'; // 监听数据变化的方法（后面实现）
import Watcher from './watcher'; // 观察者实例 （后面实现）

export default class Light {
  constructor(options = {}) {
    // 简化了$options的处理
    this.$options = options;
    // 简化了对data的处理
    this._data = this.$options.data;
    const data = this._data;
    console.log(data);
    // 遍历data, 将所有data最外层属性代理到Vue实例上
    // this.key 就能访问到 data 对象中的数据
    Object.keys(data).forEach(key => this._proxy(key));
    // 监听数据
    observe(data);
    // 渲染DOM
    this._randerDom();
  }
  _randerDom(val) {
    // TODO 渲染dom
    console.log('更新了dom', this._data);
  }
  // 对外暴露调用订阅者的接口，内部主要在指令中使用订阅者
  $watch(expOrFn, cb) {
    // 当监听的value发生变化时， 促发 cb() 方法
    new Watcher(this, expOrFn, cb);
  }
  _proxy(key) {
    // 把这data属性全部转为 getter/setter。
    Object.defineProperty(this, key, {
      configurable: true,
      enumerable: true,
      get: () => this._data[key],
      set: (val) => {
        this._data[key] = val;
      },
    });
  }
}
