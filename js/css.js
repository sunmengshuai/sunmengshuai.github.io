/**
 * Created by Administrator on 2016/6/30.
 */
function tuDouble(n){
    return n<10?'0'+n:''+n;
}
window.onload=function(){
    ;(function(){
        var oUl=document.getElementById('ul1');
        var aImg=oUl.getElementsByTagName('img');
        function clock(){
            var oDate=new Date();
            var str=tuDouble(oDate.getHours())+tuDouble(oDate.getMinutes())
                +tuDouble(oDate.getSeconds());
            for(var i=0;i<aImg.length;i++){
                move(aImg[i],{top:-35*str.charAt(i)},{easing:'linear',duration:500})
            }
        }
        clock();
        setInterval(clock,1000);
    })();

    ;(function(){
        var oTopB=document.getElementById('top_bottom1');
        var timer=null;
        window.onscroll=function(){
            var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop>200){
                oTopB.style.display='block';
            }
            if(scrollTop<200){
                oTopB.style.display='none';
            }
        };
        oTopB.onclick=function(){
            var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
            var start=scrollTop;
            var end=0-start;
            var count=Math.floor(800/30);
            var n=0;
            clearInterval(timer);
            timer=setInterval(function(){
                n++;
                var a=n/count;
                var num=start+end*a;
                document.documentElement.scrollTop=document.body.scrollTop=num;
                if(n==count){
                    clearInterval(timer);
                }
            }, 30);
        }
    })();

    ;(function(){
    var oUl=document.getElementById('ul2');
    var aLi=oUl.children;
    var oOpa=aLi[aLi.length-1];
    for(var i=0;i<aLi.length-1;i++){
        aLi[i].onmouseover=function(){
            move2(oOpa,this.offsetLeft);
        }
        aLi[i].onmouseout=function(){
            move2(oOpa,this.offsetLeft);
        }
    }
        //css图片抖动
    var oBox2=document.getElementById('bd_box2');//css图片抖动
    var aImg=oBox2.getElementsByTagName('img');//css图片抖动
    for(var i=0;i<aImg.length;i++){
        aImg[i].onmouseover=function(){
            move2(this,40);
        }
        aImg[i].onmouseout=function(){
            move2(this,0);
        }
    }
})();
}


//jquery
$(function(){
    $('.bd_con p').mouseover(function(){
        $(this).css({'width':'900px','height':'300px','marginLeft':'-50px',
            'marginTop':'-75px','fontSize':'25px','lineHeight':'50px','fontFamily':'楷体'});
    });
});