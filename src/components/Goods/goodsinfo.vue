<template>
  <div>
    <div id="slider">
      <slider :imgs="list"></slider>
    </div>
    <div id="buy">
      <h4 v-text="info.title"></h4>
      <p class="line"></p>
      <ul>
        <li>
          市场价:¥<s>{{info.market_price}}</s> 销售价:<span class="price">¥{{info.sell_price}}</span>
        </li>
        <li class="relative">
          购买数量：<inputnum class="abs" @senddata="getcount"></inputnum>
          <transition name="show" 
            @before-enter="beforeEnter" 
            @enter="enter"
            @after-enter="afterEnter">

            <div v-if="showball" class="ball"></div>
          </transition>

        </li>
        <li>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <div id="params">
      <h4>商品参数</h4>
      <p class="line"></p>
      <ul>
        <li>商品货号:{{info.goods_no}}</li>
        <li>库存情况:{{info.stock_quantity}}</li>
        <li>上架时间:{{info.add_time}}</li>
      </ul>
    </div>
    <div id="other">
      <router-link :to="'/goods/goodsdesc/'+id">
        <mt-button class="btn" type="primary" size="large">图文详情</mt-button>
      </router-link>
      <router-link :to="'/goods/goodscomment/'+id">
        <mt-button class="btn" type="danger" size="large">商品评论</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import slider from '../Subcom/slider.vue'
import common from '../../assets/js/common'
import inputnum from '../Subcom/inputNum'
import {vm,COUNTSTR} from '../../assets/js/vm'
import localdata from '../../assets/js/localdata'
export default {
  components:{
    slider,
    inputnum
  },
  data () {
    return {
      id:0,
      list:[],
      info:{},
      goodsquantity:1,
      showball:false,
    };
  },
  created(){
    this.id = this.$route.params.goodsid;
    this.getlist();
    this.getinfo()
  },
  methods:{
    getlist(){
      var url = common.devapi + '/api/getthumimages/' + this.id
      this.$http.get(url).then(function(res){
        res.body.message.forEach(element => {
          element['img'] = element['src']
        });
        this.list = res.body.message
      })
    },
    getinfo(){
      var url = common.devapi + '/api/goods/getinfo/'+ this.id;
      this.$http.get(url).then(function(res){
        this.info = res.body.message[0]
      })
    },
    getcount(count){
      this.goodsquantity = count;
    },
    addToCar(){
      vm.$emit(COUNTSTR,this.goodsquantity);
      localdata.addToLocal({goodsid:this.id,count:this.goodsquantity});
      this.showball = !this.showball;//点击添加 显示小球
    },
    beforeEnter(el){
      el.style.transform = "translate(0,0)"
    },
    enter(el,done){
      el.offsetWidth;
      el.style.transform = "translate(80px,360px)";
      done();

    },
    afterEnter(el){
      this.showball = !this.showball
    }
  }
}
</script>


<style lang="css" scoped>
  #slider {
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
  }

  #buy,#params{
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
  }
  #buy h4,#params h4{
    color: deepskyblue
  }
  #buy .line,#params .line {
    height: 1px;
    background-color: #ccc;
  }
  #buy .price {
    color: red
  }
  #buy ul,#params ul{
    padding-left: 5px;
    font-size: 14px;
  }
  #buy li,#params li {
    list-style:none;
    padding: 5px
  }
  #other {
    padding: 5px;
  }
  #other .btn {
    margin-bottom: 5px
  }

  .relative{
    position: relative;
    margin: 10px 0;
    font-size: 16px;
  }
  .abs {
    position: absolute;
    top: 0;
    left: 100px;
  }
  .ball {
    position: absolute;
    top:-8px;
    left:143px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    z-index: 100;
    transition: all 0.3s ease;
  }
</style>