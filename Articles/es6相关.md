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
console.log(2); // Symbol(foo)
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

# 解构赋值

# 剩余运算符

# Promise

# Async

# Proxy




