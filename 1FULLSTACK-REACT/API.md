

> Deep understanding of the official API after practical use.


### **createElement()**
``` javascript

React.createElement(type, [props], [...children]);

```

Create and return a new `React element` of the given type. The type argument can be either a tag name string(such as 'div' or 'span'), a `React component` type(a class or a function), or a `React fragment` type.

**Code written with `JSX` will be converted to use `React.createElement()`.** You will not typically invoke `React.createElement()` directly if you are using JSX.

----> Use Case
``` javascript

import One from './One';

render(){
    return (
        {React.createElement(One)}
    )
}

```