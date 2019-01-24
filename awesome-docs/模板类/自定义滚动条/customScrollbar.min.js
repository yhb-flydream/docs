(function(window){
	var scrollbar = function(data){
		return new Customscrollbar(data).init();
	};
	var Customscrollbar = function(data){
		this.scrollbarBox = document.querySelector('#'+data.scrollbarBoxId);
		this.scrollbarContent = document.querySelector('#'+data.scrollbarContentId);
		this.scrollbarY = document.querySelector('#'+data.scrollbarYId);
		this.scrollbarX = document.querySelector('#'+data.scrollbarXId);
		this.data = data;
		this.scrollbarContentHeight = 0;
		this.scrollbarContentWidth = 0;
		this.scrollbarBoxHeight = 0;
		this.scrollbarBoxWidth = 0;
		this.scrollbarYHeight = 0;
		this.scrollbarXWidth = 0;
		this.scrollbarYTop = 0;
		this.scrollbarXLeft = 0;
		this.downPageY = '';
		this.downPageX = '';
		this.movePageY = '';
		this.movePageX = '';
		this.changePageY = '';
		this.changePageX = '';
		this.is_mouse_down_Y = false;
		this.is_mouse_down_X = false;
	};
	Customscrollbar.prototype = {
		init : function(){
			// 获取dom
			this.dom();
			// 设置样式
			this.css();
			// 监听事件
			this.listener();
		},
		dom: function(){
			// 获取dom
			if(this.data.scrollbarBoxId&&this.data.scrollbarContentId){
				this.scrollbarBox = document.querySelector('#'+this.data.scrollbarBoxId);
				this.scrollbarContent = document.querySelector('#'+this.data.scrollbarContentId);
			}else{
				this.scrollbarBox = document.querySelector('#scrollbar-box');
				this.scrollbarContent = document.querySelector('#scrollbar-content');
			};
			// 创建Y轴模拟滚动条
			if(this.data.scrollbarYId){
				this.scrollbarY = document.createElement('div');
				this.scrollbarY.setAttribute('id', this.data.scrollbarYId);
				this.scrollbarBox.insertAdjacentElement("afterend", this.scrollbarY);
			}else{
				this.scrollbarY = document.createElement('div');
				this.scrollbarY.setAttribute('id', 'scrollbarY');
				this.scrollbarBox.insertAdjacentElement("afterend", this.scrollbarY);
			}
			// 创建X轴模拟滚动条
			if(this.data.scrollbarXId){
				this.scrollbarX = document.createElement('div');
				this.scrollbarX.setAttribute('id', this.data.scrollbarXId);
				this.scrollbarBox.insertAdjacentElement("afterend", this.scrollbarX);
			}else{
				this.scrollbarX = document.createElement('div');
				this.scrollbarX.setAttribute('id', 'scrollbarX');
				this.scrollbarBox.insertAdjacentElement("afterend", this.scrollbarX);
			}
		},
		css : function(){
			// 父子元素定位
			if(this.scrollbarBox.style.position != 'relative'&&this.scrollbarBox.style.position != 'absolute'){
				this.scrollbarBox.style.position = 'relative';
			};
			// 超出隐藏
			this.scrollbarBox.style.overflow = 'scroll';
			// 自定义的滚动条样式
			this.scrollbarBoxHeight = this.scrollbarBox.offsetHeight;
			this.scrollbarBoxWidth = this.scrollbarBox.offsetWidth;
			this.scrollbarContentHeight = this.scrollbarContent.scrollHeight;
			this.scrollbarContentWidth = this.scrollbarContent.scrollWidth;
			// Y轴滚动条高
			if(this.scrollbarContentHeight>this.scrollbarBoxHeight){
				this.scrollbarYHeight = this.scrollbarBoxHeight*this.scrollbarBoxHeight/this.scrollbarContentHeight;
				this.scrollbarY.style.height = this.scrollbarYHeight + 'px';
			}else{
				this.scrollbarY.style.height = 0;
			}
			// Y轴滚动条宽
			if(this.data.scrollbarYWidth){
				this.scrollbarY.style.width = this.data.scrollbarYWidth + 'px';
			}else{
				this.scrollbarY.style.width = '8px';
			};
			// X轴滚动条高
			if(this.data.scrollbarXHeight){
				this.scrollbarX.style.height = this.data.scrollbarXHeight + 'px';
			}else{
				this.scrollbarX.style.height = '8px';
			};
			// X轴滚动条宽
			if(this.scrollbarContentWidth>this.scrollbarBoxWidth){
				this.scrollbarXWidth = this.scrollbarBoxWidth*this.scrollbarBoxWidth/this.scrollbarContentWidth;
				this.scrollbarX.style.width = this.scrollbarXWidth + 'px';
			}else{
				this.scrollbarX.style.width = 0;
			}
			// 定位
			this.scrollbarY.style.position = 'absolute';
			this.scrollbarX.style.position = 'absolute';
			if(this.scrollbarYTop){
				this.scrollbarY.style.top = this.scrollbarYTop;
			}else{
				this.scrollbarY.style.top = 0;
			};
			this.scrollbarY.style.right = 0;
			if(this.scrollbarXLeft){
				this.scrollbarX.style.left = this.scrollbarXLeft;
			}else{
				this.scrollbarX.style.left = 0;
			};
			this.scrollbarX.style.bottom = 0;
			// 颜色
			if(this.data.scrollbarYColor){
				this.scrollbarY.style.background = this.data.scrollbarYColor;
			}else{
				this.scrollbarY.style.background = '#cccccc';
			};
			if(this.data.scrollbarXColor){
				this.scrollbarX.style.background = this.data.scrollbarXColor;
			}else{
				this.scrollbarX.style.background = '#cccccc';
			};
			// 圆角
			if(this.data.scrollbarYRadius){
				this.scrollbarY.style.borderRadius = this.data.scrollbarYRadius + 'px';
			}else{
				this.scrollbarY.style.borderRadius = 0;
			};
			if(this.data.scrollbarXRadius){
				this.scrollbarX.style.borderRadius = this.data.scrollbarXRadius + 'px';
			}else{
				this.scrollbarX.style.borderRadius = 0;
			};
			// 显示
			this.scrollbarY.style.display = 'none';
			this.scrollbarX.style.display = 'none';
		},
		listener: function(){
			this.scrollbarBox.addEventListener('mouseover', this.onMouseOver.bind(this), false);
			this.scrollbarBox.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
			this.scrollbarBox.addEventListener('scroll', this.onScrollMethod.bind(this), false);
			this.scrollbarY.addEventListener('mouseover', this.onMouseOver.bind(this), false);
			this.scrollbarY.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
			this.scrollbarY.addEventListener('scroll', this.onScrollMethod.bind(this), false);
			this.scrollbarY.addEventListener('mousedown', this.onMouseDownY.bind(this), false);
			this.scrollbarX.addEventListener('mouseover', this.onMouseOver.bind(this), false);
			this.scrollbarX.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
			this.scrollbarX.addEventListener('scroll', this.onScrollMethod.bind(this), false);
			this.scrollbarX.addEventListener('mousedown', this.onMouseDownX.bind(this), false);
			document.documentElement.addEventListener('mouseup', this.documentMouseUp.bind(this), false);
			document.documentElement.addEventListener('click', this.documentClick.bind(this), false);
			document.documentElement.addEventListener('mousemove', this.documentMouseMove.bind(this), false);
		},
		documentMouseUp: function(){
			console.log('documentMouseUp');
			this.scrollbarY.style.display = 'none';
			this.scrollbarX.style.display = 'none';
			if(this.is_mouse_down_Y){
				this.is_mouse_down_Y = false;
			};
			if(this.is_mouse_down_X){
				this.is_mouse_down_X = false;
			};
		},
		documentClick: function(){
			if(this.is_mouse_down_Y){
				this.is_mouse_down_Y = false;
			}
			if(this.is_mouse_down_X){
				this.is_mouse_down_X = false;
			}
		},
		documentMouseMove: function(e){
			if(this.is_mouse_down_Y){
				this.moreValueY = this.scrollbarContentHeight - this.scrollbarBoxHeight;
				this.lessValueY = this.scrollbarBoxHeight - this.scrollbarYHeight;
				this.scrollbarY.style.display = 'block';
				this.movePageY = e.pageY;
				this.changePageY = this.movePageY - this.downPageY;
				this.downPageY = this.movePageY;
				if (this.scrollbarY.offsetTop + this.changePageY >= parseInt(this.lessValueY)) {
					this.scrollbarYTop = this.lessValueY + 'px';
					this.scrollbarY.style.top = this.scrollbarYTop;
					this.scrollbarBox.scrollTop = this.moreValueY;
					this.resetCss();
					return;
				}
				this.scrollbarYTop = (this.scrollbarY.offsetTop + this.changePageY) + 'px';
				this.scrollbarY.style.top = this.scrollbarYTop;
				var changeValue = parseFloat(this.scrollbarYTop.replace(/px/g, ""))/this.lessValueY*this.moreValueY;
				this.scrollbarBox.scrollTop = changeValue;
				this.resetCss();
			}
			if(this.is_mouse_down_X){
				this.moreValueX = this.scrollbarContentWidth - this.scrollbarBoxWidth;
				this.lessValueX = this.scrollbarBoxWidth - this.scrollbarXWidth;
				this.scrollbarX.style.display = 'block';
				this.movePageX = e.pageX;
				this.changePageX = this.movePageX - this.downPageX;
				this.downPageX = this.movePageX;
				if (this.scrollbarX.offsetLeft + this.changePageX >= parseInt(this.lessValueX)) {
					this.scrollbarXLeft = this.lessValueX + 'px';
					this.scrollbarX.style.left = this.scrollbarXLeft;
					this.scrollbarBox.scrollLeft = this.moreValueX;
					this.resetCss();
					return;
				}
				this.scrollbarXLeft = (this.scrollbarX.offsetLeft + this.changePageX) + 'px';
				this.scrollbarX.style.left = this.scrollbarXLeft;
				var changeValue = parseFloat(this.scrollbarXLeft.replace(/px/g, ""))/this.lessValueX*this.moreValueX;
				this.scrollbarBox.scrollLeft = changeValue;
				this.resetCss();
			}
		},
		onMouseDownY: function(e){
			// 阻止默认行为防止内容被选中
			e.preventDefault();
			this.is_mouse_down_Y = true;
			this.downPageY = e.pageY;
			// console.log('onMouseDown',this.is_mouse_down_Y);
		},
		onMouseDownX: function(e){
			// 阻止默认行为防止内容被选中
			e.preventDefault();
			this.is_mouse_down_X = true;
			this.downPageX = e.pageX;
			// console.log('onMouseDown',this.is_mouse_down_X);
		},
		onMouseOver: function(e){
			this.resetDivCss();
		},
		onMouseLeave: function(){
			if(!this.is_mouse_down_Y){
				this.scrollbarY.style.display = 'none';
			}
			if(!this.is_mouse_down_X){
				this.scrollbarX.style.display = 'none';
			}
		},
		onScrollMethod: function(e){
			this.resetDivCss();
			if(this.scrollbarContentHeight > this.scrollbarBoxHeight){
				this.scrollbarY.style.display = 'block';
				this.moreValueY = this.scrollbarContentHeight - this.scrollbarBoxHeight;
				this.lessValueY = this.scrollbarBoxHeight - this.scrollbarYHeight;
				this.scrollbarYTop = this.scrollbarBox.scrollTop/this.moreValueY*this.lessValueY + 'px';
				this.scrollbarY.style.top = this.scrollbarYTop;
			}
			if(this.scrollbarContentWidth > this.scrollbarBoxWidth){
				this.scrollbarX.style.display = 'block';
				this.moreValueX = this.scrollbarContentWidth - this.scrollbarBoxWidth;
				this.lessValueX = this.scrollbarBoxWidth - this.scrollbarXWidth;
				this.scrollbarXLeft = this.scrollbarBox.scrollLeft/this.moreValueX*this.lessValueX + 'px';
				this.scrollbarX.style.left = this.scrollbarXLeft;
			}
		},
		resetDivCss: function(){
			this.scrollbarContentHeight = this.scrollbarContent.scrollHeight;
			this.scrollbarContentWidth = this.scrollbarContent.scrollWidth;
			this.scrollbarBoxHeight = this.scrollbarBox.offsetHeight;
			this.scrollbarBoxWidth = this.scrollbarBox.offsetWidth;
			if(this.scrollbarContentHeight>this.scrollbarBoxHeight){
				this.scrollbarYHeight = this.scrollbarBoxHeight*this.scrollbarBoxHeight/this.scrollbarContentHeight;
				this.scrollbarY.style.height = this.scrollbarYHeight + 'px';
				this.moreValueY = this.scrollbarContentHeight - this.scrollbarBoxHeight;
				this.lessValueY = this.scrollbarBoxHeight - this.scrollbarYHeight;
				this.scrollbarYTop = this.scrollbarBox.scrollTop/this.moreValueY*this.lessValueY + 'px';
				this.scrollbarY.style.top = this.scrollbarYTop;
				this.scrollbarY.style.display = 'block';
			}else{
				this.scrollbarY.style.height = 0;
				this.scrollbarY.style.top = 0;
			}
			if(this.scrollbarContentWidth>this.scrollbarBoxWidth){
				this.scrollbarXWidth = this.scrollbarBoxWidth*this.scrollbarBoxWidth/this.scrollbarContentWidth;
				this.scrollbarX.style.width = this.scrollbarXWidth + 'px';
				this.moreValueX = this.scrollbarContentWidth - this.scrollbarBoxWidth;
				this.lessValueX = this.scrollbarBoxWidth - this.scrollbarXWidth;
				this.scrollbarYLeft = this.scrollbarBox.scrollLeft/this.moreValueX*this.lessValueX + 'px';
				this.scrollbarX.style.left = this.scrollbarYLeft;
				this.scrollbarX.style.display = 'block';
			}else{
				this.scrollbarX.style.width = 0;
				this.scrollbarX.style.left = 0;
			}
		},
		resetCss: function(){
			if(this.scrollbarY.offsetTop<0){
				this.scrollbarYTop = 0;
				this.scrollbarY.style.top = this.scrollbarYTop + 'px';
			};
			if(this.scrollbarY.offsetTop>this.lessValueY){
				this.scrollbarYTop = this.lessValueY;
				this.scrollbarY.style.top = this.scrollbarYTop + 'px';
			};
			if(this.scrollbarX.offsetLeft<0){
				this.scrollbarXLeft = 0;
				this.scrollbarX.style.left = this.scrollbarXLeft + 'px';
			};
			if(this.scrollbarX.offsetLeft>this.lessValueX){
				this.scrollbarXLeft = this.lessValueX;
				this.scrollbarX.style.left = this.scrollbarXLeft + 'px';
			};
		}
	};
	window.scrollbar = scrollbar;
})(window);
// 用法
// scrollbar({
// 	scrollbarBoxId: 'scrollbar-box',  			// 滚动条外壳id
// 	scrollbarContentId: 'scrollbar-content',	// 内容元素ID
// 	scrollbarYId: 'scrollbar-y',  // Y轴模拟滚动条的id
// 	scrollbarXId: 'scrollbar-x',  // X轴模拟滚动条的id
// 	scrollbarYWidth: '',  	// Y轴模拟滚动条的宽
// 	scrollbarXWidth: '',  	// X轴模拟滚动条的宽
// 	scrollbarYColor: '',  	// Y轴模拟滚动条的颜色
// 	scrollbarXColor: '',  	// X轴模拟滚动条的颜色
// 	scrollbarYRadius: 10,  	// Y轴模拟滚动条的圆角
// 	scrollbarXRadius: 10,  	// X轴模拟滚动条的圆角
// })
