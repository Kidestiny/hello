<template>
	<view class="content">
		<u-parse :html="content"></u-parse>

		<view class="btn-area">
			<navigator target="miniProgram" open-type="navigate" app-id="wx62dacf83e921e209" path="pages/luckbox/luckbox"
			 extra-data="" version="release" class='nav'>我要抽盒子</navigator>

		</view>
		<u-button open-type="share">
			<view>分享给好友</view>
		</u-button>
		<view style="margin: 10rpx 0;">
			<u-button open-type="contact" ripple="true" plain="true" >
				<view>联系我们</view>
			</u-button>
		</view> 
		<ad unit-id="adunit-94bbe7d6636ac920"></ad>
		<view style="position: absolute;bottom: 10rpx;margin: 0 auto;">
			<!-- <text style="text-align: center;" pages/comment/comment>免责声明|隐私政策</text> -->
			<navigator url="/pages/comment/comment">免责声明|隐私政策</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				content: `<p> 如果有任何问题可以联系我 </p>
							<p>邮箱：destinysgs@163.com</p>
							<p>QQ群：937602725</p>`,
			}
		},
		onLoad() {

		},
		methods: {

		},
		onShareAppMessage: function(res) {
			if (res.from === 'button') {
				console.log(res.target)
			}
			let title = '手杀抽武将模拟器'
			return {
				title: title,
				path: 'pages/tabbar/tabbar-1/tabbar-1',
				imageUrl: 'https://generalskin-6gg9v1nt779fc6a0-1305423356.tcloudbaseapp.com/share.jpg?sign=2e26cd16c0115436bf7d334f95a78396&t=1617189576'
			}
		},
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400rpx;
		margin: 0 10rpx;
		margin-top: 100rpx;
	}

	.btn-area {
		display: flex;

		margin: 10rpx 0;
	}

	.nav {
		color: #ffffff;
		/* height: 120rpx; */
		/* width: 50rpx; */
		flex: 1;
		font-size: 30rpx;
		line-height: 90rpx;
		background: #2979ff;
		text-align: center;
	}
</style>
