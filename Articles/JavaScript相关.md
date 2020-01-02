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

- 在实现一个深克隆之前我们需要先了解一下javascript中的基础类型
- 原始类型：Undefined，Null，Boolean，Number，String，Symbol
- 引用类型：Object

1. 浅克隆
- 浅克隆之所以被称为浅克隆，是因为对象只会被克隆最外部的一层，至于更深层的对象，则依然是通过引用指向同一块堆内存
```javascript
// 浅克隆函数
function shallowClone() {
    const obj = {};
    for (let i in o) {
        obj[i] = o[i];
    }
    return obj;
}

// 被克隆对象
const oldObj = {
    a: 1,
    b: ['e', 'f', 'g'],
    c: {h: {i: 2}}
};

const newObj = shallowClone(oldObj);
console.log(new.c.h, oldObj.c.h);     // {i: 2} {i: 2}
console.log(new.c.h === oldObj.c.h));   // true
```
我们可以明显看到虽然oldObj.c.h被克隆了，但是它还是与oldObj.c.h相等，这表明他们依然指向同一段堆内存，这就造成了如果对newObj.c.h进行修改，也会影响oldObj.c.h，这就不是一版好对克隆

2. 深克隆
- JSON.parse方法
JSON对象parse方法可以将JSON字符串反序列化成JS对象，stringify方法可以将JS对象序列化成JSON字符串，这两个方法结合起来就能产生一个便捷的深克隆

```javascript
const newObj = JSON.parse(JSON.stringify(oldObj));
```
用上一节的例子进行测试，可以实现，但有很多坑

    1.无法实现对函数、RexExp等特殊对象对克隆
    2.会抛弃对象对constructor，所有对构造函数会指向Object
    3.对象有循环引用，会报错

```javascript
// 构造函数
function person(pname) {
    this.name = pname;
}

const messi = new person('Messo');

// 函数
function say() {
    console.log('hi');
}

const oldObj = {
    a: say,
    b: new Array(1),
    c: new RexExp('ab+c)', 'i'),
    d: messi
};

const newObj = JSON.parse(JSON.stringify(oldObj));

// 无法复制函数
console.log(newObj.a, oldObj.a);   // undefined [Function: say]

// 稀疏数组复制错误
console.log(newObj.b[0], oldObj.b[0]);   // null undefined

// 无法复制正则对象
console.log(newObj.c, oldObj.c);    // {} /ab+c/i

// 构造函数指向错误
console.log(newObj.d.constructor, oldObj.d.constructor);  // [Function: Object] [Function: person]
```

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
- 在ECMAScript规范中还有一种只存在于规范中的类型，他们的作用是用来描述语言底层行为逻辑，其中的Reference类型，与this的指向有着密切的关联
- Reference类型就是用来解释诸如delete、typeof以及赋值等操作行为的

- Reference的构成主要由三个组成部分分别是：
1. base value
2. referenced name
3. strict reference

base value就是属性所在的对象或者就是EnvironmentRecord，它的值只可能是undefined，an Object，a Boolean，a String，a Number，or an environment record其中的一种，举个例子：

```javascript
var foo = 1;

// 对应的Reference是
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
```
再举个例子
```javascript
var foo = {
    bar: function() {
        return this;
    }
};
foo.bar(); // foo
// bar对应的Reference是
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};
```
- 而且规范中还提供了获取Reference组成部分的方法，比如GetBase和IsPropertyReference
1. GetBase：返回reference的base value
2. IsPropertyReference：如果base value是一个对象，就返回true

- 除此之外，规范中有一个用于从Reference类型获取对应值的方法：GetValue
```javascript
var foo = 1;

var fooReference = {
    base: EnvironmrntRecord,
    name: 'foo',
    strict: false
};
GetValue(fooReference);  // 1
```
- 调用GetValue，返回的将是具体的值，而不再是一个Reference

- 如何确定this的值
1. 计算MenberExpression的结果赋值给ref
2. 判断ref是不是一个Reference类型
    1 如果是Reference，并且IsPropertyReference（ref）是true，那么this的值为 GetBase（ref）   （返回父对象）
    2 如果是Reference，并且base value值是Environment Record，那么this的值为 ImplictThisValue（ref）   （始终返回undefined）
    3 如果不是Reference，那么this的值为undefined

- 具体分析
1. 计算MemberExperssion的结果赋值给ref，举个例子
```javascript
function foo() {
    console.log(this);
};

foo(); // MemberExperssion 是 foo

function foo() {
    return function() {
        console.log(this);
    }
}

foo()(); // MemberExperssion 是 foo()

var foo = {
    bar: function() {
        return this;
    }
}
foo.bar(); // MemberExperssion 是 foo.bar
```
所以简单理解MemberExperssion其实就是（）左边的部分

2. 判断ref是不是一个Reference类型
- 举个例子
```javascript 
var value = 1;

var foo = {
    value: 2,
    bar: function() {
        return this.value;
    }
};

// 
console.log(foo.bar());
console.log((foo.bar)());
console.log((foo.bar = foo.bar)());
console.log((false || foo.bar)());
console.log((foo.bar, foo.bar)());
```
1. 在示例1中，MenmberExpression的计算结果是 foo.bar， 他是Reference类型
```javascript
var Reference = {
    base: foo,
    name: 'bar',
    strict: false
};
```
base value 值为 foo，是一个对象，所以 IsPropertyReference（ref）结果为 true
```javascript
this = GetBase(ref); // foo
```
示例1的结果就是2

2. 在示例2中，（）并没有影响MemberExperssion的计算，结果和示例1一样

3. 在示例3，4，5中，因为有赋值操作符，逻辑与算法，逗号操作符，返回的不是Reference类型，this 为 undefined，所以结果都是1
ps： 以上是在非严格模式下的结果，严格模式下因为this返回undefined




## 数据类型


