var Run = (function(window,document,e) { 
    /*=============================给元素绑定事件的函数===============================*/ 
    var EventUtil = {
        // 获取event事件
        getEvent: function(e) {
            return window.e||e;
        },
        // 获取事件目标
        getTarget: function(e) {
            return e.target||e.srcElement;
        },
        // 阻止冒泡
        stopPropagation: function(e) {
            if(e.stopPropagation) {
                e.stopPropagation();
            }else {
                e.cancelBubble = true;
            }
        },
        // 添加事件监听
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
        // 移除事件监听
        removeHandle: function(element,type,fn) {
            if(element.removeEventListener) {
                element.removeEventListener(type,fn);
            }else if(element.dettachEvent) {
                element.dettachEvent("on"+type,fn);
            }else {
                element["on"+type] = null;
            }
        },
        // 获取css样式属性
        getStyle: function(obj,attr) {
            return getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
        },
        // 获取随机颜色值
        getrandomColor: function() {
            var txt = "#";
            for(var i=0;i<6;i++) {
                txt += Math.floor(Math.random()*16).toString(16);
            }
            return txt;
        }
    };
    /*=============================end给元素绑定事件的函数===============================*/ 

    /*=============================创建按钮========================================*/
    /*
    *parentNode:此处表示content，包含ul的容器
    *itemH:图片高度
    */
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
    /*=============================end创建按钮========================================*/

    /*=============================创建item函数===================================*/
    function creatItem(num,itemW,itemH){
        var frag = document.createDocumentFragment(),
            frag2 = document.createDocumentFragment(),
            oUl = document.createElement("ul"),
            oPoints = document.createElement("div");
        oUl.style.width = num*itemW + "px";
        oUl.style.height = itemH + "px";
        oUl.style.right = 0;
        oPoints.style.position = "absolute";
        oPoints.className ="points";
        demo.oWrapper.style.width = itemW + "px";
        demo.oWrapper.style.height = itemH + "px";
        for(var i=0;i<num;i++) {
            var item = document.createElement("li"),
                img = document.createElement("img"),
                points = document.createElement("em");
            item.appendChild(img);
            item.style.width = itemW + "px";
            item.style.height = itemH + "px";
            item.style.backgroundColor = EventUtil.getrandomColor();
            frag.appendChild(item);
            frag2.appendChild(points);
        }
        oUl.appendChild(frag);
        oPoints.appendChild(frag2);
        return {
            oUl: oUl,
            oPoints: oPoints
        };
    }
    /*=============================end创建item函数===================================*/
    // 轮播函数
    /*
    *num:轮播图片总数
    *obj:ul
    *itemW:图片宽度
    *leftBtn:左边btn
    *rightBtn: 右边btn
    *btns:两个btn的集合
    *points:小点
    */
    /*=============================swipper轮播=======================================*/ 
    function swipper(num,obj,itemW,leftBtn,rightBtn,btns,points) {
        that = this;
        that.timer = null;
        timer = setInterval(setPlaying,4000);
        // 自动轮播函数
        points[num-1].style.backgroundColor = "#333";
        function setPlaying() {
            var objLeft = parseInt(EventUtil.getStyle(obj,"left"))+itemW,
                key;
            key = objLeft>0? num-(objLeft/itemW):-objLeft/itemW;
            setPointsColor(key,num);
            obj.style.left = objLeft + "px";
            if(objLeft>0) {
                obj.style.left = -(num-1)*itemW + "px";
            }  
       }
        /*===方法一、使用一个函数实现多个事件===*/
        btns.end = true;
        //leftBtn所有绑定事件
        var leftBtnFn = function(e) {
            e = EventUtil.getEvent(e);
            switch(e.type) {
                case "mouseenter":
                    clearInterval(timer);
                    break;
                case "mouseleave":
                    timer = setInterval(setPlaying,4000);
                    break;
            }
        };
        
        // rightBtn所有绑定事件
        var rightBtnFn = function(e) {
            e = EventUtil.getEvent(e);
            switch(e.type) {
                case "mouseenter":
                    clearInterval(timer);
                    break;
                case "mouseleave":
                    timer = setInterval(setPlaying,4000);
                    break;
            }
        };
        // 用于监听每一次轮播是否完成
        EventUtil.addHandle(obj,"transitionend",function() {
            btns.end = true;
        });
        btns[0].onmouseenter = leftBtnFn;
        btns[0].onmouseleave = leftBtnFn;
        // 把onclick分离出来是为了能兼顾transitioned
        btns[0].onclick = function() {
            if(btns.end) {
                if(obj.offsetLeft<0&&obj.offsetLeft>=-(num-1)*itemW) {
                    var objLeft = obj.offsetLeft+itemW;
                    obj.style.left = objLeft + "px";
                    key = objLeft>0? num-Math.ceil(objLeft/itemW):Math.floor(-objLeft/itemW);
                    setPointsColor(key,num);
                    btns[0].end = false;
                }else {
                    obj.style.left = -(num-1)*itemW + "px";
                    setPointsColor(num-1,num);
                }
                btns.end = false;
            }
        }
        btns[1].onmouseenter = rightBtnFn;
        btns[1].onmouseleave = rightBtnFn;
        btns[1].onclick = function() {
            if(btns.end) {
                if(obj.offsetLeft<=0&&obj.offsetLeft>-(num-1)*itemW) {
                    var objLeft = obj.offsetLeft-itemW;
                    obj.style.left = objLeft + "px";
                    key = objLeft>0? num-Math.ceil(objLeft/itemW):Math.floor(-objLeft/itemW);
                    setPointsColor(key,num);
                }else {
                    obj.style.left = 0 + "px";
                    setPointsColor(0,num);
                }
                btns.end = false;
            }
        }
        /*===方法二、使用事件监听，可替代上一种方法===*/ 
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
        //     timer = setInterval(setPlaying,4000);
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
        //     timer = setInterval(setPlaying,4000);
        // });
        /*==========================================================*/ 
        // points变色函数
        function setPointsColor(aim,num) {
            for(var i=0;i<num;i++) {    
                points[i].style.backgroundColor = "rgb(204,204,204,.7)";
            }
            points[aim].style.backgroundColor = "#333";
        }
        // point切换事件
        (function(e,num) {
            // points所有绑定事件
            /*
            *obj: ul
            *kNum: 第几个点
            *itemw：图片宽度
            */ 
        //    var pointsFn = function(e,kNum) {
        //         e = EventUtil.getEvent(e);
        //         switch(e.type) {
        //             case "mouseenter":
        //                 clearInterval(timer);
        //                 console.log(kNum,itemW);
        //                 obj.style.left = kNum*itemW + "px";
        //                 this.style.backgroundColor = "#333";
        //                 break;
        //             case "mouseleave":
        //                 timer = setInterval(setPlaying,4000);
        //                 this.backgroundColor = "rgb(204,204,204,.7)";
        //                 break;
        //         }
        //     };
            /*
            *swipper函数从这以上：自动轮播实现
            *swipper函数从这以下：点击左右btn实现图片切换
            */ 
            for(let i=0;i<num;i++) {
                points[i].onmouseenter = function() {
                    clearInterval(timer);
                    obj.style.left = -itemW*i + "px";
                    setPointsColor(i,num);
                };
                points[i].onmouseleave = function() {
                    points[i].style.backgroundColor = "rgb(204,204,204,.7)";
                    timer = setInterval(function() {
                        var objLeft = parseInt(EventUtil.getStyle(obj,"left"))+itemW,
                            key;
                        if(objLeft>0) {
                            key = num-(objLeft/itemW);
                        }else {
                            key = -objLeft/itemW;
                        }
                        setPointsColor(key,num);
                        obj.style.left = objLeft + "px";
                        if(objLeft>0) {
                            obj.style.left = -(num-1)*itemW + "px";
                        }
                    },4000);
                }
            }
        })(e,num);
    }
       /*=============================end===swipper轮播=======================================*/ 
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
            this.oWrapper.appendChild(creatItem(this.num,this.itemW,this.itemH).oUl);
            this.oWrapper.appendChild(creatItem(this.num,this.itemW,this.itemH).oPoints)
            // 获取ul
            this.oUl = document.querySelector(".content ul");
            // 获取points
            this.oPoints = document.querySelectorAll(".points em");
            // 轮播实现
            swipper(this.num,this.oUl,this.itemW,this.leftBtn,this.rightBtn,this.btns,this.oPoints);
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
/*
总结：在轮播中用到的知识点有：
    1.单体单例模式封装
    2.事件监听（EventUtil.addHandle）解决兼容问题
    3.获取event(EventUtil.getEvent)解决兼容问题
    4.获取触发event事件的目标target(EventUtil.getTarget)解决兼容
    5.获取css样式（EventUtil.getStyle）解决兼容
    6.结点碎片（document.createDocumentFrame()）降低dom操作，提升性能
    7.利用e.type实现一个函数实现多个事件
    8.解决了btn切换轮播图时的时延问题（当点击事件间隔小于动画完成时间）
*/ 