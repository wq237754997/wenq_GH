/**
 * @fielName[simple JavaScript Library]
 *
 * @author [wenq]
 *
 * @time [2014.09.10]
 */

/* @to do deleted

// 函数式封装
function getId(id) {
	return document.getElementById(id);
};

// 对象式封装
Base = {
	getId: function(id) {
		return document.getElementById(id);
	},
	getName: function(name) {
		return document.getElementsByName(name);
	},
	getTag: function(tag) {
		return document.getElementsByTagName(tag);
	}
};

*/

/* @$: 前端调用[每次new出一个新对象]
 ------------------------------------------------------------------------------------------------*/
var $ = function() {
	return new Base;
};

/* @Base: 基础库[构造函数]
 ------------------------------------------------------------------------------------------------*/
function Base() {

	// 创建一个数组用于存储获取的节点和节点数组
	this.elements = [];

	// 获取id节点
	this.getId = function(id) {
		var Id = document.getElementById(id);
		this.elements.push(Id);
		return this;
	};

	// 获取name属性值节点
	this.getName = function(name) {
		var names = document.getElementsByName(name);
		for (var i = 0, Max = names.length; i < Max; i++) {
			this.elements.push(names[i]);
		}
		return this;
	};

	// 获取tag元素[标签]节点
	this.getTag = function(tag) {
		var tags = document.getElementsByTagName(tag);
		for (var i = 0, Max = tags.length; i < Max; i++) {
			this.elements.push(tags[i]);
		}
		return this;
	};

};

/* @css: 为Base对象添加名为 css 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.css = function(attr, value) {
	for (var i = 0, Max = this.elements.length; i < Max; i++) {
		this.elements[i].style[attr] = value;
	}
	return this;
};

/* @html: 为Base对象添加名为 html 的方法
 ------------------------------------------------------------------------------------------------*/
Base.prototype.html = function(str) {
	for (var i = 0, Max = this.elements.length; i < Max; i++) {
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