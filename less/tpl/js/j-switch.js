/* 
 * //------------------------------------------------------------------------//
 * @Name: switch[ 图片切换 ]
 *
 * @Author: wenq
 *
 * @Time: 2014.12.06
 * //------------------------------------------------------------------------//
 */
(function($) {
    $.fn.Switch = function(options) {
        // 默认配置
        var defaults = {
            "cts": ".cts",
            "ct": ".ct",
            "prevBtn": ".prev-btn",
            "nextBtn": ".next-btn",
            "speed": 500
        };
        var options = $.extend(defaults, options);
        return this.each(function() { // 对每个元素进行操作

            var that = $(this),
                num = 0,
                cts = that.find(options.cts),
                ct = cts.find(options.ct), // 切换主体
                offsetX = ct.eq(0).outerWidth(), // 偏移量[第一个切换主体的宽度]
                size = ct.size(); // 切换主体个数

            cts.width(offsetX * size); // 最大宽度

            // 左切换
            that.find(options.prevBtn).click(function() {
                num--;
                if (num < 0) {
                    num = size - 1;
                }
                cts.stop().animate({
                    "left": -(offsetX * num) + "px"
                }, options.speed);
            });

            // 右切换
            that.find(options.nextBtn).click(function() {
                num++
                if (num >= size) {
                    num = 0;
                }
                cts.stop().animate({
                    "left": -(offsetX * num) + "px"
                }, options.speed);
            });
        });
    };
})(jQuery);
