/**
 * @fielName[simple JavaScript Library]
 *
 * @author [wenq]
 *
 * @time [2014.09.10]
 */

/* @$: 前端调用[每次new出一个新对象]
 ------------------------------------------------------------------------------------------------*/
var $ = function(_this) {
    return new Base(_this);
};

/* @Base: 基础库[构造函数]
 ------------------------------------------------------------------------------------------------*/
function Base(_this) {
    // 创建一个数组用于存储获取的节点和节点数组
    this.elements = []; // 私有化
    if(_this != undefined){
        this.elements[0] = _this;
    }
};

/* @get--: 获取节点
 ------------------------------------------------------------------------------------------------*/
// 获取id节点
Base.prototype.getId = function(id) {

    var Id = document.getElementById(id); // 唯一

    this.elements.push(Id);

    return this;
};

// 获取name属性值节点
Base.prototype.getName = function(name) {

    var names = document.getElementsByName(name); // 类数组

    for (var i = 0, Max = names.length; i < Max; i++) {

        this.elements.push(names[i]);

    }

    return this;
};

// 获取tag元素[标签]节点
Base.prototype.getTag = function(tag) {

    var tags = document.getElementsByTagName(tag); // 类数组

    for (var i = 0, Max = tags.length; i < Max; i++) {

        this.elements.push(tags[i]);

    }

    return this;
};

// 获取class元素节点
Base.prototype.getClass = function(className, idName) {

    var node = null;

    if (arguments.length == 2) {

        node = document.getElementById(idName);

    } else {

        node = document;

    }

    var allEles = node.getElementsByTagName('*');

    for (var i = 0, Max = allEles.length; i < Max; i++) {

        if (allEles[i].className == className) {

            this.elements.push(allEles[i]);

        }
    }

    return this;
};

// 获取某一个节点
Base.prototype.getEle = function(num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
};

/* @css: 为Base对象添加名为 css 的方法[设置、获取值]
 ------------------------------------------------------------------------------------------------*/
Base.prototype.css = function(attr, value) {

    for (var i = 0, Max = this.elements.length; i < Max; i++) {

        if (arguments.length == 1) {
            //return this.elements[i].style[attr]; // 获取的为行间样式  
            // 获取计算之后的样式[行间、外部链接]
            if (typeof window.getComputedStyle != 'undefined') { // w3c

                return window.getComputedStyle(this.elements[i], null)[attr];

            } else if (typeof this.elements[i].currentStyle != 'undefined') { // ie7-[包括ie7]

                return this.elements[i].currentStyle[attr];

            }
        }

        this.elements[i].style[attr] = value;

    }

    return this;
};

/* @html: 为Base对象添加名为 html 的方法[设置、获取值]
 ------------------------------------------------------------------------------------------------*/
Base.prototype.html = function(str) {

    for (var i = 0, Max = this.elements.length; i < Max; i++) {

        if (arguments.length == 0) {

            return this.elements[i].innerHTML;

        }

        this.elements[i].innerHTML = str;
    }

    return this;
};

/* @click: 为Base对象添加名为 click 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.click = function(fn) {

    for (var i = 0, Max = this.elements.length; i < Max; i++) {

        this.elements[i].onclick = fn;
    }

    return this;
};

/* @addClass: 为Base对象添加名为 addClass 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.addClass = function(className){

	var str = new RegExp('(\\s|^)' + className + '(\\s|$)');

	for(var i=0,Max=this.elements.length; i<Max; i++){

		if(!this.elements[i].className.match(str)){

			this.elements[i].className += ' ' + className;
		}
	}

	return this;
};

/* @removeClass: 为Base对象添加名为 addClass 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.removeClass = function(className){
	var str = new RegExp('(\\s|^)' + className + '(\\s|$)');

	for(var i=0,Max=this.elements.length; i<Max; i++){

		if(this.elements[i].className.match(str)){

			this.elements[i].className = this.elements[i].className.replace(str,' ');
		}
	}

	return this;
};

/* @hide: 为Base对象添加名为 hide 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.hide = function(){

	for(var i=0,Max=this.elements.length;i<Max;i++){

		this.elements[i].style.display = 'none';
	}

	return this;
};

/* @show: 为Base对象添加名为 show 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.show = function(){

	for(var i=0,Max=this.elements.length; i<Max; i++){

		this.elements[i].style.display = 'block';
	}

	return this;
};

/* @hover: 为Base对象添加名为 hover 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.hover = function(over,out){

    for(var i=0,Max=this.elements.length;i<Max;i++){

        this.elements[i].onmouseover = over;

        this.elements[i].onmouseout = out;
    }

    return this;
};