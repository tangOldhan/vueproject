<template>
  <div>
goodsinfo {{id}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      id:0
    };
  },
  created(){
    this.id = this.$route.params.goodsid
  },
  methods:{

}
}
</script>
<style lang="css" scoped>

</style>