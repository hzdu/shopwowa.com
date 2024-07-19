var popWin = {
    scrolling: "auto",
    int: function () {
        this.mouseClose(), this.closeMask();
    },
    showWin: function (a, b, c, d) {
        var e = b - 52,
            f = a / 2,
            g = b / 2,
            h = "";
        (h +=
            '<div id="mask" style="width:100%; height:100%; position:fixed; top:0; left:0; z-inde:1999;background:#cccccc; filter:alpha(opacity=10); -moz-opacity:0.1; -khtml-opacity: 0.1; opacity:0.1;">sc.chinaz.com</div>'),
            (h +=
                '<div id="maskTop" style="width: ' +
                a +
                "px; height: " +
                b +
                "px; border: #d1d1d1 5px solid; background: #ffffff; color: #333; position: fixed; top: 50%; left: 50%; margin-left: -" +
                f +
                "px; margin-top: -" +
                g +
                'px; z-index: 2999; border-radius:5px; ">'),
            (h +=
                '<div id="maskTitle" style="height:35px; line-height: 35px; font-size: 14px; font-weight:bold; color: #797979; padding-left: 10px; background: url(./shopwowa.com/plugins/foyar-for-woo/kefu/assets/images/hbbg.webp); border-bottom: 1px solid #d1d1d1; position: relative;">'),
            (h += "" + c),
            (h +=
                '<div id="popWinClose" style="width: 15px; height:15px; cursor: pointer; position: absolute; top:10px; right: 9px; background: url(./shopwowa.com/plugins/foyar-for-woo/kefu/assets/images/closehdtipper.webp)"></div>'),
            (h += "</div>"),
            (h +=
                '<iframe width="' +
                a +
                '" height="' +
                e +
                '" frameborder="0" scrolling="' +
                this.scrolling +
                '" src="' +
                d +
                '"></iframe>'),
            jQuery("body").append(h),
            this.int();
    },
    mouseClose: function () {
        jQuery("#popWinClose").on("mouseenter", function () {
            jQuery(this).css(
                "background-image",
                "url(./shopwowa.com/plugins/foyar-for-woo/kefu/assets/images/closehdtipper.webp)"
            );
        }),
            jQuery("#popWinClose").on("mouseleave", function () {
                jQuery(this).css(
                    "background-image",
                    "url(./shopwowa.com/plugins/foyar-for-woo/kefu/assets/images/closehdtipper.webp)"
                );
            });
    },
    closeMask: function () {
        jQuery("#popWinClose").on("click", function () {
            jQuery("#mask,#maskTop").fadeOut(function () {
                jQuery(this).remove();
            });
        });
    },
};

function b() {
    (h = jQuery(window).height()),
        (t = jQuery(document).scrollTop()),
        t > h ? jQuery("#moquu_top").show() : jQuery("#moquu_top").hide();
}
jQuery(document).ready(function () {
    b(),
        jQuery("#moquu_top").click(function () {
            jQuery(document).scrollTop(0);
        });
}),
    jQuery(window).scroll(function () {
        b();
    });
