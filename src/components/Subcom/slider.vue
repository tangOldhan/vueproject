<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props:['imgs'],
  data () {
    return {
    
    };
  },
  methods:{

  }
}
</script>
<style lang="css" scoped>
  .mint-swipe{
    width: 100%;
    height: 222px;
  }
  .mint-swipe img {
    width: 100%;
  }
</style>