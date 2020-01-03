# vue 虚拟DOM
## 真实DOM和其解析流程
- 下图为webkit渲染引擎工作流程图
![a0696301.png](:storage/eb6912af-aa78-403d-b253-2e9d828a9b8c/a0696301.png)
- 所有浏览器渲染引擎的工作流程大致分为五步：创建DOM树，创建Style Rules， 构建Render树， 布局Layout， 绘制Painting
 1.构建DOM树：用HTML分析器，分析HTML元素，构建一颗DOM树
 2.生成样式表：用CSS分析器，分析CSS文件和元素上的inline样式，生成页面样式表
 3.构建Render树：将DOM树和样式表关联起来，构建一颗Render树（Attachment），每个DOM节点都有attach方法，接受样式信息，返回一个render对象，这些rander对象最终会构建成一颗render树
 4.确定坐标节点：根据render树结构，为每个Render树上的节点确定一个在显示屏上出现的精确坐标
 5.绘制页面：根据Render树和节点显示坐标，然后调用每个节点的paint方法，将他们绘制出来
- 注意点
 1. DOM树的构建是文档加载完成开始的？构建DOM树是一个渐进的过程，为了达到更好的用户体验，渲染引擎会尽快将内容显示到屏幕上，所以不必等到整个HTML文档解析完成后才开始构建render树和布局
 2. render树是DOM树和CSS样式表构建完成后才开始构建的？这三个过程实际进行的时候并不是完全独立的，而是会有交叉，一边加载一边解析一边渲染
 3. css解析注意点？css解析从右向左逆向解析，嵌套的标签越多，解析越慢
 4. js操作真实DOM的代价？用传统的开发模式，原生JS或JQ操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程。在一次操作中，我需要更新10个DOM节点，浏览器收到第一个DOM请求后不知道还有九次更新，因此会马上执行，终执行10次。例如：第一次计算完，紧接着下一个DOM更新请求，这个节点的坐标值就变了，前一次计算为无用功。计算DOM节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作DOM的代价仍旧是昂贵的，频繁操作还是会出现界面卡顿，影响用户体验

## VIrtual-DOM 基础
- 虚拟DOM的好处
虚拟DOM就是为了解决浏览器性能问题而被设计出来的。如前，若一次操作中有10次更新DOM的动作，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attach到DOM树上，在进行后续操作，避免大量的无谓的计算。所以，用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在js对象（虚拟DOM）上，操作内存中JS对象的速度显然要更快，等更新完成后，再将最终的JS对象映射成真实DOM，交由浏览器去绘制

- 原生DOM操作 vs. 通过框架封装操作
这是一个性能vs.可维护性的的取舍。框架的意义在于为你掩盖底层的DOM操作，让你能用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化DOM操作更快，因为框架的DOM操作层要应对上层API可能产生的操作，它的实现必须是普适的。在构建一个实际应用的时候，出于可维护性的考虑，不可能为每一个地方做手动优化。框架给你的保证是，在不需要手动优化的情况下，依然可有拥有过得去的性能


- 算法实现
1. 用JS对象模拟DOM树
```javascript
<div id="virtual-dom">
  <p>Virtual DOM</p>
  <ul id="list">
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
    <li class="item">Item 3</li>
  </ul>
  <div>Hello World</div>
</div>
```
用JS对象来表示DOM节点，使用对象的属性记录节点的类型、属性、子节点等

```javascript
// Element virtual-dom 定义对象
// @param {String} tagName - dom 元素名字
// @param {Object} props - dom 属性
// @param {Array<Element|String>} children - 子节点

function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;

  // dom元素的key值，用作唯一标识符
  if(props.key) {
    this.key = props.key;
  }
  var count = 0;
  children.forEach(function(child, i) {
    if (child instanceof Element) {
      count += child.count;
    } else {
      children[i] = '' + child;
    }
    count++;
  })
  // 子元素个数
  this.count = count;
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

module.exports = createElement;
```

2. 用diff算法来比较两颗树的差异
diff算法用来比较两颗树virtual DOM树的差异，如果两颗树完全比较，那么diff算法的时间复杂度为O(n^3)，但是在前端领域中，很少会跨层级地移动DOM元素，所以virtual DOM只会对佛那过一个层级的元素进行比较，这样复杂度可以达到O(n)
（1）深度优先遍历，记录差异
（2）差异类型：节点替换，顺序互换，属性更改，文本改变
（3）列表对比算法
（4）实例输出

3. 将两个虚拟DOM对象的差异应用到真正的DOM树
（1）深度优先遍历DOM树
（2）对原有DOM树进行DOM操作
（3）DOM结构改变