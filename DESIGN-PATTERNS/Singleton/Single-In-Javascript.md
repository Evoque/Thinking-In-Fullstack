
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

