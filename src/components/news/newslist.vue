<template>
  <div>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
					<router-link :to="'/news/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class="mui-ellipsis">{{item.zhaiyao}}</p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newslist:{}
    };
  },
  methods:{
    getlist(){
      var url = "http://vue.studyit.io/api/getnewslist"
      this.$http.get(url).then(function(res){
        this.newslist = res.body.message
      })
    }
  },
  created(){
    this.getlist()
  }
}
</script>
<style lang="css" scoped>

</style>