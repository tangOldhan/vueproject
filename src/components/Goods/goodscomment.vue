<template>
  <div>
    goodscomment{{id}}
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from '../Subcom/comment'
export default {
  components:{
    comment
  },
  data () {
    return {
      id:null
    };
  },
  created(){
    this.id = this.$route.params.id
  },
  methods:{

  }
}
</script>
<style lang="css" scoped>

</style>