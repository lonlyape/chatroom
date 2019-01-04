window.config = {
    production: false,
    wxConfig: false,
    wxDebug: false,
    appid: 'wxb3a0b8bdd3a89a51',
    // baseUrl: 'http://192.168.0.105:8080',
    baseUrl: 'http://ncyxtest.xgyjsx.com/shop',
    // baseUrl: 'https://ncyx.xgyjsx.com/shop',
    swiperScale: 1.3,
    payGetTimes: 10, //支付回调次数
    share: {
        default: {
            shareIndex: true,
            timelineTitle: '首页', //分享朋友圈 title
            appMessageTitle: '首页', //分享朋友 title
            desc: '这个是在config js 设置的'
        },
        dynamic: {
            timelineTitle: '实时动态', //实时动态分享朋友圈 title
            appMessageTitle: '实时动态', //实时动态分享朋友 title
            desc: '这个是在config js 设置的'
        },
        joinUs: {
            timelineTitle: '邀请你加入我的团队', //我的推荐码分享朋友圈 title
            appMessageTitle: '邀请你加入我的团队', //我的推荐码分享朋友 title
            desc: '这个是在config js 设置的'
        }
    },
    request: {
        'farmMsg': '/home/farm/get', //农场信息
        'shopInfo': '/home/shopinfo', //商店信息
        'farmList': '/home/farm/list', //农场列表
        'proDetail': '/home/goods/detail', //商品详情
        'proBanner': '/home/goods/banner', //商品banner
        'bannerList': '/home/banner/list', //首页banner（广告） 数据
        'listByFarm': '/home/goods/listbyfarm', //农场商品列表
        'listByType': '/home/goods/listbytype', //类型销售列表
        'singleList': '/home/farm/single/list', //单品页商品列表
        'allProList': '/home/goods/list', //所有商品的列表
        'proRateList': '/home/goods/rate/list', //商品评价
        'proBaseDetail': '/home/goods/baseinfo', //商品详情
        'singleBanners': '/home/farm/single/banners', //单品banner
        'listByGoodsType': '/home/goods/listbygoodstype', //类型商品列表
        'login': '/customer/login', //登录
        'myinfo': '/customer/myinfo', //用户信息包括订单信息
        'userInfo': '/customer/userInfo', //用户信息
        'deleteAddr': '/customer/receiver/delete', //删除用户收货地
        'setdefault': '/customer/receiver/setdefault', //设定用户收货地址默认值
        'addAddress': '/customer/CustomerBasic/addReceiver', //用户添加收货地址
        'getShopCode': '/customer/getShopCode', //我的店铺code
        'receiverList': '/customer/receiver/list', //用户收货地址列表
        'getInviteCode': '/customer/getInviteCode', //我的推荐code
        'updateReceiver': '/customer/CustomerBasic/updateReceiver', //修改收货地址
        'joinGoods': '/shoppingcart/goods/join', //加入购物车
        'removeGoods': '/shoppingcart/goods/remove', //删除购物车商品
        'carGoodsList': '/shoppingcart/goods/list', //购物车商品列表
        'updateNumber': '/shoppingcart/goodsnumber/update', //更新购买数量
        'tradeList': '/trade/tradeOrder/orderList', //订单列表
        'createTtade': '/trade/order/create', //创建订单
        'deleteOrder': '/trade/tradeOrder/delete', //删除订单
        'orderDetail': '/trade/tradeOrder/orderDetail', //订单基本信息
        'expressInfo': '/trade/tradeOrder/expressinfo', //物流信息
        'bigTradeList': '/trade/tradeOrder/bigTradeList', //大客户交易列表
        'bigOrderList': '/trade/tradeOrder/bigOrderList', //大客户订单列表
        'deleteBigTrade': '/trade/tradeOrder/deleteBigTrade', //删除订单
        'bigOrderDetail': '/trade/tradeOrder/tradeToOrderDetail', //大客户订单基本信息
        'receiveConfirm': '/trade/tradeOrder/confirm', //确认收货
        'createBigTtade': '/trade/order/createBig', //创建大客户订单
        'expressbaseinfo': '/trade/tradeOrder/expressbaseinfo', //订单基本信息
        'getAuthInfo': '/wechat/auth/getAuthInfo', //微信jssdk配置信息获取接口
        'pay': '/order/pay', //发起微信支付
        'payrecord': '/order/payrecord', //获取调取微信支付控件的信息
        'like': '/dynamic/praise/add', //点赞
        'unlike': '/dynamic/praise/cancel', //取消点赞
        'addComment': '/dynamic/comment/add', //添加评论
        'dynamicList': '/dynamic/list', //商品动态信息
        'dynamicInfo': '/dynamic/info', //动态信息
        'deleteComment': '/dynamic/comment/delete', //删除评论
        'farmDynamicList': '/dynamic/farm/list', //农场动态信息
        'applySeller': '/apply/applySeller', //要加盟
        'applySupplier': '/apply/applySupplier', //有货源
        'couponMsg': '/coupon/state', //优惠券信息
        'couponReceive': '/coupon/receive', //优惠券领取
        'couponAll': '/customer/getCoupons', //所有优惠券
        'couponEffective': '/coupon/list', //所有有效的优惠券
        'communityList': '/community/list', //社区列表
    }
}

window.dev = {
    token: '63880f9c-d5b2-4db7-a03d-03312fa5cb54',
    // token: 'e3c1f7f2-4e93-4c6f-9e7c-e433092df0e7',
    shopcode: '42324389-351e-42ab-baef-0238e8e43c73'
}

// 屈大嘴 token : 86525933-b35f-44bd-9338-4c7552aebd49
// 屈大嘴 shopcode : 17556067-cb03-4b2e-9f88-4298d3f48abb
// 开发 token ：0a14213e-9987-466f-b26f-0e5ab07f3908
// 开发 shopcode : b0e54dc5-a5fc-4ac7-90ea-fc7c4268c160
