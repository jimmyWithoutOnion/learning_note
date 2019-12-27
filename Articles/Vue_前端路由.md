# vue 前端路由原理
## 什么是路由
- 路由的概念起源于服务端，由后端来控制路由，在服务器端使用相应的模板来对页面进行渲染后，再返回渲染完毕对页面
- 好处是安全性好，seo好；缺点是加大服务器对压力，不利于用户体验，代码不好维护
## 前端路由主要分为
- Hash
- History

## Hash
- 原理
-基于location.hash来实现，location.hash的值就是URL中#后面的内容，下面这个网站对hash值就是'#search'
```javascript
http://www.word.com#search
```
- 此外，hash还有其他特性：
  1.URL中对hash值只是客户端对一种状态，当向服务器发出请求时hash部分是不会被发送的
  2.hash值的改变，都会在浏览器的访问历史中添加一个记录，因此我们能通过浏览器的回退，前进按钮来控制hash的切换
  3.我们可以使用hashchange事件来监听hash的变化

## History
- hash影响美观，到了html5提供来History API来实现URL的变化
- 主要API有两个：history.pushState()和history.replaceState()，前者新增一个历史记录，后者直接替换当前的历史记录
```javascript
window.history.pushState(null, null, path);
window.history.repalceState(null, null, path);
```
- 此外，history存在其他特性：
  1.pushState和replaceState的标题：最好传入null
  2.可以使用popState的事件监听url的变化
  3.history.pushState()和history.repalceState()方法不会触发popState事件，需要手动触发页面渲染

