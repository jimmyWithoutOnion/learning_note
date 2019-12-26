# js 相关
## js call, apply, bind那些事
- 这三个函数存在的意义是什么？
-改变函数执行时的上下文环境
-具体一点就是改变函数执行时的this指向
```javascript
fucntion Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,
  showName: function() {
    console.log(this.name);
  }
}

let person = new Person('xxx')
person.showName();  // 输出xxx

```
接下来

```javascript
let animal = {
  name: 'cat'
}
```

```javascript
// call
person.showName.call(animal);
// apply 
person.showName.apply(animal);
// bind
person.showName.bind(animal);
```

-使用别人的showName方法，动态改变起上下文并帮自己输出了信息，实现了复用

- call，apply，bind 的区别
-call和apply的主要区别是参数不同，call从第二个参数开始一参数形式接受数据而apply以一个数组作为他的第二个参数
-call和apply改变了函数的上下文后便执行了该函数，bind则是返回了改变了上下文后的函数

-求数组中的最大最小值
```javascript
let arr = [1, 2, 3, 4, 5]
Math.max.apply(Math, arr);
Math.max.call(Math, 1, 2, 3, 4, 5);
```

-将伪数组转化为数组
```javascript
let arrayLike = {
  0: 'qinglong',
  1: 'ziqi',
  2: 'qianduan',
  length: 3
}
```
-上面是一个以数字为下标并有length属性的对象字面量，将它转换成一个数组
```javascript
let arr = Array.prototype.slice.call(arrayLike);
```

## 深克隆

## 截流，防抖


## 函数柯里化

## 事件捕获 冒泡 委托

## 闭包
- 从形式来说，闭包就是在函数里面定义一个函数
- 从特点来说，子函数可以读写父函数的局部变量
```javascript
fucntion parent() {
  var count = 0;
  return function children() {
    count ++;
    console.log(count);
  }
}

var children = parent();
children();   // 1
children();   // 2
```
- 如何辨别闭包
1. 案例1
```javascript
function f1() {
  var n = 999;
  nAdd = function() { n += 1;};
  return {
    func: function f2() {
      console.log(n);
    }
  }
}

var result = f1();
result.func();    // 999
nAdd();    
result.func();    // 1000

// 执行f1得到的是一个包含func属性的对象
// 执行result.func()相当于调用f2方法，打印n
// nAdd没有做var声明，是一个全局函数，执行nAdd会为n加一
// 再次执行f2方法会打印n，就是1000
```

2. 案例2
```javascript
var tasks = [];

for (var i = 0; i < 3; i++) {
  tasks.push(function() {
    console.log('>>>' + i);
  })
}

tasks[1]();   // '>>> 3'
// 因为匿名函数保存的是i的引用，当for循环结束时，i已经变成3了，所以打印的时候变成了3
// 此题考怎么改

var tasks = [];

for (var i=0; i<3; i++) {
	(function(m) {
		tasks.push(function() {
	        console.log('>>> ' + m); 
	    });
	})(i);
}

tasks[1]();    // '>>> 1'
```

3. 案例3
```javascript
function fun(n, o) {
  console.log(0);
  return {
    fun: function(m) { // 2
      return fun(m, n); // 1
    }
  }
}

var a = fun(0)；
a.fun(1);  // 0
a.fun(2);  // 0
a.fun(3);  // 0

var b = fun(0).fun(1).fun(2).fun(3);
// undefined, 0, 1, 2

var c = fun(0).fun(1);
// undefined, 0

c.fun(2);  // 1
c.fun(3);  // 1

// 
```

- 总结
1. 闭包其实是在函数内部定义一个函数
2. 闭包在使用的时候不会释放外部的引用，闭包函数内部的值会得到保留
3. 闭包里面的匿名函数，读取变量的顺序，先读取本地变量，再读取父函数的局部变量
4. 对于闭包外部无法引用它内部的变量，因此在函数内部创建的变量执行完后会立刻释放资源，不污染全局对象
5. 闭包使用的时候要考虑内存泄露，因为不释放外部引用，但是合理地使用闭包不会内存泄露

## 作用域 this


## 数据类型


