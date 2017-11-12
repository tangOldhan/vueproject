<template>
  <div>
    <div class="cates">
      <ul>
        <li @click="getList(0)">全部</li>
        <li v-for="(item,index) in cates" :key="index" @click = "getList(item.id)">
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="imgs">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <router-link :to="'/photo/photoinfo/'+item.id">
            <img :src="item.img_url" v-lazy="item.img_url">
            <div class="disc">
              <h4>{{item.title}}</h4>
              <p>{{item.zhaiyao}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import common from '../../assets/js/common.js'
export default {
  data () {
    return {
      cates:[],
      list:{},
    };
  },
  methods:{
    getcates(){
      var url = common.devapi+"/api/getimgcategory";
      this.$http.get(url).then(function(res){
        this.cates = res.body.message
      })
    },
    getList(id){
      var id = id || 0;
      var url = common.devapi + "/api/getimages/"+id;
      this.$http.get(url).then(function(res){
        this.list = res.body.message
      })
    }
  },
  created(){
    this.getcates();
    this.getList();
  }
}
</script>
<style lang="css" scoped>
  .cates {
    max-width: 414px;
    overflow-x: auto;
  }
  .cates ul{
    width: 1000px;
    padding-left: 5px;
    margin: 8px 0;
  }
  .cates ul li {
    list-style: none;
    display: inline-block;
    margin-left: 5px;
  }
  .imgs ul {
    margin: 0;
    padding: 0;
  }
  .imgs ul li {
    list-style: none;
    position: relative;
  }
  .imgs img {
    width: 100%;
  }
  .imgs .disc {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .2);
  }
  .disc h4 {
    color: #fff;
    font-size: 14px;
  }
  .disc p {
    color:#fff;
    font-size: 12px;
  }
  image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>