var Run = (function(window,document,e) { 
     // 给元素绑定事件的函数
     var EventUtil = {
        getEvent: function(e) {
            return window.e||e;
        },
        stopPropagation: function(e) {
            if(e.stopPropagation) {
                e.stopPropagation();
            }else {
                e.cancelBubble = true;
            }
        },
        addHandle: function(element,type,fn) {
            if(element.addEventListener) {
                element.addEventListener(type,fn);
            }else if(element.attchEvent) {
                console.log("att");
                element.attachEvent("on"+type,fn);
            }else {
                console.log("on");
                element["on"+type] = fn;
            }
        },
        removeHandle: function(element,type,fn) {
            if(element.removeEventListener) {
                element.removeEventListener(type,fn);
            }else if(element.dettachEvent) {
                element.dettachEvent("on"+type,fn);
            }else {
                element["on"+type] = null;
            }
        },
        getTarget: function(e) {
            return e.target||e.srcElement;
        },
        getStyle: function(obj,attr) {
            return getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
        }
    };
    // 随机色函数
    function randomColor() {
        var txt = "#";
        for(var i=0;i<6;i++) {
            txt += Math.floor(Math.random()*16).toString(16);
        }
        return txt;
    }
    // 创建按钮
    function creatBtn(parentNode,itemH) {
        var leftBtn = document.createElement("div"),
            rightBtn = document.createElement("div");
        leftBtn.innerHTML = "<";
        leftBtn.className = "leftBtn btns";
        leftBtn.style.height = itemH*.3 + "px";
        leftBtn.style.lineHeight = itemH*.3 + "px";
        rightBtn.innerHTML = ">";
        rightBtn.className = "rightBtn btns";
        rightBtn.style.height = itemH*.3 + "px";
        rightBtn.style.lineHeight = itemH*.3 + "px";
        parentNode.appendChild(leftBtn);
        parentNode.appendChild(rightBtn);
    }
    // 创建item函数
    function creatItem(num,itemW,itemH){
        var frag = document.createDocumentFragment(),
            oUl = document.createElement("ul");
        oUl.style.width = num*itemW + "px";
        oUl.style.height = itemH + "px";
        oUl.style.right = 0;
        demo.oWrapper.style.width = itemW + "px";
        demo.oWrapper.style.height = itemH + "px";
        for(var i=0;i<num;i++) {
            var item = document.createElement("li"),
                img = document.createElement("img");
            item.appendChild(img);
            item.style.width = itemW + "px";
            item.style.height = itemH + "px";
            item.style.backgroundColor = randomColor();
            frag.appendChild(item);
        }
        oUl.appendChild(frag);
        return oUl;
    }
    // 轮播函数
    function swipper(num,obj,itemW,leftBtn,rightBtn,btns) {
        var timer = setInterval(setPlaying,1000);
        function setPlaying() {
            var objLeft = parseInt(EventUtil.getStyle(obj,"left"))+itemW;
            obj.style.left = objLeft + "px";
            if(objLeft>0) {
                obj.style.left = -(num-1)*itemW + "px";
            }  
       }
        /*
        *swipper函数从这以上：自动轮播实现
        *swipper函数从这以下：点击左右btn实现图片切换
        */    
        /*======================================方法一、使用一个函数实现多个事件======================================================*/    
        //leftBtn所有绑定事件
        var leftBtnFn = function(e) {
            e = window.event||e;
            switch(event.type) {
                case "mouseenter":
                    clearInterval(timer);
                    break;
                case "click" :
                    if(obj.offsetLeft<0&&obj.offsetLeft>=-(num-1)*itemW) {
                        var tempL = obj.offsetLeft+itemW;
                        obj.style.left = tempL + "px";
                    }else {
                        obj.style.left = -(num-1)*itemW + "px";
                    }
                    break;
                case "mouseleave":
                    time = setInterval(setPlaying,1000);
                    break;
            }
        } 
        // rightBtn所有绑定事件
        var rightBtnFn = function(e) {
            e = window.e||e;
            switch(e.type) {
                case "mouseenter":
                    clearInterval(timer);
                    break;
                case "click":
                    if(obj.offsetLeft<=0&&obj.offsetLeft>-(num-1)*itemW) {
                        var tempR = obj.offsetLeft-itemW;
                        obj.style.left = tempR + "px";
                    }else {
                        obj.style.left = 0 + "px";
                    }
                    break;
                case "mouseleave":
                    timer = setInterval(setPlaying,1000);
                    break;
            }
        }
        btns[0].onmouseenter = leftBtnFn;
        btns[0].onclick = leftBtnFn;
        btns[0].onmouseleave = leftBtnFn;
        btns[1].onmouseenter = rightBtnFn;
        btns[1].onclick = rightBtnFn;
        btns[1].onmouseleave = rightBtnFn;
        /*============================================================================================*/    
        /*============================方法二、使用时间监听，可替代上一种方法========================================*/ 
        // left-mouseenter事件
        // EventUtil.addHandle(leftBtn,"mouseenter",function(e) {
        //     clearInterval(timer);
        // });
        // // 点击左边btn
        // EventUtil.addHandle(leftBtn,"click",function(e) {
        //     if(obj.offsetLeft<0&&obj.offsetLeft>=-(num-1)*itemW) {
        //         var tempL = obj.offsetLeft+itemW;
        //         obj.style.left = tempL + "px";
        //     }else {
        //         obj.style.left = -(num-1)*itemW + "px";
        //     }
        // });
        // // right-mouseenterleave事件
        // EventUtil.addHandle(leftBtn,"mouseleave",function(e) {
        //     timer = setInterval(setPlaying,1000);
        // });
        // EventUtil.addHandle(rightBtn,"mouseenter",function(e) {
        //     clearInterval(timer);
        // });
        // // 点击右边btn
        // EventUtil.addHandle(rightBtn,"click",function() {
        //     if(obj.offsetLeft<=0&&obj.offsetLeft>-(num-1)*itemW) {
        //         var tempR = obj.offsetLeft-itemW;
        //         obj.style.left = tempR + "px";
        //     }else {
        //         obj.style.left = 0 + "px";
        //     }
        // });
        // // right -mouseleave事件
        // EventUtil.addHandle(rightBtn,"mouseleave",function(e) {
        //     timer = setInterval(setPlaying,1000);
        // });
       /*====================================================================*/ 
    }
    // 点击轮播
    // function clickMove(num,obj,itemW,leftBtn,rightBtn)
    /*
    *所需函数：
    *creatItem(num,itemW,itemH)
    *swipper(num,items,itemW)
    */ 
    var demo = {
        // 轮播图默认片总数
        num: 4,
        // 轮播图片默认宽度
        itemW: 300,
        // 轮播图片默认高度
        itemH: 180,
        // 保存所有的li
        items: null,
        // 保存所有的轮播图片
        imgs: null,
        init: function(config){
            // ul所在区域
            this.oWrapper = config.oWrapper;
            this.num = config.num||this.num;
            this.itemW = config.itemW||this.itemW;
            this.itemH = config.itemH||this.itemH;
            creatBtn(this.oWrapper,this.itemH);
            this.imgs = config.imgs||this.imgs;
            // 所有btn
            this.btns = document.querySelectorAll(".btns");
            // 左侧btn
            this.leftBtn = document.querySelector(".leftBtn");
            // 右侧btn
            this.rightBtn = document.querySelector(".rightBtn");
            // 创建ul、li、img
            this.oWrapper.appendChild(creatItem(this.num,this.itemW,this.itemH));
            // 获取ul
            this.oUl = document.querySelector(".content ul");
            // 轮播实现
            swipper(this.num,this.oUl,this.itemW,this.leftBtn,this.rightBtn,this.btns);
            // 获取所有图片
            this.items = document.querySelectorAll(".content ul li img");
            // 设置每张图片的路径
            if(this.imgs) {
                for(let key in this.items) {
                    this.items[key].src=this.imgs[key];
                }
            }
       }
    }
    return {
        demo: demo
    }
})(window,document);