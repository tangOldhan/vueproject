<template>
  <div>
    <div id="mui-content" class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="(item,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link :to="'/goods/goodsinfo/'+item.id">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body">{{item.title}}</div>
                    <div class="desc">
                      <p>
                        <span class="price">¥{{item.sell_price}}</span>
                        <s>¥{{item.market_price}}</s>
                      </p>
                      <p>
                        <span>hot</span>
                        <span>剩余{{item.stock_quantity}}件</span>
                      </p>
                    </div>
                </router-link>
            </li>
		        
		    </ul>    
		</div>
  </div>
</template>
<script>
import common from "../../assets/js/common"
import {Toast} from "mint-ui"
export default {
  data () {
    return {
      list:[]
    };
  },
  created(){
    this.getlist()
  },
  methods:{
    getlist(){
      var url = common.devapi+"/api/getgoods?pageindex=1";
      this.$http.get(url).then(function(res){
        if(res.body.status !=0){
          Toast(res.body.message);
          return;
        }
        this.list = res.body.message
      })
    }
  }
}
</script>
<style lang="css" scoped>
#mui-content ul, #mui-content li{
  padding: 0;
  margin: 0;
}
#mui-content li{
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 1px
}
#mui-content a {
  width: 100%;
  padding: 0;
  margin: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
  font-size: 12px;
  color: deepskyblue;
}
.desc {
  margin-top: 10px;
  height: 60px;
  background-color: #eee;
}
.desc .price {
  margin-right: 10px;
  color: red;
}
</style>