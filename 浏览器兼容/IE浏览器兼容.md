# IE兼容问题集合
[TOC]
### 给一个元素绑定多个事件后，IE6、7、8，执行顺序为倒序执行
- 解决：
	- 把将要给这个元素绑定的事件放到一个数组里面，再给这个元素绑定一个函数，这个函数执行时依次遍历数组，调用数组里面已经存储的每个事件


### 透明度(opacity)
```javascript
/**
 * 设置透明度（兼容旧版本：要设置2次）
 * @type {string}
 */

box.style.opacity = "0.5";
box.style.filter = "alpha(opacity = 50)";
```


### 获取标签的内容(innerText)
```javascript
/**
 * 获取标签的内容（兼容所有浏览器） 不兼容IE678
 * @param element
 * @returns {*}
 */
function getInnerText(element) {
    //能力检测(先判断如果这个能力有这个)
    if (typeof element.innerText === "string") {
        //说明支持innerText
        return element.innerText;
    } else {
        //说明不支持innerText
        return element.textContent;
    }
}
```

### 设置标签内容(innerText)
```javascript
/**
 * 设置标签内容的方法（兼容性问题） 不兼容IE678
 * @param element
 * @param value
 */
function setInnerText(element, value) {
    //能力检测(先判断如果这个能力有这个)
    if (typeof element.innerText === "string") {
        element.innerText = value;
    } else {
        element.textContent = value;
    }
}
```

### 获取指定元素的子元素(childNodes)
```javascript
/**
 * 获取指定元素的子元素
 * @param element 指定元素
 * @returns {Array} 子元素数组
 */
function getChildElements(element) {
    var arr = [];
    //获取到所有的子节点
    var nodes = element.childNodes;
    //遍历
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        //判断是否是元素,就存到数组里面去
        if (node.nodeType === 1) {
            arr[arr.length] = node;
        }
    }
    return arr;
}
```

### 获取指定元素的下一个兄弟元素(nextElementSibling)
```javascript
/**
 * 获取指定元素的下一个兄弟元素(nextElementSibling)兼容性问题  不兼容IE678
 * @param element
 * @returns {*}
 */
//封装一个函数，获取指定元素的下一个兄弟元素
function getNextElement(element) {
    //能力检测(先判断如果这个能力有这个)
    if (element.nextElementSibling) {
        //如果能进来，说明支持nextElementSibling
        return element.nextElementSibling;
    } else {
        //如果执行到这里，说明不支持nextElementSibling(IE678)
        var node = element.nextSibling;
        //如果node不存在，或者node是元素的话
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
```

### 获取指定元素的上一个兄弟元素(previousElementSibling)
```javascript
/**
 * 获取指定元素的上一个兄弟元素(previousElementSibling)
 * @param element
 * @returns {*|Node}
 */
function getPreviousElement(element) {
    //能力检测(先判断如果这个能力有这个)
    if (element.previousElementSibling) {
        //如果能进来，说明支持previousElementSibling
        return element.previousElementSibling;
    } else {
        //如果执行到这里，说明不支持previousElementSibling(IE678)
        var node = element.previousSibling;
        //如果node不存在，或者node是元素的话
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
```

### 获得最后一个元素(lastElementChild)
```javascript
/**
 * 获得最后一个元素
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = element.previousSibling;
        }
        return node;
    }
}
```

### 获得第一个元素(firstElementChild)
```javascript
/**
 * 获得第一个元素
 * @param element
 * @returns {*}
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = element.nextSibling;
        }
        return node;
    }
}
```

### 封装class类
```javascript
/**
     *封装class类
     * @param classname
     * @returns {NodeList}
     */
    function getClass(classname) {
//    如果浏览器支持，直接返回
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(classname);
        } else {
            var arr = [];//用于返回数组
            var dom = document.getElementsByTagName("*");//去除所有盒子
            for (var i = 0; i < dom.length; i++) {
                var txtArr = dom[i].className.split(" ");//分割类名，并且转换为数组
		for (var j = 0; j < txtArr.length; j++){
			if(txtArr[j] == classname) {
				arr.push(dom[i]);//求的是类名的拥有者
			}
		}
            }
            return arr;
        }
    }
```

### 得到当前时间
```javascript
/**
* 得到当前时间
* @returns {string}
*/

function getNowtime() {
        var date = new Date();
        var arrYear = [];
        var arrHours = [];
        //年
        arrYear.push(date.getFullYear());
        //月
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        arrYear.push(month);
        //日
        var dates = date.getDate();
        if (dates < 10) {
            dates = "0" + dates;
        }
        arrYear.push(dates);
        //时
        var hours = date.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        arrHours.push(hours);
        //分
        var minute = date.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        arrHours.push(minute);
        //秒
        var second = date.getSeconds();
        if (second < 10) {
            second = "0" + second;
        }
        arrHours.push(second);

        return arrYear.join("-") + " " + arrHours.join(":");
    }
```


### scroll
```
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}
```


### 获取pageX、pageY，兼容IE678
```
//获取pageX，兼容IE678
function getPageX(event) {
    return event.pageX || event.clientX + document.documentElement.scrollLeft;
}
//获取pageY，兼容IE678
function getPageY(event) {
    if (event.pageY) {
        return event.pageY;
    } else {
        //在IE678里面是支持document.documentElement.scrollTop
        return event.clientX + document.documentElement.scrollTop;
    }
}
```

### 注册/移除事件`(addEventListener/removeEventListener)`
```
//注册事件的兼容性封装
function addEventListener(element, type, fn) {
    //能力检测
    if (element.addEventListener) {
        //注册是事件都是冒泡
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        //所有浏览器都支持on的方式
        element["on" + type] = fn;
    }
}

//移除事件的兼容性封装
function removeEventListener(element, type, fn) {
    //能力检测
    if (element.removeEventListener) {
        element.removeEventListener(type, fn, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
    } else {
        element["on" + type] = null;
    }
}
```

### 阻止事件冒泡（stopPropagation/cancelBubble）
```
//阻止事件冒泡
function stopPropagation(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else {
        event.cancelBubble = true;
    }
}
```


### IE的双边距BUG
- 块级元素float后设置横向margin，ie6显示的margin比设置的较大
	- 解决：加入
	- `_display：inline;`


### Ie z-index问题
- 给父级添加`position:relative`


### 没有办法定义1px左右的宽度容器(IE6默认行高)
```
over:hidden
zoom:0.08
line-height:1px
```


### IE5-8不支持`opacity`
```
.opacity {
    opacity: 0.4
    filter: alpha(opacity=60); /* for IE5-7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
}
```

