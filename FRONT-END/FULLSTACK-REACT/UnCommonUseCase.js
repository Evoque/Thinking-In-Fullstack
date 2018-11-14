
/**
 * 一些不常用，但是有时却很有用的API
 */

// 复制子元素，并注入props
let child = this.props.children && React.cloneElement(
    this.props.children,
    { injectedProps: '' }
);