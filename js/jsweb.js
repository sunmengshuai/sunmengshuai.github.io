/**
 * Created by Administrator on 2016/7/2.
 */

function tuDouble(n){
    return n<10?'0'+n:''+n;
}
//定位父级
function getPos(obj){
    var l = 0;
    var t = 0;
    while(obj){
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return{left:l,top:t};
}
//移入移出
    function hoverDir(obj, ev){
    var oScrollT = document.documentElement.scrollTop || document.body.scrollTop;
    var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX;
    var y=getPos(obj).top+obj.offsetHeight/2-oScrollT-ev.clientY;

    return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
}



//移入移出
window.onload=function(){
    //钟表
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
//钟表运动
//顶到头
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
//顶到头
//js第一个运动
    ;(function(){
        var oBox=document.getElementById('box');
        var aImg=oBox.getElementsByTagName('img');
        var oUl=oBox.children[0];
        var aLi=oBox.children[0].children;
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        var oBoxC=oBox.offsetWidth/2;
        oUl.onmousedown=function(ev){
            var oEvent=ev || event;
            var disX=oEvent.clientX-oUl.offsetLeft;
            document.onmousemove=function(ev){
                var oEvent=ev || event;
                var l=oEvent.clientX-disX;
                if(l>=oBoxC-(1-0.5)*aLi[0].offsetWidth){
                    l=oBoxC-(1-0.5)*aLi[0].offsetWidth;
                }
                if(l<=oBoxC-(aLi.length-0.5)*aLi[0].offsetWidth){
                    l=oBoxC-(aLi.length-0.5)*aLi[0].offsetWidth;
                }
                oUl.style.left=l+'px';
                setSize();
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
                oUl.releaseCapture && oUl.releaseCapture();
            }
            oUl.setCapture && oUl.setCapture();
            return false;
        }
        oUl.style.left=oBoxC-(2-0.5)*aLi[0].offsetWidth+'px';
        function setSize(){
            for(var i=0;i<aLi.length;i++){
                var c=Math.abs(oBoxC-(aLi[i].offsetWidth/2+aLi[i].offsetLeft+oUl.offsetLeft));
                var scale=1-c/500;
                if(scale<=0.5){
                    scale=0.5;
                }
                aImg[i].style.width=scale*450+'px';
                aImg[i].style.marginLeft=-(scale*450-225)/2+'px';
                aImg[i].style.marginTop=-(scale*450-225)/2+'px';
                aLi[i].style.zIndex=scale*1000;
            }
        }
        setSize();
    })();
//上面js第一个
//下面为导航栏运动效果
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
    //导航栏运动效果

    //手风琴
    ;(function(){
        var oUl=document.getElementById('ul3');
        var aLi=oUl.children;
        var w=30;
        //ul的宽度
        oUl.style.width=aLi[0].offsetWidth+(aLi.length-1)*w+'px';
        //li的定位位置
        for(var i=1;i<aLi.length;i++){
            aLi[i].style.left=aLi[0].offsetWidth+(i-1)*w+'px';
        }
        //设置手风琴效果
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                for(j=0;j<aLi.length;j++){
                    if(j<=this.index){
                        move1(aLi[j],{left:j*w},500);
                    }else{
                        move1(aLi[j],{left:aLi[0].offsetWidth+(j-1)*w},500);
                    }
                }
            }
        }
    })();

    //苹果滑动
    ;(function(){
        var oUl=document.getElementById('ul4');
        var aLi=oUl.children;

        var width=aLi[0].offsetWidth;

        var iNow=0;
        oUl.onmousedown=function(ev){
            clearInterval(oUl.timer);
            var oEvent=ev || event;
            var disX=oEvent.clientX-oUl.offsetLeft;
            var downX=oEvent.clientX;

            document.onmousemove=function(ev){
                var oEvent=ev || event;

                oUl.style.left=oEvent.clientX-disX+'px';
            };
            document.onmouseup=function(ev){
                var oEvent=ev || event;
                document.onmousemove=null;
                document.onmouseup=null;

                var upX=oEvent.clientX;
                if(Math.abs(upX-downX)>100){
                    if(upX>downX){
                        iNow--;
                        iNow<0 && (iNow=0);
                        move(oUl, {left: -width*iNow});
                    }else{
                        iNow++;
                        iNow>aLi.length-1 && (iNow=aLi.length-1);
                        move(oUl, {left: -width*iNow});
                    }
                }else{
                    move(oUl, {left: -width*iNow});
                }
                document.title=iNow;
            };
            return false;
        };
    })();
//    苹果滑动效果

    //移入移出
    ;(function(){
        var oUl=document.getElementById('ul5');
        var aLi=oUl.children;

        for(var i=0; i<aLi.length; i++){
            aLi[i].onmouseenter=function(ev){
                var oEvent=ev || event;
                var n=hoverDir(this, oEvent);
                var oSpan=this.children[1];
                switch(n){
                    case 0:
                        oSpan.style.left='200px';
                        oSpan.style.top=0;
                        break;
                    case 1:
                        oSpan.style.left=0;
                        oSpan.style.top='200px';
                        break;
                    case 2:
                        oSpan.style.left='-200px';
                        oSpan.style.top=0;
                        break;
                    case 3:
                        oSpan.style.left=0;
                        oSpan.style.top='-200px';
                        break;
                }
                move(oSpan, {left: 0, top: 0});
            };
            aLi[i].onmouseleave=function(ev){
                var oEvent=ev || event;
                var n=hoverDir(this, oEvent);

                var oSpan=this.children[1];
                switch(n){
                    case 0:
                        move(oSpan, {left: 200, top: 0});
                        break;
                    case 1:
                        move(oSpan, {left: 0, top: 200});
                        break;
                    case 2:
                        move(oSpan, {left: -200, top: 0});
                        break;
                    case 3:
                        move(oSpan, {left: 0, top: -200});
                        break;
                }
            };
        }


    })();

    //移入移出

    //图片切换3D效果
    ;(function(){
        var oUl=document.getElementById('znsRotatePic');
        var aLi=oUl.children;
        var aImg=oUl.getElementsByTagName('img');
        var aA=oUl.getElementsByTagName('a');
        // 加事件
        aA[0].onclick=function(){
            toRight();
            return false;
        };
        aA[2].onclick=function(){
            toLeft();
            return false;
        };
        // 存坐标
        var aPos=[];
        for(var i=0; i<aLi.length; i++){
            aPos[i]={
                left: aLi[i].offsetLeft,
                top: aLi[i].offsetTop,
                width: aImg[i].offsetWidth,
                height: aImg[i].offsetHeight,
                opacity: getStyle(aImg[i], 'opacity'),
                oImgTop: aImg[i].offsetTop,
                fnClick: aA[i].onclick
            }
        }
        function toLeft(){
            // 删除最后一项，添加到第一项
            aPos.unshift(aPos.pop());
            changePos();
        }
        function toRight(){
            aPos.push(aPos.shift());
            changePos();
        }
        function changePos(){
            for(var i=0; i<aLi.length; i++){
                move(aLi[i], {left: aPos[i].left, top: aPos[i].top});
                move(aImg[i], {width: aPos[i].width, height: aPos[i].height, opacity: aPos[i].opacity, top: aPos[i].oImgTop});
                aA[i].onclick=aPos[i].fnClick;
            }
        }
    })();
    //图片切换3D效果

    //图片轮换图
    ;(function(){
        var oParent=document.getElementById('pht_box');
        var oLeft=document.getElementById('left');
        var oRight=document.getElementById('right');
        var oPhtUl=document.getElementById('pht_ul1');
        var oPhtOl=document.getElementById('pht_ol1');
        var aLi=oPhtUl.children;
        var aBtn=oPhtOl.children;
        var length=aLi.length;
        var timer=null;
        oPhtUl.innerHTML+=oPhtUl.innerHTML;
        oPhtUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        var width=aLi[0].offsetWidth;
        var iNow=0;
        var bFlag=false;
        oRight.onclick=next;
        function next(){
            if(bFlag)return;
            bFlag=true;
            iNow++;
            move(oPhtUl,{left:-width*iNow},{complete:function(){
                bFlag=false;
                if(iNow>length-1){
                    iNow=0;
                    oPhtUl.style.left=0;
                }
            }});
            show();
        }

        oLeft.onclick=prve;
        function prve(){
            if(bFlag)return;
            bFlag=true;
            iNow--;
            if(iNow<0){
                iNow=length-1;
                oPhtUl.style.left=-width*(iNow+1)+'px';
            }
            move(oPhtUl,{left:-width*iNow},{complete:function(){
                bFlag=false;

            }});
            show();
        }

        function show(){
            for(var j=0;j<aBtn.length;j++){
                aBtn[j].className='';

            }
            aBtn[iNow%aBtn.length].className='active';
        }

        for(var i=0;i<aBtn.length;i++){

            aBtn[i].index=i;
            aBtn[i].onclick=function(){
                move(oPhtUl,{left:-this.index*width});
                iNow=this.index;
                show();
           }
        }
        timer=setInterval(next,1000);
        oParent.onmouseover=function(){
            clearInterval(timer);
        }
        oParent.onmouseout=function(){
            timer=setInterval(next,1000);
        }
    })();
//图片轮换图


//    点击随机换图片位置
    ;(function(){
        var oBtn=document.getElementById('chage_one');
        var oUl=document.getElementById('chage_ul1');
        var aLi=oUl.children;
        var aPos=[];
        var zIndex=999;
        for(var i=0;i<aLi.length;i++){
            aPos[i]={
              left:aLi[i].offsetLeft,
                top:aLi[i].offsetTop
            };
        }
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.position='absolute';
            aLi[i].style.left=aPos[i].left+'px';
            aLi[i].style.top=aPos[i].top+'px';
            //aLi.style.margin=0;
        }
        oBtn.onclick=function(){
            aPos.sort(function(){
                return Math.random()-0.5;
            });
            for(var i=0;i<aLi.length;i++){
                move(aLi[i],aPos[aLi[i].index]);
            }
        }
        for(var i=0;i<aLi.length;i++){
            drag(aLi[i]);
            aLi[i].index=i;

        }
        function drag(obj){
           obj.onmousedown=function(ev){
               clearInterval(obj.timer);
               obj.style.zIndex=zIndex++;
               var oEvent=ev || event;
               var disX=oEvent.clientX-obj.offsetLeft;
               var disY=oEvent.clientY-obj.offsetTop;
               document.onmousemove=function(ev){
                   var oEvent=ev || event;
                   obj.style.left=oEvent.clientX-disX+'px';
                   obj.style.top=oEvent.clientY-disY+'px';
                   for(var i=0;i<aLi.length;i++){
                       aLi[i].className='';
                   }
                   var oNear=findNearest(obj);
                   if(oNear){
                       oNear.className='active';
                   }
               }
               document.onmouseup=function(){
                   document.onmousemove=null;
                   document.onmouseup=null;
                   var oNear=findNearest(obj);
                   if(oNear){
                       move(oNear,aPos[obj.index]);
                       move(obj,aPos[oNear.index]);
                       oNear.className='';
                       var tmp;
                       tmp=oNear.index;
                       oNear.index=obj.index;
                       obj.index=tmp;
                   }else{
                       move(obj,aPos[obj.index]);
                   }
               }
               return false;
           }
        }

        function collTest(obj,obj2){
            var l1=obj.offsetLeft;
            var r1=obj.offsetWidth+l1;
            var t1=obj.offsetTop;
            var b1=obj.offsetHeight+t1;

            var l2=obj2.offsetLeft;
            var r2=obj2.offsetWidth+l2;
            var t2=obj2.offsetTop;
            var b2=obj2.offsetHeight+t2;
            if(r1<l2 || b1<t2|| l1>r2 || t1>b2 ){
                return false;
            }else{
                return true;
            }
        }

        function getDis(obj,obj2){
            var l1=obj.offsetLeft+obj.offsetWidth/2;
            var l2=obj2.offsetLeft+obj2.offsetWidth/2;

            var t1=obj.offsetTop+obj.offsetHeight/2;
            var t2=obj2.offsetTop+obj.offsetHeight/2;
            var a=l1-l2;
            var b=t1-t2;
            return Math.sqrt(a*a+b*b);
        }
        function findNearest(obj){
            var iMin=9999;
            var iMinIndex=-1;
            for(var i=0;i<aLi.length;i++){
                if(obj==aLi[i])continue;
                if(collTest(obj,aLi[i])){
                        var dis=getDis(obj,aLi[i]);
                    if(dis<iMin){
                        iMin=dis;
                        iMinIndex=i;
                    }
                }
            }
            if(iMinIndex==-1){
                return null;
            }else{
                return aLi[iMinIndex];
            }
        }
    })();
//    点击随机换图片位置
}
