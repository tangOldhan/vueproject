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
          <li> <a href="#">删除</a> </li>
        </ul>
      </div>
      
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
        datalist:[]
      }
    },
    created(){
      this.getlist();
    },
    methods:{
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
        console.log(obj);
        var idStr = '';
        for (var key in obj) {
          idStr += key + ",";
        
        }
        idStr = idStr.substr(0,idStr.length-1);

        var url = common.devapi+'/api/goods/getshopcarlist/'+idStr;
        this.$http.get(url).then(function(res){

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
</style>
