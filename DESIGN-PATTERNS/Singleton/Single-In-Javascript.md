
最简单的单例模式是用Commonjs的module直接输出一个对象，如:
``` javascript
module.exports = {
    // Singleton...
}
```
或者 用ES6 的Module: 

```javascript
export default {
    // Singleton here
}
```

这里要注意，ES5 Module 即 CommonJS的Module 没有`default`关键字， 一般的输出行为是 `module.exports ={}` 或者 `module.exports.xxx = {}`, `export default` 是 ES6中才出现的关键词.


## 通过类实例化来实现JS的单例

```javascript

let instance = null;

class Singleton {
    static get instance(){
        return instance;
    }

    static set instance(_instance){
        instance = _instance;
    }

    constructor(){
        if(Singleton.instance === null) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }

    toString(){
        return "[object Singleton]";
    }

    getInstance(){
        return new Singleton();
    }

}

export default Singleton;

```
实际用法如下:
```javascript

import Singleton from './Singleton';

const s1 = new Singleton();

```
ok，上面代码中涉及到了ES6 Class的取值函数(getter)和存值函数(setter) 以及static 属性， 先来回顾一下基础知识.

### Class 的取值函数(getter)和存值函数(setter)
与ES5一样，`get`和`set`是对某个属性设置存值函数和取值韩寒诉，拦截该属性的存取行为。如
```javascript

class MyClass{
    constructor(){}

    get prop(){
        return 'getter'
    }
    set prop(){
        console.log('setter: ' + value);
    }
}

let inst = new MyClass();
inst.prop = 123;
inst.prop

```

### Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。 如果加上`static`关键字，表示该方法不会被实例继承，而是直接通过类来调用， 这就称为"静态方法"
注意，`如果静态方法中包含**this**关键字，这个**this**指的是类，而不是实例`.

### Class的静态属性和实例属性
静态属性指的是Class本身的属性， 即`Class.propName`, 而不是定义在实例对象(`this`)上的属性
ES6中明确规定，Class内部只有静态方法，没有静态属性。好像已经有了提案，对实例属性和静态属性都规定了新的写法。
静态属性的两种写法:
```javascript

// old style
class Foo {
    // ...
}
Foo.prop = 1;

// new style
class Foo {
    static prop = 1;
}

```
目前简易采用新写法，并且新写法是显示声明(`declarative`),而不是赋值处理，语义更好。

再来看通过类实现的单例模式几个关键点
```javascript

    static get instance();
    static set instance(_instance){};

    constructor(){}
    getInstance(){
        return new Singleton();
    }

```

 因为JS中没有限定修饰符(`private`,`protected`)，所以不能像`C#`那样对静态属性和构造方法做限制，所以严格意义上来说，外界也是可以直接通过`new`或者`static get instance`直接进行访问， 个人感觉不是一种严谨的单例模式，不建议使用⚠️！


#### 下面是第三种解决方案 - 自执行函数
```javascript

let Singleton = (function(){
    return {
        toString: function(){
            return "[object Singleton]";
        }
    };
}());

export default Singleton;

```

这种实现方式和第一种直接返回对象应该是一样的效果。 看着并没有实现类似于懒加载的效果啊。

### 第四种，看着有些费解
```javascript

export default function Singleton(instance){
    if(!Singleton.getInstance){
        Singleton.getInstance = function(){
            return instance;
        };
        instance = new Singleton;
    }

    this.toString = function(){
        return "[object Singleton]";
    };
}(new Singleton);

```
实际用法如下:
```javascript

import Singleton from './Singleton';

const single1 = Singleton.getInstance();

```