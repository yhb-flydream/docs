# clearQueue&stop

## clearQueue

停止队列中所有仍未执行的函数，**当前的动画会执行完**

```js
$(selector).clearQueue(queueName)

$('#box').clearQueue()
```

- queueName
  - 可选。规定要停止的队列的名称。
  - 默认是 `"fx"`，标准效果队列。

**与 `stop()` 方法不同，（只适用于动画），`clearQueue()` 能够清除任何排队的函数（通过 `.queue()` 方法添加到通用 jQuery 队列的任何函数）**

## stop

停止当前正在运行的动画，**可立即停止当前动画，也可等当前动画执行完，依据参数而定**

```js
$(selector).stop(stopAll, goToEnd)

$('#box').stop()
```

- stopAll
  - Boolean
  - 可选。规定是否停止被选元素的所有加入队列的动画。
- goToEnd
  - Boolean
  - 可选。规定是否允许完成当前的动画。
  - 该参数只能在设置了 stopAll 参数时使用。
