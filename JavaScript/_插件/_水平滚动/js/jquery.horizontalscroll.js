/*
 * horizontalScroll - 基于jquery水平滚动插件
 */
define(function(require) {
	return function($) {
		$.fn.extend({
			horizontalScroll: function(options) {
				//参数和默认值
				var defaults = {
						sizeAuto: false, //是否自适应宽度
						speedMove: 500, //每次滚动速度
						eventType: null, //事件类型
						eventFn: null, //触发事件
						isLoop: false, //是否循环播放
						time: 1000, //播放间隔
						itemSelector: "li",
						elLeft: null,
						elRight: null,
						elNext: null,
						elPrev: null,
						elPlay: null,
						elStop: null
					},
					options = $.extend(defaults, options);
				var eventFn = options.eventFn,
					loop = options.loop;
				//获取翻页信息
				function getPages() {
					var pages = [], //获取分页位置
						index = 0, //页码
						distance = 0, //移动距离
						distance_temp = 0, //上一页距离缓存
						itemsWidth = this.itemsWidth,
						maxWidth = this.maxWidth,
						boxWidth = this.boxWidth,
						itemPage = this.itemPage = [],
						bl = false; //是否是最后一页
					for (var i = 0, len = itemsWidth.length; i < len; i++) {
						var d = distance; //缓存
						distance += itemsWidth[i];
						if (!bl && (!d || distance - distance_temp > boxWidth)) {
							index++;
							if (d < maxWidth) {
								distance_temp = d;
								pages.push({
									distance: d
								});
							} else {
								//已经是最后一页
								pages.push({
									distance: maxWidth
								});
								bl = true;
							}
						}
						itemPage.push(index); //元素对应页码
					}
					return pages;
				};
				//上一页
				function prevPage() {
					if (this.curPage > 1 && this.curPage <= this.pages.length) {
						this.curPage--;
						move.call(this);
					} else if (this.loop) {
						this.curPage = this.pages.length;
						move.call(this);
					}
				};
				//下一页
				function nextPage() {
					if (this.curPage > 0 && this.curPage < this.pages.length) {
						this.curPage++;
						move.call(this);
					} else if (this.loop) {
						this.curPage = 1;
						move.call(this);
					}
				};
				//翻页
				function move() {
					this.box.children()
						.stop().animate({
								"margin-left": -this.pages[this.curPage - 1].distance + "px"
							},
							options.speedMove,
							$.proxy(function() {
								//禁用与启用
								if (!this.loop) {
									if (this.curPage <= 1) {
										options.elLeft.addClass("disable");
									} else {
										options.elLeft.removeClass("disable");
									}
									if (this.curPage >= this.pages.length) {
										options.elRight.addClass("disable");
									} else {
										options.elRight.removeClass("disable");
									}
								} else {
									if (this.pages.length > 1) {
										options.elLeft.removeClass("disable");
										options.elRight.removeClass("disable");
									}
								}
							}, this)
					);
				}
				//某一个
				function chooseOne(el) {
					if (el && el.length > 0) {
						this.curEl = el;
						//是否需要翻页
						var index = this.items.index(el);
						var curPage = this.itemPage[index];
						if (this.curPage != curPage) {
							this.curPage = curPage;
							move.call(this);
						}
						//状态
						if (!this.loop) {
							if (index >= this.items.length - 1) {
								options.elNext.addClass('disable');
								this.timer && clearTimeout(this.timer); //停止播放
							} else {
								options.elNext.removeClass('disable')
							}
							if (index <= 0) {
								options.elPrev.addClass('disable');
								this.timer && clearTimeout(this.timer); //停止播放
							} else {
								options.elPrev.removeClass('disable')
							}
						}
						//额外任务
						typeof eventFn == "function" && eventFn(el);
					}
				}
				//下一个
				function nextOne() {
					var items = this.items;
					var curEl = this.curEl;
					curEl = curEl ? curEl.next() : items.eq(0);
					if (curEl.length > 0) {
						chooseOne.call(this, curEl);
					} else if (this.loop) {
						curEl = items.eq(0);
						chooseOne.call(this, curEl);
					}
				}
				//上一个
				function prevOne() {
					var items = this.items;
					var curEl = this.curEl;
					curEl = curEl ? curEl.prev() : items.eq(items.length - 1);

					if (curEl.length > 0) {
						chooseOne.call(this, curEl);
					} else if (this.loop) {
						curEl = items.eq(items.length - 1);
						chooseOne.call(this, curEl);
					}
				}
				//播放
				function play() {
					var self = this;
					nextOne.call(this);
					this.timer && clearTimeout(this.timer);
					this.timer = setTimeout(function() {
						play.call(self)
					}, options.time);
				}
				//停止
				function stop() {
					this.timer && clearTimeout(this.timer)
				}
				//重置
				function resize() {
					this.maxWidth += this.boxWidth;
					this.boxWidth = this.box.width();
					this.maxWidth -= this.boxWidth;
					this.pages = getPages.call(this); //获取分页信息
					this.pages.length > 1 && move.call(this);
				}
				return this.each(function() {
					var self = this,
						box = $(this),
						items = box.children().children();
					this.box = box; //容器
					this.items = items; //所有单元
					this.itemsWidth = []; //缓存所有单元的宽度
					this.boxWidth = box.width(); //可视宽度 容器最好不要使用padding
					this.maxWidth = -this.boxWidth; //可移动极限

					this.loop = options.isLoop;

					items.each(function() {
						var w = $(this).outerWidth(true);
						self.itemsWidth.push(w); //缓存所有单元的宽度
						self.maxWidth += w; //修正可移动极限
					});

					this.pages = getPages.call(this); //获取分页信息
					this.curPage = 1; //当前分页

					//绑定事件
					var elLeft = options.elLeft,
						elRight = options.elRight,
						elPrev = options.elPrev,
						elNext = options.elNext,
						elPlay = options.elPlay,
						elStop = options.elStop,
						eventFn = options.eventFn,
						eventType = options.eventType,
						itemSelector = options.itemSelector;
					//事件绑定
					if (eventType) {
						if (eventType == "click") {
							box.delegate(itemSelector, eventType, function(e) {
								chooseOne.call(self, $(e.target));
							});
						} else {
							box.delegate(itemSelector, eventType, function(e) {
								typeof eventFn == "function" && eventFn($(e.target));
							});
						}
					}
					//上一页
					if (elLeft && elLeft.length) {
						elLeft.bind("click", $.proxy(prevPage, this))
					}
					//下一页
					if (elRight && elRight.length) {
						elRight.bind("click", $.proxy(nextPage, this))
					}
					//上一个
					if (elPrev && elPrev.length) {
						elPrev.bind("click", $.proxy(prevOne, this))
					}
					//下一个
					if (elNext && elNext.length) {
						elNext.bind("click", $.proxy(nextOne, this))
					}
					//播放
					if (elPlay && elPlay.length) {
						elPlay.bind("click", $.proxy(play, this))
					}
					//停止
					if (elStop && elStop.length) {
						elStop.bind("click", $.proxy(stop, this))
					}

					//状态
					if (this.loop) {
						elPrev.removeClass('disable');
						elNext.removeClass('disable');
						if (this.pages.length > 1) {
							elLeft.removeClass('disable');
							elRight.removeClass('disable');
						} else {
							elLeft.addClass('disable');
							elRight.addClass('disable');
						}
					} else {
						elPrev.addClass('disable');
						elNext.removeClass('disable');
						elLeft.addClass('disable');
						if (this.pages.length > 1) {
							elRight.removeClass('disable');
						}else{
							elRight.addClass('disable');
						}
					}
					options.sizeAuto && $(window).bind("resize", $.proxy(resize, this)); //绑定resize事件
				});
			}
		});
	}
});