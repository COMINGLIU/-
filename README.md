# -
可复用轮播封装实践（ 滑动式轮播）
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

总结：在轮播中用到的知识点有：
    1.单体单例模式封装
    2.事件监听（EventUtil.addHandle）解决兼容问题
    3.获取event(EventUtil.getEvent)解决兼容问题
    4.获取触发event事件的目标target(EventUtil.getTarget)解决兼容
    5.获取css样式（EventUtil.getStyle）解决兼容
    6.结点碎片（document.createDocumentFrame()）降低dom操作，提升性能
    7.利用e.type实现一个函数实现多个事件
