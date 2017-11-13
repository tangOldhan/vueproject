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
        <li>
          购买数量：
        </li>
        <li>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small">加入购物车</mt-button>
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
export default {
  components:{
    slider
  },
  data () {
    return {
      id:0,
      list:[],
      info:{}
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
</style>