<template>
	<view class="content">
		<!-- <PageForm value="16" @childFn="parentFn"></PageForm> -->
		<!-- <u-input :border="border" type="select" :select-open="selectShow" v-model="boxValue" placeholder="请选择盒子" ></u-input> -->
		<!-- <u-switch v-model="checked"></u-switch> -->
		<!-- <view><u-button @click="luck(1)">抽一次</u-button></view> -->
		<view class="pageForm">
			<view class="formItem">
				<view class="textWord"><text>请输入权重等级(1~20)</text></view>
				<view class="myInput"><u-input :border="border" :type="type" v-model="levelValue" placeholder="请输入权重等级"></u-input></view>
			</view>
			<view class="formItem">
				
				<view class="textWord"><text>是否选择无图模式</text></view>
				<view class="mySwitch"><u-switch v-model="checked"></u-switch></view>
			</view>
			
		</view>
		<view style="margin: 0 5%;"><text>请输入权重等级并选择是否是无图模式，默认权重20，可以抽出全部武将，开启有图模式。点击抽一次和抽五次即可。</text></view>
		<view class="myButtonOut">
			<view class="myButtonIn">
				<u-button @click="luck(1)">抽1次</u-button>
			</view>
			<view class="myButtonIn">
				<u-button @click="luck(5)">抽5次(必出稀有)</u-button>
			</view>
		</view>
		<ad unit-id="adunit-c2c9c48c45ec5db4" ad-type="video" ad-theme="white"></ad>
		<view class="myButton">
			<u-button type="primary" @click="seeAllGenerals" :ripple="true">查看本次抽到的所有武将</u-button>
		</view>
		<view v-if="this.onceGiftArray.length!=0">
			<view>黑色是普通武将，紫色是精品，红色是史诗</view>
			<view v-for="(a , index) in onceGiftArray" :key="index" :style="{'color':a.grade>2?'#FA3534':(a.grade==2?'#800080':'#000000') ,'font-size':a.grade>2?'35px':'14px'} ">
				{{a.name}}
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="textC">
			<text>如果你想直接抽取100次，不想自己点击，可以使用拉满功能哦，广告结束即可获得结果。</text>
			<text>不过建议还是按照次数点击，更有抽奖的乐趣。</text>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSubmit100" :ripple="true">拉满(100个令)</u-button>
		</view>
		
		<!-- #endif -->
		<u-popup v-model="showPopup" mode="center" border-radius="14" width="500" height="800">
			<scroll-view scroll-y="true" style="height: 760rpx;margin-top: 30rpx;margin-bottom: 30rpx;">
				<view>
					<view v-if="this.allGiftArray.length!=0" v-for="(a , index) in allGiftArray"  :key="index" 
					:style="{'color':a.grade>2?'#FA3534':(a.grade==2?'#800080':'#000000'),'font-size':a.grade>2?'35px':'14px'}"
					>
						一共获得了{{a.number}}个{{a.name}}
					</view>
				</view>
			</scroll-view>
		</u-popup>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
</template>

<script>
// import PageForm from 'components/myPageForm/myPageForm';
export default {
	data() {
		return {
			title: 'Hello',
			levelValue:20,
			checked:true,
			border:true,
			type:'number',
			generals:[],
			allGiftArray:[],
			onceGiftArray:[],
			showPopup: false,
			videoAd : null,
			}
	},
	onLoad() {
		uni.request({
			url:"https://7367-sgs-5gwi2f826ca612c8-1304922515.tcb.qcloud.la/generals.json?sign=739e3718ddce4d0b0e32976d6cb7bba6&t=1708860116",
			method: "GET",
			success: (res) => {
				this.generals = res.data;
				console.log(res.data)
				console.log(this.generals[0])
			}
		});
		
		// 在页面onLoad回调事件中创建激励视频广告实例
		
		
		
		if (wx.createRewardedVideoAd) {
		  this.videoAd = wx.createRewardedVideoAd({
		    adUnitId: 'adunit-08c8515483c30966'
		  })
		  this.videoAd.onLoad(() => {})
		  this.videoAd.onError((err) => {})
		  this.videoAd.onClose((status) => {
			  if (status && status.isEnded || status === undefined) {
			          // 正常播放结束，下发奖励
			          // continue you code
					  console.log('succeed1');
					  this.luck(100);
			        } else {
			          // 播放中途退出，进行提示
					  console.log('succeed2')
					  this.$refs.uTips.show({
					  	title: '要查看完整广告才能获得奖励哦',
					  	type: 'error',
					  	duration: '2300'
					  });
			        }
		
		  })
		}
		
		
		
		
		
		
		
		
	},
	methods: {
		luck(num){
			console.log(num,this.checked,this.levelValue);
			this.action(parseInt(this.levelValue),num)
			console.log(this.allGiftArray)
		},
		// parentFn(payload){
		// 	console.log(payload);
		// }
		random(max){
			return parseInt(Math.random()*(max+1),10);
		},
		action(level,number){
			let allWeight=0;
			let newGiftGenerals=new Array();
			for(let i=0;i<this.generals.length;i++){
				if(this.generals[i].level<=level){
					allWeight+=this.generals[i].chance;
					let obj=Object.assign({}, this.generals[i]);
					obj.weight=allWeight;
					newGiftGenerals.push(obj);
					// if(showImg){
					// 	preLoadImg(obj.img);
					// }
				}
			}
			
			let giftArray=new Array();
			var subsidyIndex=number==5?this.random(4):-1;
			this.onceGiftArray=[];
			for(let i=0;i<number;i++){
				let obj=subsidyIndex!=-1&&subsidyIndex==i?this.subsidy():this.getGift(this.random(allWeight),newGiftGenerals)
				giftArray.push(obj);
				console.log(i,obj);
				this.addToAllGift(obj);
				this.onceGiftArray.push(obj);
				// var temp = true;
				// for(let i=0;i<this.onceGiftArray.length;i++){
				// 	if(obj.id==this.onceGiftArray[i].id){
				// 		this.onceGiftArray[i].number=this.onceGiftArray[i].number+1;
				// 		temp =  false;
				// 		console.log(temp,'重复了')
				// 		break;
				// 	}
				// }
				// if(temp){
				// 	console.log('重复了')
				// 	obj.number=1;
				// 	this.onceGiftArray.push(obj);
				// }
				// this.addToAllGift(obj);
			}
			console.log(this.onceGiftArray)
			// this.outAnimation(giftArray);
			
		},
		
		getGift(giftNumber,newGiftGenerals){
			for(let i=0;i<newGiftGenerals.length;i++){
				let obj=Object.assign({}, newGiftGenerals[i]);
				if(i==0&&giftNumber<=obj.weight){
					// this.onceGiftArray.push(obj);
					return obj;
				}
				let obj2=Object.assign({}, newGiftGenerals[i-1]);
				if(giftNumber>obj2.weight&&giftNumber<=obj.weight){
					// this.onceGiftArray.push(obj);
					return obj;
				}
			}
		},
		//必定1稀有
		subsidy(){
			let rareGenerals=[];
			for(let i of this.generals){
				if(i.grade==2){
					rareGenerals.push(i);
				}
			}
			let obj=rareGenerals[this.random(rareGenerals.length)];
			// this.onceGiftArray.push(obj);
			console.log(obj)
			return obj;
			return rareGenerals[this.random(rareGenerals.length)];
		},
		
		
		//添加到包裹
		addToAllGift(obj){
			for(let i=0;i<this.allGiftArray.length;i++){
				if(obj.id==this.allGiftArray[i].id){
					this.allGiftArray[i].number+=1;
					return;
				}
			}
			obj.number=1;
			this.allGiftArray.push(obj);
		},
		
		
		preLoadImg(url) { 
		　　var img = new Image(); 
		　　img.src = url; 
			if (img.complete) {
			　　return; 
			} 
		},

		
		seeAllGenerals(){
			this.showPopup = true;
		},
		
		
		
		
		onSubmit100(){
			
			if ( parseInt(this.levelValue) >0) {
				
				if (this.videoAd) {
				  this.videoAd.show().catch(() => {
					// 失败重试
					this.videoAd.load()
					  .then(() => {
						  this.videoAd.show();
						  // this.onSubmit(3000);
						  })
					  .catch(err => {
						console.log('激励视频 广告显示失败')
					  })
				  });
				 
				}
			}else {
				this.$refs.uTips.show({
					title: '权重等级为1~20，请正确输入',
					type: 'error',
					duration: '2300'
				});
		
			}
		},
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	},
	components:{
		// PageForm,
	},
	onShareAppMessage: function(e) {
		let title = '手杀抽武将模拟器'
		return {
			title: title,
			path: 'pages/tabbar/tabbar-1/tabbar-1'
		}
	},
	onShareTimeline() {
	
		let title = '手杀抽武将模拟器'
		return {
			title: title,
			query: '',
			imageUrl: 'https://generalskin-6gg9v1nt779fc6a0-1305423356.tcloudbaseapp.com/logo.png?sign=57249a8973f6ea5e74d15bac0941500f&t=1617186790',
		}
	}
	
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
.pageForm {
	margin-top: -200rpx;
	padding: 15rpx;
	display: flex;
	margin-left: 10rpx;
}
.formItem {
	flex: 1;
}
.textWord {
	padding: 10rpx;;
}
.mySwitch{
	margin-top: 5rpx;
}
.myButtonOut{
	display: flex;
	margin: 10rpx 30rpx;
}
.myButtonIn{
	flex: 1;
	margin: 0rpx 20rpx;
}
.myInput{
	width: 80%;
	margin-left: 10%;
	
}
.myInput .u-input{
	text-align: center!important;
}
.myButton {
	/* width: 50rpx; */
	/* margin-left: -100rpx; */
	padding: 8rpx;
	font-size: 14rpx;
}
</style>
