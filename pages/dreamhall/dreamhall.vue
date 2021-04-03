<template>
	<view>
		<view class="seleteAll myForm">
			<view class="seleteLeft">
				<text>请选择皮肤</text>
			</view>
			<view class="seleteRight">
				<u-radio-group type="select" v-model="value">
					<u-radio v-for="(item) in dreamHallData" :disabled="disabled" :key="item.data" :name="item.data">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</view>

		</view>
		<view class="myButtonAll">
			<view class="myButtonIn">
				<u-button type="primary" @click="onSubmit(1)" :ripple="true" :disabled="chip==25">抽1次</u-button>
			</view>
			<view class="myButtonIn">
				<u-button type="primary" @click="onSubmit(2)" :ripple="true" :disabled="chip==25">抽2次</u-button>
			</view>
			<view class="myButtonIn">
				<u-button type="primary" @click="onSubmit(5)" :ripple="true" :disabled="chip==25">抽5次</u-button>
			</view>
			<!-- <view class="myButtonIn">
				<u-button type="primary" @click="onSubmit(50)" :ripple="true" :disabled="chip==25">抽50次</u-button>
			</view> -->
		</view>

		<!-- <view class="myButton">
			<u-button type="primary" @click="onSeeAll" :ripple="true">查看本次打开的所有盒子</u-button>
		</view> -->
		<!-- <ad unit-id="adunit-f12e04361a70c0c1"></ad> -->
		<!-- <u-button @click="myclick"> get </u-button> -->
		<view class="myButton">
			<u-button type="primary" @click="onSeeChance" :ripple="true" >查看皮肤寻宝详情</u-button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<ad unit-id="adunit-042aa864551b3b7e" ad-type="video" ad-theme="white"></ad>
		<!-- #endif -->
		<view v-if="sumSee" v-for="(o,index) in sum" :key="index">
			<text>一共寻宝了{{ o[1] }} 次。花费了{{o[1]*300}}元宝， 共获得如下的奖励：
				<!-- 个 {{ o[0] }} --></text>
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
				<view v-if="chipSee">
					<text>一共获得了{{ chip }} 个碎片。</text>
					<text v-if="chip==25">恭喜获得了传说皮肤{{dataValue}}，请清空已经抽取的物品，继续开始</text>
				</view>
		<view class="myButtonClear">
			<u-button type="primary" @click="clear" :plain="true" :ripple="true">清空已经抽取的物品</u-button>
		</view>
		
		
		<!-- #ifdef MP-WEIXIN -->
		
		<view class="textC">
			<text>如果你想直接抽取50次（不建议），可以使用拉满功能哦，广告结束即可获得结果。</text>
			<text>不过建议还是按照次数点击，更有抽奖的乐趣。</text>
		</view>
		<view class="myButton">
			<u-button type="primary" @click="onSubmit50" :ripple="true" :disabled="chip==25">拉满50次(不建议)</u-button>
		</view>

		<!-- #endif -->
		
		
		<u-top-tips ref="uTips"></u-top-tips>
		<u-popup v-model="showPopup" mode="left" border-radius="14">
			<view v-for="(a , index) in onSeeChanceForceData" :key="index" class="myPopup">
				{{a}}
			</view>
		</u-popup>
		<myTipTop :showPopup="chip==2" :name="dataValue" :src="picSrc"></myTipTop>
	</view>
</template>

<script>
	import store from '@/store';
	import configURL from '@/configNetwork.js';
	import myTipTop from '@/components/tipTop/tipTop.vue'
	export default {
		data() {
			return {
				chip:0,
				chipSee:false,
				name: 'dreamhall',
				testData: '', //数据
				chanceData: '', //碎片
				num: '',
				show: true,
				boxValue: '',
				selectShow: false,
				type: "number",
				dreamHallData: '',
				list: [],
				value: null,          //对应的拿到的武将的名字的缩写
				sum: [],
				sumSee: false,
				sumData: [],
				allData: "",
				
				onSeeChanceForceData: '',
				showPopup: false,
				boxDataAll: [],
				videoAd: null,
				skinData: [],
				disabled: false,
				picSrc:"",
				dataValue:"",       //value对应的汉字
			}
		},

		onLoad() {
			this.myclick();

			// 在页面中定义激励视频广告


			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
				this.videoAd = wx.createRewardedVideoAd({
					adUnitId: 'adunit-4bc68a81adbcf9cf'
				})
				this.videoAd.onLoad(() => {})
				this.videoAd.onError((err) => {})
				this.videoAd.onClose((status) => {
					if (status && status.isEnded || status === undefined) {
						// 正常播放结束，下发奖励
						// continue you code
						console.log('succeed1');
						this.onSubmit(50);

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


		},
		methods: {
			// 点击actionSheet回调

			myclick() {
				console.log("1212121~!!!!")
				uni.request({
					// url: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/dreanHallData.json?sign=1a8ad80be94014a9b12b5c5c0c85dfc6&t=1616408834",
					url: configURL.dreanHallData,
					method: "GET",
					success: (res) => {
						this.dreamHallData = res.data[0];
						this.testData = res.data[1];
						this.chanceData = res.data[2];
						console.log(this.dreamHallData)
						console.log(res.data)
					}
				});


			},
			onSubmit(myNumber) {
				
				console.log("submit!");
				console.log(this.value);

				if (this.value !== null) {
					this.sumSee = true;
					this.chipSee = true;
					this.disabled = true;
					this.dreamHallData.forEach((item)=>{
						if(item.data==this.value){
							this.dataValue=item.name;
							this.picSrc=item.src;
						}
					})
					// console.log(this.dataValue,this.picSrc,"!@#$%^&**()")
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
					this.sum.push([this.value, parseInt(myNumber)]);
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
					let sumTemp = [];
					for (let i = 0; i < arra.length; i++) {
						let temp = [arra[i], setArray[i]];
						sumTemp.push(temp);
					}
					this.sum = sumTemp;

					// console.log(sumTemp);
					//计算盒子结束
					console.log(this.testData);
					console.log(this.testData[this.value]);
					console.log("this.$store.state[this.value]");
					console.log(this.value);
					let newHezi = this.testData[this.value];

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
					for (let i = 0; i < myNumber; i++) {
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
					// this.onSeeAll();
					let temp = this.sumData;
					set = new Set();
					for (let i = 0; i < temp.length; i++) {
						let temp1 = temp[i];
						temp1[0].forEach(item => {
							set.add(item);
						});
					}
					// console.log(set);
					arr = Array.from(set);
					arrNum = new Array(arr.length).fill(0);
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
					oneTemp = [];
					for (let i = 0; i < arr.length; i++) {
						let temp = [arrNum[i], arr[i]];
						oneTemp.push(temp);
					}
					this.sumData = [];
					this.sumData.push([arr, arrNum]);
					// console.log(this.sumData);
					this.allData = oneTemp;
					this.sumSee = true;
					this.chipLuck(myNumber);
				} else {
					this.$refs.uTips.show({
						title: '请选择皮肤类型',
						type: 'error',
						duration: '2300'
					});

				}
			},
			onSubmit50() {

				if (this.value !== null) {

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
				} else {
					this.$refs.uTips.show({
						title: '请选择皮肤类型',
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
			
			onSeeChance() {
				console.log("onSeeChance");

				if (this.value !== null) {
					console.log(this.value);
					let newHezi = this.testData[this.value];
					let str = [];
					str.push('已选择皮肤的出货概率');
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
						title: '请选择皮肤类型',
						type: 'error',
						duration: '2300'
					})
				}
			},
			clear() {
				
				this.chip = 0;
				this.chipSee=false;
				this.disabled = false;
				this.value = null;
				this.sum = [];
				this.sumSee = false;
				this.sumData = [];
				this.allData = "";
				this.value = null;
				this.boxValue = "";
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
					path: 'pages/dreamhall/dreamhall'
				}
			},
			onShareTimeline() {

				let title = '盒子模拟器'
				return {
					title: title,
					query: '',
					imageUrl: 'https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/miniproject.png?sign=fc4192a8be6eebc6078e20bac23fac82&t=1616030627',
				}
			},
			chipLuck(num){
				let now = this.chip;
				let skin = this.value + '_chance';
				
				let chance = this.chanceData[skin][0]
				
				for(let i = 0 ; i<num;i++){
					let rand = Math.random()*100;
					console.log('随机数结果第',i,'次',rand,chance[this.chip],this.chip);
					if( rand < chance[this.chip])
						this.chip = this.chip + 1;
					
				}
				if(this.chip>25)
					this.chip=25;
			}

		},
		components:{
			myTipTop,
		}
	}
</script>
<style lang="scss">
	.myForm {
		margin-left: 20rpx;
		margin-top: 80rpx;
	}
</style>

<style scoped>
	.seleteAll {
		display: flex;
	}

	.seleteLeft {
		flex: 2;
		margin-left: 10px;
		margin-top: 10px;
	}

	.seleteRight {
		flex: 7;
	}

	.myMiddle {
		width: 80%;
	}

	.myButton {
		/* width: 50rpx; */
		/* margin-left: -100rpx; */
		padding: 8rpx;
		font-size: 14rpx;
	}

	.myButtonAll {
		display: flex;
	}

	.myButtonIn {
		flex: 1;
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

	.textC {
		margin-left: 10rpx;
	}
</style>
