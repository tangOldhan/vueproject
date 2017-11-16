<template>
  <div>
      <mt-button type="default" size="small" @click="substract">-</mt-button>
      <mt-button type="default" size="small">{{count}}</mt-button>
      <mt-button type="default" size="small" @click="add">+</mt-button>
  </div>
</template>
<script>
export default {
  props:['realcount','goodsid'],
  data () {
    return {
      resObj:{goodsid:0,type:'add'},
      count:1
    };
  },
  created(){
    this.count = this.realcount;
  },
  methods:{
    add(){
      this.count++;
      this.postData("add");
    },
    substract(){
      if(this.count == 1){
        return
      }
      this.count--;
      this.postData("substract");
    },
    postData(type){
      this.resObj.type = type
      this.resObj.goodsid = this.goodsid
      this.$emit("senddata",this.resObj)
    }
  }
}
</script>
<style lang="css" scoped>

</style>