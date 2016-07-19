
window.onload=function(){
    ;(function(){
        var oBox=document.getElementById('top_box');
        var oUl=oBox.children[0];
        var aLi=oBox.children[0].children;
        var aSpan=oUl.getElementsByTagName('span')
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                move(aSpan[this.index],{width:100},200);
            }
            aLi[i].onmouseout=function(){
                move(aSpan[this.index],{width:0},200);
            }
        };
    })();
}
