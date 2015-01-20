/**
 * ------------------------------------------
 * 跑马灯插件
 * @update  2014-6-05
 * @author zhangyp
 * ------------------------------------------
 */
//define(function(require, exports, module) {
//var $ = require("jquery");
(function() {

    /**
     * @param {object} options 传递新设置
     */
    $.fn.marquee = function(options) {
        //默认配置
        var defaults = {
            speed: "2000", //每隔多久触发一次事件
            liHeight: "30"
        };

        var options = $.extend(defaults, options),
            timer,
            container = $(this),
            ul = container.find("ul");

        container.hover(
            function() {
                clearInterval(timer);
            },
            function() {
                if (ul.find("li").length > 1) {
                    timer = setInterval(function() {
                        var length = ul.find("li").length - 1,
                            liHeight = options.liHeight;

                        $("li:first", ul).animate({ //重设li的高度
                            "margin-top": -liHeight
                        }, 'slow', function() {
                            $(this).css("margin-top", 0).appendTo(ul);
                        })
                    }, options.speed);
                }
            }
        ).trigger("mouseleave");
    }
})();
//})
