# Nexttick
## nexttick
- 在vue中，数据监测是通过Object.defineProperty来重写里面的set和get方法来实现的，vue更新DOM是异步的，每当观测到数据变化时，vue就开始一个队列，将同一时间循环内非所有数据变化缓存起来，等到下一次event loop，会将队列清空，进行DOM更新，内部使用microtask，MutationObserver来实现

- 虽然数据驱动建议避免直接操作DOM，但有时也不得不需要这样的操作，这时就该Vue.nextTick(callback)出场了，它接受一个回调函数，在DOM更新完后，这个回调函数就会被调用。不管是vue.nextTick还是vue.prototype.$nextTick都是直接使用nextTick这个闭包函数

- 关于Vue的异步更新队列，官网是这么说的：
当你设置vm.someData = 'new value'，该组建不会立即重新渲染。当刷新队列时，组件会在事件循环队列清空时的下一个'tick'更新。多数情况我们不需要关心这个过程，但是如果你想要在DOM状态更新后做点什么，这就可能会有些棘手。虽然Vue.js通常鼓励开发人员沿着数据驱动的方式思考问题，避免直接接触DOM，但是我们有时候确实需要这么做。为了在数据变化之后等待Vue完成更新DOM，可以在数据变化之后立刻使用Vue.nextTick(callback)。这样回调函数在DOM更新完成后就会调用

简单说，因为DOM至少会在当前线程里面的代码全部执行完毕在更新。所以不可能做到在修改数据后并且DOM更新后再执行，要保证在DOM更新后再执行某一块代码，就必须把这块代码放到下一次事件循环里，比如setTimeout（fn，0），这样DOM更新后，就会立即执行这块代码。

- js 是单线程语言
我们都知道，js执行所有的任务都要排队，一个任务必须要等到它前面的一个任务执行完之后才能执行。如果前一个任务需要花费大量的事件来计算，那么后一个任务就必须已知等它执行完才会轮到它执行，这就是单线程的特性。而js的任务分为两种，同步任务和异步任务：
1. 同步任务就是按照顺序一个一个的执行任务，后一个任务要执行必须等到前一个任务完成
2. 异步任务（比如回调）不会占用主线程，会被塞到一个任务队列，等主线程的任务执行完毕，就会把这个异步任务队列里的任务放回主线程依次执行

## event loop
- 被称作事件循环的原因在于，同步的任务可能会生成新的任务，因此它一直在不停地查找新的事件并执行。一次循环的执行称之为tick，在这个循环里执行的代码被称作task，整个过程是不断重复的。

```javascript
console.log(1);

setTimeOut(() => {
    console.log(2);
}, 1000);

while(true) {}
```

上面的代码在输出1之后,定时器被塞到任务队列里，然后主线程继续向下执行，碰到一个死循环，导致任务队列里的任务永远不会被执行，因此不会输出2

## 事件队列
- 除了我们的主线程外，任务队列分为microtask和macrotask，通常我们称之为微任务和宏任务。microtask这一名词在js中是个比较新的概念，我们通常在学习Promise时才初次接触到
 1.执行优先级上，主线程任务 > microtask > macrotask
 2.典型的macrotask有setTimeout和setInterval，以及只有IE支持的setImmediate，还有MessageChannel等，ES6的Promise属于microtask

```javascript
console.log(1);

setTimeout(function() {
    console.log(2)
});

Promise.resolve().then(function() {
    console.log('promise 1');
}).then(function() {
    console.log('promise 2');
});

console.log(4);
```
根据执行顺序

```javascript
// 1
// 4
// promise 1
// promise 2
// 2
```