#### 在浏览器中直接使用`React` & `Babel`

``` html
<!-- 还可以引用`browser.js`版的babel -->
<script src="babel-standalone.js"></script>
<script src="react.js"></script>
<script src="react-dom.js"></script>


<!-- 使用`text/babel`的特殊标签; `data-plugins` specifies a special Babel plugin -->
<script type="text/babel" data-plugins="transform-class-properties">
  // code goes here.
</script>
```

通过引用上面文件，就可以在`Browser`端使用`JSX`和其他`ES6`语法；其他使用详情可以参考阮一峰的[Babel教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)





##### `class`中合适使用`arrow function`

> 使用`arrow function` 自动绑定`this`的功能。

When working inside `render()`, we've witnessed that `this` is always bound to the component. But inside our custom component event method, `this` is actually `undefined`.

For the `render()`「`LifeCycle methods`」functions, **React binds this to the component for us**.「React specifies a default set of special API methods」.



#### 通过`Babel`转换看`ES6`的实现

通过Babel转换`class`相关源码，发现`class`中正常书写的属性是写在此类的`prototype`中的，也就是通过原型链实现类，和`ES5`一样。但是当函数是箭头函数时，此函数是直接绑定到实例对象上，即`this.***`，和`prototype`并没有关系，这样做的目的是为了绑定`this`。

扩展：属性「非函数」会直接绑定到class的实例上`this.propert`， 而函数属性会绑定到`property`上，箭头函数也可以看作是把函数属性当作非函数属性来对待。

这里用到的名词叫: `property initializers`.

 

- 使用环境变量`environment variables`来区分`baseUrl`等变量
- 

























