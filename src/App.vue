<template>
  <div id="app">
    <header class="mint-header is-fixed"><div class="mint-header-button is-left"></div> <h1 class="mint-header-title">固定在顶部</h1> <div class="mint-header-button is-right"></div></header>
    <router-view class="main"></router-view>
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon iconfont icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon iconfont icon-huiyuan"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon iconfont icon-cart">
					<span id="badge" class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="search">
				<span class="mui-icon iconfont icon-magnifier"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
import {vm,COUNTSTR} from "../src/assets/js/vm"
export default {
	name: 'app',
	created(){
		vm.$on(COUNTSTR,function(count){
			var badge = document.querySelector("#badge");
			badge.innerText = (badge.innerText - 0)+count;
		})
	},
}
</script>

<style scoped>
.main {
  margin:40px 0 50px 0;
}
</style>
