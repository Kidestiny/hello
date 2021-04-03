let configURL = {};
if(process.env.NODE_ENV === 'development'){
	    console.log('开发环境 config');
		configURL ={
			luckbox:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/luckboxTest.js?sign=b2c037e88f556adbc4d5f4b30afe7fd0&t=1617278680",
			allDateUsed: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/allDataUsedTest.json?sign=8107b4372f91d2f1c74425588cf0133b&t=1617277072",
			dreanHallData:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/dreanHallDataTest.json?sign=cff3cfe2db4ca3cbb8a8f5d783a6c6fa&t=1617436494"
		}		
}else{
	console.log('生产环境')
	console.log=()=>{}
	configURL={
		luckbox:"https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/test_data.json?sign=695dc24e9b8b3e4b4e4537af61e5a8aa&t=1615987223",
		allDateUsed: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/allDataUsed.json?sign=a825c023cd0fb539ca171b3fcb49009e&t=1615983691",
		dreanHallData: "https://sgs-7gp2uaju8f978987-1304922515.tcloudbaseapp.com/dreanHallData.json?sign=1a8ad80be94014a9b12b5c5c0c85dfc6&t=1616408834",
	}
}
export default configURL;