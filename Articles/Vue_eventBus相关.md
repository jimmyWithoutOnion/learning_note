# event bus相关
## 基本构造
- 初始化class
```javascript
class EventEmeitter {
  constructor() {
    // 储存事件/回调键值对
    this._events = this._events || new Map();
    // 设立监听上限
    this._maxListeners = this._maxListeners || 10;
  }
}
```
- 监听与触发
```javascript
// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对对this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
}

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
  // 将type事件以及对应对fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
}
```

- 监听/触发升级
```javascript
EventEmeitter.prototype.emit = function(type, ...args) {
  let handler;
  // 如果handler是一个数组说明有多个监听者，需要一次触发里面的函数
  handler = this._events.get(type);
  if (Array.isArray(handler)) {
    for (let i = 0, i < handler.length; i++) {
      if (args.length > 0) {
        handler[i].apply(this, args);
      } else {
        handler[i].call(this);
      }
    }
  } else {
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
}

EventEmeitter.prototype.addListener = function(type, fn) {
  const handler = this._events.get(type);
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && handler === 'function') {
    this._events.set(type, [handler, fn]);
  } else {
    handler.push(fn);
  }
}
```
