资料来源：
1. https://github.com/mqyqingfeng/Blog
2. https://juejin.im/post/5c6234f16fb9a049a81fcca5
3. https://juejin.im/post/5bfe05505188252098022400

# let 和 const
## 块级作用域的出现
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

## let 和 const
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

## 临时死区
---
临时死区（Temporal Dead Zone）
let 和 const 声明但变量不会被提升到作用域顶部，如果在声明之前访问这些变量会导致报错：

```javascript
console.log(typeof value); // Uncaught ReferenceError: value is not defined
let value = 1;
```







