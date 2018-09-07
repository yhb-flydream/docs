# a标签包括label标签后不跳转

**当 `type` 类型为 `radio`、`checkbox`、`file` 时，点击不跳转。其他类型都会跳转（原因暂时不明）**

```html
<div class="box">
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="checkbox"> checkbox测试 <span>不跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="radio"> radio测试 <span>不跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="file"> file测试 <span>不跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="button" value="button"> button测试 <span>跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="image" src="https://static.linkeddb.com/images/linkeddb_logo_small_200x200.png"> image测试 <span>跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="text"> text测试 <span>跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="password"> password测试 <span>跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="submit"> submit测试 <span>跳转</span>
      </label>
  </a>
  <a href="https://yhb-flydream.github.io/">
      <label>
        <input type="reset"> reset测试 <span>跳转</span>
      </label>
  </a>
</div>
```

<iframe height='265' scrolling='no' title='BOLWEL' src='//codepen.io/yhb-flydream/embed/BOLWEL/?height=265&theme-id=0&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/yhb-flydream/pen/BOLWEL/'>BOLWEL</a> by Elan Bin (<a href='https://codepen.io/yhb-flydream'>@yhb-flydream</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>