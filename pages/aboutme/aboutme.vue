<template>
	<view>
		<view class="u-content">
			<u-parse :html="content"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: `<p> 如果有任何问题可以联系我 </p>
							<p>邮箱：destinysgs@163.com</p>
							<p>QQ群：937602725</p>`,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.u-content {
	margin-top: 40rpx;
	margin-left: 20rpx;
}
</style>
