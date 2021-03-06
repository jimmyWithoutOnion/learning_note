# Vue生命周期
资料来源：https://juejin.im/post/5c408be9f265da614f709043；
https://juejin.im/post/5afd7eb16fb9a07ac5605bb3；
https://juejin.im/post/5afd7eb16fb9a07ac5605bb3#heading-1

## beforeCreate
- 生成 $option 选项，并给实例添加生命周期相关属性
- 在实例初始化之后，在数据观测（data observer）和 event/watcher 事件配置之前被调用，也就是说，data，watcher，methods都不存在这个阶段
- 但有一个对象存在，就是 $router ，因此此阶段就可以根据路由信息进行重定向等操作

## created
- 初始化与依赖注入相关的操作，会遍历传入 methods 的选项，初始化选项数据，从 $options 获取数据选项（vm.$options.data），给数据添加‘观察器’对象并创建观察器，定义getter，setter存储器属性
- 在实例创建之后被调用，该阶段可以访问data，使用watcher，events，methods
- 此时dom还没有被挂载，该阶段允许执行http请求操作

- 渲染优先级 render 函数 > template 属性 > 外部 html


## beforeMount
- 相关 render 函数首次被调用

## mounted
- 在挂载完成之后被调用，执行 render 函数生成虚拟dom，创建真实dom替换虚拟dom，并挂载到实例
- 可以操作dom，比如事件监听

## beforeUpdate
- $vm.data 更新之后，虚拟dom重新渲染之前被调用
- 这个钩子可以修改 $vm.data ，并不会触发附加的重渲染过程

- 这个数据只有和模版中的数据绑定了才会发生更新

## updated
虚拟 dom 重新渲染之后调用，若再次修改 $vm.data ,会再次触发 beforeUpdate、updated， 进入死循环 

## beforeDestroy
- 实例被销毁前调用，也就是说在这个阶段还可以调用实例等

## destroyed
- 实例被销毁后调用，所有事件监听器已被移除，子实例被销毁

- 虚拟dom开始渲染是在 beforeMount 时，dom实例挂载完成在 mounted 阶段显示

## 几个不常用的生命钩子
- activated： 当组件激活时调用
- deactivated： 当组件停用时调用
- errorCaptured： 当捕获一个来自子孙组件的错误时被调用

## 异步加载
- setTimeout 等异步函数
异步函数会等到所有同步函数执行完之后再执行

- ajax 异步请求
1. 给予赋值变量初值
2. v-if，仅当有返回值时，才开始渲染节点

