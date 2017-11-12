<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imglist.message" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>

    <router-view></router-view>

    
      <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news/newslist">
                  <span class="mui-icon mui-icon-home"></span>
                  <div class="mui-media-body">News</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photo/photolist">
                  <span class="mui-icon mui-icon-image"></span>
                  <div class="mui-media-body">Photos</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                  <span class="mui-icon mui-icon-chatbubble"></span>
                  <div class="mui-media-body">Shopping</div></router-link></li>
      </ul> 
		


  </div>
</template>

<script>
  export default {
    data(){
      return{
        imglist:{}
      }
    },
    methods:{
      getlist(){
        var url = 'http://vue.studyit.io/api/getlunbo';
        this.$http.get(url).then(function(res){
          this.imglist = res.body;
        })
      }
    },
    created(){
      this.getlist()
    }
  }
</script>

<style scoped>
  
  .mint-swipe-item{
    /* background-color: darkcyan; */
  }
  .mint-swipe{
    width: 100%;
    height: 222px;
  }
  img {
    width: 100%;
  }

.mui-grid-view.mui-grid-9{
  background-color: #fff;
}
  .mui-content ul{
    /* background-color: #fff; */
    border-top: 0;
    border-left: 0;
  }
   .mui-grid-view.mui-grid-9 .mui-table-view-cell{
     border-right:0;
     border-bottom:0;
   }
   .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
     line-height: 18px;
     height: 18px;
   }
</style>

