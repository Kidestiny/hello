<template>
	<view>
		
		<view class="myForm">
			<!-- <swip></swip> -->
			<u-form :model="form" ref="uForm" label-width="200rpx !important">
				<u-form-item label="请选择盒子">
					<!-- <u-radio-group type="select">
					<u-radio v-model="value" v-for="(item) in testData.boxData" :disabled="disabled" :key="item.data" :name="item.name" :value="item.data">
						{{ item.name }}
					</u-radio>
				</u-radio-group> -->
					<u-input :border="border" type="select" :select-open="selectShow" v-model="boxValue" placeholder="请选择盒子" @click="selectShow = true"></u-input>

				</u-form-item>

				<u-form-item label="请输入数量">
					<u-input v-model="form.num" :type="type" placeholder="盒子数量为1~50" />
				</u-form-item>
			</u-form>
		</view>

		<u-select v-model="selectShow" mode="mutil-column-auto" :list="list" @confirm="selectConfirm"></u-select>

		<view class="myButton">
			<u-button type="primary" @click="onSeeChance" :ripple="true">查看盒子详情</u-button>
		</view>
		<view class="textC">
			<text>选择盒子类型和数量，点击开始抽奖即可体验抽奖的乐趣。</text>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSubmit" :ripple="true" throttle-time="1000" >开始抽奖</u-button>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSeeAll" :ripple="true">查看本次打开的所有盒子</u-button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- <ad unit-id="adunit-f12e04361a70c0c1"></ad> -->
		<ad unit-id="adunit-c2c9c48c45ec5db4" ad-type="video" ad-theme="white"></ad>
		<!-- #endif -->
		<!-- <u-button @click="myclick"> get </u-button> -->

		<view v-if="sumSee" v-for="(o,index) in sum" :key="index">
			<text>一共打开了{{ o[1] }} 个 {{ o[0] }}</text>
		</view>

		<!-- <u-card v-if="allData != ''">
		  <view v-for="o in allData" >
			<view v-if="o[0] != '0'"> {{ o[1] }} {{ o[0] }}次 </view>
		  </view>
		  <view>{{allData}}</view>
		</u-card> -->


		<view v-for="(o,index) in allData" v-if="allData != ''" :key="index">
			<view v-if="o[0] != '0'"> {{ o[1] }} {{ o[0] }}次 </view>
		</view>

		
		
		<!-- #ifdef MP-WEIXIN -->
		<view class="textC">
			<text>拉满功能可以直接抽取3000次，广告结束即可获得结果。</text>
			<text>抽500盒子广告时间会相对更短。</text>
			<text>不过建议还是按照次数点击，更有抽奖的乐趣。</text>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSubmit3k" :ripple="true">拉满(3k盒子)</u-button>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSubmit5h" :ripple="true">抽500盒子(广告时间更短)</u-button>
		</view>
		<!-- #endif -->
		<view class="myButtonClear">
			<u-button type="primary" @click="clear" :plain="true" :ripple="true">清空背包</u-button>
		</view>
		<u-top-tips ref="uTips"></u-top-tips>
		<u-popup v-model="showPopup" mode="left" border-radius="14">
			<view v-for="(a , index) in onSeeChanceForceData" :key="index" class="myPopup">
				{{a}}
			</view>
		</u-popup>
		<u-mask :show="showMask">
			
			<view class="warp">
				<u-loading mode="circle">加载中</u-loading>
				<view style="font-size:20px;color: #DD524D;">数据加载中ing，请稍后</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import store from '@/store';
	import configURL from '@/configNetwork.js';
	import swip from '@/components/swip/swip.vue';
	export default {
		data() {
			return {
				name: '盒子模拟器',
				testData: '',
				num: '',
				show: true,
				boxValue: '',
				selectShow: false,
				type: "number",
				showMask: true,//遮光罩
				// list: [
				// 	{
				// 		value: 5,
				// 		label: '2021',
				// 		children: [{
				// 			label: "牛年大吉",
				// 			value: 'nn_dj'
				// 		}, {
				// 			label: "牛年福袋",
				// 			value: 'nn_fd'
				// 		}, ]
				// 	},{
				// 		value: 1,
				// 		label: '2020',
				// 		children: [{
				// 				label: "开黑节宝盒2",
				// 				value: 'kh_box_2021',
				// 			},
				// 			{
				// 				label: "冬至福袋2020",
				// 				value: 'dz_fd_2020',
				// 			},
				// 			{
				// 				label: "冬至盒子2020",
				// 				value: 'dz_box_2020'
				// 			},

				// 			{
				// 				label: "中秋福袋2020",
				// 				value: 'zq_fd_2020',
				// 			},
				// 			{
				// 				label: "中秋盒子2020",
				// 				value: 'zq_box_2020'
				// 			},
				// 			{
				// 				label: "开黑节宝盒",
				// 				value: 'kh_box_2020'
				// 			},
				// 			{
				// 				label: "七夕福袋2020",
				// 				value: 'qx_fd_2020',
				// 			},
				// 			{
				// 				label: "七夕盒子2020",
				// 				value: 'qx_box_2020'
				// 			},
				// 			{
				// 				label: "端午福袋2020",
				// 				value: 'dw_fd_2020',
				// 			},
				// 			{
				// 				label: "端午盒子2020",
				// 				value: 'dw_box_2020',
				// 				discount: 0
				// 			},
				// 			{
				// 				label: "五一福袋",
				// 				value: 'wy_fd',
				// 			},
				// 			{
				// 				label: "五一盒子",
				// 				value: 'wy_box',
				// 				discount: 0
				// 			},
				// 			{
				// 				label: "春分福袋",
				// 				value: 'cf_fd',
				// 			},
				// 			{
				// 				label: "春分盒子",
				// 				value: 'cf_box'
				// 			},
				// 		]
				// 	},
				// 	{
				// 		value: 2,
				// 		label: '2019',
				// 		children: [{
				// 				label: "鼠年福袋",
				// 				value: 'sn_fd',
				// 			},
				// 			{
				// 				label: "鼠年盒子2",
				// 				value: 'sn2_box'
				// 			},
				// 			{
				// 				label: "鼠年盒子1",
				// 				value: 'sn1_box'
				// 			},
				// 			{
				// 				label: "大雪福袋",
				// 				value: 'dx_fd',
				// 			},
				// 			{
				// 				label: "大雪盒子",
				// 				value: 'dx_box_2019'
				// 			},
				// 			{
				// 				label: "国庆(盛典)福袋",
				// 				value: 'gq_fd',
				// 			},
				// 			{
				// 				label: "国庆(盛典)盒子",
				// 				value: 'gq_box_2019'
				// 			},
				// 			{
				// 				label: "中秋福袋",
				// 				value: 'zq_fd',
				// 			},
				// 			{
				// 				label: "中秋盒子",
				// 				value: 'zq_box_2019'
				// 			},
				// 			{
				// 				label: "七夕福袋",
				// 				value: 'qx_fd',
				// 			},
				// 			{
				// 				label: "七夕盒子",
				// 				value: 'qx_box_2019'
				// 			},
				// 			{
				// 				label: "端午盒子",
				// 				value: 'dw_box_2019'
				// 			},
				// 			{
				// 				label: "魏之魂",
				// 				value: 'wei_box'
				// 			},
				// 			{
				// 				label: "蜀之魂",
				// 				value: 'shu_box'
				// 			},
				// 			{
				// 				label: "吴之魂",
				// 				value: 'wu_box'
				// 			},
				// 			{
				// 				label: "群之魂",
				// 				value: 'qun_box'
				// 			},
				// 		]
				// 	},
				// 	{
				// 		value: 3,
				// 		label: '2018',
				// 		children: [{
				// 				label: "猪1盒子",
				// 				value: 'zhu1_box'
				// 			},
				// 			{
				// 				label: "猪2盒子",
				// 				value: 'zhu2_box'
				// 			},
				// 			{
				// 				label: "2018圣诞盒子",
				// 				value: 'sd_box'
				// 			},
				// 			{
				// 				label: "2018国庆盒子",
				// 				value: 'gq_box'
				// 			},
				// 			{
				// 				label: "2018七夕盒子",
				// 				value: 'qx_box'
				// 			},
				// 			{
				// 				label: "2018中秋盒子",
				// 				value: 'zq_box'
				// 			},
				// 			{
				// 				label: "2018端午盒子",
				// 				value: 'dw_box'
				// 			},
				// 			{
				// 				label: "2018狗1盒子",
				// 				value: 'gou1_box'
				// 			},
				// 			{
				// 				label: "2018狗2盒子",
				// 				value: 'gou2_box'
				// 			},
				// 		]
				// 	},
				// 	{
				// 		value: 4,
				// 		label: '2017',
				// 		children: [{
				// 			label: "test",
				// 			value: 'test_box'
				// 		}, ]
				// 	}
				// ],
				list: [],
				value: null,
				sum: [],
				sumSee: false,
				sumData: [],
				allData: "",
				form: {
					num: "",
					value: "",
				},
				onSeeChanceForceData: '',
				showPopup: false,
				boxDataAll: [],
				videoAd : null,
				videoAd5h : null
			}
		},

		onLoad() {
			this.myclick();
			
			// 在页面中定义激励视频广告
			
			
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			  this.videoAd = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-38f6375c5c1294f4',
				multiton: true // 是否启用多例模式，默认为false
			  })
			  this.videoAd.onLoad(() => {})
			  this.videoAd.onError((err) => {})
			  this.videoAd.onClose((status) => {
				  if (status && status.isEnded || status === undefined) {
				          // 正常播放结束，下发奖励
				          // continue you code
						  console.log('succeed1');
						  this.onSubmit(3000)
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
			
			// 用户触发广告后，显示激励视频广告
			
			if (wx.createRewardedVideoAd) {
			  this.videoAd5h = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-f8f33a922ffb3ffc',
				multiton: true // 是否启用多例模式，默认为false
			  })
			  this.videoAd5h.onLoad(() => {})
			  this.videoAd5h.onError((err) => {})
			  this.videoAd5h.onClose((status) => {
				  if (status && status.isEnded || status === undefined) {
				          // 正常播放结束，下发奖励
				          // continue you code
						  console.log('succeed1');
						  this.onSubmit(500)
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
			// 点击actionSheet回调
			confirm(e) {
				console.log(e);
			},
			selectConfirm(e) {
				this.boxValue = '';
				e.map((val, index) => {
					this.boxValue += this.boxValue == '' ? val.label : '-' + val.label;
					this.form.value = val.value;
				})
			},
			myclick() {
				console.log("1212121~!!!!")
				uni.request({
					// url:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/luckboxTest.js?sign=b2c037e88f556adbc4d5f4b30afe7fd0&t=1617278680",
					// url: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/test_data.json?sign=695dc24e9b8b3e4b4e4537af61e5a8aa&t=1615987223",
					url:configURL.luckbox,
					method: "GET",
					success: (res) => {
						this.testData = res.data;
						store.commit('setTestValue', res.data);
						console.log(res.data);
						this.showMask=false;
					}
				});
				uni.request({
					//url: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/allDataUsed.json?sign=a825c023cd0fb539ca171b3fcb49009e&t=1615983691",
					// url: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/allDataUsedTest.json?sign=8107b4372f91d2f1c74425588cf0133b&t=1617277072",
					url:configURL.allDateUsed,
					method: "GET",
					success: (res) => {
						console.log(res.data);
						this.list = res.data[0];
						this.boxDataAll = res.data[1];
						// this.testData = res.data;
						// store.commit('setTestValue', res.data);
						// console.log(res.data)
					}
				});

			},
			onSubmit(myNumber) {
				this.sumSee = false;

				console.log("submit!");
				console.log(this.form.num);
				console.log(this.form.value);
				if (myNumber == 3000 || myNumber == 500 ) {
					this.form.num = 1;
				}
				if (
					Number(this.form.num) <= 50 &&
					Number(this.form.num) > 0 &&
					this.form.value !== ""
				) {
					if(myNumber == 3000 || myNumber == 500) {
						this.form.num = Number(myNumber);	
					}
					var boxDataAll = this.boxDataAll;
					console.log(boxDataAll);
					console.log('/*/*/*/*/*/*/*/*/*/*/*/*/*')
					console.log("sudddddbmit!");
					this.sum.forEach(item => {
						boxDataAll.forEach(it => {
							if (item[0] === it[1]) {
								item[0] = it[0];
							}
						});
					});

					console.log("123");
					console.log(this.sumData);
					console.log(this.allData);
					//算多少个盒子
					this.sum.push([this.form.value, parseInt(this.form.num)]);
					this.sum.forEach(item => {
						boxDataAll.forEach(it => {
							if (item[0] === it[1]) {
								item[0] = it[0];
							}
						});
					});
					let set = new Set();
					this.sum.forEach(item => {
						set.add(item[0]);
					});
					let arra = Array.from(set);
					let setArray = new Array(arra.length).fill(0);
					for (let i = 0; i < this.sum.length; i++) {
						var index = arra.map(item => item).indexOf(this.sum[i][0]);
						setArray[index] += this.sum[i][1];
					}
					// console.log(arra);
					// console.log(setArray);
					// console.log('1111111111111111111111111111111111111111111');
					let sumTemp = [];
					for (let i = 0; i < arra.length; i++) {
						let temp = [arra[i], setArray[i]];
						sumTemp.push(temp);
					}
					this.sum = sumTemp;

					// console.log(sumTemp);
					//计算盒子结束
					console.log(this.$store.state.testData);
					console.log(this.$store.state.testData[this.form.value]);
					console.log("this.$store.state[this.form.value]");
					console.log(this.form.value);
					let newHezi = this.$store.state.testData[this.form.value];

					console.log(newHezi);
					let length = newHezi.length;
					console.log(length);
					var arr = [];
					var arrChance = [];
					var arrNum = [];
					newHezi.forEach(item => {
						arr.push(item.name);
						arrChance.push(item.chance);
						arrNum.push(0);
					});
					//console.log(arr);
					//console.log(arrChance);
					//console.log(arrNum);
					for (let i = 0; i < this.form.num; i++) {
						let giftNumber = parseFloat((Math.random() * 100).toFixed(3));
						var sum = 0;
						for (let i = 0; i < arrChance.length; i++) {
							sum += arrChance[i];
							if (sum > giftNumber) {
								arrNum[i] += 1;
								break;
							}
						}
					}
					var result = "";
					var result1 = [];
					arrNum.forEach((item, index) => {
						result += item + arr[index] + "\n";
						result1.push([item, arr[index]]);
					});
					//console.log(result);
					this.allData = result1;
					//console.log(arr[10]+arrNum[10]);
					// console.log(result1);
					// console.log('111111111');
					//let oneTemp=[arr, arrChance,arrNum]; 删除chance
					let oneTemp = [arr, arrNum];

					let allDataTrans = [];
					let allDataTransNum = [];
					for (let i = 0; i < this.allData.length; i++) {
						allDataTrans.push(this.allData[i][1]);
						allDataTransNum.push(this.allData[i][0]);
					}
					// console.log(allDataTrans);
					// console.log(allDataTransNum);
					let allDataAfterTrans = [allDataTrans, allDataTransNum];
					// console.log('allDataTrans');
					this.sumData.push(allDataAfterTrans);

					console.log("this.sumData", this.sumData);
					console.log("this.sum", this.sum);
					console.log("this.allData", this.allData);
				} else {
					this.$refs.uTips.show({
						title: '盒子数量为1~50,请不要打开太多',
						type: 'error',
						duration: '2300'
					});

				}
			},
			onSubmit3k(){
				
				if (this.form.value !== "") {
					
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
						title: '请选择盒子类型',
						type: 'error',
						duration: '2300'
					});
			
				}
			},
			onSubmit5h(){
				
				if (this.form.value !== "") {
					
					if (this.videoAd5h) {
					  this.videoAd5h.show().catch(() => {
						// 失败重试
						this.videoAd5h.load()
						  .then(() => {
							  this.videoAd5h.show();
							  // this.onSubmit(3000);
							  })
						  .catch(err => {
							console.log('激励视频 广告显示失败')
						  })
					  });
					 
					}
				}else {
					this.$refs.uTips.show({
						title: '请选择盒子类型',
						type: 'error',
						duration: '2300'
					});

				}
			},
			open(e) {
				if (Number(e.target.value) > 50 || Number(e.target.value) <= 0)
					this.$refs.uTips.show({
						title: '请选择盒子类型，盒子数量为1~50',
						type: 'error',
						duration: '2300'
					});
			},
			onSeeAll() {
				if (!this.sumSee) {
					// let allDataTrans=[];
					// let allDataTransNum=[];
					// for(let i=0;i<this.allData.length;i++){
					//   allDataTrans.push(this.allData[i][1]);
					//   allDataTransNum.push(this.allData[i][0]);
					// }
					// console.log(allDataTrans);
					// console.log(allDataTransNum);
					// let allDataAfterTrans=[allDataTrans,allDataTransNum];
					// console.log('allDataTrans');
					// this.sumData.push(allDataAfterTrans);
					// console.log("seeall");
					let temp = this.sumData;
					// console.log(temp);
					let set = new Set();
					for (let i = 0; i < temp.length; i++) {
						let temp1 = temp[i];
						temp1[0].forEach(item => {
							set.add(item);
						});
					}
					// console.log(set);
					let arr = Array.from(set);
					let arrNum = new Array(arr.length).fill(0);
					// console.log(arr);
					// console.log(arrNum);
					for (let i = 0; i < temp.length; i++) {
						let temp1 = temp[i];

						for (let i = 0; i < temp1[0].length; i++) {
							var index = arr.map(item => item).indexOf(temp1[0][i]);
							arrNum[index] += parseInt(temp1[1][i]);
						}
					}
					// console.log(arr);
					// console.log(arrNum);
					let oneTemp = [];
					for (let i = 0; i < arr.length; i++) {
						let temp = [arrNum[i], arr[i]];
						oneTemp.push(temp);
					}
					this.sumData = [];
					this.sumData.push([arr, arrNum]);
					// console.log(this.sumData);
					this.allData = oneTemp;
					this.sumSee = true;
				}
			},

			onSeeChance() {
				console.log("onSeeChance");

				if (this.boxValue !== '') {
					console.log(this.boxValue);
					let newHezi = this.$store.state.testData[this.form.value];
					let str = [];
					str.push(this.boxValue + '的详情');
					str.push(' ');
					// newHezi.forEach(item => {
					// 	str = str + "<p>" + item.name + " " + item.chance + "% " + "</p>";
					// });
					newHezi.forEach(item => {
						let a = item.name + " " + item.chance + "% "
						str.push(a);
					});
					console.log(str);
					this.onSeeChanceForceData = str;
					this.showPopup = true;

				} else {
					this.$refs.uTips.show({
						title: '请选择盒子类型',
						type: 'error',
						duration: '2300'
					})
				}
			},
			clear() {
				this.value = null;
				this.sum = [];
				this.sumSee = false;
				this.sumData = [];
				this.allData = "";
				this.form.num = "";
				this.form.value = "";
				this.boxValue = ""
				this.$refs.uTips.show({
					title: '清空背包成功',
					type: 'success',
					duration: '2300'
				})

			},
			onShareAppMessage: function(e) {
				let title = '盒子模拟器'
				return {
					title: title,
					path: 'pages/luckbox/luckbox',
					imageUrl: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/shareBox.png?sign=22d7ba1f31fb52d4c2bbd4db16d91826&t=1617197912',
				}
			},
			onShareTimeline() {

				let title = '盒子模拟器'
				return {
					title: title,
					query: '',
					imageUrl: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/miniproject.png?sign=fc4192a8be6eebc6078e20bac23fac82&t=1616030627',
				}
			}

		},
		components:{
			swip
		}
	}
</script>
<style lang="scss">
	.myForm {
		margin-left: 20rpx;
		margin-top: 50rpx;
	}
</style>

<style scoped>
	.myMiddle {
		width: 80%;
	}

	.myButton {
		/* width: 50rpx; */
		/* margin-left: -100rpx; */
		padding: 8rpx;
		font-size: 14rpx;
	}

	.aboutMe {
		position: fixed;
		bottom: 9rpx;
		left: 9rpx;
	}
</style>

<style>
	.myPopup {
		margin: 10rpx 20rpx;
	}

	.myButtonClear {
		margin-left: 60%;
		/* margin-top: -60%; */
		padding: 10rpx;
		font-size: 14rpx;
	}
	.textC{
		margin-left: 10rpx;
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		
	}
</style>
