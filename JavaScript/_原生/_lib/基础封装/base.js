/*---------------------------------------------------------------------
 *name:JavaScript Library
 *creat:2014.04.28
 *author:wengqi
---------------------------------------------------------------------*/
//前端调用
var $=function(_this){ 
	return new Base(_this);
};
//基础库
function Base(_this){ 
	//创建一个数组,用来存储节点和节点数组
	this.Elements = []; //私有化数组
	if(_this != undefined){
		this.Elements[0] = _this;
	}
};
//获取元素id方法
Base.prototype.getId = function(id){ 
	this.Elements.push(document.getElementById(id));
	return this;
};
//获取元素class方法（区域问题）
Base.prototype.getClass = function(className,idName){
	var node = null;
	if(arguments.length == 2){ 
		node = document.getElementById(idName);
	}
	else{ 
		node = document;
	};
	//区域问题（暂时以id为区域范围） 
	var allNode = node.getElementsByTagName("*");
	for(var i=0,Max=allNode.length; i<Max; i++){ 
		if(allNode[i].className == className){ 
			this.Elements.push(allNode[i]);
		}
	};
	return this;
};
//获取某一元素方法
Base.prototype.getElement = function(num){ 
	var element = this.Elements[num];
	this.Elements = [];
	this.Elements[0] = element;
	return this;
};
//获取元素节点方法
Base.prototype.getTag = function(tag){ 
	var tags = document.getElementsByTagName(tag);
	for(var i=0,Max=tags.length; i<Max; i++){ 
		this.Elements.push(tags[i]);
	};
	return this;
};
//获取元素name属性方法
Base.prototype.getName = function(name){ 
	var Name = document.getElementsByName(name);
	for(var i=0,Max=Name.length; i<Max; i++){ 
		this.Elements.push(Name[i]);
	};
	return this;
};
/*--------------------------------------------------------------------- 跨浏览器的一些方法 ---*/
//跨浏览器：获取浏览器视窗大小
function getWH(){ 
	if(typeof window.innerWidth != "undefined"){ 
		var width = window.innerWidth,
			height = window.innerHeight;
		return { 
			width : width,
			height : height
		};
	}
	else{ 
		var width = document.documentElement.clientWidth,
			height = document.documentElement.clientHeight;
		return { 
			width : width,
			height : height
		};
	};
};
//跨浏览器：计算后的样式
function calcStyle(obj,attr){ 
	if(typeof window.getComputedStyle != "undefined"){  //typeof function;
		return window.getComputedStyle(obj,null)[attr];
	}
	else if(typeof obj.currentStyle != "undefined"){ //typeof obj;
		return obj.currentStyle[attr];
	};
};
//跨浏览器：判断class是否存在
function hasClass(obj,className){ 
	return obj.className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"));
}
//跨浏览器：添加link或style的样式规则
function insertRule(sheet,selectText,cssText,position){ 
	if(typeof sheet.insertRule != "undefined"){ //w3c,typeof:function
		sheet.insertRule(selectText+"{"+cssText+"}",position);
	}
	else if(typeof sheet.addRule != "undefined"){ //ie,typeof:object
		sheet.addRule(selectText,cssText,position);
	};
};
//跨浏览器：移除link或style的样式规则
function deleteRule(sheet,index){ 
	if(typeof sheet.deleteRule != "undefined"){ 
		sheet.deleteRule(index);
	}
	else if(typeof sheet.removeRule != "undefined"){ 
		sheet.removeRule(index);
	}
};
/*--------------------------------------------------------------------- css方法 ---*/
Base.prototype.css = function(attr,value){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){
		if(arguments.length == 1){ 
			//return this.Elements[i].style[attr];
			//计算后的样式
			/*
			if(typeof window.getComputedStyle != "undefined"){ //w3c
				return window.getComputedStyle(this.Elements[i],null)[attr];
			}
			else if(typeof this.Elements[i].currentStyle != "undefined"){  //ie
				return this.Elements[i].currentStyle[attr];
			}
			*/
			return calcStyle(this.Elements[i],attr);
		} 
		this.Elements[i].style[attr] = value;
	}
	return this;
};
/*--------------------------------------------------------------------- html方法 ---*/
Base.prototype.html = function(str){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){
		if(arguments.length == 0){ 
			return this.Elements[i].innerHTML;
		} 
		this.Elements[i].innerHTML = str;
	}
	return this;
};
/*--------------------------------------------------------------------- click方法 ---*/
Base.prototype.click = function(fn){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].onclick = fn;
	}
	return this;
};
/*--------------------------------------------------------------------- addClass方法 ---*/
Base.prototype.addClass = function(className){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){
		//如果开头结尾没有重复样式名
		if(!hasClass(this.Elements[i],className)){
			this.Elements[i].className += " "+className;
		}
	}
	return this;
};
/*--------------------------------------------------------------------- removeClass方法 ---*/
Base.prototype.removeClass = function(className){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		if(this.Elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))){ 
			this.Elements[i].className = this.Elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"),"");
		}
	}
	return this;
};
/*--------------------------------------------------------------------- addRule方法（添加link或style中的样式规则） ---*/
Base.prototype.addRule = function(num,selectText,cssText,position){ 
	var sheet = document.styleSheets[num];
	//alert(sheet);
	//alert(typeof sheet.insertRule);
	//alert(typeof sheet.addRule);
	/*
	if(typeof sheet.insertRule != "undefined"){ //w3c,typeof:function
		sheet.insertRule(selectText+"{"+cssText+"}",position);
	}
	else if(typeof sheet.addRule != "undefined"){ //ie,typeof:object
		//alert("w");
		sheet.addRule(selectText,cssText,position);
	}
	*/
	insertRule(sheet,selectText,cssText,position);
	return this;
};
/*--------------------------------------------------------------------- removeRule方法（移除link或css中的样式规则） ---*/
Base.prototype.removeRule = function(num,index){ 
	var sheet = document.styleSheets[num];
	/*
	if(typeof sheet.deleteRule != "undefined"){ 
		sheet.deleteRule(index);
	}
	else if(typeof sheet.removeRule != "undefined"){ 
		sheet.removeRule(index);
	}
	*/
	deleteRule(sheet,index);
	return this;
};
/*--------------------------------------------------------------------- hover方法（鼠标移入移除事件） ---*/
Base.prototype.hover = function(over,out){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){
		this.Elements[i].onmouseover = over;
		this.Elements[i].onmouseout = out;
	}
	return this;
};
/*--------------------------------------------------------------------- show方法（显示） ---*/
Base.prototype.show = function(){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].style.display = "block";
	}
	return this;
};
/*--------------------------------------------------------------------- hide方法（隐藏） ---*/
Base.prototype.hide = function(){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].style.display = "none";
	}
	return this;
};
/*--------------------------------------------------------------------- center方法 ---*/
Base.prototype.center = function(width,height){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		var left = (getWH().width-width)/2 + "px",
			top = (getWH().height-height)/2 + "px";
		this.Elements[i].style.left = left;
		this.Elements[i].style.top = top;
	}
	return this;
};
/*--------------------------------------------------------------------- resize方法 ---*/
Base.prototype.resize = function(fn){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		var ele = this.Elements[i];
		window.onresize = function(){
			fn(); 
			if(ele.offsetLeft > getWH().width - ele.offsetWidth){ 
				ele.style.left = getWH().width - ele.offsetWidth + "px";
			};
			if(ele.offsetTop > getWH().height - ele.offsetHeight){ 
				ele.style.top = getWH().height - ele.offsetHeight + "px";
			};
		}
	}
	return this;
};
/*--------------------------------------------------------------------- lock方法 ---*/
Base.prototype.lock = function(){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].style.width = getWH().width+"px"; //ps:px单位不要忘记!
		this.Elements[i].style.height = getWH().height+"px";
		this.Elements[i].style.display = "block";
		document.documentElement.style.overflow = "hidden";
	}
	return this;
};
/*--------------------------------------------------------------------- unlock方法 ---*/
Base.prototype.unlock = function(){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].style.display = "none";
		document.documentElement.style.overflow = "auto";
	}
	return this;
};
/*--------------------------------------------------------------------- event事件对象 ---*/
function getEvent(event){ 
	return event||window.event;
};
/*--------------------------------------------------------------------- 阻止默认行为 ---*/
function preDef(event){ 
	var e = event||window.event;
	if(typeof e.preventDefault != "undefined"){ 
		e.preventDefault();
	}else{ 
		e.returnValue = false;
	}
};
/*--------------------------------------------------------------------- drag拖拽方法 ---*/
Base.prototype.drag = function(){ 
	for(var i=0,Max=this.Elements.length; i<Max; i++){ 
		this.Elements[i].onmousedown = function(e){ 
			var _this = this,
				e = getEvent(e),
				offLeft = _this.offsetLeft,
				offTop = _this.offsetTop,
				diffX = e.clientX - offLeft, 
				diffY = e.clientY - offTop;
			//ie专有方法setCapture,relaseCapture让鼠标滑动到浏览器外部也可以捕获事件
			if(_this.setCapture){ 
				_this.setCapture();
			};
			document.onmousemove = function(e){ 
				var e = getEvent(e),
					left = e.clientX-diffX,
					top = e.clientY-diffY;
					
				//范围判断
				if(left < 0){ 
					left = 0;
				}else if(left > getWH().width - _this.offsetWidth){ 
					left = getWH().width - _this.offsetWidth;
				};
				if(top < 0){ 
					top = 0;
				}else if(top > getWH().height - _this.offsetHeight){ 
					top = getWH().height - _this.offsetHeight;
				};
				
				_this.style.left = left + "px"; //最后得到的左距离
				_this.style.top = top + "px"; //最后得到的上距离
			};
			document.onmouseup = function(){
				//ie专有方法setCapture,relaseCapture让鼠标滑动到浏览器外部也可以捕获事件
				if(_this.relaseCapture){ 
					_this.relaseCapture();
				}; 
				this.onmousemove = null;
				this.onmouseup = null;
			};
		};
	};
	return this;
};
/*--------------------------------------------------------------------- 添加事件绑定 ---*/
//跨浏览器添加事件绑定
function addEvent(obj,type,fn){

	if(typeof obj.addEventListener != "undefined"){ //chrome

		obj.addEventListener(type,fn,false);

	}else{                                         //ie
		//创建一个存放事件的哈希表(散列表)
		if(!obj.events) obj.events = {};
		//第一次执行时
		if (!obj.events[type]) {
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一个事件处理函数存放到数组的第一个位置上
			if(obj.events["on" + type]) obj.events[type][0] = fn;
		}else{
			//同一个注册函数进行屏蔽,不添加到计数器中
			if(addEvent.equal(obj.events[type],fn)) return false;
		}
		//从第二次开始使用计数器，将事件处理函数存放到数组中去
		obj.events[type][addEvent.ID++] = fn;
		//执行事件
		obj["on" + type] = addEvent.exec;
	}
};
//为每个事件分配一个计数器
addEvent.ID = 1;
//执行事件处理函数
addEvent.exec = function(event){ 
	var e = event || addEvent.fixEvent(window.event),
		es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
};
//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){ 
	for(var i in es){ 
		if(es[i] == fn) return true;
	}
	return false;
};
//把ie常用的Event对象配对到W3C中去（也是一种兼容模式）
addEvent.fixEvent = function(event){ 
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	return event;
};
//ie阻止默认行为
addEvent.fixEvent.preventDefault = function(){ 
	this.returnValue = false;
};
//ie阻止冒泡事件
addEvent.fixEvent.stopPropagation = function(){ 
	this.cancelBubble = true;
};

/*--------------------------------------------------------------------- 添加事件删除 ---*/
//跨浏览器删除事件绑定
function removeEvent(obj,type,fn){

	if(typeof obj.removeEventListener != "undefined"){

		obj.removeEventListener(type,fn,false);

	}else{
		for(var i in obj.events[type]){ 
			if(obj.events[type][i] == fn){ 
				delete obj.events[type][i];
			}
		}
	}
}
















