<template name="tipTop">
	<view >
		<u-popup v-model="showPopup" mode="center" border-radius="14" width="100%" height="40%">
			<view style="text-align: center;margin: 2rpx ;"><text>恭喜获得传说皮肤{{name}}</text></view>
			<u-image width="100%" height="100%" :src="src"></u-image>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"tipTop",
		data() {
			return {
				
			};
		},
		props:{
			showPopup:{
				type: Boolean,
				default: false
			},
			name:{
				type: String,
				default: ""
			},
			src:{
				type:String,
				default:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/1.gif?sign=52638bcb8169f43876cb5a2467b41233&t=1617456586"
			}
		}
	}
</script>

<style lang="scss">

</style>
