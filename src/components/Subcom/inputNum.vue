<template>
  <div>
      <mt-button type="default" size="small" @click="substract">-</mt-button>
      <mt-button type="default" size="small">{{count}}</mt-button>
      <mt-button type="default" size="small" @click="add">+</mt-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count:1
    };
  },
  methods:{
    add(){
      this.count++;
      this.postData();
    },
    substract(){
      if(this.count == 1){
        return
      }
      this.count--;
      this.postData();
    },
    postData(){
      this.$emit("senddata",this.count)
    }
  }
}
</script>
<style lang="css" scoped>

</style>