<template>
	<div class="content runAssessment">
    	<!--<p class="location">&nbsp;<span class="spans_1">追溯体系运行考核</span></p>
        --><div v-loading="Dataloading">
          <div class="searchs" ref="searchs">
                  <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                         {{year}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:'全部',flag:0,index:0}" :class="dataIndex == 0 ? 'active':''">全部</el-dropdown-item>
                          <el-dropdown-item :command="{value:item,flag:0,index:index + 1}" :class="dataIndex == index ? 'active':''" v-for="(item,index) in dataList" :key="index">{{item}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                     <span>年</span>
                    </div>
                     <div class="select">
                       <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                         <span class="el-dropdown-link">
                          {{node_type}}<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                         <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item :command="{value:item,flag:1,index:index}" :class="nodeIndex == index ? 'active':''" v-for="(item,index) in node_type_list" :key="index">{{item}}</el-dropdown-item>
                         </el-dropdown-menu>
                       </el-dropdown>
                       <span class="choose" @click="handlerChoose(1)">多选</span>
                     </div>

                  </el-form>
          </div>




          <div class="table">

            <div class="subject">
              <div class="subAll" style="border-bottom: 3px solid #E8EBED;">
                <div class="sub-item ">
                  <p class="myp">总数据量</p>
                  <p class="num">{{num}}<span></span></p>
                </div>
								<div class="sub-item">
								  <p class="myp">报送企业数量</p>
								  <p class="num">{{nodeNum}}<span>家</span></p>
								</div>

							 <div class="sub-item sub-item1" style="padding-left: 30px;" >
							   <div class="mytables" style="padding-top: 10px;">
									  <el-table :data="nodeNumlist" v-el-table-infinite-scroll="handleload" :header-cell-style="rowClass" :height="110">
										 <el-table-column
                      :prop="item"
                      :label="item"
                      :key="k" v-for="(item,k) in tableHeader"> </el-table-column>
										</el-table>
								 </div>
							 </div>
              </div>
            </div>

						<div class="myEcharts" style="width:100%;height:300px">
							 <div id="echartsOne"  style="width:100%;height:300px"></div>
						</div>

				</div>

						<div class="table">
					    <div class="subject">
								<div class="subAll" style="border-bottom: 3px solid #E8EBED;">
								 <div class="sub-item sub-item2" >
									 <div style="text-align:left;">
										<span style="text-align: left; font-size: 14px;display: inline-block;margin: 10px;padding-left: 15px;">节点正常运行数量和比例（家 / %）</span>
										 </div>
								   <!--节点正常比例 表格 -->
								   		<table  class="table1">
								   		<thead>
								   		<tr v-for="items in newArr">
								   				<th v-for="item in items" :rowspan="item.rowspan" :colspan="item.colspan">{{item.title}}</th>
								   		</tr>
								   		</thead>
								   		<tbody v-if="needRowSpan.length>0">
								   				<tr v-for="(items,index) in DataNumRateList">
								   						<td v-for="item in items.tdList" :rowspan="resetRowSpan(index,item)">{{items[item]}}</td>
								   				</tr>
								   		</tbody>
								   		<tbody v-else>
								   		<tr v-for="(items,index) in DataNumRateList">
								   				<td v-for="item in colKeyList">{{items[item]}}</td>
								   		</tr>
								   		</tbody>
								   </table>
								 </div>
								  </div>
					      </div>
					    </div>



								<!--<div class="table">
							  <div class="subject">
									<div class="subAll" style="height:50px;">
									 <div class="sub-item3" >
										 <div style="text-align:left;">
												<span class="span">
												报送企业数据详情
												</span>
											 </div>
										</div>
												<div class="tabs">
												 <div class="tab" @click="toggleTab('屠宰')"><a>屠宰</a></div>
												 <div class="tab" @click="toggleTab('批发')"><a>批发</a></div>
												 <div class="tab" @click="toggleTab('零售')"><a>零售</a></div>
												 <div class="tab" @click="toggleTab('超市')"><a>超市</a></div>
												<div class="tab" @click="toggleTab('团餐')"><a>团餐</a></div>
												</div>
									  </div>
							    </div>
							  </div>-->
									<div class="table" style="margin-top: 200px;height:500px;">
								  <div class="subject">
										<div class="subAll" style="border-bottom: 3px solid #E8EBED; display:inherit;">

											<div class="sub-item3" >
															<div style="text-align:left;display:inherit;padding-top: 10px;padding-left: 15px;font-size: 14px;" class="span">
																	<span>
																			报送企业数据详情
																	</span>
															</div>

															<div class="tabs" ref="tabs">
															 			<div class="tab" @click="toggleTab('屠宰')" v-bind:class="{ onSelect:'屠宰'==this.currentTab}"><a>屠宰</a></div>
															 			<div class="tab" @click="toggleTab('批发')" v-bind:class="{ onSelect:'批发'==this.currentTab}"><a>批发</a></div>
															 			<div class="tab" @click="toggleTab('零售')" v-bind:class="{ onSelect:'零售'==this.currentTab}"><a>零售</a></div>
																		<div class="tab" @click="toggleTab('超市')" v-bind:class="{ onSelect:'超市'==this.currentTab}"><a>超市</a></div>
															 			<div class="tab" @click="toggleTab('团餐')" v-bind:class="{ onSelect:'团餐'==this.currentTab}"><a>团餐</a></div>
															</div>
											</div>
										 <div class="sub-item sub-item2">


										   <!--节点正常比例 表格 -->
										   		<table  class="table1">
										   		<thead>
										   		<tr v-for="items in newArrOneType">
										   				<th v-for="item in items" :rowspan="item.rowspan" :colspan="item.colspan">{{item.title}}</th>
										   		</tr>
										   		</thead>
										   	 	<tbody v-if="needRowSpanOneType.length>0">
										   				<tr v-for="(items,index) in DataByNodeTypeList">
										   						<td v-for="item in items.tdList" :rowspan="resetRowSpan(index,item)">{{items[item]}}</td>
										   				</tr>
										   		</tbody>
										   		<tbody v-else>
										   		<tr v-for="(items,index) in DataByNodeTypeList">
										   				<td v-for="item in colKeyListOneType">{{items[item]}}</td>
										   		</tr>
										   		</tbody>
										   </table>
										 </div>
										  </div>
								    </div>
								  </div>

			</div>



				   <div class="mask" v-if="mymask"></div>
				<div class="multi" v-if="mymask">
				  <div class="multi-head">
				      多项筛选
				      <span @click="handlerClose" class="iconfont icon-close"></span>
				  </div>
				  <div class="multi-con">
				    <div class="multi-left multi-left1">
				      <div class="left-head">所属环节</div>
				      <div class="left-con">
				        <div class="all-item">
				          <div class="left-item" @mouseenter="enter(index2)" @mouseleave="leave(index2)" v-for="(item,index2) in multiData" :key="index2">{{item.name}}
				          <span v-if="item.Addshow" @click="handlerAdd(item,index2)">添加</span></div>
				        </div>

				        <div class="ng-scope" @click="handlerAllAdd"><span>全部添加</span></div>
				      </div>
				    </div>
				    <div class="multi-left">
				      <div class="left-head">已添加</div>
				      <div class="left-con">
				        <div class="tooltip" v-if="AddData.length==0">请从左侧列表选择添加</div>
				        <div class="all-item">
				          <div class="left-item" :class="item.Deleteshow?'hover':''" @mouseenter="enter1(index3)" @mouseleave="leave1(index3)" v-for="(item,index3) in AddData" :key="index3">{{item.name}}
				          <span v-if="item.Deleteshow" @click="handlerDelete(item,index3)">删除</span></div>
				        </div>
				        <div class="ng-scope" v-if="AddData.length>0">已添加{{AddData.length}}条<span @click="handlerAllDelete">清空</span></div>
				      </div>
				    </div>
				  </div>
				  <div class="mybtn">
				    <el-button type="primary" @click="allAddFun">确认</el-button>
				    <el-button @click="handlerClose" style="margin-right: 30px;">取消</el-button>
				  </div>
				</div>


		</div>

</template>

<script>
	// import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
	// import BmScale from 'vue-baidu-map/components/controls/Scale';
	// import BmNavigation from 'vue-baidu-map/components/controls/Navigation';
	// import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer';
	// import BmMarker from 'vue-baidu-map/components/overlays/Marker';
	// import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow';
	// import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection';
	// import fangshan from '../../../static/image/fangshan.png';
	// import chaoyang from '../../../static/image/chaoyang.png';
	// import xicheng from '../../../static/image/xicheng.png';
	// import dongcheng from '../../../static/image/dongcheng.png';
	// import haidian from '../../../static/image/haidian.png';
	// import changping from '../../../static/image/changping.png';
	// import daxing from '../../../static/image/daxing.png';
	// import pinggu from '../../../static/image/pinggu.png';
	// import miyun from '../../../static/image/miyun.png';
	// import mentougou from '../../../static/image/mentougou.png';
	// import tongzhou from '../../../static/image/tongzhou.png';
	// import shijingshan from '../../../static/image/shijingshan.png';
	// import huairou from '../../../static/image/huairou.png';
	// import fengtai from '../../../static/image/fengtai.png';
	// import shunyi from '../../../static/image/shunyi.png';
	// import yanqing from '../../../static/image/yanqing.png';
	//import '../../../node_modules/_echarts@4.8.0@echarts/map/js/province/beijing.js' // 引入北京地图数据
	import '../../../node_modules/echarts/map/js/province/beijing.js' // 引入北京地图数据
	import axios from 'axios';
	import {getQueryNodeDataTj,getQueryNodeDataNum,getQueryNodeDataNumRateView,getQueryNodeDataNumRate,getQueryNodeDataByNodeType,getTraceEnterpriseType} from '../../js/platform/platform.js';
	import '../../assets/css/common.css';
	// import elTableInfiniteScroll from 'el-table-infinite-scroll';
	import AMap from 'AMap';

	/**该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。
	例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，通过调用该方法，可以阻止提交表单。
	注意，如果 Event 对象的 cancelable 属性是 fasle，
	那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。*/
	var preD = function (e) {
	     e.preventDefault()
	}

	export default {
		name:"dataControl",
		 //初始化 页面数据
		 data() {
			 return  {
				 form:{

				 },
				 year:'年份',
				 num:"",
				 nodeNum:"",
				 node_type:'所属环节',
				 dataList:[],
				 node_type_list:[],
				  dataIndex:0,
					nodeIndex:0,
					mymask:false,
					multiData:[],
					AddData:[],
					mychart:'',
					AddName:[],
					nodeNumlist:[{'屠宰':0,'批发':0,'零售':0,'超市':0,'团餐':0}],
					AddDataOne:[],
					Index:'',
					tableHeader:['屠宰','批发','零售','超市','团餐'],
				 Dataloading:false,
				 newArr:[[]],        //表头
        needRowSpan:[],        //tbody需要跨行的key
        span:{} ,                //所跨的行数
				maxHeight:1,         //表头总共占的行数
        colKeyList:[],        //所有的key
				DataNumRateList:[],	//节点运行比例 表格内容后台数据
				 headerList:[],    //节点运行比例 表格表头后台数据

				newArrOneType:[[]],
				spanOneType:{} ,
				 colKeyListOneType:[],        //所有的key
				needRowSpanOneType:[],        //tbody需要跨行的key
				 DataByNodeTypeList:[],	//查询某个类型的节点数据 表格内容后台数据
				 oneTypeHeaderList:[],    //查询某个类型的节点数据 表格表头后台数据
				 currentTab: '屠宰'
				 }
			 },
		//引入的组件集合
		 components: {

		 },
		 created() {

		 },
		 //一般在初始化页面完成后，再对dom节点进行相关操作
		  mounted() {
				//设置滚动条
				document.body.style.overflow = '' // 出现滚动条
				//初始化 年份 下拉选
				this.init_year();
				//初始化 节点类型 下拉选
				this.init_node_type();
				this.$nextTick(()=>{
					this.init_data(0);
				 })

			},
			methods:{
				//鼠标点击切换 tab
				 toggleTab: function(tab) {
				 this.currentTab = tab; // tab 为当前触发标签页的组件名
				 let p_year;
				 let p_node_type;
				 if(this.year == '年份'){
				 	p_year = '';
				 }else{
				 	p_year = this.year;
				 }
				 this.DataByNodeTypeList = [],
				 this.newArrOneType=[[]];
				 this.init_tableTwo('date='+p_year+'&node_type=',1);
				 //选中 为 高亮

				},
				resetRowSpan(row, key) {
        if (this.span[key] && this.span[key][row]) {
          return this.span[key][row];
        }
        return 1;
      },
      gerMaxCol(items) {
        let max = 0;
        function each(data) {
          if (max < data.length) {
            max = data.length;
          }
          data.forEach((item) => {
            if (item.children) {
              each(item.children);
            }
          });
        }
        each(items);
        return max;
      },
      getMaxFloor(treeData) {
        const that = this;
        let max = 0;
        function each(data, floor) {
          data.forEach((e) => {
            if (floor > max) {
              max = floor;
            }
            if (e.children && e.children.length > 0) {
              each(e.children, floor + 1);
          }
          });
        }
        each(treeData, 1);
        return max;
      },
      columnsHandle(treeData,newArr,needRowSpan,colKeyList) {
        const that = this;
        const maxFloor = this.maxHeight;
        const keyList = [];
        function each(data, index) {
          if (newArr[index] === undefined) {
            newArr[index] = [];
          }
          data.forEach((e) => {
            const obj = {
              title: e.lable,
              key: e.key,
              rowspan: maxFloor,
              colspan: 1,
            };
            if (e.children) {
              obj.colspan = that.gerMaxCol(e.children);
              obj.rowspan = maxFloor - that.getMaxFloor(e.children);
            } else {
              colKeyList.push(e.key);
              if (e.hasrowspan) {             //  如果存在hasrowspan属性并且值为true，则表明该key列存在跨行
                needRowSpan.push(e.key);
              }
            }
            newArr[index].push(obj);
            if (e.children && e.children.length > 0) {
              each(e.children, index + 1);
            }
          });
        }
        each(treeData, 0);
      },
      dataHandle(dataList, needRowSpan,span,colKeyList) {
        needRowSpan.forEach((key) => {
          const sum = {};
          let i = 0; let k = 0;
          const that = this;
          for (let j = 0; j < dataList.length; j += 1) {
            i += 1;
            let tdList = [];
            if (dataList[j].tdList) {
              tdList = [...dataList[j].tdList];
            } else {
              tdList = [...colKeyList];
            }
            if (dataList[j - 1] && (dataList[j][key] === dataList[j - 1][key] || !dataList[j][key])) {
              const index = tdList.indexOf(key);
              if (index > -1) {
                tdList.splice(index, 1);
              }
            }
            dataList[j].tdList = tdList;
            if (dataList[j + 1] && dataList[j + 1][key]) {
              if (dataList[j][key] !== dataList[j + 1][key]) {
                sum[k] = i;
                i = 0; k = j + 1;
              }
            } else if (!dataList[j + 1]) {
              sum[k] = i;
            }
          }
          span[key] = sum;
        });
        this.showTable = true;
      },


				rowClass({ row, rowIndex}) {
				    return {
				        background: '#f2f2f2',
				        color: '#333'
				    }
				},
				handleload() {

				},
				  handlerCommand(command){
						 if(command.flag==0){
               if(command.value=='全部'){
                 	this.year  = '年份';
               }else{
                 this.year = command.value;
                 this.dataIndex = command.index;
                  this.init_year();
               }


							}
							 if(command.flag==1){
								  if(command.value=='全部'){
											this.node_type  = '所属环节';
									}else{
										this.node_type = command.value;
										this.nodeIndex = command.index;
										this.init_node_type();
									}


								}
							this.init_data(1);
					},
				//初始化 年份 下拉选
				init_year(){
					let year_arr = [];
					var year = new Date().getFullYear();
					for(var i=0;i<10;i++){
							year_arr = year_arr.concat(year--);
						}
					 this.dataList = year_arr;
					},

					//初始化 节点类型 下拉选
					init_node_type(){
						let node_type_arr = ['全部','屠宰','批发','零售','超市','团餐'];
						 this.node_type_list = node_type_arr;
						},
						handlerChoose(type){
							this.Index = type;
							this.mymask = true;
							let arr = [];
							if(type==1){
							  this.node_type_list.forEach(ele=>{
							    if(ele!='全部'){
							      let obj = {
							        Addshow:false,
							        name:ele
							      }
							      arr.push(obj);
							    }
							  })
							  this.multiData = arr;
							  this.AddData = this.AddDataOne;
							}
						},
						leave(index){
						  this.multiData[index].Addshow = false;
						},
						enter(index){
						  this.multiData[index].Addshow = true;
						},
						leave1(index){
						  this.AddData[index].Deleteshow = false;
						},
						enter1(index){
						  this.AddData[index].Deleteshow = true;
						},
						handlerAdd(item,index){

							  if(this.AddName.indexOf(item.name)==-1){
							   let obj = {
							     index:index,
							     name:item.name,
							     Deleteshow:false
							   }
							   this.AddData.push(obj);
							   this.AddName.push(item.name);
							 }else{
							   this.$message('该筛选项已存在');
							 }



						},
						handlerAllAdd(){

							  let arr = [];
							  let arr1 = [];
							  this.multiData.forEach((ele,index)=>{
							    let obj = {
							      index:index,
							      name:ele.name,
							      Deleteshow:false
							    }
							    if(this.AddData.length>0){
							      if(this.AddName.indexOf(ele.name)==-1){
							         this.AddData.push(obj);
							         this.AddName.push(ele.name);
							      }
							    }else{
							      arr.push(obj);
							      arr1.push(ele.name);
							    }
							  })
							  if(this.AddData.length==0){
							    this.AddData = arr;
							     this.AddName = arr1;
							  }

						},
						handlerDelete(item,index){
							  this.AddData.splice(index,1);
								this.AddName.splice(index,1);
							 if(this.Index==1){
							  this.AddDataTwo.splice(index,1);
							}
						},
						handlerAllDelete(){

							  this.AddData = [];
							  if(this.Index==1){
							    this.AddDataOne = [];
							  }

						},
						allAddFun(){
							if(this.AddData.length>0){
								let arr = [];
								this.AddData.forEach(ele=>{
									arr.push(ele.name);
								})
								if(this.AddData.length==1){
									if(this.Index==1){
											this.node_type = arr[0];
											//去查询
											this.init_data(1);
										}
								}else{
									if(this.Index==1){
											this.node_type = arr. join(',');
											//去查询
										this.init_data(1);
										}
								}
							}else {
								if(this.Index==1){
									 this.node_type = '所属环节';
									this.AddDataOne = [];
										//去查询
										this.init_data(1);
									}
							}
							 this.AddDataOne = this.AddData;
							 this.handlerClose();

						},
						handlerClose(){
							this.mymask = false;
							document.body.style.overflow = '' // 出现滚动条
							document.removeEventListener('touchmove', preD, {passive: false})
						},
						//初始化数据量和报送企业数量
						init_data(flag){
							let p_year;
							let p_node_type;
							if(this.year == '年份'){
								p_year = '';
							}else{
								p_year = this.year;
							}
							let t = [];
							t= 	this.$refs.tabs.children;

							if(this.node_type == '所属环节'){
								p_node_type = '';
								for(var i = 0; i< t.length;i++){
										t[i].style.display = '';
								}

							}else{
								if(this.node_type.indexOf(",")== -1){
									for(var i = 0; i< t.length;i++){
										if(t[i].innerText ==this.node_type ){
											t[i].style.display = '';
											 this.currentTab = this.node_type;
											 	t[i].className = 'tab onSelect';
										}else{
											t[i].style.display = 'none';
										}
									}
									p_node_type = "'"+this.node_type + "'";
								}else{
									let str = '';
									 let arr = this.node_type.split(',');
									 for(var i = 0; i< t.length;i++){
										 let flag = false;
										  arr.forEach(ele=>{
												if(t[i].innerText ==ele ){
													flag = true;
												}
										 })
												if(flag){
													t[i].style.display = '';
													 t[i].className = 'tab onSelect';
												}else{
													t[i].style.display = 'none';
												}
									 }

									this.currentTab = arr[0];
									 arr.forEach(ele=>{
										   str += "'" + ele + "',";
									 })
									p_node_type = str.substr(0,str.length-1);
								}
							}

							let getStr = 'date='+p_year+'&node_type='+p_node_type;

							getQueryNodeDataTj(getStr).then(res=>{
								this.nodeNum = res.data.map.nodeNum;
								let  n = res.data.map.num;

								if(isNaN(n)){
									this.num =0+'条';
								}else{
									let num_str;
									if(n > 10000000){
										 num_str = (n/100000000).toFixed(3)+'亿';
									} else{
											num_str= (n/10000).toFixed(3)+'万';

									}
									this.num =num_str;
								}


							})
							this.tableHeader = [];
								this.nodeNumlist = [];
							//初始化 和更新表格 各个节点的数量
							let getStrOne = 'node_type='+p_node_type;
								getQueryNodeDataNum(getStrOne).then(res=>{
										this.tableHeader = res.data.headerList;
										this.nodeNumlist = res.data.list;
									})



							this.init_echartOne(getStr);
							this.newArr=[[]];
							this.DataNumRateList = [];
							this.span={} ;
							this. colKeyList=[];       //所有的key
							this.needRowSpan=[];
							this.init_tableOne(getStr,flag);

							this.newArrOneType=[[]];
							this.DataByNodeTypeList = [];
							this.spanOneType={} ;
							this. colKeyListOneType=[];       //所有的key
							this.needRowSpanOneType=[];
							this.init_tableTwo('date='+p_year+'&node_type=',flag);
						},
						//初始化 节点运行比例表格数据
						init_tableOne(getStr,flag){
							getQueryNodeDataNumRate(getStr).then(res=>{
								this.headerList = res.data.headerList;
								this.DataNumRateList = res.data.dataList;
								this.maxHeight=this.getMaxFloor(this.headerList);       //1. 计算出表头一共需要多少行
								this.columnsHandle(this.headerList,this.newArr,this.needRowSpan,this.colKeyList);
								this.dataHandle(this.DataNumRateList,this.needRowSpan,this.span,this.colKeyList);         // 3. 对数据进行处理（传入参数： 具体数据，需要跨行列的（key））
							})
						},

						//初始化 报送企业数据详情表格数据
						init_tableTwo(str,flag){
							//获取现在的节点类型
							let node_type = this.currentTab;
							getQueryNodeDataByNodeType(str+"'"+node_type+"'").then(res=>{
							this.oneTypeHeaderList = res.data.headerList;
							this.DataByNodeTypeList = res.data.dataList;
							this.maxHeight=this.getMaxFloor(this.oneTypeHeaderList);  //1. 计算出表头一共需要多少行
									 	//第一次加载
							this.columnsHandle(this.oneTypeHeaderList,this.newArrOneType,this.needRowSpanOneType,this.colKeyListOneType);                       //2. 对表头进行处理
							this.dataHandle(this.DataByNodeTypeList,this.needRowSpan,this.spanOneType,this.colKeyListOneType);         // 3. 对数据进行处理（传入参数： 具体数据，需要跨行列的（key））
							})
						},
							//初始化折线柱状图
						init_echartOne(getStr){

							getQueryNodeDataNumRateView(getStr).then(res=>{
								 let dataX = [];
								 let dataY = [];
								 let dataR = [];
								 let dataList = res.data.list;
								 dataList.forEach(ele=>{
										dataX.push(ele.date);
										dataY.push(ele.num);
										let a = (ele.rate*100).toFixed(1);
										dataR.push(a);
								 })
								 	this.mychart = this.$echarts.init(document.getElementById('echartsOne'));

								       // 监听屏幕变化自动缩放图表
								       window.addEventListener('resize', function () {
								        //  this.mychart.resize()
								       })
								       this.mychart.setOption(
											 {

								         	title: {
								         		text: '节点正常运行数量和比例（家 / %）',
								         		subtext: '',
								         		left: 'left',
								         		top:10,
                            left: '15px',
								         		textStyle:{
								         			fontSize:14
								         		}
								         	},
													legend:{
														data: ["正常节点运行数量","正常节点运行比例"],
														top:'10',
														//left: 'right',
														//orient: "vertical", // 'vertical'纵向展示  horizontal横向展示
														textStyle: {
															color:'#ccc',
														},
													},
// 													grid:{          //显示数据的图表位于当前canvas的坐标轴
// 															x:60,
// 															y:100,
// 															x2:60,
// 															y2:50,
// 															borderWidth:1
// 													},
// 								           dataZoom : {//实现缩放功能
// 								               show : true,
// 								               realtime : true,
// 								               start : 0,
// 								               end : 70
// 								           },
								         	tooltip: 	{
								         		trigger: 'axis',
														 formatter:function (params, ticket, callback) {
															var showHtm="";
															for(var i=0;i<params.length;i++){
																	//名称
																	var name = params[i].seriesName;
																	//值
																	var value = params[i].data;
																	if(name == '正常节点运行数量'){
																		showHtm+=  name + ':' + value+'家<br>'
																	}else{
																		showHtm+=  name + ':' + value+'%<br>'
																	}
															}
															return showHtm;
													}
								         	},
								         	xAxis: [{
								         		type: 'category',
								         		data: dataX
								         	}],
								         	yAxis: [{
								         		type: 'value',
														name:'正常节点运行数量',
														nameLocation: 'middle', // 坐标轴名称显示位置。('start''middle''center''end')
														nameGap: 50, // 坐标轴名称与轴线之间的距离。
														nameTextStyle: {
															color:'#ccc',
														}, // 坐标轴名称的文字样式。
								         		splitLine:{
								         		　　　show:false
								         		}
								         	},
													{
														type: 'value',
														min: 0,
														max: 100,
														interval: 10,
														name:'正常节点运行比例',
														nameTextStyle: {
															color:'#ccc',
														}, // 坐标轴名称的文字样式。
														nameLocation: 'middle', // 坐标轴名称显示位置。('start''middle''center''end')
														nameGap: 50, // 坐标轴名称与轴线之间的距离。
														 axisLabel: {
	                            formatter: '{value} %'
	                        },
														splitLine:{
														　　　show:false
														}
													},

													],
								         	series: [
														{
														name:'正常节点运行数量',
								         		data: dataY,
								         		type: 'bar',
								         		itemStyle:{
								         		  normal:{
								         		     color:'#4F81BD',
// 								                 color: function(params) {
// 								                   // 给出颜色组
// 								                   var colorList = ['#3FB27E','#9BCC66','#F35352','#F7CB4A','#F88D48','#69D4DB','#5182E4','#9BCC66','#5186D2','#D42D6B','#CE62D6','#F7CB6A','#51B4F1','#D85ED3','#5156B8','#8954D4'];
// 								                   return colorList[params.dataIndex]
// 								                 },
								         		    label: {
								         		      show: true, //开启显示
								         		      position: 'top', //在上方显示
								         		      textStyle: { //数值样式
								         		        color: '#666',
								         		        fontSize: 12
								         		      }
								         		    }
								         		  }
								         		}
								         	},
													{
														name:'正常节点运行比例',
														data: dataR,
														type: 'line',
														 yAxisIndex: 1,//索引从0开始
														itemStyle:{
														normal:{
																		color:'#8AE09F',
																		label: {
																				show: true, //开启显示
																				position: 'bottom', //在下方显示
																				 formatter:'{c}%',
																				textStyle: { //数值样式
																				color: '#666',
																				fontSize: 12
																					         	}
																					  }
																		}
																	}
														}
													]
								       })

							})

						}
					}
		}
</script>

<style scoped lang='less'>
 @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
				white-space: nowrap;
        .table-btn{
            margin: 0 5px;
            float: left;
            cursor: pointer;
            font-size: 14px;
        }
        .searchs{
            padding: 10px;
            background: #fff;
                .file-btn{
                    color: #777;
                    background: #fff;
                    border-color: #eaeaea;
                }
                .search-btn{
                    color: #409EFF;
                    background: #fff;
                }
                .clear-content{
                    margin-left: 10px;
                    cursor: pointer;
                    color: #999999;
                    font-size: 14px;
                }
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .unfold{
                    text-align: center;
                    font-size: 14px;
                    color: #409EFF;
                    cursor: pointer;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
                .select{
                  cursor: pointer;
                  display: inline-block;
                  margin-right: 20px;
                  font-size: 14px;
                  .el-dropdown{
                    margin-right: 3px;
                   }
                  .el-dropdown-link{
                    border-bottom: 1px solid rgba(81,130,228,.5);
                    height: 30px;
                    line-height: 30px;
                    display: inline-block;
                    font-size: 14px;
                  }
                  .choose{
                    cursor: pointer;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    border-bottom:  1px solid #666;
                  }
                }

        }
        .table{
            margin-top: 10px;
            /* padding: 10px; */
						/*overflow:auto;*/
            position: relative;
            background: #fff;
            .title{
                display: flex;
                margin-bottom: 10px;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
            }
            .subject{
              /* border-bottom: 10px solid #F2F2F2; */
              .subTab{
								 height: 10px;
							}
							.subAll{
                height: 120px;
                display: flex;
                .sub-item{
                    width: 16%;
                    height: 120px;
                     text-align: center;
                     border-left: 3px solid #E8EBED;
                     box-sizing: border-box;
                    .num{
                      font-size: 26px;
                      color: #9ECD6A;
                      line-height: 35px;
                      span{
                        font-size: 12px;
                      }
                    }
                     .myp{
                       line-height: 25px;
                       margin-top: 30px;
                     }

                }
								.span{
									font-size: 15px;
									display:inherit;
									margin-top: 20px;margin-bottom: 20px;
									margin-left:10px;
									width:12%;
								}
                .sub-item1{
                  width: 60%;
                  .num{
                    color: #42BC85;
                  }
                }
								.sub-item3{
									display: flex;
								  .num{
								    color: #42BC85;
								  }
								}

								.sub-item2{
								  width: 100%;
									height: 400px;
									overflow: auto;
								  .num{
								    color: #42BC85;
								  }
										.table1 {
											width:100%;
											border-collapse:collapse;
											font-size:14px;
											color: #515a6e;
											border:1px solid  #515a6e;
									}
									 .table1 thead tr th{
											height: 25px;
                      color: #333333;
											white-space: nowrap;
											overflow: auto;
											background-color: #f8f8f9;
									}
									 td, th
									{
											text-align:center;
											border:1px solid  #e8eaec;
									}
									 /*tr:hover{*/
										 /*background:#EBF7FF;*/
									 /*}*/
									.table1 thead tr th ,.table1 tbody tr td{
											padding:0 8px;
									}
									.table1 tbody tr td{
											height:25px;
											background-color: white;
									}
								}
								.tabs{
									display:flex;
									margin-top: 20px;
									margin-left: 20px;
								}
								.tab a{
									font-size:15px;
									margin-top:20px;
									margin-bottom:20px;
									margin-left:10px;
									cursor:pointer;
									border-bottom: 1px solid rgba(81, 130, 228, 0.5);


								}

								.onSelect a{
									font-size:15px;
									color: blue;
									margin-top:20px;
									margin-bottom:20px;
									cursor:pointer;
									border-bottom: 1px solid blue;


								}
              }
            }
            .myEcharts{
              overflow: hidden;
							height: 300px;
              /* margin-top: 30px; */
              border-top: 10px solid #F2F2F2;
              .echarts-item{
                width: 100%;
                float: left;
                box-sizing: border-box;
                border-right: 10px solid #F2F2F2;
                height: 300px;
                /* padding: 10px; */
                .map{
                  width: 100%;
                  height: 300px;
                }
                .myecharts{
                  width: 100%;
                  height: 300px;
                }
              }
            }
        }
        .mytables{
          font-size: 14px !important;
          /* margin-top: 10px solid #f2f2f2; */
        }
        .multi{
              position: fixed;
              top: 50%;
              left: 50%;
              margin-top: -250px;
              margin-left: -250px;
              width: 500px;
              height: 500px;
              background: #F0F2F3;
              z-index: 999;
              .multi-head{
                line-height: 30px;
                color: rgba(10,18,32,.64);
                font-size: 14px;
                padding: 10px 20px;
                .icon-close{
                  font-size: 18px;
                  float: right;
                  cursor: pointer;
                }
              }
              .multi-con{
                background-color: #fff;
                margin: 10px 30px;
                height: 380px;
                overflow: hidden;
                box-shadow: 0 0 6px 0 rgba(0,0,0,.06), 0 10px 12px 0 rgba(118,153,222,.1);
                .multi-left{
                  float: left;
                  width: 50%;
                  box-sizing: border-box;
                  height: 380px;
                  .left-head{
                      margin: 11px 16px;
                      position: relative;
                      color:rgba(10,18,32,.64);
                      font-size: 13px;
                  }
                  .left-con{
                    width: 100%;
                    height: 340px;
                    position: relative;
                    margin-top: 15px;
                    .tooltip{
                      position: absolute;
                      top: 50%;
                      left: 0;
                      width: 100%;
                      margin: -32px 0 0;
                      line-height: 32px;
                      text-align: center;
                      color: rgba(10,18,32,.46);
                      font-size: 13px;
                    }
                    .all-item{
                      height: 300px;
                      overflow: auto;
                      .left-item{
                          position: relative;
                          line-height: 32px;
                          padding-left: 16px;
                          color:rgba(10,18,32,.64);
                          font-size: 13px;
                          span{
                            color: #2EA7E0;
                            cursor: pointer;
                            float: right;
                            margin-right: 15px;
                          }
                          span:hover{
                            text-decoration: underline;
                          }
                      }
                      .hover{
                        background-color: #F1F3F4;
                      }
                    }

                    .ng-scope{
                      line-height: 25px;
                      position: absolute;
                      bottom: 15px;
                      left: 0;
                      width: 100%;
                      text-align: center;
                      font-size: 13px;
                      color: rgba(10,18,32,.46);
                      span{
                        color: #2EA7E0;
                        cursor: pointer;
                      }
                      span:hover{
                        text-decoration: underline;
                      }
                    }
                  }
                }
                .multi-left1{
                   box-shadow: 2px 0 0 0 rgba(0,0,0,.03);
                }
              }
              .mybtn{
                float: right;
                margin: 10px 0;
              }
        }
        .mask{
        	position: fixed;
        	z-index: 998;
        	top: 0;
        	right: 0;
        	left: 0;
        	bottom: 0;
        	background: rgba(213,217,220,.94);
        	opacity: 0.94;
        }
    }

</style>
<style lang="less">
	.runAssessment{
		.el-upload--picture-card{
			height: 60px !important;
			width: 60px !important;
		}
		.el-upload-list--picture-card .el-upload-list__item{
			height: 60px !important;
			width: 60px !important;
		}
		.el-table__body .el-table__row{
			height: 40px;
			line-height: 40px;
		}
		.BMap_cpyCtrl {
		display: none;
		}
		.anchorBL {
		display: none;
		}
		.active{
		color:#2EA7E0;
		}
		.el-dropdown-menu{
		height: 240px;
		overflow: auto;
		width: 170px;
		}
		.mytables .el-table .cell{
		font-size: 12px;
		}
	}
</style>
