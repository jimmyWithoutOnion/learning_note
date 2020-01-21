资料来源：http://es6.ruanyifeng.com/#docs/destructuring
# 表达式
## 声明
- const 命令：声明变量
- let 命令：声明变量

- 作用域
1. 全局作用域
2. 函数作用域：function() {}
3. 块级作用域：{}

- 作用范围
1. var 命令 在全局代码中执行
2. const 命令 和 let 命令 只能在代码块中执行

- 赋值使用
1. const 命令 声明常量之后必须立马赋值
2. let 命令 声明变量后可立马赋值或使用时赋值

- 声明方法： var, const, let, function, class, import

- 重点难点
1. 不允许重复声明
2. 未定义就使用会报错：const 命令 和 let 命令 不存在变量提升
3. 暂时性死区：在代码块内使用 let 命令 声明变量之前，该变量都不可用
4. const 保证的并不是值不得改动，而是变量指向的那个内存地址所保存的数据不得改动
对于简单类型的数据，值就保存在变量指向的内存地址
但对于复合类型但数据，保存的只是指向实际数据的指针，const只能保证指针固定，至于它指向的数据结构是不是可变的，就完全不能控制了
```javascript
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only Assignment to constant variable.

const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
5. 顶层对象
ES5 之中，顶层对象的属性与全局变量是等价的，这样的设计有很大的问题
-首先是没法在编译时就报出变量未声明的错误
-其次，很容易不知不觉就创建了全局变量
-不利于模块化编程


## 解构赋值
- 字符串解构： 
``` javascript
const [a, b, c, d, e] = 'hello'
```
类似数组的对象都有一个 length 属性，因此还可以对这个属性解构赋值
``` javascript
let { length: len } = 'hello'
console.log(len) // 5
```

- 数值和布尔值解构：
解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

``` javascript
const { toString: s } = 123
s === Number.prototype.toString // true


const { toString: s } = true
s === Boolean.prototype.toString // true
```
上面代码中，数值和布尔值对包装对象都有 toString 属性，因此变量s都能取到值
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转化为对象，由于 undefined 和 null 无法转化为对象，所以对他们进行解构赋值，都会报错

- 对象解构






# 内置对象



# 语句与运算



# 异步编程