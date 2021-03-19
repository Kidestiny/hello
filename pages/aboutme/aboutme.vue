<template>
	<view>
		<view class="u-content">
			<u-parse :html="content"></u-parse>
			<view class="support"><u-image bindtap="previewImage" mode="widthFix" width="100%" height="600rpx" :show-menu-by-longpress="show" :src="url"></u-image></view>
			<view class="supportbutton"><u-button type="default" @click="saveToAlbum">点击保存赞赏码，支持一下</u-button></view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true,
				url: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/supportme.jpg?sign=ab039f68f6f3dff6d9524ad150e252d9&t=1616049049',
				content: `<p> 如果有任何问题可以联系我 </p>
							<p>邮箱：destinysgs@163.com</p>
							<p>QQ群：937602725</p>`,
			}
		},
		// previewImage: function() {
		// 	wx.previewImage({
		// 		urls: ['cloud://carutil-007.6361-carutil-007/admire-qrcode.jpg'],
		// 	});
		//   },
		methods: {
			
			saveToAlbum() {
			    // 下载图片资源到本地
			    wx.downloadFile({
			        url: this.url,
			        success: function (res) {
			            // 保存图片到相册
			            wx.saveImageToPhotosAlbum({
			                filePath: res.tempFilePath,
			                success(res) {
			                    // 保存成功
			                },
			                fail: () => {
			                    // 保存失败
			                }
			            });
			        },
			        fail: () => {
			            // 下载失败
			        }
			    });
			}
		},
		 previewImage: function(e) {
			var current = e.target.dataset.src;
			wx.previewImage({
			  current: current,
			  urls: [current]
			})
		  },
	}
</script>

<style>
.u-content {
	margin-top: 40rpx;
	margin-left: 20rpx;
}
.support{
	margin-top: 50rpx;
	width: 95%;
	height: 80%;
	/* display: flex;
	justify-content: center; */
}
.supportbutton{
	width: 90%;
	margin: 10rpx 10rpx 10rpx 10rpx;
}
</style>
