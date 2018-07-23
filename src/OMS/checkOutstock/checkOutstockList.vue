<template>
	<div class="checkOutstock f12 pr h">
		<el-row  class="bg-white mb10 p10">
		 <el-col :span="24" class="mb10">
		 	<el-row class="fl vm">
		 		<el-col class="tl ml10">
		 			<span>出货单号/快递单号(F1)</span>
		 			<input type="text" name="" class="lh180 ml10 w230 scan-input" @keydown="getOrderInfo">
		 		</el-col>
		 	</el-row>
		 </el-col>
		 <el-col :span="24" class="mb10">
		 	<el-row class="fl">
		 		<el-col class="tl ml10">
		 			<span>&nbsp;&nbsp;&nbsp;商品条码/唯一码(F2)</span>
		 			<input type="text" name="" class="lh180 ml10 w230 scan-input" @keydown="incCount" :disabled="!isInputOrder">
		 		</el-col>
		 	</el-row>
		 	<el-row class="ml50 fl">
		 		<el-col>
		 			<span>扫描数量</span>
		 			<input type="text" name="" class="lh180 ml10 w115" :disabled="!isManual" @change="updateMulCount">
		 		</el-col>
		 	</el-row>
		 	<el-row class="ml20 fl">
		 		<el-col class="h28">
		 			<el-checkbox v-model="isManual" class="br0">录入数量(F3)</el-checkbox>
		 		</el-col>
		 	</el-row>
		 </el-col>
		</el-row>
		
		<el-row  class="bg-white mb10">
		  	<el-col :span="24">
			  	<div class="w p10 f16 order-info bt">
			  		<span class="ml10">订单信息：</span>
			  	</div>
		  		<el-row class="content clearfix w p10 pl30">
		  			<el-col v-for="item in orderInfoList" class="fl mt10 mb10" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
		  				<span> {{item.title}}：</span>
		  				<span class="color999"> {{item.value}}</span>
		  			</el-col>
		  		</el-row>
		  		<div class="sealWapper pa" v-show="isChecked">
			         <div class="seal">
			            <div class="seal1">
			             	<div class="seal2">
			                	<div class="seal3">
			                  		<span>已审核</span>
			                	</div>
			             	</div>
			            </div>
			         </div>
		        </div>
			</el-col>
		</el-row>

		<el-row  class="bg-white mb10 table-wrap">
			<el-col :span="24" class="p10 pb50">
			 	<el-table :data="productInfo" height="275" border class="w" stripe>
				    <el-table-column prop="barCode" label="商品条码" min-width="15">
				    </el-table-column>
				    <el-table-column prop="name" label="商品名称" min-width="18">
				    </el-table-column>
				    <el-table-column prop="batchCode" label="批次号" min-width="15">
				    </el-table-column>
				    <el-table-column prop="sku" label="SKU" min-width="20">
				    </el-table-column>
				    <el-table-column prop="spec" label="规格"  min-width="9">
				    </el-table-column>
				    <el-table-column prop="amount" label="数量"  min-width="12">
				    </el-table-column>
				    <el-table-column prop="scanCount" label="扫描数量"  min-width="19">
				    </el-table-column>
				 </el-table>
			</el-col>
		</el-row>

		<el-row class="bottom w bg-white pl15 pr15 p10 pf">
			<button class="cbtn fr ml10 h" @click="clearData">清空页面数据单（F11）</button>
			<button class="cbtn fr ml10 h" @click="recheckComplete">复核完成（F10）</button>
			<button class="cbtn fr ml10 h" @click="reprintEle">补打电子面单（F9）</button>
			<button class="cbtn fr ml10 h" @click="reprintOrder">补打出货单（F8）</button>
		</el-row>

		<div class="mask w h pa" v-show="mask.show">
			<div class="uniq-code p10" v-if="mask.type==='uniq'">
				<el-row>
					<el-col class="mb10">
						<span class="fl f18">唯一码</span>
						<input class="fl h ml20 uniq-input" type="text" placeholder="扫入/录入唯一码" icon="el-icon-search">
						<span class="fr el-icon-close" @click="closeMask"></span>
					</el-col>
					<el-col>
						<el-table :data="uniqInfo" style="width: 100%" border key="1">
							<el-table-column  prop="date"  label="序号"  width="81"></el-table-column>
							<el-table-column  prop="name"  label="唯一码"></el-table-column>
							<el-table-column  prop="address"  label="操作"   width="92">
								<template slot-scope="scope">
						        	<el-button type="text" size="small">删除</el-button>
						      	</template>	
							</el-table-column>
				    	</el-table>
					</el-col>
					<el-col class="mt20 mb20">
						<el-row :gutter="20" type="flex" justify="center" class="tc">
				    		<el-col	:span="6"><div class="uniq-confirm uniq-btn">确认</div></el-col>
				    		<el-col	:span="6"><div class="uniq-cancel uniq-btn" @click="closeMask">取消</div></el-col>
				    	</el-row>
					</el-col>
				</el-row>
			</div>

			<div class="batch-number" v-else-if="mask.type==='batch'">
				<el-row>
					<el-col class="p10 bt">
						<span class="fl f18">批次号</span>
						<span class="fr el-icon-close" @click="closeMask"></span>
					</el-col>
					<el-col class="p10">
						<el-input v-model="batchInput" class="input-with-button">
					    	<el-button slot="append">确认</el-button>
					  	</el-input>
						<el-table :data="batchInfo" style="width: 100%" border class="mt10" key="2">
							<el-table-column  prop="date"  label="序号" width="81"></el-table-column>
							<el-table-column  prop="name"  label="批次号"></el-table-column>
							<el-table-column  prop="amount"  label="数量" width="126"></el-table-column>
							<el-table-column  prop="address"  label="操作" width="96">
								<template slot-scope="scope">
						        	<el-button type="text" size="small">删除</el-button>
						      	</template>	
							</el-table-column>
				    	</el-table>
					</el-col>
					<el-col class="mt20 mb30">
						<el-row :gutter="20" type="flex" justify="center" class="tc">
				    		<el-col	:span="6"><div class="uniq-confirm uniq-btn">确认</div></el-col>
				    		<el-col	:span="6"><div class="uniq-cancel uniq-btn" @click="closeMask">取消</div></el-col>
				    	</el-row>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
import { Loading } from 'element-ui'
import config from '../../../static/config'
export default {
	data() {
		return {
			url: config.base.ip + ':' + config.base.omsPort, //提取公用服务器地址
			isManual: false, // 是否手动输入数量
			isInputOrder: false, // 是否已输入订单编号
			isChecked: false, // 是否审核完成
			currentOrder: '', // 当前录入的订单编号
			currentProductCode: '', // 当前录入商品的商品编号
			currentProductAmount: '', // 当前录入商品的出库数量
			skipCount: 0, // 当前订单编号已扫描次数
			batchInput: '', // 批次号输入
			productInfo: [],  // 商品信息表格
	        uniqInfo: [{}, {}, {}, {}], // 唯一码信息
	        batchInfo: [{}, {}, {}, {}], // 批次号信息
			orderInfoList : [ // 订单信息列表
				{
					title: "订单编号",
					value: ""
				},
				{
					title: "付款时间",
					value: ""
				},
				{
					title: "收件人",
					value: ""
				},
				{
					title: "电话号",
					value: ""
				},
				{
					title: "快递单号",
					value: ""
				},
				{
					title: "物流公司",
					value: ""
				},
				{
					title: "邮政编码",
					value: ""
				},
				{
					title: "送货地址",
					value: ""
				}
			],
	        mask: { // 模态框
	        	show: false,
	        	type: 'uniq'
	        }
		}
	},
	// watch()
	methods: {
		getOrderInfo(e) { // 扫描出货单号
			if(e.keyCode===13) {
				let VAL = e.target.value,
					LOADING_INSTANCE = Loading.service({
						target: '.checkOutstock'
					})
				this.$axios.gets(this.url + "/api/services/app/OmsRecheckOutputManagement/ReviewInfomationData", {
					DnCode: VAL,
					SkipCount: 0,
					MaxResultCount: 8
				}).then((res)=> {
					console.log(res)
					this.currentOrder = VAL
					this.isInputOrder = true
					this.isChecked = false
					this.skipCount++
					let { soCode, createdTime, consignee, consigneeMobile, waybillCode, logisticsId, postCode, 
							adAreaLevel1, adAreaLevel2, adAreaLevel3, adAreaLevel4, completeAddress } = res.result.items[0]
					createdTime = createdTime.replace("T"," ").slice(0,-7)
					completeAddress = adAreaLevel1+adAreaLevel2+adAreaLevel3+adAreaLevel4+completeAddress
					// 渲染订单信息
					let ORDER_INFO_NEED = [soCode, createdTime, consignee, consigneeMobile,
						 waybillCode, logisticsId, postCode, completeAddress]
					for(let i in ORDER_INFO_NEED) {
						this.orderInfoList[i].value = ORDER_INFO_NEED[i]
					}
					// 渲染商品信息
					let PRODUCT_INFO_ITEM = { 
							barCode: '',
							name: '',
							batchCode: '',
							sku: '',
							spec: '',
							amount: '',
							scanCount: ''
						},
						JSON_PII = JSON.stringify(PRODUCT_INFO_ITEM)
					for(let i = 0; i < 8; i++){
						this.productInfo.push(JSON.parse(JSON_PII))
					}
					for(let i in res.result.items) {
						let { barcode, productCode, productName, productSpec, qty, pickingQty } = res.result.items[i]
						this.productInfo[i].barCode = barcode
						this.productInfo[i].name = productName
						this.productInfo[i].sku = productCode
						this.productInfo[i].spec = productSpec
						this.productInfo[i].amount = qty
						this.productInfo[i].scanCount = pickingQty
					}
					LOADING_INSTANCE.close();
				}).catch((err)=> {
					this.isInputOrder = false
					console.log(err)
					this.$message.error('出货单号或快递单号不存在')
					LOADING_INSTANCE.close();
				})
			}
		},
		incCount(e) { // 扫描商品条码
			if(e.keyCode===13) {
				let VAL = e.target.value,
					LOADING_INSTANCE = Loading.service({
						target: '.table-wrap'
					});
				this.$axios.puts(this.url + '/api/services/app/OmsRecheckOutputManagement/UpdateReviewSingleCount', {
					id: VAL
				}).then((res)=> {
					this.currentProductCode = VAL
					for(let i = 0, len = this.productInfo.length; i < len; i++) {
						if(VAL === this.productInfo[i].barCode){
							this.productInfo[i].scanCount ++
							this.currentProductAmount = this.productInfo[i].amount
						}
					}
					this.checkComponent()
					LOADING_INSTANCE.close();
				}).catch((err)=> {
					console.log(err)
					this.$message.error('商品条码错误')
					LOADING_INSTANCE.close();
				})
			} else if (e.keyCode === 16) {
				this.mask.type = 'uniq'
				this.mask.show = true
			} else if (e.keyCode === 17) {
				this.mask.type = 'batch'
				this.mask.show = true
			}
		},
		updateMulCount(e) { // 手动输入拣货数量
			let VAL = e.target.value
			if(this.currentProductCode) {
				if(Number(VAL) || VAL==0) {
					if(VAL <= this.currentProductAmount){
						let	LOADING_INSTANCE = Loading.service({
							target: '.table-wrap'
						})
						this.$axios.puts(this.url + '/api/services/app/OmsRecheckOutputManagement/UpdateReviewMultiCount', {
							skuCode: this.currentProductCode,
							Qty: Number(VAL)
						}).then((res)=> {
							for(let i = 0, len = this.productInfo.length; i < len; i++) {
								if(this.currentProductCode === this.productInfo[i].barCode) {
									this.productInfo[i].scanCount = Number(VAL)
									this.checkComponent()
									e.target.value = ''
								}
							}
							LOADING_INSTANCE.close();
						}).catch((err)=> {
							LOADING_INSTANCE.close();
						})
					} else{
						e.target.value = ''
						this.$message.error('输入数量超出')
					}
				} else {
					e.target.value = ''
					this.$message.error('请输入一个数字')
				}
			} else {
				e.target.value = ''
				this.$message.error('请扫描商品条码')
			}
		},
		clearData() { // 清空页面数据单
			this.$axios.puts(this.url + '/api/services/app/OmsRecheckOutputManagement/UpdateReviewAllCount', {
				id: 1
			}).then((res)=> {
				console.log(res)
				this.productInfo[0].scanCount = 0
			})
		},
		recheckComplete() { // 复核完成
			if(this.currentOrder){
				this.$axios.posts(this.url + '/api/services/app/OmsRecheckOutputManagement/InsertReviewMultiDtl', {
					id: this.currentOrder
				}).then((res)=>{
					console.log("复核完成", res)
					this.reprintEle()
					this.reprintOrder()
					this.skipCount = 0
					this.isChecked = true
					this.$message({
			          message: '复核完成',
			          type: 'success'
			        })
				})
			} else {
				this.$message({
					message: '暂无数据',
          			type: 'warning'
				})
			}
				
		},
		reprintEle() { // 重打电子面单数据
			if(this.currentOrder){
				this.$axios.gets(this.url + '/api/services/app/OmsRecheckOutputManagement/GetElectronicSurfaceDate', {
					id: this.currentOrder
				}).then((res)=> {
					console.log('补打电子面单', res)
				})
			} else {
				this.$message({
					message: '暂无数据',
          			type: 'warning'
				})
			}
			
		},
		reprintOrder() { // 补打出货单
			if(this.currentOrder){
				this.$axios.gets(this.url + "/api/services/app/OmsRecheckOutputManagement/ReviewInfomationData", {
					DnCode: this.currentOrder,
					SkipCount: 0,
					MaxResultCount: 8
				}).then((res)=> {
					console.log("补打出货单", res)
				})
			} else {
				this.$message({
					message: '暂无数据',
          			type: 'warning'
				})
			}
				
		},
		closeMask() { // 关闭模态框
			this.mask.show = false
		},
		checkComponent() { // 检查复核是否完成
			for(var i = 0, len = this.productInfo.length; i < len; i++) {
				if(this.productInfo[i].amount !== this.productInfo[i].scanCount)
					return
			}
			if(i === this.productInfo.length)
				this.recheckComplete()
		}
	}
}
</script>
<style scoped>
.bg-white {
	background: #fff;
}
.order-info {
	box-sizing: border-box;
}
.bt {
	border-bottom: 1px solid #ccc;
}

.h28 {
	height: 28px;
	line-height: 28px;
}
.w230 {
	width: 230px;
}
.w115 {
	width: 115px;
}
.p20 {
	padding: 20px;
}
.color999 {
	color: #999999;
}
.table-wrap {
	margin-bottom: 66px;
}

.bottom {
	bottom: 0;
	left: 0;
	height: 56px;
	z-index: 2;
}
.bottom .cbtn {
	border: none;
	color: #ffffff;
}
.bottom .cbtn:nth-child(1) {
	background-color: #f55e6e;
}
.bottom .cbtn:nth-child(2) {
	background-color: #9966ff;
}
.bottom .cbtn:nth-child(3) {
	background-color: #ff9933;
}
.bottom .cbtn:nth-child(4) {
	background-color: #cc66cc;
}
input[type=text] {
	height: 28px;
	border: 1px solid #c2cad8;
	outline: none;
	padding-left: 4px;
}
.scan-input {
	box-sizing: border-box;
	width: 195px !important;
	padding-left: 28px !important;
	background: url(/static/image/common/scan.png) no-repeat 3px 3px; 
	background-size: 22px 20px;
}
input[type=text]:disabled {
	background: #e4e4e4;
}
input[type=text]:focus {
	border-color: #33cccc;
}
/* 印章 */
.sealWapper{
    overflow: visible;
    width: 45px;
    height: 45px;
    opacity: 0.5;
    margin-right: 10px;
    /*margin-top:5px;*/
    transform:  scale(2.31);
    top: 50px;
    right: 50px;
}
.seal,
.seal1,
.seal2,
.seal3{
    position: absolute;
    background-repeat:no-repeat;
    background-position:center;
    top:0;
    left: 0;
    width: 45px;
    height: 45px;
}
.seal{
    transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    top: 0;
    left: 0;
    background-image: url(../../../static/image/u1.png);
}
.seal1{
    background-image: url(../../../static/image/u2.png);
}
.seal2{
    background-image: url(../../../static/image/u3.png);
}
.seal3{
    transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    background-image: url(../../../static/image/u4.png);
} 
.seal3 span{
    font-family: 'microsoft yahei';
    font-weight: 400;
    font-style: normal;
    font-size: 8px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 44px;
    color: #FF669B;
    transform: rotate(-90deg) scale(0.8);
    -ms-transform: rotate(-90deg) scale(0.8);
    -webkit-transform: rotate(-90deg) scale(0.8);
    -o-transform: rotate(-90deg) scale(0.8);
    -moz-transform: rotate(-90deg) scale(0.8);
}
</style>
<style>
/* 复选框 */
.checkOutstock .el-checkbox__input{
	width: 16px;
	height: 16px;
}
.checkOutstock .el-checkbox__inner {
	border-radius: 0;
	width: 16px;
	height: 16px;
	border-color: #c2cad8 !important;
}
.checkOutstock .is-checked .el-checkbox__inner{
	background-color: #33cccc !important; 
	border-color: #33cccc !important; 
	border-radius: 2px;
}
.checkOutstock .el-checkbox__label {
	color: #606266 !important;
}

/* 表格 */
.checkOutstock .el-table--border,
.checkOutstock .el-table--group{
	border-color: #e4e4e4;
}
.checkOutstock .el-table--border td,
.checkOutstock .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
	border-right-color: #e4e4e4;
	border-bottom-color: #e4e4e4;
}
.checkOutstock .el-table--border::after, 
.checkOutstock .el-table--group::after, 
.checkOutstock .el-table::before{
	background: #e4e4e4;
}
.checkOutstock .el-table thead {
	color: #333;
}
.checkOutstock .el-table__row {
	height: 30px;
}
/* 模态框 */
.checkOutstock .mask {
	background: rgb(0,0,0,0.6);
	top: 0;
	z-index: 999;
	display: flex;
}
.checkOutstock .mask .uniq-code,
.checkOutstock .batch-number {
	width: 548px;
	margin: auto;
	background: #fff;
}
.checkOutstock .mask .uniq-input {
	display: inline-block;
	height: 16px;
	border-radius: 13px;
	padding: 5px;
	color: #c9c9c9;
}
.checkOutstock .checkOutstock .el-icon-close {
	display: block;
	width: 28px;
	height: 28px;
	font-size: 28px;
	color: #333333;
}
.checkOutstock .mask .uniq-btn {
	height: 35px;
	line-height: 35px;
	border-radius: 4px;
	letter-spacing: 4px;
}
.checkOutstock .mask .uniq-confirm,
.checkOutstock .mask .el-input-group__append {
	color: #fff;
	background: #33cccc;
}
.checkOutstock .mask .uniq-cancel {
	background: #f2f5f8;
	color: #999;
}
.checkOutstock .mask .batch-number .el-input__inner, 
.checkOutstock .mask .batch-number .el-input-group__append{
	border-radius: 0;
}
.checkOutstock .mask .el-input-group__append span{
	letter-spacing: 4px;
}
</style>
