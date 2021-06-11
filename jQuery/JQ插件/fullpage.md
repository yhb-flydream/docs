# fullpage

```js
var myFullpage = new fullpage('#fullpage', {
  //导航
  menu: '#menu', // 绑定菜单，设定的相关属性和 anchors 值对应后，菜单可以控制滚动
  lockAnchors: false, // 锁定锚链接，地址栏中连接不随页面切换改变
  anchors: ['firstPage', 'secondPage'], // 定义锚链接，可以跳转到指定页面
  navigation: false, // 是否显示导航圆点
  navigationPosition: 'right', // 导航小圆点的位置，可以设置为left和right
  navigationTooltips: ['firstSlide', 'secondSlide'], // 导航小圆点的 tooltips 的设置，默认[], 注意按照顺序设置
  showActiveTooltip: false, // 是否显示当前页面的导航的tooltip信息
  slidesNavigation: false, // 是否显示横向幻灯片的导航
  slidesNavPosition: 'bottom', // 横向幻灯片导航的位置，bottom 和 top

  //滚动
  css3: true,
  scrollingSpeed: 700, // 页面滚动速度
  autoScrolling: true, // 是否适用插件的滚动方式
  fitToSection: true,
  fitToSectionDelay: 1000,
  scrollBar: false, // 是否包含滚动条
  easing: 'easeInOutCubic', // 页面滚动方式
  easingcss3: 'ease',
  loopBottom: false, // 滚动到底部是否连续滚动到顶部
  loopTop: false, // 滚动到顶部是否连续滚动到底部
  loopHorizontal: true, // 横向 slider 幻灯片是否循环滚动
  continuousVertical: false, // 是否循环滚动，不会出现 loopTop 和 loopBottom 那样的跳动，不要同时设置
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  offsetSections: false,
  resetSliders: false,
  fadingEffect: false,
  normalScrollElements: '#element1, .element2',
  scrollOverflow: false,
  scrollOverflowReset: false,
  scrollOverflowOptions: null,
  touchSensitivity: 15, // 在移动设备中滑动页面的敏感度，越大越难滑动
  normalScrollElementTouchThreshold: 5,
  bigSectionsDestination: null,

  //可访问
  keyboardScrolling: true, // 是否可以使用键盘方向键导航
  animateAnchor: true, // 锚点链接是否可以控制滚动动画
  recordHistory: true, // 记录页面滚动的历史，可以通过浏览器来前进后退。设置了 autoScrolling: false 那这个配置项也将会被关闭

  //设计
  controlArrows: true, // 左右滑动箭头是否显示
  verticalCentered: true, // 每页内容是否垂直居中
  sectionsColor: ['#ccc', '#fff'], // 每个 section 的背景色
  paddingTop: '3em', // 设置每个 section 顶部的 padding
  paddingBottom: '10px', // 设置每个 section 底部的 padding
  fixedElements: '#header, .footer', // 固定元素
  responsiveWidth: 0,
  responsiveHeight: 0,
  responsiveSlides: false,
  parallax: false,
  parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },

  //自定义选择器
  sectionSelector: '.section', // section 选择器的类名
  slideSelector: '.slide', // slide 选择器的类名

  lazyLoading: true,

  //事件

  /**
   * 页面生成后的回调函数
   */
  afterRender: function () {},

  /**
   * 滚动到 某一 section 且滚动结束后，会触发一次回调函数，设置 return false; 可以取消滚动
   * @param origin 离开页面的序号 从1开始
   * @param destination 滚动到目标页面的序号 从1开始
   * @param direction 判断是往下滚还是往上滚动，值为 up或down
   */
  afterLoad: function (origin, destination, direction) {},

  /**
   * 当离开一个 section 时，会触发此回调函数一次
   * @param origin
   * @param destination
   * @param direction
   */
  onLeave: function (origin, destination, direction) {},

  /**
   * 滚动到某一幻灯片后的回调函数
   * @param section
   * @param origin
   * @param destination
   * @param direction
   */
  afterSlideLoad: function (section, origin, destination, direction) {},

  /**
   * 浏览器窗口尺寸改变后的回调函数
   * @param width
   * @param height
   */
  afterResize: function (width, height) {},

  /**
   *
   * @param isResponsive
   */
  afterResponsive: function (isResponsive) {},

  /**
   *
   * @param section
   * @param origin
   * @param destination
   * @param direction
   */
  onSlideLeave: function (section, origin, destination, direction) {},
})
```
