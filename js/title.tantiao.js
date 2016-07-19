/**
 * Created by Administrator on 2016/6/30.
 */
;(function(window){
    var iSpeedX=0;
    var left=0;
    var timer=null;

    window.move2=function(obj,iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            if(left<iTarget){
                iSpeedX+=(iTarget-left)/5;
                iSpeedX*=0.9;
                left+=iSpeedX;
            }else{
                iSpeedX-=(left-iTarget)/5;
                iSpeedX*=0.9;
                left+=iSpeedX;
            }
            obj.style.left=left+'px';
            if(Math.abs(iSpeedX)<1 && Math.round(left)==iTarget){
                clearInterval(timer);
            }
        },30)
    };
})(window);