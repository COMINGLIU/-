# -
可复用轮播封装实践
使用：
    (1)调用对象Run.demo.init()函数，向函数init中传入如上述参数，参数以对象形式组织,如果要传入图片路径，以数组形式组织
    (2)设置所需css样式：
        //轮播所在容器（宽高与参数itemW与itemH一致，也可不一致，主要用途用于居中，如果不需要居中也可不传入）类名可自行设置
        .content {
        position: relative;
        overflow: hidden;
        width: 100px;
        height: 200px;
        margin: 0 auto;
        }
        //组织所有轮播图片所在li的ul
        ul {
            position: absolute;
            list-style: none;
            padding: 0;
            font-size: 0;
            transition: all 1.5s;
        }
        //设置所有轮播图片所在li为inline-block横向排列
        li {
            display: inline-block;
        }
