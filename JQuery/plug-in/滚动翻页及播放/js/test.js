var gBd = $(".g-bd");
var gSd = $(".g-aside");
var play;
var move;
//播放
(function() {
	var img = $("img");
	var input = $("input");

	//播放
	play = giListPlay({
		box: ".g-aside",
		time: input.val() * 1000,
		//loop: true,
		elNext: $(".btn-next"),
		elPrev: $(".btn-prev"),
		eventFn: function(el) {
			el.addClass('on').siblings().removeClass('on');
			img.attr("src", el.attr("data-src"));
		}
	});
	//滚动
	move = giScrollPage({
		box: ".g-aside .list",
		//loop: true,
		position: "v", 
		elNext: $(".btn-right"), 
		elPrev: $(".btn-left")
	});
	$(".btn-play").click(function() {
		var text = $(this).text();
		if (text == "播放") {
			$(this).text("暂停")
			play.play();
		} else {
			$(this).text("播放")
			play.stop();
		}
	});
	input.blur(function() {
		var val = $(this).val();
		var reg = /^\d+\.?\d+$|^\d+$/;
		if (reg.test(val)) {
			play.setPlayTimes($(this).val() * 1000);
		} else {
			$(this).val(1);
			play.setPlayTimes(1000);
		}
	});
}());
//页面布局
(function() {
	//显示隐藏侧栏
	$(".ico-list").click(function() {
		$("body").toggleClass("hide-aside");
	});
	//内容高度
	var hdHeight = $(".g-hd").outerHeight(true);
	var list=gSd.find(".list");
	function reszie() {
		var wh = $(window).height();
		var h = $(window).height() - hdHeight;
		gBd.css("line-height", wh + "px")
		list.height(h-32);
	}
	$(window).bind("resize", reszie);
	reszie();
}());
//加载数据
(function() {
	//测试数据
	var data = [{
		url: "http://g.hiphotos.baidu.com/image/pic/item/1c950a7b02087bf4f477416bf0d3572c10dfcf9d.jpg",
		name: "1"
	}, {
		url: "http://img1.imgtn.bdimg.com/it/u=3176667768,1161431363&fm=23&gp=0.jpg",
		name: "2"
	}, {
		url: "http://img0.imgtn.bdimg.com/it/u=3537389673,85761063&fm=23&gp=0.jpg",
		name: "3"
	}, {
		url: "http://img5.imgtn.bdimg.com/it/u=3957265294,278962585&fm=23&gp=0.jpg",
		name: "4"
	}];
	//每5秒加载一遍数据
	var list = $("#list");
	var x = 0;

	function loadData() {
		var html = "";
		$.each(data, function(i, n) {
			html += '<li data-src="' + n.url + '">' + (x+n.name) + '</li>'
		});
		list.append(html);
		x++;
		if (x <= 10) {
			play && play.render();
			move && move.render();
			x == 1 && gSd.find("li:eq(0)").click(); //第一次加载显示第一个
			setTimeout(loadData, 3 * 1000);
		}
	}
	loadData();
}());