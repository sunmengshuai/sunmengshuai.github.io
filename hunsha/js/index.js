  $(function() {
        $('.left-top').hover(function() {
            $(this).children('div').stop().animate({top:0}, 500);
        }, function() {
             $(this).children('div').stop().animate({top:352}, 500);
        });
        $('.left-bottom').hover(function() {
            $(this).children('div').stop().animate({top:0}, 500);
        }, function() {
             $(this).children('div').stop().animate({top:352}, 500);
        });
         $('.photo-center').hover(function() {
            $(this).children('div').stop().animate({top:0}, 500);
        }, function() {
             $(this).children('div').stop().animate({top:730}, 500);
        });
         $('.right-top').hover(function() {
            $(this).children('div').stop().animate({top:0}, 500);
        }, function() {
             $(this).children('div').stop().animate({top:352}, 500);
        });
        $('.right-bottom').hover(function() {
            $(this).children('div').stop().animate({top:0}, 500);
        }, function() {
             $(this).children('div').stop().animate({top:352}, 500);
        });

        $('.genpai li img').hover(function() {
             $(this).parent('li').siblings('li').children('img').stop().fadeTo(500,0.3);
        }, function() {
             $('.genpai li img').stop().fadeTo(500,1);
        });
        var myIndex = 1;
        $('.header ol li').click(function(event) {
            if(!$('.header ol li').is(':animated')){
                myIndex++;
                $(this).addClass('current').siblings('li').removeClass('current');
                var index = $(this).index();
                if(num>index){
                    $('.banner ul li').eq(index).css({left:1410,zIndex:myIndex}).stop().animate({left:0}, 500);
                    $('.banner ul li').eq(index-1).css({left:0,zIndex:myIndex}).stop().animate({left:-1410}, 500);
                }else if(num<index){
                    $('.banner ul li').eq(index).css({left:-1410,zIndex:myIndex}).stop().animate({left:0}, 500);
                    if(index+1<=2){
                        $('.banner ul li').eq(index+1).css({left:0,zIndex:myIndex}).stop().animate({left:1410}, 500);
                    }else{
                        $('.banner ul li').eq(0).css({left:0,zIndex:myIndex}).stop().animate({left:1410}, 500);
                    }
                }
                
                num = index;
            }
        });
        var timer = null;
        var num = 0;
        function autoPlay(){
            if (!$('.banner ul li').is(':animated')) {
                myIndex++;
                num++;
                if(num>2){num=0;}
                $('.header ol li').eq(num).addClass('current').siblings('li').removeClass('current');
                $('.banner ul li').eq(num).css({left:1410,zIndex:myIndex}).stop().animate({left:0}, 500);
                $('.banner ul li').eq(num-1).css({left:0,zIndex:myIndex}).stop().animate({left:-1410}, 500);
            };
        }
        function prevPlay(){
            if (!$('.banner ul li').is(':animated')) {
                myIndex++;
                num--;
                if(num<0){num=2;}
                $('.header ol li').eq(num).addClass('current').siblings('li').removeClass('current');
                $('.banner ul li').eq(num).css({left:-1410,zIndex:myIndex}).stop().animate({left:0}, 500);
               if(num+1<=2){
                        $('.banner ul li').eq(num+1).css({left:0,zIndex:myIndex}).stop().animate({left:1410}, 500);
                    }else{
                        $('.banner ul li').eq(0).css({left:0,zIndex:myIndex}).stop().animate({left:1410}, 500);
                    }
            };
        }
        timer = setInterval(autoPlay, 3000);
        $('.banner').hover(function() {
            clearInterval(timer);
        }, function() {
            clearInterval(timer);
            timer = setInterval(autoPlay, 3000);
        });

        $('.video-left div').hover(function() {
            var index = $(this).index();
            $('.video-left span').eq(index).stop().animate({bottom:0}, 500);
        }, function() {
            $('.video-left span').stop().animate({bottom:-60}, 500);
        });

         $('.video-center div').hover(function() {
            var index = $(this).index();
            $('.video-center span').eq(index).stop().animate({bottom:0}, 500);
        }, function() {
            $('.video-center span').stop().animate({bottom:-60}, 500);
        });

          $('.video-right div').hover(function() {
            var index = $(this).index();
            $('.video-right span').eq(index).stop().animate({bottom:0}, 500);
        }, function() {
            $('.video-right span').stop().animate({bottom:-60}, 500);
        });

        $('.nav-in>li').hover(function() {
            $(this).children('ul').stop().slideToggle(500);
        });
       
    });