/**
 * main
 * seajs的主入口
 * @author ken
 */
define(function(require) {
	var $ = require('jquery'),
		spine = require('spine');

	require('jquery.horizontalscroll')($);
	$(function() {
		var img=$("#img");
		$("#marquee").horizontalScroll({
			sizeAuto:true,
			elNext: $(".btn_next"),//下一个
			elPrev: $(".btn_prev"),//上一个
			elRight: $(".btn_right"),//上一页
			elLeft: $(".btn_left"),//下一页
			elPlay:$(".btn_play"),//播放
			elStop:$(".btn_stop"),//停止
			isLoop:true,//是否循环播放
			eventType:"click",//触发方式
			//触发事件
			eventFn:function(el){
				el.addClass('on').siblings().removeClass("on");
				img.attr("src",el.attr("data-src"));
			}
		});
	});
});