/**
 * Created by Administrator on 2016/7/5.
 */
function tuDouble(n){
    return n<10?'0'+n:''+n;
}
function rnd(n, m){
    return parseInt(Math.random()*(m-n))+n;
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
    })();
    //钟表
    ;(function(){
        var oBox=document.querySelector('#box');
        var oH=document.querySelector('#box .hours');
        var oM=document.querySelector('#box .min');
        var oS=document.querySelector('#box .sec');

        function clock(){
            var oDate=new Date();
            var h=oDate.getHours();
            var m=oDate.getMinutes();
            var s=oDate.getSeconds();
            var ms=oDate.getMilliseconds();

            oH.style.transform='rotate('+(h%12*30+m/60*30)+'deg)';
            oM.style.transform='rotate('+(m*6+s/60*6)+'deg)';
            oS.style.transform='rotate('+(s*6+ms/1000*6)+'deg)';
        }
        clock();
        setInterval(clock, 30);
    })();
    //钟表
    //    3d翻转js
    ;(function(){
        var oBox=document.querySelector('#box_pht');
        var R=4;
        var C=7;
        for(var r=0; r<R; r++){
            for(var c=0; c<C; c++){
                var oSpan=document.createElement('span');
                oSpan.style.width=oBox.offsetWidth/C+'px';
                oSpan.style.height=oBox.offsetHeight/R+'px';
                oBox.appendChild(oSpan);
                oSpan.style.left=oSpan.offsetWidth*c+'px';
                oSpan.style.top=oSpan.offsetHeight*r+'px';
                oSpan.innerHTML='<em class="front"></em><em class="back"></em>'
                oSpan.children[0].style.backgroundPosition='-'+oSpan.offsetWidth*c+'px -'+oSpan.offsetHeight*r+'px';
                oSpan.children[1].style.backgroundPosition='-'+oSpan.offsetWidth*c+'px -'+oSpan.offsetHeight*r+'px';

                oSpan.r=r;
                oSpan.c=c;
            }
        }
        var aSpan=oBox.children;
        var iNow=0;
        var bFlag=false;
        oBox.onclick=function(){
            if(bFlag)return;
            bFlag=true;
            iNow++;
            // 翻面
            for(var i=0; i<aSpan.length; i++){
                aSpan[i].style.transition='1s all ease '+(aSpan[i].r+aSpan[i].c)*200+'ms';
                aSpan[i].style.transform='perspective(800px) rotateY(-180deg)';
            }
            aSpan[aSpan.length-1].addEventListener('transitionend', function(){
                // 瞬间把所有span翻过来
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].style.transition='none';
                    aSpan[i].style.transform='perspective(800px) rotateY(0deg)';
                    // 换图
                    aSpan[i].children[0].style.backgroundImage='url(img/beijingtu/'+iNow%3+'.jpg)';
                    aSpan[i].children[1].style.backgroundImage='url(img/beijingtu/'+(iNow+1)%3+'.jpg)';
                }
                bFlag=false;
            }, false);
        };
    })();
    //    3d翻转js

    ;(function(){
        var oUl=document.querySelector('#ul');

        var N=11;
        for(var i=0; i<N; i++){
            var oLi=document.createElement('li');
            oLi.style.backgroundImage='url(img/img2/'+(i+1)+'.jpg)';
            oUl.appendChild(oLi);
            oLi.style.transition='1s all ease '+200*(N-i)+'ms';
            (function(oLi, i){
                setTimeout(function(){
                    oLi.style.transform='perspective(1200px)  rotateY('+360/11*i+'deg) translateZ(340px)'
                }, 0)
            })(oLi, i);
        }

        var aLi=oUl.children;
        var y=0;
        var x=-15;
        var iSpeedX=0;
        var iSpeedY=0;
        var lastX=0;
        var lastY=0;
        var timer;
        var bFlag=false;
        // 关灯
        aLi[0].addEventListener('transitionend', function(){
            turn(-x, y);
            bFlag=true;
        }, false);
        document.onmousedown=function(ev){
            if(bFlag==false)return;
            clearInterval(timer);
            var oEvent=ev || event;
            var disX=oEvent.clientX-y;
            var disY=oEvent.clientY-x;
            for(var i=0; i<aLi.length; i++){
                aLi[i].style.transition='none';
            }
            document.onmousemove=function(ev){
                var oEvent=ev || event;

                x=oEvent.clientY-disY;
                y=oEvent.clientX-disX;
                turn(x/3, y/3);
                iSpeedX=oEvent.clientX-lastX;
                iSpeedY=oEvent.clientY-lastY;

                lastX=oEvent.clientX;
                lastY=oEvent.clientY;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                timer=setInterval(function(){
                    y+=iSpeedX;
                    x+=iSpeedY;

                    iSpeedX*=0.95;
                    iSpeedY*=0.95;

                    turn(x/3, y/3);
                }, 30);
            };
            return false;
        };


        function turn(x, y){
            for(var i=0; i<aLi.length; i++){
                aLi[i].style.transform='perspective(1200px) rotateY('+(360/11*i+y)+'deg) translateZ(340px)';
                oUl.style.transform='perspective(1200px) rotateY(0deg) rotateX('+-x+'deg)';

                // 角度
                var scale=Math.abs(Math.abs((360/11*i+y)%360)-180)/180;
                scale<0.3 && (scale=0.3);
                aLi[i].style.opacity=scale;
            }
        }
    })();

//    爆炸效果
    ;(function(){
        var oBox=document.querySelector('#box_blast');

        var R=4;
        var C=7;
        for(var r=0; r<R; r++){
            for(var c=0; c<C; c++){
                var oSpan=document.createElement('span');
                oSpan.style.width=oBox.offsetWidth/C+'px';
                oSpan.style.height=oBox.offsetHeight/R+'px';

                oBox.appendChild(oSpan);
                oSpan.style.left=oSpan.offsetWidth*c+'px';
                oSpan.style.top=oSpan.offsetHeight*r+'px';
                oSpan.style.backgroundPosition='-'+oSpan.offsetWidth*c+'px -'+oSpan.offsetHeight*r+'px';
            }
        }
        var aSpan=oBox.children;
        var iNow=0;
        var bFlag=false;
        oBox.onclick=function(){
            if(bFlag)return;
            bFlag=true;
            iNow++;
            for(var i=0; i<aSpan.length; i++){
                aSpan[i].style.transition='.6s all ease';
                // X偏移
                var x=oBox.offsetWidth/2-aSpan[i].offsetWidth/2-aSpan[i].offsetLeft;
                var y=oBox.offsetHeight/2-aSpan[i].offsetHeight/2-aSpan[i].offsetTop;
                // 动那些值
                aSpan[i].style.transform='scale(2) translateX('+-x+'px) translateY('+-y+'px) rotateX('+rnd(-180, 180)+'deg) rotateY('+rnd(-180, 180)+'deg)';
                aSpan[i].style.opacity=0;
            }
            // 运动结束
            aSpan[0].addEventListener('transitionend', function(){
                for(var i=0; i<aSpan.length; i++){
                    aSpan[i].style.transition='none';
                    aSpan[i].style.transform='scale(1) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg)';
                    aSpan[i].style.opacity=1;
                    aSpan[i].style.backgroundImage='url(img/beijingtu/neibu/'+iNow%3+'.jpg)';
                    oBox.style.backgroundImage='url(img/beijingtu/neibu/'+(iNow+1)%3+'.jpg)';
                }
                bFlag=false;
            }, false);
        };
    })();
//    音乐
    ;(function(){
        var aLi=document.querySelectorAll('#ul_music li');

        for(var i=0; i<aLi.length; i++){
            aLi[i].dataset.index=i;
            aLi[i].onmousedown=function(){
                for(var i=0; i<aLi.length; i++){
                    aLi[i].className='';
                }
                this.className='active';
                // 出声
                var oAudio=new Audio();
                oAudio.src=oggSound['sound'+(parseInt(this.dataset.index)+49)];
                oAudio.play();
            };
            aLi[i].onmouseup=function(){
                this.className='';
            };
        }

        document.onkeydown=function(ev){
            var oEvent=ev || event;
            aLi[oEvent.keyCode-49].className='active';
            if(oEvent.keyCode>=49 && oEvent.keyCode<=56){
                var oAudio=new Audio();
                oAudio.src=oggSound['sound'+oEvent.keyCode];
                oAudio.play();
            }
        };
        document.onkeyup=function(ev){
            var oEvent=ev || event;
            aLi[oEvent.keyCode-49].className='';
        };
    })();
//    音乐
}







