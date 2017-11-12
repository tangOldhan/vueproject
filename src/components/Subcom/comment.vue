<template>
  <div>
    <div class="sendcomn">
      <h4>发表意见</h4>
      <hr>
      <textarea v-model="content" placeholder="请在此输入评论内容..."></textarea>
      <mt-button type="primary" size="large" @click = "postcomn">提交评论</mt-button>
    </div>
    <div class="usercomn">
      <ul>
        <li v-for="(item,index) in comlist" :key="index">
          <p v-text="(index+1)+'L'+item.user_name"></p>
          <p v-html="item.content"></p>
          <p>{{item.add_time}}</p>
        </li>
      </ul>
      <mt-button type="default" size="large" @click="getmore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import common from '../../assets/js/common.js'
export default {
  data () {
    return {
      content:'',
      comlist:[],
      index:1,
    };
  },
  props:['id'],
  methods:{
    getList(){
      var url = common.devapi+"/api/getcomments/"+this.id+"?pageindex="+this.index;
      this.$http.get(url).then(function(res){
        if(res.body.status != 0){
          Toast("获取数据失败");
          return
        }
        if(res.body.message == []){
          Toast("我也是有下限的...")
        }
        this.comlist = this.comlist.concat(res.body.message)
      })
    },
    postcomn(){
      if(this.content == ""){
        Toast("内容不能为空")
        return
      }
      var url = common.devapi+"/api/postcomment/"+this.id;
      this.$http.post(url,{content:this.content},{emulateJSON:true})
        .then(function(res){
          this.comlist = [{user_name:"匿名小明",add_time:new Date,content:this.content}].concat(this.comlist);
          this.content = ""
        })
    },
    getmore(){
      this.index++;
      this.getList()

    }

  },
  created(){
    this.getList()
  }
}
</script>

<style lang="css" scoped>

</style>