<template>
 <div class="content moreStore">
  <div v-if="show" class="myDiv" v-loading="Dataloading"></div>
	<div>
		<div class="searchs" ref="searchs">
			<el-form ref="form" :inline="true" :model="form" label-width="100px">
			  <div class="select">
			    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
			      <span class="el-dropdown-link">
			        {{selectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item :command="{value:'全部时间',flag:0,index:0}" :class="dateIndex == 0 ? 'active':''">全部时间</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.in_date,flag:0,index:index + 1}" :class="dateIndex == index +1 ? 'active':''" v-for="(item,index) in dateList" :key="index">{{item.in_date}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			  </div>
			  <div class="select">
			    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
			      <span class="el-dropdown-link">
			        {{selectTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item :command="{value:'全部',flag:1,index:0}" :class="nodeDetailTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.node_detail_type,flag:1,index:index1 + 1}" :class="nodeDetailTypeIndex == index1 +1 ? 'active':''" v-for="(item,index1) in nodeDetailTypeList" :key="index1">{{item.node_detail_type}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			    <span class="choose" @click="handlerChoose(0)">多选</span>
			  </div>
			  <div class="select">
			    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
			      <span class="el-dropdown-link">
			        {{selectThree}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item :command="{value:'全部',flag:2,index:0}" :class="groupNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.group_name,flag:2,index:index2 + 1}" :class="groupNameIndex == index2 +1 ? 'active':''" v-for="(item,index2) in groupNameList" :key="index2">{{item.group_name}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			    <span class="choose" @click="handlerChoose(1)">多选</span>
			  </div>
			  <div class="select">
			    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
			      <span class="el-dropdown-link">
			        {{selectFour}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item :command="{value:'全部',flag:3,index:0}" :class="infoTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.info_type,flag:3,index:index3 + 1}" :class="infoTypeIndex == index3 +1 ? 'active':''" v-for="(item,index3) in infoTypeList" :key="index3">{{item.info_type}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			    <span class="choose" @click="handlerChoose(2)">多选</span>
			  </div>
        <div class="select">
          <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
            <span class="el-dropdown-link">
              {{selectFive}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:'全部',flag:4,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
              <el-dropdown-item :command="{value:item.node_name,flag:4,index:index4 + 1}" :class="nodeNameIndex == index4 +1 ? 'active':''" v-for="(item,index4) in nodeNameList" :key="index4">{{item.node_name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(3)">多选</span>
        </div>
			</el-form>
		</div>
    <div class="mytable1" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading1">
     <p class="mytable1-item1-title">运行指标汇总</p>
     <div class="draw-table1">
       <el-table :data="storeMonthStrandedList" border :header-cell-style="rowClass" :height="200">
         <el-table-column  prop="info_type" label="信息类型"> </el-table-column>
         <el-table-column  prop="num" label="数据量" ></el-table-column>
         <el-table-column  prop="active" label="活跃门店数" ></el-table-column>
         <el-table-column  prop="days" label="报送天数"></el-table-column>
         <el-table-column  prop="weight" label="重量"></el-table-column>
       </el-table>
     </div>
    </div>
    <div class="myecharts1" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
      <p class="myecharts1-item1-title">数据量指标分析</p>
      <div id="echartsOne_more" class="myecharts" style="height: 300px;"></div>
    </div>
    <div class="myecharts2" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
      <p class="myecharts2-item2-title">门店活跃度指标分析</p>
      <p class="myecharts2-avgActive">{{avgActive}}</p>
      <p class="myp">平均</p>
      <div id="echartsTwo_more" class="myecharts" style="height: 250px;"></div>
    </div>
    <div class="myecharts3" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
      <p class="myecharts3-item3-title">价格指标分析</p>
      <div id="echartsThree_more" class="myecharts" style="height: 300px;"></div>
    </div>
    <div class="myecharts4" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
      <p class="myecharts4-item4-title">重量指标分析</p>
      <div id="echartsFour_more" class="myecharts" style="height: 300px;"></div>
    </div>
    <div class="mytable2" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading3">
      <p class="mytable2-item2-title">门店运行指标明细</p>
      <div class="draw-table2">
        <el-table :data="storeMonthStrandedDetailedList" border :header-cell-style="rowClass" :height="300">
          <el-table-column  prop="node_id" label="节点编码"> </el-table-column>
          <el-table-column   prop="node_name" label="节点名称" ></el-table-column>
          <el-table-column  prop="info_type" label="信息类型" >
            <template slot-scope="scope">
               <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
            </template>
          </el-table-column>
          <el-table-column  prop="num" label="数据量">
            <template slot-scope="scope">
               <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.num}}</div>
            </template>
          </el-table-column>
          <el-table-column  prop="days" label="报送天数">
            <template slot-scope="scope">
               <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.days}}</div>
            </template>
          </el-table-column>
          <el-table-column  prop="weight" label="重量">
            <template slot-scope="scope">
               <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.weight}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="myecharts5" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading4">
      <p class="myecharts5-item5-title">追溯查询次数指标分析</p>
      <div id="echartsFive_more" class="myecharts" style="height: 300px;"></div>
    </div>
    <div class="mytable3" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading5">
     <p class="mytable3-item3-title">追溯查询指标明细</p>
     <div class="draw-table3">
       <el-table :data="storeTraceDetailList" border :header-cell-style="rowClass" :height="300">
         <el-table-column  prop="node_name" label="节点名称"></el-table-column>
         <el-table-column  prop="check_type" label="查询方式" >
           <template  slot-scope="scope">
             <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.check_type}}</div>
           </template>
         </el-table-column>
         <el-table-column  prop="trace_result" label="查询结果" >
           <template  slot-scope="scope">
             <div class="item" v-for="(item, index) in scope.row.node" :key="index">
               <div class="item" v-for="(item1, index1) in item.check" :key="index1">{{item1.trace_result}}</div>
             </div>
           </template>
         </el-table-column>
         <el-table-column  prop="select_num" label="查询次数">
           <template  slot-scope="scope">
             <div class="item" v-for="(item, index) in scope.row.node" :key="index">
               <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                  <div class="item" v-for="(item2, index2) in item1.result" :key="index2">{{item2.select_num}}</div>
               </div>
             </div>
           </template>
         </el-table-column>
         <el-table-column  prop="days" label="查询天数">
           <template  slot-scope="scope">
             <div class="item" v-for="(item, index) in scope.row.node" :key="index">
               <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                  <div class="item" v-for="(item2, index2) in item1.result" :key="index2">{{item2.days}}</div>
               </div>
             </div>
           </template>
         </el-table-column>
       </el-table>
     </div>
    </div>
    <div class="mytable4" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading3">
     <p class="mytable4-item4-title">运行指标汇总</p>
     <div class="draw-table4">
       <el-table :data="storeMonthStrandedDayList" border :header-cell-style="rowClass" :height="300">
         <el-table-column  prop="node_id" label="节点编码"> </el-table-column>
         <el-table-column  prop="node_name" label="节点名称" ></el-table-column>
         <el-table-column  prop="date" label="时间日期" ></el-table-column>
         <el-table-column  prop="info_type" label="信息类型"></el-table-column>
         <el-table-column  prop="num" label="数据量"></el-table-column>
       </el-table>
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
        <div class="left-head">所属大区</div>
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
import {getQueryNodeMonthType,getQueryNodeMonthStranded,getQueryNodeMonthStrandedNumAndWeight,getQueryMoreBusinessMonthStrandedDay,getQueryMoreNodeTrace,getQueryMoreNodeTraceDetail} from '../../js/platform/platform.js';
var preD = function (e) {
     e.preventDefault()
}
export default {
	name:"dataControl",
	data() {
		return {
      show:true,
			Dataloading:false,
      Dataloading1:false,
      Dataloading2:false,
      Dataloading3:false,
      Dataloading4:false,
      Dataloading5:false,
      mymask:false,
      multiData:[],
      AddDataOne:[],
      AddDataTwo:[],
      AddDataThree:[],
      AddDataFour:[],
      AddData:[],
      AddName:[],
      Index:'',
			selectOne : '时间',
			selectTwo : '节点详细分类',
			selectThree : '集团名称',
			selectFour : '信息类型',
      selectFive : '节点名称',
			dateIndex : 0,
			nodeDetailTypeIndex : 0,
			dateList : [],
			nodeDetailTypeList : [],
		  nodeNameIndex : 0,
      groupNameIndex : 0,
      infoTypeIndex : 0,
      nodeNameList : [],
      groupNameList : [],
      infoTypeList :[],
      storeMonthStrandedList:[],
      storeMonthStrandedDetailedList:[],
      storeTraceDetailList:[],
      storeMonthStrandedDayList:[],
      avgActive : 0,
			form:{
			}
		}
	},
	mounted(){
		this.getQueryNodeMonthTypeFun();
    this.getQueryNodeMonthStrandedFun();
    this.getQueryNodeMonthStrandedNumAndWeightFun();
    this.getQueryMoreBusinessMonthStrandedDayFun();
    this.getQueryMoreNodeTraceFun();
    this.getQueryMoreNodeTraceDetailFun();
	},
	methods:{
    init(){
      this.getQueryNodeMonthStrandedFun();
      this.getQueryNodeMonthStrandedNumAndWeightFun();
      this.getQueryMoreBusinessMonthStrandedDayFun();
      this.getQueryMoreNodeTraceFun();
      this.getQueryMoreNodeTraceDetailFun();
    },
    rowClass({row, rowIndex}) {
        return {
            background: '#f2f2f2',
            color: '#333'
        }
    },
		getQueryNodeMonthTypeFun(){
      this.Dataloading = true;
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
      let type = "多门店";
      let str = 'type=' + type;
			getQueryNodeMonthType(str)
			.then( res => {
				  this.dateList = res.data.inDataList
				  this.nodeDetailTypeList = res.data.nodeDetailTypeList
				  this.nodeNameList = res.data.nodeNameList
				  this.groupNameList = res.data.groupNameList
          this.infoTypeList = res.data.infoTypeList
          this.Dataloading = false;
          this.show = false;
          document.body.style.overflow = '' // 出现滚动条
          document.removeEventListener('touchmove', preD, {passive: false})
			  })
			 .catch(error => {
				 console.log(error)
			 })
		},
    getQueryNodeMonthStrandedFun(){
      this.Dataloading1 = true;
      let date = ''
      let node_type = ''
      let node_name = ''
      let group_name = ''
      let info_type = ''
      if(this.selectOne == '时间'){
         let nowDate = new Date();
         let in_date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth(),
         }
         date = in_date.year + (in_date.month < 10 ?  ( '0' + in_date.month) : in_date.month);
      }else{
         let time = this.selectOne;
         let yy = time.split('年')[0];
         let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
         date = yy + mm;
      }
      if(this.selectTwo == '节点详细分类'){
         node_type = "'超市配送','肉品专卖店','超市门店','生鲜超市','团体配送','团体消费门店','直营直供门店','直营直供配送'"
      }else{
        if(this.selectTwo.indexOf(',')==-1){
          node_type = "'" + this.selectTwo + "'";
        }else{
          let str = '';
          let arr = this.selectTwo.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectThree == '集团名称'){
         group_name = ''
      }else{
        if(this.selectThree.indexOf(',')==-1){
          group_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          group_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectFour == '信息类型'){
         info_type = ''
      }else{
        if(this.selectFour.indexOf(',')==-1){
          info_type = "'" + this.selectFour + "'";
        }else{
          let str = '';
          let arr = this.selectFour.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          info_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectFive == '节点名称'){
         node_name = ''
      }else{
        if(this.selectFive.indexOf(',')==-1){
          node_name = "'" + this.selectFive + "'";
        }else{
          let str = '';
          let arr = this.selectFive.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_name = str.substr(0,str.length-1);
        }
      }
      let str = 'date=' + date + '&node_type=' + node_type + '&group_name=' + group_name + '&info_type=' + info_type + '&node_name=' + node_name ;
      this.storeMonthStrandedList = [];
      getQueryNodeMonthStranded(str)
        .then(res => {
        //	  this.nodeMonthStrandedList = res.data.list
            res.data.list.forEach(ele=>{
              let price = parseFloat(ele.price).toFixed(2)
              let weight = parseFloat(ele.weight).toFixed(2)
              let map = {
                "info_type": ele.info_type,
                "price": price,
                "num": ele.num,
                "days": ele.days,
                "weight":weight,
                "active":ele.active
              }
              this.storeMonthStrandedList.push(map)
              this.Dataloading1 = false;
            })

          })
         .catch(error => {
        	 console.log(error)
         })

    },
    getQueryNodeMonthStrandedNumAndWeightFun(){
      this.Dataloading2 = true;
      this.avgActive = 0 ;
      this.getQueryNodeMonthStrandedNumAndWeightFun1();
      this.getQueryNodeMonthStrandedNumAndWeightFun2();
      this.getQueryNodeMonthStrandedNumAndWeightFun3();
      this.getQueryNodeMonthStrandedNumAndWeightFun4();
      let date = ''
      let node_type = ''
      let node_name = ''
      let group_name = ''
      let info_type = ''
      if(this.selectOne == '时间'){
         let nowDate = new Date();
         let in_date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth(),
         }
         date = in_date.year + (in_date.month < 10 ?  ( '0' + in_date.month) : in_date.month);
      }else{
         let time = this.selectOne;
         let yy = time.split('年')[0];
         let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
         date = yy + mm;
      }
      if(this.selectTwo == '节点详细分类'){
         node_type = "'超市配送','肉品专卖店','超市门店','生鲜超市','团体配送','团体消费门店','直营直供门店','直营直供配送'"
      }else{
        if(this.selectTwo.indexOf(',')==-1){
          node_type = "'" + this.selectTwo + "'";
        }else{
          let str = '';
          let arr = this.selectTwo.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectThree == '集团名称'){
         group_name = ''
      }else{
        if(this.selectThree.indexOf(',')==-1){
          group_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          group_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectFour == '信息类型'){
         info_type = ''
      }else{
        if(this.selectFour.indexOf(',')==-1){
          info_type = "'" + this.selectFour + "'";
        }else{
          let str = '';
          let arr = this.selectFour.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          info_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectFive == '节点名称'){
         node_name = ''
      }else{
        if(this.selectFive.indexOf(',')==-1){
          node_name = "'" + this.selectFive + "'";
        }else{
          let str = '';
          let arr = this.selectFive.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_name = str.substr(0,str.length-1);
        }
      }
      let str = 'date=' + date + '&node_type=' + node_type + '&group_name=' + group_name + '&info_type=' + info_type + '&node_name=' + node_name ;
     let lineValue1= [], arr = [],lineName = [],
      lineValue2= [],lineValue3= [],lineValue4= [],lineValue5= [],lineValue6= [],lineValue7= [],
      lineValue8= [],lineValue9= [],lineValue10= [],lineValue11= [],lineValue12= [];
     let lineChar1= [],lineChar2= [],lineChar3= [],lineChar4= [],lineChar5= [],lineChar6= [],lineChar7= [],
      lineChar8= [],lineChar9= [],lineChar10= [],lineChar11= [],lineChar12= [];
     let linePrice1= [],linePrice2= [],linePrice3= [],linePrice4= [],linePrice5= [],linePrice6= [],linePrice7= [],
       linePrice8= [],linePrice9= [],linePrice10= [],linePrice11= [],linePrice12= [];
      getQueryNodeMonthStrandedNumAndWeight(str)
        .then(res => {

            if(res.data.resultMap.批发肉品交易){
              arr.push('批发肉品交易');
              res.data.resultMap.批发肉品交易.forEach(ele=>{
                 lineValue1.push(ele.num.split('.')[0]);
                 lineChar1.push(parseFloat(ele.weight).toFixed(2));
                 linePrice1.push(parseFloat(ele.price).toFixed(2));

              })
              if(lineName.length == 0){
                res.data.resultMap.批发肉品交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.批发肉品进场){
              arr.push('批发肉品进场');
              res.data.resultMap.批发肉品进场.forEach(ele=>{
                 lineValue2.push(ele.num.split('.')[0]);
                 lineChar2.push(parseFloat(ele.weight).toFixed(2));
                 linePrice2.push(parseFloat(ele.price).toFixed(2));

              })
              if(lineName.length == 0){
                res.data.resultMap.批发肉品进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.批发蔬菜交易){
              arr.push('批发蔬菜交易');
              res.data.resultMap.批发蔬菜交易.forEach(ele=>{
                 lineValue3.push(ele.num.split('.')[0]);
                 lineChar3.push(parseFloat(ele.weight).toFixed(2));
                 linePrice3.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.批发蔬菜交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.批发蔬菜进场){
              arr.push('批发蔬菜进场');
              res.data.resultMap.批发蔬菜进场.forEach(ele=>{
                 lineValue4.push(ele.num.split('.')[0]);
                 lineChar4.push(parseFloat(ele.weight).toFixed(2));
                 linePrice4.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.批发蔬菜进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.零售肉品交易){
              arr.push('零售肉品交易');
              res.data.resultMap.零售肉品交易.forEach(ele=>{
                 lineValue5.push(ele.num.split('.')[0]);
                 lineChar5.push(parseFloat(ele.weight).toFixed(2));
                 linePrice5.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.零售肉品交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.零售肉品进场){
              arr.push('零售肉品进场');
              res.data.resultMap.零售肉品进场.forEach(ele=>{
                 lineValue6.push(ele.num.split('.')[0]);
                 lineChar6.push(parseFloat(ele.weight).toFixed(2));
                 linePrice6.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.零售肉品进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.零售蔬菜交易){
              arr.push('零售蔬菜交易');
              res.data.resultMap.零售蔬菜交易.forEach(ele=>{
                 lineValue7.push(ele.num.split('.')[0]);
                 lineChar7.push(parseFloat(ele.weight).toFixed(2));
                 linePrice7.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.零售蔬菜交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.零售蔬菜进场){
              arr.push('零售蔬菜进场');
              res.data.resultMap.零售蔬菜进场.forEach(ele=>{
                 lineValue8.push(ele.num.split('.')[0]);
                 lineChar8.push(parseFloat(ele.weight).toFixed(2));
                 linePrice8.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.零售蔬菜进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.超市肉品交易){
              arr.push('超市肉品交易');
              res.data.resultMap.超市肉品交易.forEach(ele=>{
                 lineValue9.push(ele.num.split('.')[0]);
                 lineChar9.push(parseFloat(ele.weight).toFixed(2));
                 linePrice9.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.超市肉品交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.超市肉品进场){
              arr.push('超市肉品进场');
              res.data.resultMap.超市肉品进场.forEach(ele=>{
                 lineValue10.push(ele.num.split('.')[0]);
                 lineChar10.push(parseFloat(ele.weight).toFixed(2));
                 linePrice10.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.超市肉品进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.超市蔬菜交易){
              arr.push('超市蔬菜交易');
              res.data.resultMap.超市蔬菜交易.forEach(ele=>{
                 lineValue11.push(ele.num.split('.')[0]);
                 lineChar11.push(parseFloat(ele.weight).toFixed(2));
                 linePrice11.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.超市蔬菜交易.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            if(res.data.resultMap.超市蔬菜进场){
              arr.push('超市蔬菜进场');
              res.data.resultMap.超市蔬菜进场.forEach(ele=>{
                 lineValue12.push(ele.num.split('.')[0]);
                 lineChar12.push(parseFloat(ele.weight).toFixed(2));
                 linePrice12.push(parseFloat(ele.price).toFixed(2));
              })
              if(lineName.length == 0){
                res.data.resultMap.超市蔬菜进场.forEach(ele=>{
                  lineName.push(ele.date);
                })
              }
            }
            let lineDate = [];
            let lineActive = [];
            res.data.activeList.forEach(ele=>{
              lineDate.push(ele.date);
              lineActive.push(ele.active);

            })
            this.getQueryNodeMonthStrandedNumAndWeightFun1(lineValue1, arr,lineName,
            lineValue2,lineValue3,lineValue4,lineValue5,lineValue6,lineValue7,
            lineValue8,lineValue9,lineValue10,lineValue11,lineValue12);
            this.avgActive =  res.data.num;
            this.getQueryNodeMonthStrandedNumAndWeightFun2(lineDate,lineActive);
            this.getQueryNodeMonthStrandedNumAndWeightFun3(linePrice1, arr,lineName,
            linePrice2,linePrice3,linePrice4,linePrice5,linePrice6,linePrice7,
            linePrice8,linePrice9,linePrice10,linePrice11,linePrice12);
            this.getQueryNodeMonthStrandedNumAndWeightFun4(lineChar1, arr,lineName,
            lineChar2,lineChar3,lineChar4,lineChar5,lineChar6,lineChar7,
            lineChar8,lineChar9,lineChar10,lineChar11,lineChar12);
            this.Dataloading2 = false;
          })
         .catch(error => {
        	 console.log(error)
         })
    },
    getQueryMoreBusinessMonthStrandedDayFun(){
       this.Dataloading3 = true;
      let date = ''
      let node_type = ''
      let node_name = ''
      let group_name = ''
      let info_type = ''
      if(this.selectOne == '时间'){
         let nowDate = new Date();
         let in_date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth(),
         }
         date = in_date.year + (in_date.month < 10 ?  ( '0' + in_date.month) : in_date.month);
      }else{
         let time = this.selectOne;
         let yy = time.split('年')[0];
         let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
         date = yy + mm;
      }
      if(this.selectTwo == '节点详细分类'){
         node_type = "'超市配送','肉品专卖店','超市门店','生鲜超市','团体配送','团体消费门店','直营直供门店','直营直供配送'"
      }else{
        if(this.selectTwo.indexOf(',')==-1){
          node_type = "'" + this.selectTwo + "'";
        }else{
          let str = '';
          let arr = this.selectTwo.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectThree == '集团名称'){
         group_name = ''
      }else{
        if(this.selectThree.indexOf(',')==-1){
          group_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          group_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectFour == '信息类型'){
         info_type = ''
      }else{
        if(this.selectFour.indexOf(',')==-1){
          info_type = "'" + this.selectFour + "'";
        }else{
          let str = '';
          let arr = this.selectFour.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          info_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectFive == '节点名称'){
         node_name = ''
      }else{
        if(this.selectFive.indexOf(',')==-1){
          node_name = "'" + this.selectFive + "'";
        }else{
          let str = '';
          let arr = this.selectFive.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_name = str.substr(0,str.length-1);
        }
      }
      let str = 'date=' + date + '&node_type=' + node_type + '&group_name=' + group_name + '&info_type=' + info_type + '&node_name=' + node_name ;
      this.storeMonthStrandedDetailedList = [];
      this.storeMonthStrandedDayList = [];
      getQueryMoreBusinessMonthStrandedDay(str)
        .then(res => {
        	    this.storeMonthStrandedDetailedList = res.data.detailedList
              let list = res.data.list, arr = [];
               list.forEach((val1, ele1) => {
                   val1.node.forEach((val2, ele2) => {
                       val2.time.forEach((val3, ele3) => {
                           if(ele3 == 0 && ele2 == 0){
                             val3.node_id = val1.node_id
                              val3.node_name = val1.node_name
                           }else{
                             val3.node_id = ''
                             val3.node_name = ''
                           }
                           if(ele3 == 0){
                             val3.date = val2.date

                           }else{
                             val3.date = ''

                           }
                           arr.push(val3)
                       })
                   })
               })
              this.storeMonthStrandedDayList = arr
              this.Dataloading3 = false;
          })
         .catch(error => {
        	 console.log(error)
         })

    },
    getQueryMoreNodeTraceDetailFun(){
        this.Dataloading5 = true;
      let date = ''
      let node_type = ''
      let node_name = ''
      let group_name = ''
      let info_type = ''
      if(this.selectOne == '时间'){
         let nowDate = new Date();
         let in_date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth(),
         }
         date = in_date.year + (in_date.month < 10 ?  ( '0' + in_date.month) : in_date.month);
      }else{
         let time = this.selectOne;
         let yy = time.split('年')[0];
         let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
         date = yy + mm;
      }
      if(this.selectTwo == '节点详细分类'){
         node_type = "'超市配送','肉品专卖店','超市门店','生鲜超市','团体配送','团体消费门店','直营直供门店','直营直供配送'"
      }else{
        if(this.selectTwo.indexOf(',')==-1){
          node_type = "'" + this.selectTwo + "'";
        }else{
          let str = '';
          let arr = this.selectTwo.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectThree == '集团名称'){
         group_name = ''
      }else{
        if(this.selectThree.indexOf(',')==-1){
          group_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          group_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectFour == '信息类型'){
         info_type = ''
      }else{
        if(this.selectFour.indexOf(',')==-1){
          info_type = "'" + this.selectFour + "'";
        }else{
          let str = '';
          let arr = this.selectFour.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          info_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectFive == '节点名称'){
         node_name = ''
      }else{
        if(this.selectFive.indexOf(',')==-1){
          node_name = "'" + this.selectFive + "'";
        }else{
          let str = '';
          let arr = this.selectFive.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_name = str.substr(0,str.length-1);
        }
      }
      let str = 'date=' + date + '&node_type=' + node_type + '&group_name=' + group_name + '&info_type=' + info_type + '&node_name=' + node_name ;
      this.storeMonthStrandedDetailedList = [];
      getQueryMoreNodeTraceDetail(str)
        .then(res => {
        	    this.storeTraceDetailList = res.data.list
              this.Dataloading5 = false;
          })
         .catch(error => {
        	 console.log(error)
         })

    },
    getQueryMoreNodeTraceFun(){
       this.Dataloading4 = true;
      this.getQueryMoreNodeTraceFun1();
      let date = ''
      let node_type = ''
      let node_name = ''
      let group_name = ''
      let info_type = ''
      if(this.selectOne == '时间'){
         let nowDate = new Date();
         let in_date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth(),
         }
         date = in_date.year + (in_date.month < 10 ?  ( '0' + in_date.month) : in_date.month);
      }else{
         let time = this.selectOne;
         let yy = time.split('年')[0];
         let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
         date = yy + mm;
      }
      if(this.selectTwo == '节点详细分类'){
         node_type = "'超市配送','肉品专卖店','超市门店','生鲜超市','团体配送','团体消费门店','直营直供门店','直营直供配送'"
      }else{
        if(this.selectTwo.indexOf(',')==-1){
          node_type = "'" + this.selectTwo + "'";
        }else{
          let str = '';
          let arr = this.selectTwo.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectThree == '集团名称'){
         group_name = ''
      }else{
        if(this.selectThree.indexOf(',')==-1){
          group_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          group_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectFour == '信息类型'){
         info_type = ''
      }else{
        if(this.selectFour.indexOf(',')==-1){
          info_type = "'" + this.selectFour + "'";
        }else{
          let str = '';
          let arr = this.selectFour.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          info_type = str.substr(0,str.length-1);
        }
      }
      if(this.selectFive == '节点名称'){
         node_name = ''
      }else{
        if(this.selectFive.indexOf(',')==-1){
          node_name = "'" + this.selectFive + "'";
        }else{
          let str = '';
          let arr = this.selectFive.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          node_name = str.substr(0,str.length-1);
        }
      }
      let str = 'date=' + date + '&node_type=' + node_type + '&group_name=' + group_name + '&info_type=' + info_type + '&node_name=' + node_name ;
      let lineName = [];
      let lineValue = [];
      let lineChart = [];
      getQueryMoreNodeTrace(str)
        .then(res => {
        	   res.data.list.forEach(ele=>{
        	     lineName.push(ele.trace_date);
        	     lineValue.push(ele.select_num);
        	     lineChart.push(ele.active_num);
        	   })
              this.getQueryMoreNodeTraceFun1(lineName,lineValue,lineChart);
              this.Dataloading4 = false;
          })
         .catch(error => {
        	 console.log(error)
         })

    },
    getQueryMoreNodeTraceFun1(lineName,lineValue,lineChart){
        let echartsFive_more = this.$echarts.init(document.getElementById('echartsFive_more'));
        window.addEventListener('resize', function () {
          echartsFive_more.resize()
        })
         echartsFive_more.setOption({
             tooltip: {
              trigger: 'axis',
               //formatter: '{b}<br/>{a}<br/>{c}%'
             },
             legend: {
                     itemWidth: 12,
                     itemHeight: 12,
                     type: 'scroll',
                     orient: 'vertical',
                     right: '4%',
                     data: ['门店活跃度','查询次数'],

                 },
               grid:{

                   right: 200,
               },
             xAxis: {
              type: 'category',
              data: lineName,
               splitLine:{
               　　　　show:false
               　　 }
             },
             yAxis: [
                     {
                          type: 'value',
                          name: '节点编码',
                          nameLocation: 'middle',
                          nameGap: 50,
                          axisLine: {show:false},
                          axisTick: {show:false},
                          splitLine:{
                      　　　　show:false
                      　　 }
                           },
                       {
                              type: 'value',
                            nameLocation: 'middle',
                            nameGap: 50,
                            axisLine: {show:false},
                            axisTick: {show:false},
                            splitLine:{
                        　　　　show:false
                        　　 }
                       }                      
                    ],
            series: [
              {
              data: lineChart,
              name: '门店活跃度',
              type: 'bar',
              label: {
                  show: true,
                  position: 'top',
                  color:'#717171'
              },
              itemStyle:{
                normal:{
                   color:'#479CE2',

                }
              }
            },
            {
              data: lineValue,
              type: 'line',
              smooth: 0.6,
              name: '查询次数',
              yAxisIndex: 1,
              itemStyle:{
                normal:{
                   color:'rgb(247, 203, 74)',

                }
              }
            },
            ]
         })
    },
    getQueryNodeMonthStrandedNumAndWeightFun1(lineValue1, arr,lineName,
            lineValue2,lineValue3,lineValue4,lineValue5,lineValue6,lineValue7,
            lineValue8,lineValue9,lineValue10,lineValue11,lineValue12){
            let echartsOne_more = this.$echarts.init(document.getElementById('echartsOne_more'));
            window.addEventListener('resize', function () {
              echartsOne_more.resize()
            })
            echartsOne_more.setOption({
               tooltip: {
                     trigger: 'axis'
                  },
               legend: {
                       type: 'scroll',
                       orient: 'vertical',
                       right: '4%',
                       data: arr,

                   },
               grid:{

                   right: 200,
               },
               color:['#00aa00','#ffff00','#ff5500','#0000ff','#55aa00','#55aaff','#00ffff','#5500ff','#aa0000','#ff55ff','#005500','#aa007f'],
               xAxis: {
                   type: 'category',
                   boundaryGap: false,
                   data: lineName
               },
               yAxis: {
                   show:true,
                   name: '数据量（条）',
                   type: 'value',
                   nameLocation: 'middle',
                   nameGap: 50,
                   axisLine: {show:false},
                   axisTick: {show:false},
                   splitLine:{
               　　　　show:false
               　　 },
                   axisLabel: {
                     formatter: function(value,index){
                 		var value;
                 		if (value >=1000) {
                 			value = value/1000+'k';
                 		}else if(value <1000){
                 			value = value;
                 		}
                 		return value
                 	}
                 }
               },
               series: [
                  {
                      name: '批发肉品交易',
                      type: 'line',
                      data: lineValue1
                  },
                  {
                      name: '批发肉品进场',
                      type: 'line',
                      data: lineValue2
                  },
                  {
                      name: '批发蔬菜交易',
                      type: 'line',
                      data: lineValue3
                  },
                  {
                      name: '批发蔬菜进场',
                      type: 'line',
                      data: lineValue4
                  },
                  {
                      name: '零售肉品交易',
                      type: 'line',
                      data: lineValue5
                  },
                  {
                      name: '零售肉品进场',
                      type: 'line',
                      data: lineValue6
                  },
                  {
                      name: '零售蔬菜交易',
                      type: 'line',
                      data: lineValue7
                  },
                  {
                      name: '零售蔬菜进场',
                      type: 'line',
                      data: lineValue8
                  },
                  {
                      name: '超市肉品交易',
                      type: 'line',
                      data: lineValue9
                  },
                  {
                      name: '超市肉品进场',
                      type: 'line',
                      data: lineValue10
                  },
                  {
                      name: '超市蔬菜交易',
                      type: 'line',
                      data: lineValue11
                  },
                  {
                      name: '超市蔬菜进场',
                      type: 'line',
                      data: lineValue12
                  }
                ]
            })
    },
    getQueryNodeMonthStrandedNumAndWeightFun2(lineDate,lineActive){
            let echartsTwo_more = this.$echarts.init(document.getElementById('echartsTwo_more'));
            window.addEventListener('resize', function () {
              echartsTwo_more.resize()
            })
            echartsTwo_more.setOption({
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: lineDate
                    },
              color:'rgb(63, 178, 126)',
              yAxis: {
                  show:true,
                  name: '商户活跃度',
                  type: 'value',
                  nameLocation: 'middle',
                  nameGap: 50,
                  axisLine: {show:false},
                  axisTick: {show:false},
                  splitLine:{
              　　　　show:false
              　　 },
                  min: 0,
                  interval: 800,
                  max: 3200,
                  axisLabel: {
                    formatter: function(value,index){
                		var value;
                		if (value >=1000) {
                			value = value/1000+'k';
                		}else if(value <1000){
                			value = value;
                		}
                		return value
                	}
                }
              },
              series: [
                {
                    name: '商户活跃度',
                    type: 'line',
                    data: lineActive,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color:'#767676',
                        }
                    }
                }
              ]
            })
    },
    getQueryNodeMonthStrandedNumAndWeightFun3(linePrice1, arr,lineName,
            linePrice2,linePrice3,linePrice4,linePrice5,linePrice6,linePrice7,
            linePrice8,linePrice9,linePrice10,linePrice11,linePrice12){
            let echartsThree_more = this.$echarts.init(document.getElementById('echartsThree_more'));
            window.addEventListener('resize', function () {
              echartsThree_more.resize()
            })
            echartsThree_more.setOption({
               tooltip: {
                     trigger: 'axis'
                  },
               legend: {
                       type: 'scroll',
                       orient: 'vertical',
                       right: '4%',
                       data: arr,

                   },
               grid:{

                   right: 200,
               },
               color:['#00aa00','#ffff00','#ff5500','#0000ff','#55aa00','#55aaff','#00ffff','#5500ff','#aa0000','#ff55ff','#005500','#aa007f'],
               xAxis: {
                   type: 'category',
                   boundaryGap: false,
                   data: lineName
               },
               yAxis: {
                   show:true,
                   name: '价格（元/公斤）',
                   type: 'value',
                   nameLocation: 'middle',
                   nameGap: 50,
                   axisLine: {show:false},
                   axisTick: {show:false},
                   splitLine:{
               　　　　show:false
               　　 }
                   

               },
               series: [
                  {
                      name: '批发肉品交易',
                      type: 'line',
                      data: linePrice1
                  },
                  {
                      name: '批发肉品进场',
                      type: 'line',
                      data: linePrice2
                  },
                  {
                      name: '批发蔬菜交易',
                      type: 'line',
                      data: linePrice3
                  },
                  {
                      name: '批发蔬菜进场',
                      type: 'line',
                      data: linePrice4
                  },
                  {
                      name: '零售肉品交易',
                      type: 'line',
                      data: linePrice5
                  },
                  {
                      name: '零售肉品进场',
                      type: 'line',
                      data: linePrice6
                  },
                  {
                      name: '零售蔬菜交易',
                      type: 'line',
                      data: linePrice7
                  },
                  {
                      name: '零售蔬菜进场',
                      type: 'line',
                      data: linePrice8
                  },
                  {
                      name: '超市肉品交易',
                      type: 'line',
                      data: linePrice9
                  },
                  {
                      name: '超市肉品进场',
                      type: 'line',
                      data: linePrice10
                  },
                  {
                      name: '超市蔬菜交易',
                      type: 'line',
                      data: linePrice11
                  },
                  {
                      name: '超市蔬菜进场',
                      type: 'line',
                      data: linePrice12
                  }
                ]
            })
    },
    getQueryNodeMonthStrandedNumAndWeightFun4(lineChar1, arr,lineName,
            lineChar2,lineChar3,lineChar4,lineChar5,lineChar6,lineChar7,
            lineChar8,lineChar9,lineChar10,lineChar11,lineChar12){
            let echartsFour_more = this.$echarts.init(document.getElementById('echartsFour_more'));
            window.addEventListener('resize', function () {
              echartsFour_more.resize()
            })
            echartsFour_more.setOption({
               tooltip: {
                     trigger: 'axis'
                  },
               legend: {
                       type: 'scroll',
                       orient: 'vertical',
                       right: '4%',
                       data: arr,

                   },
               grid:{

                   right: 200,
               },
               color:['#00aa00','#ffff00','#ff5500','#0000ff','#55aa00','#55aaff','#00ffff','#5500ff','#aa0000','#ff55ff','#005500','#aa007f'],
               xAxis: {
                   type: 'category',
                   boundaryGap: false,
                   data: lineName
               },
               yAxis: {
                   show:true,
                   name: '重量（公斤）',
                   type: 'value',
                   nameLocation: 'middle',
                   nameGap: 50,
                   axisLine: {show:false},
                   axisTick: {show:false},
                   splitLine:{
               　　　　show:false
               　　 },
                   axisLabel: {
                     formatter: function(value,index){
                 		var value;
                 		if (value >=1000) {
                 			value = value/1000+'k';
                 		}else if(value <1000){
                 			value = value;
                 		}
                 		return value
                 	}
                 }
               },
               series: [
                  {
                      name: '批发肉品交易',
                      type: 'line',
                      data: lineChar1
                  },
                  {
                      name: '批发肉品进场',
                      type: 'line',
                      data: lineChar2
                  },
                  {
                      name: '批发蔬菜交易',
                      type: 'line',
                      data: lineChar3
                  },
                  {
                      name: '批发蔬菜进场',
                      type: 'line',
                      data: lineChar4
                  },
                  {
                      name: '零售肉品交易',
                      type: 'line',
                      data: lineChar5
                  },
                  {
                      name: '零售肉品进场',
                      type: 'line',
                      data: lineChar6
                  },
                  {
                      name: '零售蔬菜交易',
                      type: 'line',
                      data: lineChar7
                  },
                  {
                      name: '零售蔬菜进场',
                      type: 'line',
                      data: lineChar8
                  },
                  {
                      name: '超市肉品交易',
                      type: 'line',
                      data: lineChar9
                  },
                  {
                      name: '超市肉品进场',
                      type: 'line',
                      data: lineChar10
                  },
                  {
                      name: '超市蔬菜交易',
                      type: 'line',
                      data: lineChar11
                  },
                  {
                      name: '超市蔬菜进场',
                      type: 'line',
                      data: lineChar12
                  }
                ]
            })
    },
    handlerCommand(command){
			if(command.flag==0){
			  this.dateIndex = command.index;
			  this.selectOne = '时间';
			  if(command.value=='全部时间'){
			    this.selectOne = '时间';
			  }else{
			    this.selectOne = command.value;
			  }
			}
			if(command.flag==1){
			  this.nodeDetailTypeIndex = command.index;
			  this.selectTwo = '节点详细分类';
			  if(command.value=='全部'){
			    this.selectTwo = '节点详细分类';
			  }else{
			    this.selectTwo = command.value;
			  }
			}
			if(command.flag==2){
			  this.groupNameIndex = command.index;
			  this.selectThree = '集团名称';
			  if(command.value=='全部'){
			    this.selectThree = '集团名称';
			  }else{
			    this.selectThree = command.value;
			  }
			}
			if(command.flag==3){
			  this.infoTypeIndex = command.index;
			  this.selectFour = '信息类型';
			  if(command.value=='全部'){
			    this.selectFour = '信息类型';
			  }else{
			    this.selectFour = command.value;
			  }
			}
      if(command.flag==4){
        this.nodeNameIndex = command.index;
        this.selectFive = '节点名称';
        if(command.value=='全部'){
          this.selectFive = '节点名称';
        }else{
          this.selectFive = command.value;
        }
      }
      this.init();
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
    handlerClose(){
      this.mymask = false;
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', preD, {passive: false})
    },
    handlerAdd(item,index){
      console.log(item, '----', this.AddName)
      console.log(this.AddName.indexOf(item.name));
      if(this.AddName.indexOf(item.name) <= 0){
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
    //删除
    handlerDelete(item,index){
       this.AddData.splice(index,1);
       this.AddName.splice(index,1);
       if(this.Index==0){
         this.AddDataOne.splice(index,1);
       }else if(this.Index==1){
         this.AddDataTwo.splice(index,1);
       }
       else if(this.Index==2){
         this.AddDataThree.splice(index,1);
       }
    },
    //全部添加
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
    //清空
    handlerAllDelete(){
      console.log(this.Index)
      this.AddData = [];
      this.AddName = []
      if(this.Index==0){
        this.AddDataOne = [];
      }else if(this.Index==1){
        this.AddDataTwo = [];
      }
      else if(this.Index==2){
        this.AddDataThree = [];
        console.log(this.AddDataThree)
      }
      else if(this.Index==3){
        this.AddDataFour = [];
      }
    },
    handlerChoose(type){
      this.Index = type;
      this.mymask = true;
      let arr = [];
      if(type==0){
          this.nodeDetailTypeList.forEach(ele=>{
            if(ele.nodeDetailTypeList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_detail_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataOne;
      }
      else if(type==1){
        this.groupNameList.forEach(ele=>{
          if(ele.groupNameList!='全部'){
            let obj = {
              Addshow:false,
              name:ele.group_name
            }
            arr.push(obj);
          }
        })
        this.multiData = arr;
        this.AddData = this.AddDataTwo;
      }
      else if(type==2){
        this.infoTypeList.forEach(ele=>{
          if(ele.infoTypeList!='全部'){
            let obj = {
              Addshow:false,
              name:ele.info_type
            }
            arr.push(obj);
          }
        })
        this.multiData = arr;
        this.AddData = this.AddDataThree;
      }
      else if(type==3){
        this.nodeNameList.forEach(ele=>{
          if(ele.nodeNameList!='全部'){
            let obj = {
              Addshow:false,
              name:ele.node_name
            }
            arr.push(obj);
          }
        })
        this.multiData = arr;
        this.AddData = this.AddDataFour;
      }
    // document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
    },
    allAddFun(){
      if(this.AddData.length>0){
         this.first = false;
         let arr = [];
         this.AddData.forEach(ele=>{
          arr.push(ele.name);
         })
        if(this.AddData.length==1){
          if(this.Index==0){
            this.selectTwo = arr[0];
          }else if(this.Index==1){
            this.selectThree = arr[0];
          }
          else if(this.Index==2){
            this.selectFour = arr[0];
          }
          else if(this.Index==3){
            this.selectFive = arr[0];
          }

        }else{
          if(this.Index==0){
            this.selectTwo = arr. join(',');
          }else if(this.Index==1){
            this.selectThree = arr. join(',');
          }
          else if(this.Index==2){
            this.selectFour = arr. join(',');
          }
          else if(this.Index==3){
            this.selectFive = arr. join(',');
          }
        }
      }else{
        if(this.Index==0){
          this.selectTwo = '节点详细分类';
          this.AddDataOne = [];
        }else if(this.Index==1){
          this.selectThree = '集团名称';
          this.AddDataTwo = [];
        }
        else if(this.Index==2){
          this.selectFour = '信息类型';
          this.AddDataThree = [];
        }
        else if(this.Index==3){
          this.selectFive = '节点名称';
          this.AddDataFour = [];
        }
      }
      if(this.Index==0){
        this.AddDataOne = this.AddData;
      }else if(this.Index==1){
        this.AddDataTwo = this.AddData;
      }else if(this.Index==2){
        this.AddDataThree = this.AddData;
      }else if(this.Index==3){
        this.AddDataFour = this.AddData;
      }
      this.init();
      this.handlerClose();
    }
	}

}
</script>

<style scoped lang='less'>
	@import '../../assets/css/common.css';
	.content{
		width: 100%;
		height: 100%;
		.table-btn{
			margin: 0 5px;
			float: left;
			cursor: pointer;
			font-size: 14px;
		}
    .myDiv{
      height: 800px;
      width: 100%;
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
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
		          }
		          .choose{
		            cursor: pointer;
		            display: inline-block;
		            height: 30px;
		            line-height: 30px;
		            border-bottom:  1px solid #666;
                position: relative;
                top: -12px;
		          }
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
    .item{
     width: 100%;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
     line-height: 30px;
     border-bottom: 1px solid #EBEEF5;
    }
    .item:last-child{
      border: none;
    }
    .mytable1{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 288px;
      .mytable1-item1-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
      .draw-table1{
        width: 90%;
        height: 90%;
        padding-top: 20px;
        padding-left: 43px;
      }
    }
    .myecharts1{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 388px;
      .myecharts1-item1-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
    }
    .myecharts2{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 400px;
      .myecharts2-item2-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
      .myecharts2-avgActive{
        padding-left: 50px;
        font-size: 36px;
        color: rgba(111, 111, 111, 0.9);
      }
      .myp{
        padding-left: 50px;
        font-size: 14px;
        color: rgba(111, 111, 111, 0.9);
      }
    }
    .myecharts3{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 388px;
      .myecharts3-item3-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
    }
    .myecharts4{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 388px;
      .myecharts4-item4-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
    }
    .myecharts5{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 400px;
      .myecharts5-item5-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
    }
    .mytable2{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 400px;
      .mytable2-item2-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
      .draw-table2{
        width: 90%;
        height: 90%;
        padding-top: 20px;
        padding-left: 43px;
      }
    }
    .mytable3{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 400px;
      .mytable3-item3-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
      .draw-table3{
        width: 90%;
        height: 90%;
        padding-top: 20px;
        padding-left: 43px;
      }
    }
    .mytable4{
      margin-top: 10px;
      background: #fff;
      width: 100%;
      height: 400px;
      .mytable4-item4-title{
        padding-top: 26px;
        padding-left: 32px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(10,18,32,.87);
      }
      .draw-table4{
        width: 90%;
        height: 90%;
        padding-top: 20px;
        padding-left: 43px;
      }
    }
  }
</style>
<style lang="less">
  .moreStore{

    .el-table .cell{
      padding: 0 !important;
    }
  }

</style>
