var Run = (function(window,document) {    
    // 随机色函数
    function randomColor() {
        var txt = "#";
        for(var i=0;i<6;i++) {
            txt += Math.floor(Math.random()*16).toString(16);
        }
        return txt;
    };
    // 创建item函数
    function creatItem(num,itemW,itemH){
        var frag = document.createDocumentFragment(),
            oUl = document.createElement("ul"),
            imgList=[];
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
            imgList[i] = img;
        }
        oUl.appendChild(frag);
        return {
            oUl,
            imgList
        }
    };
    // 轮播函数
    function swipper(num,obj,itemW,lef) {
        var timer = setInterval(function() {
           var objLeft = parseInt(EventUtil.getStyle(obj,"left"))+itemW;
           obj.style.left = objLeft + "px";
           if(objLeft>0) {
                obj.style.left = -(num-1)*itemW + "px";
           }
       },3000);
    }
    // 给元素绑定事件的函数
    var EventUtil = {
        addHandle: function(type,element,fn) {
            if(element.addEventLisenter) {
                element.addEventLisenter(type,fn);
            }else if(element.attchEvent) {
                element.attachEvent("on"+type,fn);
            }else {
                element["on"+type] = fn;
            }
        },
        removeHandle: function(type,element,fn) {
            if(element.removeEventListener) {
                element.removeEventListener(type,fn);
            }else if(element.dettachEvent) {
                element.dettachEvent("on"+type,fn);
            }else {
                element["on"+type] = null;
            }
        },
        getStyle: function(obj,attr) {
            return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
        }
    }
    /*
    *所需函数：
    *creatItem(num,itemW,itemH)
    *swipper(num,items,itemW)
    */ 
    var demo = {
        num: 4,
        oWrapper: document.querySelector(".content"),
        items: null,
        init: function(config){
            this.num = config.num||this.num;
            this.itemW = config.itemW;
            this.itemH = config.itemH;
            this.imgs = config.imgs;
            this.oWrapper.appendChild(creatItem(this.num,this.itemW,this.itemH).oUl);
            this.oUl = document.querySelector(".content ul");
            swipper(this.num,this.oUl,this.itemW);
            this.items = document.querySelectorAll(".content ul li img");
            console.log(this.items);
            for(let key in this.items) {
                this.items[key].src=this.imgs[key];
            }
       }
    }
    return {
        demo: demo
    }
})(window,document);