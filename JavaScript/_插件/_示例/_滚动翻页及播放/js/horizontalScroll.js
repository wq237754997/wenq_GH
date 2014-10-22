/*
 * 列表滚动翻页插件
 */
(function() {
	//参数和默认值
	var defaults = {
		box: "",
		autoSize: true, //是否自适应布局
		speed: 500, //每次滚动速度
		loop: false, //是否循环
		position: "h", //滚动方位，h表示水平，v表示垂直。默认水平。
		elItem: "li", //列表选择器
		elNext: null, //上一页选择器
		elPrev: null //下一页选择器
	};
	//获取翻页信息
	function getPages() {
		var pages = [], //获取分页位置
			index = 0, //页码
			distance = 0, //移动距离
			distance_temp = 0, //上一页距离缓存
			itemsSize = this.itemsSize = [], //缓存所有单元的宽度
			box = this.box,
			position = this.position,
			boxSize = this.boxSize = position == "h" ? box.width() : box.height(), //缓存容器宽度
			maxSize = -boxSize,
			itemPage = this.itemPage = [],
			bl = false; //是否是最后一页

		this.elItems.each(function() {
			var w = position == "h" ? $(this).outerWidth(true) : $(this).outerHeight(true);
			itemsSize.push(w); //缓存所有单元的宽度
			maxSize += w;
		});
		this.maxSize = maxSize; //缓存移动极限

		for (var i = 0, len = itemsSize.length; i < len; i++) {
			var d = distance; //缓存
			distance += itemsSize[i];
			if (!bl && (!d || distance - distance_temp > boxSize)) {
				index++;
				if (d < maxSize) {
					distance_temp = d;
					pages.push({
						distance: d
					});
				} else {
					//已经是最后一页
					pages.push({
						distance: maxSize
					});
					bl = true;
				}
			}
			itemPage.push(index); //元素对应页码
		}
		return pages;
	}
	//定义类
	var O = function(options) {
		var box = this.box = $(options.box); //容器
		if (box.length) {
			this.speed = options.speed;
			this.loop = options.loop;
			this.elItem = options.elItem;
			var elPrev = this.elPrev = options.elPrev;
			var elNext = this.elNext = options.elNext;
			this.position = options.position;

			this.render(); //绘制
			//点击事件
			// var self = this;
			// box.delegate(this.elItem, "click", function() {
			// 	//是否需要翻页
			// 	var index=self.elItems.index(this);
			// 	self.page(self.itemPage[index]);
			// });
			elPrev && elPrev.length && elPrev.bind("click", $.proxy(this.prevPage, this)); //禁用按钮
			elNext && elNext.length && elNext.bind("click", $.proxy(this.nextPage, this)); //禁用按钮
			options.autoSize && $(window).bind("resize", $.proxy(this.resize, this)); //绑定resize事件
		}
	};
	//下一页
	O.prototype.nextPage = function() {
		if (this.curPage < this.pages.length) {
			this.page(this.curPage + 1);
		} else if (this.loop) {
			this.page(1);
		}
	};
	//上一页
	O.prototype.prevPage = function() {
		if (this.curPage > 1) {
			this.page(this.curPage - 1);
		} else if (this.loop) {
			this.page(this.pages.length);
		}
	};
	//翻页
	O.prototype.page = function(num, haveTo) {
		var pageNo = this.pages.length;
		//验证传入的页码
		if (num == null || num > pageNo || num < 0) {
			num = 1;
		}
		//重置当前页码
		this.curPage == null && (this.curPage = 1);
		//除非需要强制执行，否者只有当页码和当前页码不相同的时候才翻页
		if (num != this.curPage || haveTo) {
			if (this.position == "h") {
				this.box.children()
					.stop().animate({
							"margin-left": -this.pages[num - 1].distance + "px"
						},
						this.speed,
						$.proxy(function() {
							this.curPage = num; //更新页码
							var elPrev = this.elPrev,
								elNext = this.elNext;
							//禁用与启用
							if (!this.loop) {
								if (elPrev && elPrev.length) {
									num == 1 ? elPrev.addClass("disable") : elPrev.removeClass("disable");
								}
								if (elNext && elNext.length) {
									num == pageNo ? elNext.addClass("disable") : elNext.removeClass("disable");
								}
							} else {
								if (elPrev && elPrev.length) {
									elPrev.removeClass("disable");
								}
								if (elNext && elNext.length) {
									elNext.removeClass("disable");
								}
							}
						}, this)
				);
			} else {
				this.box.children()
					.stop().animate({
							"margin-top": -this.pages[num - 1].distance + "px"
						},
						this.speed,
						$.proxy(function() {
							this.curPage = num; //更新页码
							var elPrev = this.elPrev,
								elNext = this.elNext;
							//禁用与启用
							if (!this.loop) {
								if (elPrev && elPrev.length) {
									num == 1 ? elPrev.addClass("disable") : elPrev.removeClass("disable");
								}
								if (elNext && elNext.length) {
									num == pageNo ? elNext.addClass("disable") : elNext.removeClass("disable");
								}
							} else {
								if (elPrev && elPrev.length) {
									elPrev.removeClass("disable");
								}
								if (elNext && elNext.length) {
									elNext.removeClass("disable");
								}
							}
						}, this)
				);
			}
		}
	}
	//重排
	O.prototype.resize = function() {
		this.pages = getPages.call(this); //获取分页信息
		if (this.pages.length > 1) {
			this.page(this.curPage, true); //强制滚动
		} else {
			var elPrev = this.elPrev,
				elNext = this.elNext;
			if (elPrev && elPrev.length) {
				elPrev.addClass("disable");
			}
			if (elNext && elNext.length) {
				elNext.addClass("disable");
			}
		}
	};
	//重绘
	O.prototype.render = function() {
		this.elItems = this.box.find(this.elItem); //缓存所有单元
		this.resize();
	};
	//清除内容
	O.prototype.clean = function() {
		this.elItems.remove(); //删除所有元素
		this.elItems = null;
		elPrev && elPrev.length && elPrev.removeClass("disable"); //禁用按钮
		elNext && elNext.length && elNext.removeClass("disable"); //禁用按钮
		//重置容器位置
		if (this.position == "h") {
			this.box.children().css("margin-left", 0);
		} else {
			this.box.children().css("margin-top", 0);
		}
		this.curPage = null; //页码清空
	};
	//定义出口
	var S = function(options) {
		return new O($.extend(defaults, options))
	}
	if (typeof define != "undefined" && define.cmd) {
		define(function() {
			var $ = require("jquery");
			return S;
		});
	} else {
		window.giScrollPage = S;
	}
}());
/*
 * 播放插件
 */
(function() {
	//参数和默认值
	var defaults = {
		eventType: "click", //事件类型
		eventFn: null, //触发事件
		loop: false, //是否循环播放
		time: 1000, //播放间隔
		elItem: "li", //列表选择器
		elNext: null, //上一个选择器
		elPrev: null //下一个选择器
	};
	//定义类
	var O = function(options) {
		var box = this.box = $(options.box); //容器
		if (box.length) {
			this.time = options.time;
			this.loop = options.loop;
			this.eventFn = options.eventFn;

			var elItem = this.elItem = options.elItem; //默认的子集选择器
			var elPrev = this.elPrev = options.elPrev;
			var elNext = this.elNext = options.elNext;
			var eventType = this.eventType = options.eventType;

			this.render(); //绘制

			//事件绑定
			if (eventType) {
				var self = this;
				box.delegate(elItem, eventType, function() {
					self.chooseOne($(this));
				});
			}
			//上一个
			if (elPrev && elPrev.length) {
				elPrev.bind("click", $.proxy(this.prevOne, this));
			}
			//下一个
			if (elNext && elNext.length) {
				elNext.bind("click", $.proxy(this.nextOne, this));
			}
		}
	};
	O.prototype.setPlayTimes = function(time) {
		this.time = time;
	};
	//选中一个
	O.prototype.chooseOne = function(el) {
		if (el == null || el.length == 0) {
			el = this.elItems.eq(0);
		}
		this.curEl = el;
		var index = this.elItems.index(el);
		var elNext = this.elNext,
			elPrev = this.elPrev;
		if (!this.loop) {
			if (elNext && elNext.length) {
				if (index >= this.elItems.length - 1) {
					elNext.addClass('disable');
					this.stop();
				} else {
					elNext.removeClass('disable')
				}
			}
			if (elPrev && elPrev.length) {
				if (index <= 0) {
					elPrev.addClass('disable');
					this.stop();
				} else {
					elPrev.removeClass('disable')
				}
			}
		}
		//额外任务
		typeof this.eventFn == "function" && this.eventFn(el);
	};
	//下一个
	O.prototype.nextOne = function() {
		var elItems = this.elItems;
		var curEl = this.curEl;
		curEl = curEl ? curEl.next() : elItems.eq(0);

		if (curEl.length > 0) {
			this.chooseOne(curEl);
		} else if (this.loop) {
			curEl = elItems.eq(0);
			this.chooseOne(curEl);
		}
	};
	//上一个
	O.prototype.prevOne = function() {
		var elItems = this.elItems;
		var curEl = this.curEl;
		var len = elItems.length;
		curEl = curEl ? curEl.prev() : elItems.eq(len - 1);

		if (curEl.length > 0) {
			this.chooseOne(curEl);
		} else if (this.loop) {
			curEl = elItems.eq(len - 1);
			this.chooseOne(curEl);
		}
	};
	//播放
	O.prototype.play = function() {
		this.nextOne();
		this.stop();
		this.timer = setTimeout($.proxy(this.play, this), this.time);
	};
	//停止
	O.prototype.stop = function() {
		this.timer && clearTimeout(this.timer)
	};
	//重绘
	O.prototype.render = function() {
		this.elItems = this.box.find(this.elItem); //缓存所有单元
	};
	//定义出口
	var S = function(options) {
		return new O($.extend(defaults, options))
	}
	if (typeof define != "undefined" && define.cmd) {
		define(function() {
			var $ = require("jquery");
			return S;
		});
	} else {
		window.giListPlay = S;
	}
}());