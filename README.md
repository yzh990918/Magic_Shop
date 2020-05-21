
 # 解忧杂货店商城

<p text-align="center">
<img width="100%" src="https://image.yangxiansheng.top/img/undraw_business_shop_qw5t.png?imagelist"/>
</p>

[![Spring Boot](https://img.shields.io/badge/spring--boot-2.2.2.RELEASE-brightgreen)](https://github.com/spring-projects/spring-boot)
[![lin-ui](https://img.shields.io/npm/v/lin-ui.svg)](https://github.com/TaleLin/lin-ui)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/251205668/Magic_Shop/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/251205668/Magic_Shop.svg?style=social&label=Stars)](https://github.com/251205668/Magic_Shop)
 


- 解忧杂货店 是一个基于[Spring Boot](https://spring.io/projects/spring-boot/)和[微信小程序](https://developers.weixin.qq.com/doc/)的小程序电商系统,小程序的搭建离不开[LinUi](https://github.com/TaleLin/lin-ui)的贡献,感谢林间有风团队做出这么好用的UI组件库。
- 解忧杂货店 包含了小程序`c端`版本，小程序后端`API`版本
- 解忧杂货店后端[传送地址](https://github.com/251205668/store-springboot-api) ，部分接口尚未开源。
- c端接口文档地址[预览](https://easydoc.xyz/doc/22405834/YWl4dnqC/CHmppe5P)
- TODO: 商城后台管理系统cms,商城后台管理系统API开发.
 
## 演示
小程序的体验版二维码

![](https://image.yangxiansheng.top/img/20200521112157.png?imagelist)
## 功能模块
解忧杂货店包含了小程序c端商城和后端管理系统(开发中)
- 商城功能
    - 首页展示
    - 主题商品
    - 优惠券系统
    - 订单管理
    - 和服务端同步的购物车
    - banner管理
    - 分类
    - 个人中心
- c端细节难点
    - **sku**选择面板页面逻辑
    - **和服务端同步的购物车**
    - 订单生成逻辑
    - **订单页面优惠券的选中,价格的核算**
    - 分类页面滚动条的处理
    - 分页模块的封装
    - JWT令牌在微信小程序的无感知刷新
    - 小程序封装请求函数，封装统一异常处理
    - 调用微信支付接口
- 服务端难点
    - sku,spu数据表的设计
    - PagingDozer的类的封装
    - 调用微信接口生成jwt令牌
    - 购物车校验
    - 全局异常处理
    - 统一请求返回数据
    - 优惠券系统，优惠券定时归还
    - 订单核算
- 后台管理系统(待添加)  

## 运行效果图

首页

![](https://image.yangxiansheng.top/img/首页图.gif?imagelist)

分类

![](https://image.yangxiansheng.top/img/分类.gif?imagelist)

专题

![](https://image.yangxiansheng.top/img/专题图.gif?imagelist)

详情

![](https://image.yangxiansheng.top/img/详情图加sku选择面板.gif?imagelist)

搜索

![](https://image.yangxiansheng.top/img/搜索.gif?imagelist)

购物车

![](https://image.yangxiansheng.top/img/购物车.gif?imagelist)

生成订单

![](https://image.yangxiansheng.top/img/订单结算.gif?imagelist)

管理订单

![](https://image.yangxiansheng.top/img/查询订单.gif?imagelist)

优惠券领取

![](https://image.yangxiansheng.top/img/查询优惠券状态.gif?imagelist)

个人中心

![](https://image.yangxiansheng.top/img/我的页面.gif?imagelist)


## 技术选型
后端

- 核心框架：Spring Boot
- 数据库层：Spring data jpa
- 数据库连接池：Druid
- 缓存：redis

前端 

- 核心框架: 微信小程序
- UI框架: LinUi
- 工具函数: LInUi辅助工具函数
- 图标: 阿里巴巴图标库


## 项目架构图

![](https://image.yangxiansheng.top/img/20200521125309.png?imagelist)



## 作者

👹[努力中的杨先生](https://github.com/251205668)
