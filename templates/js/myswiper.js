$.extend({
    add: function (a, b) {
        return a + b;
    },
    show: function (el) {
        // img = $(el).find("img");
        // mySwiper.slideNext(speed, runCallbacks);
        // mySwiper.slideNext();
        // window.open($(el).attr('src'), '新开googleWin', "fullscreen=1")
        // console.log($(el).attr('src'));
    },
    counter: function (el) {
        // console.log($(el).attr("id"));
    },
    change: function (tuku, pic, todo) {
        // console.log("Change");
        $.post("http://9kto.fun/change", {"tuku": tuku, "pic": pic, "todo": todo}, function (data) {
            // console.log(data);
        });
    }

});
$(function ($) {
    // tukulist = [];
    path = "http://9kto.fun/mzigu/";
    init = function () {
        addSlide();
        // $.get(path, function (data) {
        //     // console.log(data.split(','));
        //     // html = $.parseHTML(data);
        //     // list = $(html).children("a");
        //     $.each(data.split(','), function (i, el) {
        //         console.log(el);
        //         // tukulist[i] = $(el).attr("href");
        //         url= "http://9kto.fun/get/"+el;
        //         mySwiper.appendSlide('<div class="swiper-slide" >' +
        //                 '<div id="' + el + '" class="swiper-zoom-container">' +
        //                 '<img width="100%" data-src="' + url + '" class="swiper-lazy">' +
        //                 '<div class="swiper-lazy-preloader"></div></div></div>');
        //     });
        // });
    };
    addSlide = function () {
        $.get(path, function (data) {
            // console.log(data.split(','));
            // html = $.parseHTML(data);
            // list = $(html).children("a");
            $.each(data.split(','), function (i, el) {
                // console.log(el);
                if (el) {
                    url = "http://9kto.fun/get/" + el;
                    mySwiper.appendSlide('<div class="swiper-slide" >' +
                        '<div id="' + el + '" class="swiper-zoom-container">' +
                        '<img width="100%" data-src="' + url + '" class="swiper-lazy">' +
                        '<div class="swiper-lazy-preloader"></div></div></div>');
                }
                // tukulist[i] = $(el).attr("href");

            });
            // addSlide();
        });
    };
    init();
});

var mySwiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    slidesPerView: 2,
    centeredSlides: true,
    autoplay: true,
    disableOnInteraction: false,
    zoom: {
        toggle: false,
    },

    // preventLinksPropagation: true,
    // pagination: {
    //     el: '.swiper-pagination',
    // },
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 2,
        loadOnTransitionStart: true,
    },
    // observer:true,
    on: {
        reachEnd: function () {
            // console.log(this.slides.length);
            // console.log(mySwiper.realIndex);
            // while (this.slides.length > 7) {
            //   mySwiper.removeSlide([3]);
            // }
            // addSlide();
        },
        lazyImageLoad: function (slideEl, imageEl) {
            // console.log(slideEl);//哪个slide里面的图片在加载，返回slide的DOM
            //console.log(this.slides.length);
            // console.log($(slideEl).index());
            // console.log(mySwiper.realIndex);
            //if(this.slides.length >70) {
            //    mySwiper.removeSlide([3]);
            //}

            if ($(slideEl).index() == this.slides.length - 2) {
                //    while ($(slideEL).index() >10) {
                //        mySwiper.removeSlide([3]);
                //    }
                addSlide();
                // console.log($(slideEl).index());//哪个slide里面(JQ)的图片在加载，返回slide的index
            }
            // console.log(imageEl);//哪个图片在加载，返回图片的DOM
        },
        tap: function (event) {
            // alert('你碰了Swiper', event);
            // el = event.path[0];
            // window.open($(el).find("img").attr("src"), '新开googleWin', "fullscreen=1");
            // alert($(el).find("img"));
            // console.log(this.slides.length);
            // console.log(mySwiper.realIndex + 1);

            // while (this.slides.length > mySwiper.realIndex + 1) {
            //     mySwiper.removeSlide([mySwiper.realIndex + 1]);
            // console.log(this.slides.length);
            // console.log(mySwiper.realIndex);
            // }
        },
        doubleTap: function (event) {
            mySwiper.slideNext();
            mySwiper.autoplay.start();
        },
        touchStart: function (event) {
            // y = event.y;
        },
        touchEnd: function (event) {
            Y = mySwiper.touches.currentY - mySwiper.touches.startY;
            // console.log(Y);
            if (Y > 150) {
                img = mySwiper.$el.find("img")[mySwiper.realIndex];
                src = $(img).attr("src");
                lastpath = src.lastIndexOf("/");
                tuku = src.substring(src.lastIndexOf("tuku_"), lastpath);
                pic = src.substring(lastpath + 1,);
                // console.log(src.lastIndexOf("tuku_") + 1);
                // console.log(this.slides.length - mySwiper.realIndex);

                while (this.slides.length > mySwiper.realIndex + 1) {
                    // console.log(mySwiper.realIndex);
                    while (mySwiper.realIndex >= 7) {
                        mySwiper.removeSlide([3]);
                    }
                    mySwiper.removeSlide([mySwiper.realIndex + 1]);
                }
                // addSlide();
                $.change(tuku, pic, "l");
                addSlide();

            } else if (Y < -150) {//上滑
                img = mySwiper.$el.find("img")[mySwiper.realIndex];
                src = $(img).attr("src");
                lastpath = src.lastIndexOf("/");
                tuku = src.substring(src.lastIndexOf("tuku_"), lastpath);
                pic = src.substring(lastpath + 1,);
                // console.log(tuku);
                // console.log(pic);
                // console.log('上滑' + Y);
                $.change(tuku, pic, "h");
            }
            //单击
            // else {
            // alert('单击');
            // }
        },
    },
});
