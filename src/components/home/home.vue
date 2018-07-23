<template>
    <div class="home-data">
    	<div class="home">
    		<el-row  class="pd10">
	    		<el-col :xl="12" :lg="12" :md="14" :sm="16" :xs="18">
	    			<div class="left">
	    				<i class="trumpet left"></i>
	    				<span>消息提醒：</span>
	    			</div>
	    			<div class="left indent relative" style="height:21px;width:300px;">
	    				<div class="absolute" id="seamlessScroll" style="">
	    					<div>
	    						<p >采购订单<strong>2</strong>其他信息</p>
	    					</div>
	    					<div>
	    						<p >采购订单<strong>1</strong>其他信息</p>
	    					</div>
	    					<div>
	    						<p >采购订单<strong>2</strong>其他信息</p>
	    					</div>
	    					<div>
	    						<p >采购订单<strong>1</strong>其他信息</p>
	    					</div>
	    				</div>
	    				
	    			</div>
	    		</el-col>
	    		<el-col :xl="12" :lg="12" :md="10" :sm="8" :xs="6">
	    			<div class="tal">
	    				<span>其他信息</span>
	    			</div>
	    			
	    		</el-col>
	    	</el-row>
    	</div>
    	<div class="home-content">
	    	<el-row>
	    		<el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" v-for="item in items" :key="item.namber" class="home-content-box">
	    			<div class="d1">
	    				<h4>{{item.title}}</h4>
	    				<p>{{item.namber}}<span style="font-size:14px">{{item.unit}}</span></p>
	    			</div>	    			
	    		</el-col>
	    	</el-row>	
	    	<el-row>
	    		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="center">
	    			<div class="d1">
	    			<h4 class="title">品牌销售</h4>
	    			<div class="relative name">
	    				<span class="absolute">乔丹</span>
	    				<span class="absolute red">kapaa</span>
	    				<span class="absolute">安踏</span>
	    				<span class="absolute">361</span>
	    				<span class="absolute">李宁</span>
	    				<span class="absolute">Nike</span>
	    				<span class="absolute">adidas</span>
	    				<span class="absolute">特步</span>
	    				<canvas class="mycanvas1" width="270" height="270">
	    					
	    				</canvas>
	    				<canvas class="mycanvas" ref="mycanvas" width="270" height="270">
	    					
	    					</canvas>
	    				
	       			</div>
	    			</div>
	    		</el-col>
	    		<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="center">
	    			<div class="d1">
	    				<h4 class="title">货品销售排行</h4>
		    			
	    			<div class="relative name">
	    				<span class="absolute">乔丹</span>
	    				<span class="absolute">kapaa</span>
	    				<span class="absolute">安踏</span>
	    				<span class="absolute">361</span>
	    				<span class="absolute">李宁</span>
	    				<span class="absolute">Nike</span>
	    				<span class="absolute">adidas</span>
	    				<span class="absolute">特步</span>
	    				<canvas class="mycanvas1" width="270" height="270">
	    					
	    				</canvas>
	    				<canvas class="mycanvas" ref="mycanvas" width="270" height="270" >
	    					
	    					</canvas>
	    				
	       			</div>
	    			</div>
	    		</el-col>
	    	</el-row>
	    </div>
    </div>
</template>
<script>

 export default{
 	data(){
 		return{
 			items:[{
 				title:'店铺(人)',
 				namber:'600',
 				unit:''
 			},
 			{
 				title:'在线用户数(人)',
 				namber:'2630',
 				unit:''
 			},
 			{
 				title:'会员(人)',
 				namber:'203',
 				unit:'万'
 			},
 			{
 				title:'在线用户数(人)',
 				namber:'2631',
 				unit:''
 			},
 			{
 				title:'销售订单(元)',
 				namber:'213',
 				unit:'万'
 			},
 			{
 				title:'退货单(元)',
 				namber:'233',
 				unit:'万'
 			},{
 				title:'日流量(人)',
 				namber:'200',
 				unit:'万'
 			},{
 				title:'退货单(元)',
 				namber:'201',
 				unit:'万'
 			}
 			]
 		}
	},
	mounted() {
        
            this.myCanas(); 
            this.myscroll();     
    },
	methods:{

		myscroll(){

			let ws=document.getElementById('seamlessScroll');
			let wschind=ws.getElementsByTagName('div');
			let q=0;
			setInterval(function(){
				q++;
				if(q==wschind.length){
					ws.style.transition= 'all .3s linear';
					ws.style.transform="translate3d(0,"+(-q*21)+"px, 0)";
					setTimeout(function(){
						ws.style.transition= 'all 0s linear';
						ws.style.transform="translate3d(0,"+(-21)+"px, 0)";
					},0)
				
					q=1;
					
				}else{
					ws.style.transition= 'all .3s linear';
					ws.style.transform="translate3d(0,"+(-q*21)+"px, 0)";
				}
				
			},1000)

			// let time='';
			// let sum=0;
			// let ac=wschind[0].offsetHeight;
			// setInterval(function(){
			// 	if(sum>wschind.length-2){
			// 		sum=0;
			// 	}else{
			// 		sum++;
			// 	}
			// 	ws.style.top=sum*(-ac)+'px';
			// },2000)
		},
		myCanas(){
			let c=document.getElementsByClassName('mycanvas');
			let c1=document.getElementsByClassName('mycanvas1');
			let oIndent=document.getElementsByClassName('indent');

			for(var i=0;i<c1.length;i++){
				let ctx=c1[i].getContext("2d");
				ctx.moveTo(135,0);
				ctx.lineTo(135+(135/2)*1.414,270-(135+(135/2)*1.414));
				ctx.lineTo(270,135);
				ctx.lineTo(135+(135/2)*1.414,135+(135/2)*1.414);
				ctx.lineTo(135,270);
				ctx.lineTo(270-(135+(135/2)*1.414),135+(135/2)*1.414);
				ctx.lineTo(0,135);
				ctx.lineTo(270-(135+(135/2)*1.414),270-(135+(135/2)*1.414));
				ctx.lineTo(135,0);
				ctx.stroke();
				ctx.fillStyle="rgb(45,63,91)";
				ctx.fill();
			}
			
			for(var i=0;i<c.length;i++){
				let ctx1=c[i].getContext("2d");
				ctx1.moveTo(135,50);
				ctx1.lineTo(135+(85/2)*1.414,270-(135+(85/2)*1.414));
				ctx1.lineTo(190,135);
				ctx1.lineTo(200.445,200.455);
				ctx1.lineTo(135,220);
				ctx1.lineTo(270-(105+(135/2)*1.414),135+(105/2)*1.414);
				ctx1.lineTo(50,135);
				ctx1.lineTo(270-(135+(25/2)*1.414),270-(135+(25/2)*1.414));
				ctx1.lineTo(135,50);
				ctx1.stroke();
				ctx1.fillStyle="rgb(51,204,204)";
				ctx1.fill();
				ctx1.moveTo(135,0);
				ctx1.lineTo(135,270);
				ctx1.strokeStyle="#fff";
				ctx1.stroke();
				ctx1.moveTo(230.445,39.555);
				ctx1.lineTo(39.555,230.455);
				ctx1.strokeStyle="#fff";
				ctx1.stroke();
				ctx1.moveTo(270,135);
				ctx1.lineTo(0,135);
				ctx1.strokeStyle="#fff";
				ctx1.stroke();
				ctx1.moveTo(230.445,230.455);
				ctx1.lineTo(39.555,39.555);
				ctx1.strokeStyle="#fff";
				ctx1.stroke();
				ctx1.moveTo(135,270);
				ctx1.lineTo(135,0);
				ctx1.strokeStyle="#fff";
				ctx1.stroke();
			}
			
		}
	}
 }
</script>
<style type="text/css">
	body{
		font-size: 14px;
	}
	.trumpet{
		background: url('../../../static/image/home/u28.png');
		display: inline-block;
		width: 20px;
		height: 17px;margin-right:10px;
	}
	.indent{
		height: 21px;
		overflow: hidden;
	}
	.pd10{
		padding:10px;
		background: #fff;
		border-radius: 5px;
		margin-bottom: 10px;;
	}
	.tal{
		text-align: right;
	}
	.left{
		float: left;
	}
	.mr10{
		margin-right: 10px;
	}
	.home-content-box{
		height: 170px;
	}
	.home-content{margin: 0 -10px;}
	.home-content-box .d1{
		height: 150px;
		background: #fff;
		border-radius: 5px;
		margin: 10px;
	}
	.home-content-box .d1 h4{
		line-height: 40px;
		margin-left: 20px;
		color: #888;
	}
	.home-content-box .d1 p{
		line-height: 60px;
		font-weight: bold;
		margin-left: 20px;
		margin-top: 40px;	
		font-size: 50px;
		font-family: fantasy;
	}
	.home-content-box:nth-child(1){
		color: #33CCCC;
	}
	.home-content-box:nth-child(2){
		color: #FF6666;
	}
	.home-content-box:nth-child(3){
		color: #FFCC66;
	}
	.home-content-box:nth-child(4){
		color: #FF6666;
	}
	.home-content-box:nth-child(5){
		color: #FF6666;
	}
	.home-content-box:nth-child(6){
		color: #FFCC66;
	}
	.home-content-box:nth-child(7){
		color: #33CCCC;
	}
	.home-content-box:nth-child(8){
		color: #FFCC66;
	}
	.mycanvas1{
		position: relative;
	}
	.mycanvas{
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0.8;
	}
	.relative{
		position: relative;
	}
	.absolute{
		position: absolute;
		font-size: 14px;
	}
	.center{
		text-align: center;
		/*width: 49%;
		margin-right: 1%;
		height: 410px;
		border-radius: 10px;*/
	}
	.center .d1{margin: 10px;border-radius: 5px;background: #fff;}
	 .title{
		text-align: left;
		padding-top: 15px;
		padding-left: 15px
	}
	.name{
		margin-top: 60px;
		margin-bottom: 60px;
		display: inline-block;
	}
	.name span{
		width: 	30px;
	}
	.name span:nth-child(1){
		top: -30px;
		left: 120px;
	}
	.name span:nth-child(2){
		top: 10px;
		left: 240px;
	}
	.name span:nth-child(3){
		top: 125px;
		left: 285px;
	}
	.name span:nth-child(4){
		top: 232px;
		left: 241px;
	}
	.name span:nth-child(5){
		top: 271px;
		left: 120px;
	}
	.name span:nth-child(6){
		top: 241px;
		left: 8px;
	}
	.name span:nth-child(7){
		top: 124px;
		left: -52px;
	}
	.name span:nth-child(8){
		top: 10px;
		left: 8px;
	}
</style>
<style type="text/css">
	#seamlessScroll{
		-webkit-transition: all .5s linear;
    	transition: all .5s linear;
	    -webkit-transform: translate3d(0, 0px, 0); 
	    transform: translate3d(0, 0px, 0);
	}
	#seamlessScroll div{
		height:21px;
	}
</style>