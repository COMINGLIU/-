var demo = (function(document,window) {
    // 获取所需元素
    var ele = {
        // 轮播所在容器
        oWrapper: document.querySelector(".wrapper"),
        // 轮播ul
        oUl: document.querySelector(".wrapper-ul"),
        // 轮播li
        aLi: document.querySelectorAll(".wrapper-ul li"),
        // 所有图片img标签
        aImg: document.querySelectorAll(".wrapper-ul li img"),
    }
    // 设置轮播wrapper,ul宽高并把图片资源放入li中
    function setPlaying(wid,hei,num,imgs) {
        ele.oWrapper.style.width = wid + "px";
        ele.oWrapper.style.height = hei + "px";
        ele.oUl.style.width = wid*num + "px";
        ele.oUl.style.height = hei + "px";
        ele.aLi.forEach(function(value,index,arr) {
            value.style.width = wid + "px";
            value.style.height = hei + "px";
        })
        // 设置图片属性
        ele.aImg.forEach(function(value,index,arr) {
            value.src = imgs[index].url;
            value.alt = imgs[index].alt;
            value.style.width = wid + "px";
            value.style.height = hei + "px";
        })
    }
    var run = {
        // 默认图片宽度
        imgW: 500,
        // 默认图片高度
        imgH: 500,
        // 保存图片资源
        imgs: [],
        num: ele.aLi.length,
        init: function(config) {
            this.imgW = config.imgW||this.imgW;
            this.imgH = config.imgH||this.imgH;
            this.imgs = config.imgs;
            //设置wrapper,ul,li宽高
            setPlaying(this.imgW,this.imgH,this.num,this.imgs);
        }
    }
    return run;
})(document,window);