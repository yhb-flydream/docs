# React
### HTML模板：
```
<!DOCTYPE html>
<html>
  <head>
  <!--引入三个文件-->
    <script src="../build/react.js"></script>
    <!--提供与 DOM 相关的功能-->
    <script src="../build/react-dom.js"></script>
    <!--将 JSX 语法转为 JavaScript 语法-->
    <script src="../build/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <!--因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/babel"-->
    <script type="text/babel">
      // ** Our code goes here! **
    </script>
  </body>
</html>
```

### `ReactDOM.render()`
- 用于将模板转为 HTML 语言，并插入指定的 DOM 节点
```
<div id="example"></div>

<script type="text/babel">
    ReactDOM.render(
            <h1>Hello, world!</h1>, document.getElementById('example')
    );
</script>
上面代码将一个 h1 标题，插入 example 节点
```


### `JSX 语法`
- HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它`允许 HTML 与 JavaScript 的混写`
```
<div id="example"></div>
<script type="text/babel">
    var names = ['Alice', 'Emily', 'Kate'];

    ReactDOM.render(
        <div>
            {
                names.map(function (name) {
                    return <div>Hello, {name}!</div>
                })
            }
        </div>,
        document.getElementById('example')
    );

</script>
```
- 上面代码体现了 JSX 的基本语法规则:
  - **`遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析`**

- JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员
```
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```


### 组件：
- React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件
- `React.createClass` 方法就用于生成一个组件类
```
<div id="example"></div>
<script type="text/babel">
  var HelloMessage = React.createClass({
    render: function() {
      return <h1>Hello {this.props.name}</h1>;
    }
  });
  ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('example')
  );
</script>
```
- 变量 `HelloMessage` 就是一个组件类
- 模板插入 `<HelloMessage />` 时，会自动生成 `HelloMessage` 的一个`实例`**`（下文的"组件"都指组件类的实例）`**
- 所有组件类都必须有自己的 render 方法，用于输出组件
- **组件的属性可以在组件类的 `this.props` 对象上获取**

> `组件类的第一个字母必须大写，否则会报错`
> `组件类只能包含一个顶层标签，否则也会报错`
> 添加组件属性，有一个地方需要注意，就是 `class 属性需要写成 className` ，`for 属性需要写成 htmlFor` ，这是因为 class 和 for 是 JavaScript 的保留字

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1><p>
      some text
    </p>;
  }
});

上面代码会报错，因为HelloMessage组件包含了两个顶层标签：h1和p
```


### `this.props.children`
- `this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的**所有子节点**

- `this.props.children` 的值有**三种可能：**
  - 如果当前组件没有子节点，它就是 `undefined`
  - 如果有一个子节点，数据类型是 `object`
  - 如果有多个子节点，数据类型就是 `array`

- React 提供一个工具方法 `React.Children` 来处理 `this.props.children`
  - 用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object