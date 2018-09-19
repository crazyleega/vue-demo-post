import Dep from './dep';

// Dep用于订阅者的存储和收集，将在后面实现
export function defineReactive(obj, key, val) {
  const dep = new Dep();
  // 给传入的data内部对象递归的调用observe，来实现深度监听
  // Vue.js 里需要显示的声明 deep 属性为true
  let chlidOb = observe(val);
  let _val = val;

  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可修改
    get: () => {
      console.log('get value');
      // Watcher实例在实例化过程中，会为Dep添加一个target属性，在读取data中的某个属性，会触发当前get方法。
      // 如果Dep类存在target属性，将订阅者添加到dep实例的subs数组中
      // 此处的问题是：并不是每次Dep.target有值时都需要添加到订阅者管理员中去管理，需要对订阅者去重，不影响整体思路，不去管它
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: (newVal) => {
      console.log('new value seted');
      if (_val === newVal) return;
      _val = newVal;
      // 对新值进行监听
      chlidOb = observe(newVal);
      // 通知所有订阅者，数值被改变了
      dep.notify();
    },
  });
}

export default class Observer {
  constructor(value) {
    this.value = value;
  }
  walk(value) {
    // 遍历传入的data, 将所有data的属性添加set&get
    Object.keys(value).forEach(key => this.convert(key, value[key]));
  }
  convert(key, val) {
    // 添加set&get方法
    defineReactive(this.value, key, val);
  }
}

export function observe(value) {
  // 当值不存在，或者不是复杂数据类型时，不再需要继续深入监听
  if (!value || typeof value !== 'object') {
    return true;
  }
  return new Observer(value);
}
