<template>
  <div>
    <h4>{{desc.title}}</h4>
    <div class="content" v-html="desc.content"></div>
  </div>
</template>
<script>
import common from "../../assets/js/common"
export default {
  data () {
    return {
      id:0,
      desc:{}
    };
  },
  created(){
    this.id = this.$route.params.id;
    this.getdesc()
  },
  methods:{
    getdesc(){
      var url = common.devapi + "/api/goods/getdesc/" + this.id;
      this.$http.get(url).then(function(res){
        this.desc = res.body.message[0];

      })
    },
  }
}
</script>
<style lang="css" scoped>

</style>