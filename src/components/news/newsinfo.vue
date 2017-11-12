<template>
  <div>
    <div class="newsinfo">
      <h4 v-text="newsinfo.title"></h4>
      <p>{{newsinfo.add_time}}</p>
      <p v-html="newsinfo.content"></p>
    </div>
    <comment :id="newsid"></comment>
  </div>
</template>
<script>
import comment from "../Subcom/comment.vue"
import common from "../../assets/js/common.js"
export default {
  data () {
    return {
      newsinfo:{},
      newsid:this.$route.params.newsid
    };
  },
  components:{
    comment,
  },
  methods:{
    getInfo(){
      var url = common.devapi+"/api/getnew/"+this.newsid;
      this.$http.get(url).then(function(res){
        this.newsinfo = res.body.message[0];
      })
    }
  },
  created(){
    this.getInfo()
  }
}
</script>
<style lang="css" scoped>

</style>