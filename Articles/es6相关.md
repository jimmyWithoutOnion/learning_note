资料来源：
1. https://github.com/mqyqingfeng/Blog
2. https://juejin.im/post/5c6234f16fb9a049a81fcca5
3. https://juejin.im/post/5bfe05505188252098022400

# let 和 const
### 块级作用域的出现
---
通过 var 声明的变量存在变量提升的特性：
```javascript
if (condition) {
    var value = 1;
}
console.log(value);
```
因为变量提升的原因，代码相当于
```javascript
var value;
if (condition) {
    value = 1;
}
console.log(value);
```
如果 condition 为 false，打印的结果是 undefined

除此之外，在 for 循环中，即使循环已经结束了，依然可以访问到 i 的值
```javascript
for (var i = 0; i < 10; i++) {
    ...
}
console.log(i); // 10
```

**为了加强对变量生命周期的控制，es6引入了块级作用域**

### let 和 const
---
let 和 const 都是块级声明的一种，有以下特点
1. 不会被提升
```javascript
if (false) {
    let value = 1;
}
console.log(value); // Uncaught ReferenceError: value is not defined
```

2. 重复声明会报错
```javascript
var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared
```
只有var ，let， const 声明同一个变量名会报错

3. 不绑定全局作用域
当在全局作用域中使用 var 声明变量时，会创建一个新的全局变量作为全局对象的属性：
```javascript
var value = 1;
console.log(window.value); // 1
```
然而 let 和 const 不会
```javascript
let value = 1;
console.log(window.value); // undefined
```

let 和 const 的区别：
const 用于声明常量，值一旦被设定不能被修改，否则会报错
**值得一提的是： const声明对象时不允许修改绑定，但可以修改值**
```javascript
const data = {
    value: 1
}

// 没有问题
data.value = 2;
data.num = 1;

// 报错
data = {}; // Uncaught TypeError: Assignment to constant variable.
```

### 临时死区
---
临时死区（Temporal Dead Zone）
let 和 const 声明但变量不会被提升到作用域顶部，如果在声明之前访问这些变量会导致报错：

```javascript
console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1;
```
这是因为 js 引擎在扫描代码发现声明变量时，要么将它提升到作用域到顶部（var 声明），要么将声明放到TDZ中（let 和 const 声明），访问 TDZ 中到变量会出发运行时错误，只有执行过变量声明的语句后，变量才会从 TDZ 中拿出来，然后方可访问

### 循环中的块级作用域
---
```javascript
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

// abc
// abc
// abc
```
简单来说就是在 ```for (let i = 0; i < 3; i++) ``` 中，即圆括号之内建立一个隐藏的作用域

**然后每次迭代循环时，都创建一个新变量，并以之前迭代中的同名变量的值将其初始化**



### 最佳实践
---
有另一种做法日益普及：默认使用 const ，只有当确实需要该拜年变量的值时才使用 let 。这是因为大部分的变量在值被初始化之后不应再改变，预料之外的变量改变是很多 bug 的源头


# Symbol
ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值

1. Symbol 的值通过 Symbol 函数来生成
```javascript
let s = Symbol();
console.log(typeof s); // 'symbol'
```

2. Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象

3. instanceof 的值为 false
```javascript
let s = Symbol('foo');
console.log(s instanceof Symbol); // false
```

4. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例对描述，主要为了在控制台显示或转为字符串时，比较容易区分
```javascript
let s = Symbol('foo');
console.log(s); // Symbol(foo)
```

5. 如果 Symbol 的参数是一个对象，会调用对象的 toString 方法，将其转化为字符串，然后才生成一个 Symbol 值
```javascript
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)

```

6. Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数返回值是不相等的
```javascript
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();

console.log(s1 === s2); // false

// 有参数的情况
var s1 = Symbol('foo');
var s2 = Symbol('foo');

console.log(s1 === s2); // false
```

7. Symbol 的值不能与其他类型的值进行运算，会报错
```javascript
var sym = Symbol('My symbol');

console.log("your symbol is " + sym); // TypeError: can't convert symbol to string
```

8. Symbol 的值可以显式转换为字符串
```javascript
var sym = Symbol('My symbol');

console.log(String(sym)); // 'Symbol(My symbol)'
console.log(sym.toString()); // 'Symbol(My symbol)'
```

9. Symbol 的值可以作为标示符，用于对象的属性名，可以保证不会出现同名的属性
```javascript
var mySymbol = Symbol();

// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
console.log(a[mySymbol]); // "Hello!"
```
...

# Promise
---
众所周知，js是单线程的，因为多个线程改变DOM的话会导致页面混乱，所以设计为一个单线程的语言，但浏览器是多线程的，这使得js同时具备异步的操作，即定时器，请求，事件监听等

使用回调函数处理异步请求相当于把你的回调函数置于一个黑盒，虽然你声明了等收到相应后执行你提供的相应函数，可你并不知道这个第三方库会在何时以什么方式执行回调函数

第二个众所周知的问题是，回调函数中嵌套回调函数会导致代码非常难以维护，就是人们常说的回调地狱

### 总结一下回调函数的缺点，以及 Promise 解决的方法
1. 多重嵌套，回调地狱
- Promise 在设计的时候引入了链式调用的方法，**每一个 then 方法同样也是一个 Promise**，因此可以一直链式调用下去

```javascript

axios.get('http://localhost:3000')
  .then(res => axios.get('http://localhost:3001'))
  .then(res => axios.get('http://localhost:3002'))
  .then(res => axios.get('http://localhost:3003'))
```

2. 代码跳跃，并非人类习惯的思维模式
3. 信任问题，第三方库可能多次执行
- Promsie 本身是一个状态机，共有三种状态
    Pending
    fullfilled
    rejected

4. 第三方库可能没有提供错误处理
5. 不清楚回调是不是都是异步执行

### 含义
- Promise 对象主要有两个特点：
1. 对象的状态不受外界影响
2. 状态一旦改变，就不会再变了，会一直保持这个结果

- Promise 的缺点：
1. 无法取消 Promise，一旦新建就会立即执行
2. 如果不设置回调函数，Promise 内部抛出的错误不会反应到外部

- Promise.all()
```javascript
const p = Promise.all([p1, p2, p3]);
```
p 的状态由 p1，p2，p3 决定：
1. p1，p2，p3 的状态都变成 fullfilled，p 会变成 fullfilled，p1，p2，p3 的返回值组成一个数组，传递给 p 的回调函数
2. 只要 p1，p2，p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数

- Promise.rase()
只要有一个改变状态，p 就改变状态并将返回值传递给 p 的返回函数

# Async
---
在异步处理上，async 函数就是 generator 的语法糖
其实 async 函数的实现原理，就是将 generator 函数和自动执行器，包装在一个函数里

### Async 和 Promise
严谨的说，async 是一种语法，Promise 是一个内置对象，两者并不具备可比性，何况 async 函数返回的是一个 Promise 对象

这里主要展示一些场景，使用 async 会比 Promise 更优雅地处理异步流程

1. 代码更简洁
```javascript
// 示例一
function fetch() {
  return (
    fetchData()
    .then(() => {
      return 'Done'
    })
  )
}

// 改进
async function fetch() {
  await fetchData();
  return 'Done'
}

// 示例二
function fetch() {
  return (
    fetchData()
    .then(value1 => {
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

// 改进
async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};

```

2. 错误处理
async/await 的出现使得 try/catch 就可以捕获同步和异步的错误

3. 调试
- 因为 then 中的函数是异步执行的，所以当你打断点的时候，代码不会顺序执行，尤其当你使用 step over 的时候，then 函数会直接进入下一个 then 函数

- 而使用 async 的时候，则可以像调试同步函数一样

### async 地狱
主要指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能

1. 找出依赖关系
2. 将相互依赖的语句包裹在 async 语句中
3. 并发执行 async 函数

### 继发与并发
并发实现

```javascript
// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return "whew all done";
}
```

# Proxy
Proxy 作为一个拦截器，可以在目标对象前架设一个拦截器，他人访问对象，必须先经过这层拦截器。Proxy 同样是一个构造函数，使用 new 关键字生成一个拦截对象的实例，一般和 Reflect 配套使用


### handler.contract
contruct 可以拦截通过new关键字调用这个函数的操作,我们可以把它用在单例模式中


# 箭头函数
### 箭头函数和普通函数的主要区别包括：

1. 没有 this
**箭头函数没有 this，所以需要通过作用域链来确定 this 的值**
这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this

2. 没有 arguments


- 可以通过命名参数或者 rest 参数的形式访问参数
```javascript
let nums = (...nums) => nums;
```

3. 不能通过 new 关键词调用
- 箭头函数并没有 [[Construct]] 方法，不能被用作构造函数，如果通过 new 的方式调用，会报错
```javascript
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```



