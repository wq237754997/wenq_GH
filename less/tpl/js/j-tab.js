/* 
 * //------------------------------------------------------------------------//
 * @Name: 选项卡插件[可扩展切换轮播图]
 *
 * @Author: wenq
 *
 * @Time: 2014.10.31
 * //------------------------------------------------------------------------//
 */
(function($) {
    $.fn.tab = function(options) {
        // 默认配置
        var defaults = {
            tabBtns: ".tab-btns > .btn", // 选项按钮
            tabUns: ".tab-uns > .tab-un", // 选项主体[切换的主体内容]
            prevBtn: ".btns > .prev-btn", // 按钮[切换上一张]
            nextBtn: ".btns > .next-btn", // 按钮[切换下一张]
            event: "mouseover", // 默认选项按钮的切换事件
            btnCurrentStyle: "z-on", // 当前样式1
            unCurrentStyle: "z-cur" // 当前样式2
        };
        var options = $.extend(defaults, options);
        return this.each(function() { // 对每个元素进行操作

            var that = $(this),
                timer = null,
                num = 0;

            // 选项按钮切换
            that.find(options.tabBtns).each(function(i, n) {
                $(n).bind(options.event, function() {
                    $(this).addClass("z-on").siblings().removeClass("z-on");
                    //that.find(options.tabUns).eq(i).show().siblings().hide(); // display 切换
                    that.find(options.tabUns).eq(i).addClass(options.unCurrentStyle).siblings().removeClass(options.unCurrentStyle); // z-index切换
                    return false;
                });
            });

            that.find(options.tabBtns).eq(0).addClass(options.btnCurrentStyle);
            that.find(options.tabUns).eq(0).addClass(options.unCurrentStyle);

            // 最大数值
            var maxNum = that.find(options.tabUns).size();

            // 切换的核心代码
            function core() {
                that.find(options.tabBtns).eq(num).addClass("z-on").siblings().removeClass("z-on");
                //that.find(options.tabUns).eq(num).show().siblings().hide(); // display 切换
                that.find(options.tabUns).eq(num).addClass(options.unCurrentStyle).siblings().removeClass(options.unCurrentStyle); // z-index切换
            };

            // 自动执行切换[在选项卡上添加样式.j-auto开启自动切换功能]
            if (that.hasClass("j-tab-auto")) {
                // 定时执行
                function Tab() {
                    num++;
                    if (num >= maxNum) {
                        num = 0;
                    }
                    core();
                };

                clearInterval(timer); // 实时清除,避免定时器多次开启

                timer = setInterval(Tab, 5000);

                that.mouseenter(function() {
                    clearInterval(timer);
                });

                that.mouseleave(function() {
                    timer = setInterval(Tab, 5000);
                });
            }

            // 上一张 按钮切换
            that.find(options.prevBtn).bind("click", function() {
                num--;
                if (num < 0) {
                    num = maxNum - 1;
                }
                core();
            });

            // 下一张 按钮切换
            that.find(options.nextBtn).bind("click", function() {
                num++;
                if (num >= maxNum) {
                    num = 0;
                }
                core();
            });
        });
    };
})(jQuery);
