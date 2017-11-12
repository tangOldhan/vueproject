<template>
  <div>
    <h4>{{imginfo.title}}</h4>
    <p>{{imginfo.add_time}}</p>
    <hr>

    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)">
        </li>
      </ul> 
		</div>
    <p v-html="imginfo.content"></p>

    <comment :id="imgid"></comment>
  </div>
</template>
<script>
import comment from "../Subcom/comment.vue"
import common from "../../assets/js/common"
export default {
  components:{
    comment
  },
  data () {
    return {
      imgid:this.$route.params.imgid,
      imginfo:{},
      minimg:[],
      list:[{
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 400
        }, {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }]
    };
  },
  methods:{
    getinfo(){
      var url = common.devapi + "/api/getimageInfo/"+this.imgid;
      this.$http.get(url).then(function(res){
        this.imginfo = res.body.message[0]
      })
    },
    getthum(){
      var url = common.devapi + "/api/getthumimages/"+this.imgid;
      this.$http.get(url).then(function(res){
        this.minimg = res.body.message;
      })
    }
  },
  created(){
    this.getinfo();
    this.getthum()
  }
}
</script>
<style lang="css" scoped>
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
</style>