<template name="swip">
	<view>
		<official-account></official-account>
		<!-- <web-view src="https://mp.weixin.qq.com/"></web-view> -->
		<view class="wrap">
			<u-swiper :effect3d="true" :title="true" :interval="3000" :list="list" @click="myClick(index)"></u-swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: "swip",
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '许攸攻略',
						src:'https://mp.weixin.qq.com/s/obOPyWsb_6InonaHbSuOvA',
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				]
			};
		},
		methods:{
			myClick(index){
				console.log(index);
				
			}
		},
		onLoad() {
			// uni.request({
			// 	// url: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/dreanHallData.json?sign=1a8ad80be94014a9b12b5c5c0c85dfc6&t=1616408834",
			// 	url: configURL.dreanHallData,
			// 	method: "GET",
			// 	success: (res) => {
			// 		this.list = res.list;
					
			// 		console.log(this.list)
			// 		console.log(res.data)
			// 	}
			// });
		}
	}
</script>

<style lang="scss">

</style>
