import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Member from '@/components/Member/Member.vue'
import Search from '@/components/Search/Search.vue'
import ShopCar from '@/components/ShopCar/ShopCar.vue'
import newslist from "../components/news/newslist.vue"
import newsinfo from "../components/news/newsinfo.vue"
import photolist from "../components/photo/photolist.vue"
import photoinfo from "../components/photo/photoinfo.vue"
import goodslist from "../components/Goods/goodslist.vue"
import goodsinfo from "../components/Goods/goodsinfo.vue"

Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {path: '/',redirect:'/home'},
    {path:'/home',component:Home},
    {path:'/member',component:Member},
    {path:'/search',component:Search},
    {path:'/shopcar',component:ShopCar},
    {path:'/news/newslist',component:newslist},
    {path:'/news/newsinfo/:newsid',component:newsinfo},
    {path:'/photo/photolist',component:photolist},
    {path:'/photo/photoinfo/:imgid',component:photoinfo},
    {path:'/goods/goodslist',component:goodslist},
    {path:'/goods/goodsinfo/:goodsid',component:goodsinfo}

  ]
})
