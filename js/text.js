function d2a(n){
            return n*Math.PI/180;
    }
function getStyle(obj, name){
        return (obj.currentStyle || getComputedStyle(obj, false))[name];
    }
window.onload=function(){
    //导航栏部分下边框显示隐藏
    ;(function(){
        var oBox=document.getElementById('top_box');
        var oUl=oBox.children[1];
        var aLi=oBox.children[1].children;
        var aSpan=oUl.getElementsByTagName('span');
        var oBdTx=document.getElementById('bd_tx2');
        var oBdSpan=document.getElementById('bd_tx2_span');
        oBdTx.onmouseover=function(){
            move(oBdSpan,'width',422,500);
        }
        oBdTx.onmouseout=function(){
            move(oBdSpan,'width',0,400);
        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                move(aSpan[this.index],'width',100,200);
            }
            aLi[i].onmouseout=function(){
                move(aSpan[this.index],'width',0,200);
            }
        };

        function move(obj, name, iTarget, duration, complete){
                var start=parseFloat(getStyle(obj, name));
                var dis=iTarget-start;   // 总距离

                var count=Math.floor(duration/30);  // 总步数
                var n=0;
                clearInterval(obj.timer);
                obj.timer=setInterval(function(){
                    n++;
                    obj.style[name]=start+dis/count*n+'px';  // 每步走多远
                    if(n==count){
                        clearInterval(obj.timer);
                        complete && complete();
                    }
                }, 30);
            }
    })();

    //标题文字运动


    ;(function(){
        var oTopB=document.getElementById('top_bottom');
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
                var oShowSk=document.getElementById('show_sk')
                var oC = oShowSk.getElementsByTagName('canvas');
                var gd = oC[0].getContext('2d');
                var gd1 = oC[1].getContext('2d');
                var gd2 = oC[2].getContext('2d');
                // var gd3 = oC[3].getContext('2d');
                var cx = 260;
                var cy = 200;
                var r = 100;
                var linear = gd.createLinearGradient(100,200,400,300);

                var linear1 = gd1.createLinearGradient(200,100,400,100);

                var linear2 = gd2.createLinearGradient(100,100,400,200);

                // var linear3 = gd3.createLinearGradient(200,300,100,200);
                linear.addColorStop(0,'red');
                linear.addColorStop(1,'blue');

                linear1.addColorStop(0,'blue');
                linear1.addColorStop(1,'red');

                linear2.addColorStop(0,'yellow');
                linear2.addColorStop(1,'blue');
                gd.lineWidth='20';

                gd1.lineWidth='20';

                gd2.lineWidth='20';
                var i =0;
                var timer = null;
                timer = setInterval(function(){
                    gd.clearRect(0,0,oC[0].width,oC[0].height);
                    gd.beginPath();
                    gd.strokeStyle=linear;
                    gd.arc(cx,cy,r,d2a(0),d2a(i+1),false);
                    gd.stroke();

                    gd1.clearRect(0,0,oC[1].width,oC[1].height);
                    gd1.beginPath();
                    gd1.strokeStyle=linear1;
                    gd1.arc(cx,cy,r,d2a(0),d2a(i+1),false);
                    gd1.stroke();

                    gd2.clearRect(0,0,oC[2].width,oC[2].height);
                    gd2.beginPath();
                    gd2.strokeStyle=linear2;
                    gd2.arc(cx,cy,r,d2a(0),d2a(i+1),false);
                    gd2.stroke();
                    i++;
                    var str = parseInt(i*100/360)+'%';
                    var str1 = parseInt(i*96/360)+'%';
                    var str2 = parseInt(i*98/360)+'%';
                    var w = gd.measureText(str).width;
                    var w1 = gd1.measureText(str1).width;
                    var w2 = gd2.measureText(str2).width;
                    gd.font='60px 黑体';
                    gd.fillStyle=linear;
                    gd.fillText(str,cx-w/2,cy+20);

                    gd1.font='60px 黑体';
                    gd1.fillStyle=linear1;
                    gd1.fillText(str1,cx-w1/2,cy+20);

                    gd2.font='60px 黑体';
                    gd2.fillStyle=linear2;
                    gd2.fillText(str2,cx-w2/2,cy+20);

                    if(i>=280){
                        clearInterval(timer);
                    }
                },25);
            })();

            ;(function(){
                var oShowBox=document.getElementById('show_box');
                var timer=null;
                var str='大家好。我是一名年轻，有活力的IT工作者。从接触IT以来，我吸收了很多经验。内心有着一些对知识的了解和认知。下面的图是我从事IT以来的知识程度。希望让贵公司更了解我。';
                for(var i=0;i<str.length;i++){
                    var oSpan=document.createElement('span');
                    oSpan.innerHTML=str.charAt(i);
                    oShowBox.appendChild(oSpan);
                }
                var aSpan=oShowBox.getElementsByTagName('span');
                var num=0;
                timer=setInterval(function(){
                    move(aSpan[num],{opacity:1});
                    num++;
                    if(num==aSpan.length){
                        clearInterval(timer);
                    }
                },150);
            })();

    //index图片运动
    ;(function(){
        var oUl=document.getElementById('bd_u1');
        var aLi1=oUl.children[0];
        var aLi2=oUl.children[1];
        var timer=null;
        var zIndex=99;
        aLi1.onmouseenter=function(){
            clearInterval(timer);
            if(navigator.userAgent.indexOf("MSIE 9.0")!=-1){

                    move(aLi1,{opacity:0},{duration:300,complete:function(){
                    // aLi1.style.zIndex=zIndex++;
                    move(aLi2,{opacity:1});
                }});
            }else{
                aLi1.className='bd_tx active';
                timer=setInterval(function(){
                    aLi2.className='bd_tx2 active';
                },310);
            }
        }
        aLi2.onmouseleave=function(){
            clearInterval(timer);
            if(navigator.userAgent.indexOf("MSIE 9.0")!=-1){
                    move(aLi2,{opacity:0},{duration:300,complete:function(){
                    move(aLi1,{opacity:1});
                }});
            }else{
                aLi2.className='bd_tx2';
                timer=setInterval(function(){
                    aLi1.className='bd_tx';
                },310);
            }


        }
    })();
    //index图片运动
    //文字运动
    ;(function(){
        var oBoxBd=document.getElementById('box_bd');
        var oP=oBoxBd.children[1];
        move2(oP,425);
    })();

  //文字运动
    ;(function(){
        var oBoxBd=document.getElementById('bd_u1');
        var oBox=oBoxBd.children[0];
        var iSpeedX=6;
        var iSpeedY=8;
        var timer=null;

        clearInterval(timer);
        timer=setInterval(function(){
            iSpeedY+=2;
            var l=oBox.offsetLeft+iSpeedX;
            var t=oBox.offsetTop+iSpeedY;
            if(l<0){
                l=0;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }
            if(l>document.documentElement.clientWidth-oBox.offsetWidth){
                l=document.documentElement.clientWidth-oBox.offsetWidth;
                iSpeedX*=-0.8;
                iSpeedY*=0.8;
            }
            if(t<0){
                t=-10;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            if(t>=130){
                t=130;
                iSpeedY*=-0.8;
                iSpeedX*=0.8;
            }
            //oBox.style.left=l+'px';
            oBox.style.top=t+'px';
            if(Math.abs(iSpeedX)<1){
                iSpeedX=0;
            }
            if(Math.abs(iSpeedY)<1){
                iSpeedY=0;
            }
            if(iSpeedX==0 && iSpeedY==0 && t==document.documentElement.clientHeight-oBox.offsetHeight){
                clearInterval(timer);
            }
        }, 30);

    })();

}
