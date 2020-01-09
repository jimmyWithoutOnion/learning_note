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

## 防抖，节流
资料来源：https://github.com/mqyqingfeng/Blog/issues/22
- 防抖（debounce): 在事件被触发n秒之后执行，如果在此期间在次触发事件，则重新开始计算

- 首先，写一个index.html文件
```javascript
<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
    <title>debounce</title>
    <style>
        #container{
            width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;
        }
    </style>
</head>

<body>
    <div id="container"></div>
    <script src="debounce.js"></script>
</body>

</html>

```
debounce.js文件的代码如下
```javascript
var count = 1;
var container = document.getElementById("container");

function getUserAction() {
    container.innerHTML = count++;
}

container.onmousemove = getUserAction;
```

- 根据这一段表述，可以写第一版代码
```javascript 
// 第一版
function debounce(func, wait) {
    var timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);ß
    }
}
```
如果我们要使用它，以最开始的例子为例
```javascript
container.onmousemove = debounce(getUserAction, 1000);
```
现在随便怎么移动，只有移动完1000ms内不再触发，才执行事件

- 第二版代码需要修正this的指向
如果在getUserAction函数中console.log(this),在不实用debounce函数时，this的值为
```javascript
<div id="container"></div>
```
但是如果使用debounce函数，this就会指向Window对象
所以需要修改this但指向
```javascript
// 第二版
function debounce(func, wait) {
    var timeout;

    return function() {
        var context = this；

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context)
        }, wait);
    }
}
```
现在的this已经可以正确指向了

- 第三版修改event事件对象
```javascript
function getUserAction(e) {
    console.log(e);
    container.innerHTML = count++;
}
```
如果不使用debounce函数，这里会打印MouseEvent对象
但在debounce函数中，只会打印undefined，需要修改

```javascript
// 第三版
function debounce(func, wait) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}
```
- 第四版将方法改为支持立即执行
考虑一个新的需求，就是：不希望非要等到事件停止触发之后草执行，为希望立刻执行，等到停止触发n秒之后，才可以重新触发执行，加个immediate参数判断是否立刻执行
```javascript
// 第四版
function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNoe = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
    }
}
```
- 第五版添加返回值
此时需要注意一点，就是getUserAction函数可能是有返回值的，所以我们也要返回函数的执行结果，但是当immediate为false时，因为使用了setTimeout，我们将func.apply(context, args)的返回值付给变量， 最后在return的时候，值将会一直是undefined，所以我们只在immediate为true的时候返回函数的执行结果
```javascript
// 第五版
function debounce(func, wait, immediate) {
    var timeout, result;

    return function() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNoe = !timeout;
            timeout = setTimeout(function() {
                timeout = null;
            }, wait);
            if (callNow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    }
}

```


资料来源：https://github.com/mqyqingfeng/Blog/issues/26
- 节流（throttle）：如果你持续触发事件，每隔一段时间，只执行一次事件

根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
我们用leading代表首次是否执行，trailing代表结束后是否在执行一次

关于节流的实现，有两种主流实现方法，一种是用时间戳，一种是设置定时器

1. 使用时间戳
当触发事件时，取出当前的时间戳，然后减去之前的时间戳（最开始设置为0），如果大于设置的时间周期，就执行函数，然后更新时间戳为当前时间戳，如果小于，就不执行
```javascript
// 第一版
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

container.onmousemove = throttle(getUserAction, 1000);
```

2. 使用定时器
当触发事件的时候，我们设置一个定时器，再触发事件的时候，如果定时器存在，就不执行，等到定时器执行，清空定时器，并执行函数，这样可以设置下一个定时器
```javascript
// 第二版
function throttle(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if(!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}
```
3. 比较两个方法
第一种事件会立即执行，第二种事件会在n秒后第一次执行
第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会在执行一次事件

4. 优化
有时希望无头有尾或者有头无尾，设置第三个参数options，根据传值来判断到底是什么效果
ps：leading：false和trailing：false不能同时设置
所以这个throttle只有三种用法：
```javascript
container.onmousemove = throttle(getUserAction, 1000);
container.onmousemove = throttle(getUserAction, {
    leading: false
});
container.onmousemove = throttle(getUserAction, {
    trailing: false
});
```

## 函数柯里化
资料来源：https://github.com/mqyqingfeng/Blog/issues/42
- 定义
在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成使用一个参数的函数的技术

- 举个例子
```javascript
fucntion add(a, b) {
    return a + b;
}

// 执行add函数，一次传入两个参数即可
add(1, 2); // 3

// 假设又一个curry函数可以做到柯里化
var addCurry = curry(add);
addCurry(1)(2); // 3
```
- 用途
举个例子
```javascript
// 示意而已
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}
// 虽然ajax这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', 'name=kevin');
ajax('POST', 'www.test2.com', 'name=kevin');
ajax('POST', 'www.test3.com', 'name=kevin');

// 利用curry
var ajaxCurry = curry(ajax);

// 以POST类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', 'name=kevin');

// 以POST类型请求位于www.test.com的数据
var postFromTest = post('www.test.com');
postFromTest('name=kevin');
```
- curry的这种用途可以理解为：参数复用，本质上是降低通用性，提高适用性

- 也可以用来把柯里化后的函数传给其他函数比如map
比如有这样一段函数
```javascript
var person = [{name: 'kevin'}, {name:'kevin'}];
```
如果我们要获取所有的name值，可以这样做
```javascript
var name = person.map(function(item) {
    return item.name;
})
```
不过如果我们有curry函数
```javascript
var prop = curry(function(key, obj) {
    return obj[key]
});

var name = person.map(prop('name'));
```


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
  console.log(o);
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

## 从原型到原型链









## 继承








## 数据类型
资料来源：https://juejin.im/post/5d030e03518825361817032f
- JavaScript 中有七种内置的数据类型，包括基本类型和对象类型

- 基本类型分为以下六种：
1. string
2. boolean
3. number
4. symbol
5. null
6. undefined

- 注意：
1. string，number，boolean，null 和 undefined 这五种类型统称为 原始类型 （Primitive），表示不能再细分下去的基本类型
2. symbol 是ES6中新增的数据类型，symbol 表示独一无二的值，通过 symbol 函数调用生成，由于生成的 symbol 值为原始数据，所以 symbol 函数不能使用 new 调用
3. null 和 undefined 通常被认为是特殊值，这两种类型的值唯一，就是其本身

- 对象类型
对象类型也叫引用类型， array 和 function 都是对象的子类型，对象在逻辑上是属性的无序集合，是存放各种值的容器，对象值储存用的是引用地址，所以和基本类型值不可变的特性不同，对象值是可变的

- js弱类型语言
1. js声明变量的时候并没有预先确定的类型，变量的类型就是其值的类型，也就是说变量当前的类型由其值决定，可能上一秒是 string ，下一秒就是 number 类型，这个过程可能就进行了某些操作发生了强制类型转换
2. 虽然弱类型的这种不需要预先确定类型的特性给我们带来了便利，同时也会给我们带来困扰

- js中强制转换规则
1. ToPrimitive（转换为原始类型）
* ToPrimitive 对原始类型不发生转换处理，只针对引用类型（Object）的，其目的是将引用类型转换为非对象类型，也就是原始类型
* ToPrimitive 运算符接受一个值，和一个可选的期望类型做参数
```javascript
// obj 需要转换的对象
// type 期望转换为的原始数据类型，可选

ToPrimitive(obj, type)
```
* type不同值的说明
· type 为 string
    1. 先调用obj的toString方法，如为原始值，则return
    2. 再调用obj的valueOf方法，如为原始值，则return
    3. 抛出TypeError方法
· type 为 number
    1. 先调用obj的valueOf方法，如为原始值，则return
    2. 再调用obj的toString方法，如为原始值，则return 
    3. 抛出TypeError方法
· type 为 空
    1. 该对象为Date，则type被设置为 string
    2. 否则，type 被设置为 number

* ToPrimitive 总结
ToPrimitive 转成何种原始类型取决于 type， 若指定，则按照指定类型转换，若不指定，默认根据使用情况分为两种情况，Date 为 string， 其余对象为 number 

2. toString
Object.prototype.toString()
* toString() 方法返回一个表示该对象的字符串
* 每个对象都有一个 toString() 方法， 当对象被表示为文本值或期望以字符串的方式引用对象时，该方法被调用
* toString() 和 valueOf() 方法在特定场合下会自行调用

3. valueOf
Object.prototype.valueOf()
* 方法返回指定对象的原始值
* js调用 valueOf() 方法来把对象转换成原始类型的值，一般会被js自行调用

4. Number
* null 转换为0
* undefined 转换为 NaN
* true 转换为1， false 转换为0
* 字符串转换时遵循数字常量规则，转换失败返回NaN

5. String
* null 转换为 'null'
* undefined 转换为 'undefined'
* true 转换为 'true', false 转换为'false'
* 数字转换遵循通用规则，极大极小的数字使用指数形式
```javascript
String(null)                 // 'null'
String(undefined)            // 'undefined'
String(true)                 // 'true'
String(1)                    // '1'
String(-1)                   // '-1'
String(0)                    // '0'
String(-0)                   // '0'
String(Math.pow(1000,10))    // '1e+30'
String(Infinity)             // 'Infinity'
String(-Infinity)            // '-Infinity'
String({})                   // '[object Object]'
String([1,[2,3]])            // '1,2,3'
String(['koala',1])          //koala,1

```

6. Boolean
* 除了以下六个值转换为 false，其余全部为 true：
undefined
null
-0
0 或 +0
NaN
‘’（空字符串）

假值以外的值都是真值，所有对象的转换结果都是 true ，甚至连 false 对应的布尔对象也是 true
```javascript

Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false

Boolean({}) // true
Boolean([]) // true
Boolean(new Boolean(false)) // true

```

- 什么时候自动转换为 string 类型
* 在没有对对象的前提下
字符串的自动转换，主要发生在字符串的加法运算时，当一个值为字符串，另一个值为非字符串，则后者转为字符串

```javascript
'2' + 1 // '21'
'2' + true // "2true"
'2' + false // "2false"
'2' + undefined // "2undefined"
'2' + null // "2null"
```

* 当有对象且与对象 + 时

```javascript
//toString的对象
var obj2 = {
    toString:function(){
        return 'a'
    }
}
console.log('2'+obj2)
//输出结果2a

//常规对象
var obj1 = {
   a:1,
   b:2
}
console.log('2'+obj1)；
//输出结果 2[object Object]

//几种特殊对象
'2' + {} // "2[object Object]"
'2' + [] // "2"
'2' + function (){} // "2function (){}"
'2' + ['koala',1] // 2koala,1

```

- 什么时候自动转换为Number类型
* 有 + 运算符，但没有 string 类型但时候，会优先转换为 Number 类型
```javascript
true + 0 // 1
true + true // 2
true + false //1

```

* 除了加法运算符，其他运算符都会把运算自动转成数值
```javascript

'5' - '2' // 3
'5' * '2' // 10
true - 1  // 0
false - 1 // -1
'1' - 1   // 0
'5' * []    // 0
false / '5' // 0
'abc' - 1   // NaN
null + 1 // 1
undefined + 1 // NaN

//一元运算符（注意点）
+'abc' // NaN
-'abc' // NaN
+true // 1
-false // 0

```
注意：null 转为数值时为 0 ，undefined转为数值时为 NaN

* 判断等号的特殊说明
不再是 string 优先，而是 number 优先，列举 x == y 的例子

* 如果 x，y 均为 number， 直接比较
* 如果存在对象，ToPrimitive() type 为 number 进行转换
```javascript
var obj1 = {
    valueOf:function(){
        return '1'
    }
}
1 == obj1  //true
//obj1转为原始值，调用obj1.valueOf()
//返回原始值'1'
//'1'toNumber得到 1 然后比较 1 == 1
[] == ![] //true
//[]作为对象ToPrimitive得到 ''  
//![]作为boolean转换得到0 
//'' == 0 
//转换为 0==0 //true

```
* 如果存在 boolean ，转换为1或者0，再进行比较

* 如果 x 为 string，y 为 number ，转成 number 进行比较
```javascript
//'0' toNumber()得到 0  
//0 == 0 true
'0' == 0 //true

```

- 什么时候进行布尔转换
* 布尔比较
* if ， while 等判断或者 ？ 的三元判断符
```javascript
// 条件部分的每个值都相当于 false，使用否定运算符后，就变成了 true
if ( !undefined
  && !null
  && !0
  && !NaN
  && !''
) {
  console.log('true');
} // true

//下面两种情况也会转成布尔类型
expression ? true : false
!! expression

```

- js中的数据类型判断
1. typeof
```javascript
typeof 'seymoe'    // 'string'
typeof true        // 'boolean'
typeof 10          // 'number'
typeof Symbol()    // 'symbol'
typeof null        // 'object' 无法判定是否为 null
typeof undefined   // 'undefined'

typeof {}           // 'object'
typeof []           // 'object'
typeof(() => {})    // 'function'

```
* 数组，对象，null 都显示为 object

2. instanceof
通过 indtanceof 操作符也可以对对象类型进行判断，其原理是测试构造函数的 prototype 是否出现在被检测对象的原型链上
```javascript
[] instanceof Array            // true
({}) instanceof Object         // true
(()=>{}) instanceof Function   // true

```

但 instanceof 也不是万能但
```javascript
let arr = []
let obj = {}
arr instanceof Array    // true
arr instanceof Object   // true
obj instanceof Object   // true

```

3. Object.prototype.toString()
* 可以说是判定js中数据类型但终极方法了
```javascript
Object.prototype.toString.call({})              // '[object Object]'
Object.prototype.toString.call([])              // '[object Array]'
Object.prototype.toString.call(() => {})        // '[object Function]'
Object.prototype.toString.call('seymoe')        // '[object String]'
Object.prototype.toString.call(1)               // '[object Number]'
Object.prototype.toString.call(true)            // '[object Boolean]'
Object.prototype.toString.call(Symbol())        // '[object Symbol]'
Object.prototype.toString.call(null)            // '[object Null]'
Object.prototype.toString.call(undefined)       // '[object Undefined]'

Object.prototype.toString.call(new Date())      // '[object Date]'
Object.prototype.toString.call(Math)            // '[object Math]'
Object.prototype.toString.call(new Set())       // '[object Set]'
Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
Object.prototype.toString.call(new Map())       // '[object Map]'
Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'

```



