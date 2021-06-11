# Vue 使用 ECharts

- [v-charts github](https://github.com/ElemeFE/v-charts)
- [v-charts 官网](https://v-charts.js.org)

---

- [vue-echarts github](https://github.com/ecomfe/vue-echarts)
- [vue-echarts demo](https://ecomfe.github.io/vue-echarts/demo/)
- [echarts 官网教程](https://ecomfe.github.io/echarts-doc/public/cn/tutorial.html)

## v-charts 双 y 轴左右刻度不一致，如何像 echarts 一样可以分别设置

```js
yAxis(item) {
  item[0].splitLine = Object.assign({}, {
    lineStyle: {
      color: ['#3755DA'],
    }
  });
  item[0].axisLabel = Object.assign( {},{
    color: 'white'
  });
  item[0].nameTextStyle = Object.assign( {},{
    color: 'white', // 正常是不用添加
  });
  item[1].splitLine = Object.assign({}, {
    show: false,
    lineStyle: {
    color: ['#3755DA'],
  }
  });
  item[1].axisLabel = Object.assign( {},{
    color: 'white'
  });
  item[1].nameTextStyle = Object.assign( {},{
    color: 'white', // 正常是不用添加
  });
  return item
}
item[0]是左侧，item[1]是右侧
```
