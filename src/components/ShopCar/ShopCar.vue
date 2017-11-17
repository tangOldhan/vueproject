<template>
  <div>
    <div class="list" v-for="(item,index) in datalist" :key="index">
      <mt-switch class="switch" v-model="value[index]"></mt-switch>
      <img :src="item.thumb_path" alt="">
      <div class="list-right">
        <h4 v-text="item.title"></h4>
        <ul>
          <li>¥{{item.sell_price}}</li>
          <li><carInputNum :realcount="item.cou" :goodsid="item.id" @senddata="getInputNum"></carInputNum></li>
          <li> <a href="javascript:void(0)" @click="delrow(item.id,index)">删除</a> </li>
        </ul>
      </div>
      
    </div>
    <div class="settleCount">
      <ul>
        <li><h4>总计:(不含运费)</h4></li>
        <li>已勾选商品{{totalCount}}件，总价:¥{{totalAmount}}元</li>
      </ul>
      <mt-button type="danger" size="small">去结算</mt-button>
    </div>
    {{value}}
  </div>
</template>

<script>
  import localdata from '../../assets/js/localdata'
  import common from '../../assets/js/common';
  import carInputNum from '../Subcom/carInputNum.vue'
  export default{
    components:{
      carInputNum
    },
    data(){
      return {
        value:[],
        datalist:[],
        totalAmount:0
      }
    },
    created(){
      this.getlist();
    },
    computed:{
      totalCount(){
        var trueArr = this.value.filter(function(item){return item});

        var amount = 0;
        this.value.forEach((item,index)=>{
          if(item){
            var count = this.datalist[index].cou;
            var price = this.datalist[index].sell_price;
            var itemamount = count*price;
            amount += itemamount
          }
        })
        this.totalAmount = amount
        return trueArr.length
      }
    },
    methods:{
      //点击删除
      //  1.删除localStorage中对应id的所有值
      //  2.删除value中对应值
      //  3.删除datalist中对应的id的值
      delrow(id,index){
        this.value.splice(index,1);
        this.datalist.splice(index,1);
        localdata.removeData(id);
      },
      //获取子组件中传来的值 id count
      getInputNum(resObj){
        //更新本地数据
        localdata.updateData(resObj);
        //更新this.datalist中的当前数量
        
        for(var i=0; i<this.datalist.length; i++){
          if(this.datalist[i].id == resObj.goodsid){
            if(resObj.type == "add"){
              this.datalist[i].cou++
            }else{
              this.datalist[i].cou-- 
            }
          }
        }
        
      },
      getlist(){
        //从loaclStorage获取数据
        var obj = localdata.getLocalObj();
        // console.log(obj);
        var idStr = '';
        for (var key in obj) {
          idStr += key + ",";
        
        }
        idStr = idStr.substr(0,idStr.length-1);

        var url = common.devapi+'/api/goods/getshopcarlist/'+idStr;
        this.$http.get(url).then(function(res){
          //将本地数据中对应id的数量 赋值给服务器获得数据中对应id的数量值
          //因为服务器获得的数据中的商品数量全是1，只是用来占位，需要赋予真实值，从而在页面上渲染出真实值
          res.body.message.forEach(function(item){
            item.cou = obj[item.id];
          })

          this.datalist = res.body.message
        })
      }
    }
  }
</script>

<style scoped>
  .switch {
    margin-left: 10px;
  }
  .list {
    height: 100px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center
  }
  .list img {
    margin-left: 10px;
    width: 75px;
  }
  .list-right h4{
    color: deepskyblue;
    font-size: 14px;
  }
  .list-right ul {
    padding-left: 10px;
    display: flex;
  }
  .list-right ul li {
    list-style: none;
    margin-right: 10px
  }
  .list-right ul li:nth-of-type(1){
    color: red;
  }

  .settleCount{
    display: flex;
    align-items: center;
  }
  .settleCount ul {
    width: 240px;
    padding: 0 10px;
    font-size: 14px;
    margin-right: 30px
    
  }
</style>
