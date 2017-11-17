<template>
  <div id="app">
    <header class="mint-header is-fixed">
			<div class="mint-header-button is-left" v-text="showBack?'Back':''" @click="backto"></div> 
			<h1 class="mint-header-title">vue project</h1> 
			<div class="mint-header-button is-right"></div>
		</header>
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
					<span id="badge" class="mui-badge" v-text="goodsquantity"></span>
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
import localdata from "./assets/js/localdata"
import {vm,COUNTSTR} from "../src/assets/js/vm"
export default {
	name: 'app',
	created(){
		this.getQuantity()
		vm.$on(COUNTSTR,(count)=>{
			console.log(count)
			this.goodsquantity += count;
			console.log('add one')
		})
		
	},
	data(){
		return {
			showBack:false,
			goodsquantity:0
		}
	},
	methods:{
		backto(){
			this.$router.go(-1)
		},
		getQuantity(){
			var localcount=0;
			var arr = localdata.getLocalData();
			for(var i=0; i<arr.length; i++){
				localcount += arr[i].count
			}
			this.goodsquantity = localcount
		}
	},
	watch:{
		"$route":function(newer,older){
			if(newer.path !== "/home"){
				this.showBack = true;
			}else{
				this.showBack = false;
			}
		}
	}
}
</script>

<style scoped>
.main {
  margin:40px 0 50px 0;
}
</style>
