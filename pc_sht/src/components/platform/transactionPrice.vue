<template>
 <div class="content transactionPrice">
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
			        <el-dropdown-item :command="{value:item.name,flag:0,index:item.index}" :class="dateIndex == item.index ? 'active':''" v-for="(item,index) in dataList" :key="index">{{item.name}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			  </div>
			  <div class="select">
			    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
			      <span class="el-dropdown-link">
			        {{selectTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item :command="{value:'全部',flag:1,index:0}" :class="nodeTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.node_type,flag:1,index:index1 + 1}" :class="nodeTypeIndex == index1 +1 ? 'active':''" v-for="(item,index1) in nodeTypeList" :key="index1">{{item.node_type}}</el-dropdown-item>
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
			        <el-dropdown-item :command="{value:'全部',flag:2,index:0}" :class="districtIndex == 0 ? 'active':''">全部</el-dropdown-item>
			        <el-dropdown-item :command="{value:item.district_name,flag:2,index:index2 + 1}" :class="districtIndex == index2 +1 ? 'active':''" v-for="(item,index2) in districtList" :key="index2">{{item.district_name}}</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			    <span class="choose" @click="handlerChoose(1)">多选</span>
			  </div>

			</el-form>
		</div>
    <div class="one" style="border-bottom: 3px solid #E8EBED;"  v-loading="Dataloading1">
        <p class="title">生活必需品价格走势</p>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="猪肉走势" name="first"></el-tab-pane>
            <el-tab-pane label="蔬菜走势" name="second"></el-tab-pane>
            <el-tab-pane label="水果走势" name="third"></el-tab-pane>
            <el-tab-pane label="牛肉走势" name="fourth"></el-tab-pane>
            <el-tab-pane label="羊肉走势" name="seventh"></el-tab-pane>
            <el-tab-pane label="禽肉走势" name="fifth"></el-tab-pane><!--
            <el-tab-pane label="粮油走势" name="sixth"></el-tab-pane>-->
            <el-tab-pane label="禽蛋走势" name="eighth"></el-tab-pane>
        </el-tabs>
        <div class="category">
            <p style="width: 60px;">品名：</p>
            <el-radio-group v-model="radio" @change="selectFun">
                <el-radio v-for="(item, index) in categoryArr" :key="index" :label="item.name"></el-radio>
            </el-radio-group>
        </div>
        <div id="my_chart1_price" class="echart"></div>
    </div>
    <div class="two" style="border-bottom: 3px solid #E8EBED;"  v-loading="Dataloading2">
      <div class="echarts-item1"  style="border-right: 3px solid #E8EBED;">
           <p class="title">价格采集覆盖区域</p>
           <div id="my_chart2_price"  style="height: 300px;" ></div>
      </div>
      <div class="echarts-item2">
           <p class="title">价格采集节点分布</p>
            <div id="map_canvas" class="map" tabindex="0" style="width:90%; height:75%;"></div>
      </div>
    </div>
    <div class="three">
        <p class="title">节点类型占比</p>
         <div id="my_chart3_price" class="echart" v-show="mychart3"  style="height: 300px;" v-loading="Dataloading3"></div>
           <div class="lineShow" style="height: 380px;line-height: 380px;color: #999;font-size: 14px;text-align: center;" v-if="lineShow">暂无数据</div>
           <div id="my_chart4_price" class="echart"  v-show="mychart4"  style="height: 300px;" v-loading="Dataloading4"></div>

          <p class="title1" v-if="mycheck">
            <span @click="nodeTypeCheck1">节点分类</span>
            <span>/</span>
            <span>{{checkName}}</span>
           </p>
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
  <div class="mask" v-if="mydata"></div>
  <div class="mulda" v-if="mydata">
    <div class="mulda-head">
        选择日期范围
        <span @click="handlerClose1" class="iconfont icon-close"></span>
    </div>
    <div class="mulda-con" style="width: 100%;">
      <div class="mulda-title">
        <span class="mulda-title-span" style="float: left;width: 100%;text-align: left;line-height: 26px;vertical-align: top;">开始日期</span>
        <el-col :span="11" style="padding-left: 12px;">
          <el-date-picker type="date"
             placeholder="选择日期" value-format="yyyy-MM-dd"
             v-model="sizeForm.date1"
             :rules="{
                   required: true, message: '开始时间不能为空', trigger: 'blur'
                 }"
             style="width: 100%;"></el-date-picker>
        </el-col>

      </div>
      <div class="mulda-title1" style="width: 326px">
         <span class="mulda-title-span" style="float: left;width: 100%;">结束日期</span>
           <el-col :span="11" style="padding-left: 12px;">
             <el-date-picker type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="sizeForm.date2"
                :rules="{
                      required: true, message: '结束日期不能为空', trigger: 'blur'
                    }"
                style="width: 100%;"></el-date-picker>
           </el-col>
     </div>
    </div>
      <div class="mulda-mybtn" >
      <el-button type="primary" @click="allDataAddFun">确认</el-button>
      <el-button @click="handlerClose1" style="margin-right: 30px;">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import BmScale from 'vue-baidu-map/components/controls/Scale';
import BmNavigation from 'vue-baidu-map/components/controls/Navigation';
import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer';
import BmMarker from 'vue-baidu-map/components/overlays/Marker';
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow';
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection';
import '../../../node_modules/_echarts@4.8.0@echarts/map/js/province/beijing.js' // 引入北京地图数据
import axios from 'axios';
import {queryGetPriceTransactionType,queryGetGoodsAvg,getQueryPriceDistrictProportion,getQueryPriceNodeTypeProportion,getQueryPriceGroupProportion} from '../../js/platform/platform.js';
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
      mymask:false,
      mydata:false,
      mycheck:false,
      mychart3:true,
      mychart4:false,
      lineShow:false,
      multiData:[],
      AddDataOne:[],
      AddDataTwo:[],
      AddData:[],
      AddName:[],
      Index:'',
			selectOne : '事件日期',
			selectTwo : '节点类型',
			selectThree : '所属区域',
      districtIndex : 0,
			dateIndex : 0,
      nodeTypeIndex : 0,
      districtList:[],
      nodeTypeList:[],
      lsPriceArr: [], // 菜车
      pfPriceArr: [], // 批发
      csPriceArr: [], // 超市
      priceTit: [],
      check_name : '',
			dataList : [
			  {
			    name:'全部日期',
			    index: '全部日期'
			  },
			  {
			    name:'今天',
			    index: '今天'
			  },
			  {
			    name:'昨天',
			    index: '昨天'
			  },
			  {
			    name:'最近7天',
			    index: '最近7天'
			  },
			  {
			    name:'最近30天',
			    index: '最近30天'
			  },
			  {
			    name:'最近90天',
			    index: '最近90天'
			  },
			  {
			    name:'近一年',
			    index: '近一年'
			  },
			  {
			    name:'自定义时间',
			    index: '自定义时间'
			  }
			],
      checkName : '',
      activeName: 'first',
      categoryArr: [
          {name: '白条猪'},
          {name: '鲜猪肉'},
      ],
      goods_type: '猪肉类',
      radio: '白条猪',
			form:{
			},
      endDate:'',
      startDate:'',
      sizeForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              }

		}
	},
	mounted(){
	   this.queryGetPriceTransactionTypeFun();
     this.queryGetGoodsAvgFun1();
     this.queryGetGoodsAvgFun2();
     this.queryGetGoodsAvgFun3();
     this.getQueryPriceDistrictProportionFun();
     this.getQueryPriceNodeTypeProportionFun();
     this.$nextTick(function() {
        this.drawMap1();
     });
	},
	methods:{
    init(){
      this.queryGetGoodsAvgFun1();
      this.queryGetGoodsAvgFun2();
      this.queryGetGoodsAvgFun3();
      this.getQueryPriceDistrictProportionFun();
      this.getQueryPriceNodeTypeProportionFun();
     // this.getQueryPriceGroupProportionFun();
      this.drawMap1();
    },
    queryGetPriceTransactionTypeFun(){
      this.Dataloading = true;
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
      queryGetPriceTransactionType()
        .then( res => {
          res.data.districtList.forEach(ele=>{
            this.districtList.push(ele);
          })
          res.data.nodeTypeList.forEach(ele=>{
            this.nodeTypeList.push(ele);
          })
          this.Dataloading = false;
          this.show = false;
          document.body.style.overflow = '' // 出现滚动条
          document.removeEventListener('touchmove', preD, {passive: false})
        })
        .catch(error => {
            console.log(error)
        })

    },
    drawMap1(){

      // document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
      this.map = new AMap.Map('map_canvas', { //创建地图
          zoom: 13, //地图显示的缩放级别
          center: [116.3977432251, 39.9078927749]  ,//地图中心点坐标值
           mapStyle: 'amap://styles/000ddddacab790d37780d4e1b43b1862'//设置地图的显示样式
      });
      this.getQueryPriceDistrictProportionFun();
    },
    queryGetGoodsAvgFun1(){
        this.Dataloading1 = true;
        let district_name = '';
        let node_type = '零售市场';
        let goods_name = '';
        let goods_type = this.goods_type;
        let type = '';
        let startDate = '';
        let endDate = '';
      	if(this.selectOne == '事件日期'){
      	   type = 'month';
      	}else if(this.selectOne == '今天'){
      	  type = 'day';
      	}else if(this.selectOne == '昨天'){
      	  type = 'yesDay';
      	}else if(this.selectOne == '最近7天'){
      	  type = 'week';
      	}else if(this.selectOne == '最近30天'){
      	  type = 'month';
      	}else if(this.selectOne == '最近90天'){
      	  type = 'three_month';
      	}
      	else if(this.selectOne == '自定义时间'){
      	 startDate = this.startDate;
      	 endDate = this.endDate;
      	}
        else if(this.selectOne == ''){
          startDate = this.startDate;
          endDate = this.endDate;
        }
        if(this.selectThree=='所属区域'){
          district_name = '全部';
        }else{
          if(this.selectThree.indexOf(',')==-1){
            district_name = "'" + this.selectThree + "'";
          }else{
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            district_name = str.substr(0,str.length-1);
          }
        }
        if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
            goods_name = ''
        }else{
            goods_name = this.radio
        }
        let obj = {
            "type": type,
            "startDate": startDate,
            "endDate":endDate,
           	"district_name":district_name,
           	"node_type":node_type,
           	"goods_name":goods_name,
           	"goods_type":goods_type
        }
        queryGetGoodsAvg(obj)
          .then(res => {
              let data = res.data.map,
                  title = [],
                  arr = [];
              for(let key in data){
                  title.push(key)
                  arr.push(data[key].toFixed(2))
              }
              this.lsPriceArr = arr.slice(0,arr.length - 1)
              this.priceTit = title
              this.getChartFun1(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
               this.Dataloading1 = false;
          })
          .catch((res) => {
              console.log(res)
          })
    },
    queryGetGoodsAvgFun2(){
        this.Dataloading1 = true;
        let district_name = '';
        let node_type = '超市';
        let goods_name = '';
        let goods_type = this.goods_type;
        let type = '';
        let startDate = '';
        let endDate = '';
      	if(this.selectOne == '事件日期'){
      	   type = 'month';
      	}else if(this.selectOne == '今天'){
      	  type = 'day';
      	}else if(this.selectOne == '昨天'){
      	  type = 'yesDay';
      	}else if(this.selectOne == '最近7天'){
      	  type = 'week';
      	}else if(this.selectOne == '最近30天'){
      	  type = 'month';
      	}else if(this.selectOne == '最近90天'){
      	  type = 'three_month';
      	}
      	else if(this.selectOne == '自定义时间'){
      	 startDate = this.startDate;
      	 endDate = this.endDate;
      	}
        else if(this.selectOne == ''){
          startDate = this.startDate;
          endDate = this.endDate;
        }
        if(this.selectThree=='所属区域'){
          district_name = '全部';
        }else{
          if(this.selectThree.indexOf(',')==-1){
            district_name = "'" + this.selectThree + "'";
          }else{
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            district_name = str.substr(0,str.length-1);
          }
        }
        if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
            goods_name = ''
        }else{
            goods_name = this.radio
        }
        let obj = {
            "type": type,
            "startDate": startDate,
            "endDate":endDate,
           	"district_name":district_name,
           	"node_type":node_type,
           	"goods_name":goods_name,
           	"goods_type":goods_type
        }
        queryGetGoodsAvg(obj)
          .then(res => {
              let data = res.data.map,
                  title = [],
                  arr = [];
              for(let key in data){
                  title.push(key)
                  arr.push(data[key].toFixed(2))
              }
              this.csPriceArr = arr.slice(0,arr.length - 1)
              this.priceTit = title
              this.getChartFun1(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
               this.Dataloading1 = false;
          })
          .catch((res) => {
              console.log(res)
          })
    },
    queryGetGoodsAvgFun3(){
        this.Dataloading1 = true;
        let district_name = '';
        let node_type = '批发市场';
        let goods_name = '';
        let goods_type = this.goods_type;
        let type = '';
        let startDate = '';
        let endDate = '';
      	if(this.selectOne == '事件日期'){
      	   type = 'month';
      	}else if(this.selectOne == '今天'){
      	  type = 'day';
      	}else if(this.selectOne == '昨天'){
      	  type = 'yesDay';
      	}else if(this.selectOne == '最近7天'){
      	  type = 'week';
      	}else if(this.selectOne == '最近30天'){
      	  type = 'month';
      	}else if(this.selectOne == '最近90天'){
      	  type = 'three_month';
      	}
      	else if(this.selectOne == '自定义时间'){
      	 startDate = this.startDate;
      	 endDate = this.endDate;
      	}
        else if(this.selectOne == ''){
          startDate = this.startDate;
          endDate = this.endDate;
        }
        if(this.selectThree=='所属区域'){
          district_name = '全部';
        }else{
          if(this.selectThree.indexOf(',')==-1){
            district_name = "'" + this.selectThree + "'";
          }else{
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            district_name = str.substr(0,str.length-1);
          }
        }
        if(this.radio == '蔬菜' || this.radio == '水果' || this.radio == '禽肉'){
            goods_name = ''
        }else{
            goods_name = this.radio
        }
        let obj = {
            "type": type,
            "startDate": startDate,
            "endDate":endDate,
           	"district_name":district_name,
           	"node_type":node_type,
           	"goods_name":goods_name,
           	"goods_type":goods_type
        }
        queryGetGoodsAvg(obj)
          .then(res => {
              let data = res.data.map,
                  title = [],
                  arr = [];
              for(let key in data){
                  title.push(key)
                  arr.push(data[key].toFixed(2))
              }
              this.pfPriceArr = arr.slice(0,arr.length - 1)
              this.priceTit = title
              this.getChartFun1(this.priceTit, this.pfPriceArr, this.csPriceArr, this.lsPriceArr)
               this.Dataloading1 = false;
          })
          .catch((res) => {
              console.log(res)
          })
    },
    nodeTypeCheck1(){
      this.mychart3 = true;
      this.mychart4 = false;
      this.mycheck = false;
      this.checkName = '';
      this.getQueryPriceNodeTypeProportionFun();
    },
    getQueryPriceDistrictProportionFun(){
      this.Dataloading2 = true;
      let district_name = '';
      let node_type = '';
      if(this.selectThree=='所属区域'){
        district_name = '全部';
      }else{
        if(this.selectThree.indexOf(',')==-1){
          district_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          district_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectTwo=='节点类型'){
        node_type = '全部';
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
      let obj = {
          "district_name":district_name,
          "node_type":node_type
      }
      getQueryPriceDistrictProportion(obj)
        .then(res => {
           let lineName = [];
            let lineName1 = [];
           let lineValue = [];
           let lineChar = {};
           let i= 1;
           res.data.districtProportionList.forEach(ele=>{

              lineName.push(ele.district_name);
              lineValue.push({
                       name: ele.district_name,
                       value: ele.district_count
                   });
             if(i <= 6){


                lineName1.push(ele.district_name);
                lineChar[lineName1] = i < 6;
             }
             i++;
           })
           this.getQueryPriceDistrictProportionFun1(lineName,lineValue,lineChar);
           let list = res.data.districtCoordinateList;
           this.markerFun1(list);
           this.Dataloading2 = false;
        })
        .catch((res) => {
            console.log(res)
        })

    },
    getQueryPriceNodeTypeProportionFun(){
       this.Dataloading3 = true;
      let lineName = [];
      let lineValue = [];
      let lineChar = {};
      this.getQueryPriceNodeTypeProportionFun1(lineName,lineValue,lineChar);
      let district_name = '';
      let node_type = '';
      if(this.selectThree=='所属区域'){
        district_name = '全部';
      }else{
        if(this.selectThree.indexOf(',')==-1){
          district_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          district_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectTwo=='节点类型'){
        node_type = '全部';
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
      let obj = {
          "district_name":district_name,
          "node_type":node_type
      }
      getQueryPriceNodeTypeProportion(obj)
        .then(res => {

           res.data.nodeTypeProportionList.forEach(ele=>{
              lineName.push(ele.node_type);
              lineValue.push({
                       name: ele.node_type,
                       value: ele.node_count
                   });
             if(!lineChar.name){

                 lineChar = {"name":ele.node_type,"count":ele.node_count,"percentage":ele.proportion}
             }else{
              if(parseFloat(ele.node_count) >  parseFloat(lineChar.node_count)){
                   lineChar = {"name":ele.node_type,"count":ele.node_count,"percentage":ele.proportion}
              }
             }
           })

           if(lineName.length>0){

              this.lineShow = false;
             if(!this.checkName){
                 this.getQueryPriceNodeTypeProportionFun1(lineName,lineValue,lineChar);
             }else{
               this.getQueryPriceGroupProportionFun();
             }
           }else{
             this.lineShow = true;
             this.Dispose('my_chart3_price')
           }
           this.Dataloading3 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    Dispose(ID){
       let dom = document.getElementById(ID);
       //获取 dom 容器上的实例
       let existInstance = this.$echarts.getInstanceByDom(dom);
       if (existInstance){
        //如果已实例化，则销毁实例
        this.$echarts.dispose(existInstance);
       }
      },
    getQueryPriceNodeTypeProportionFun1(lineName,lineValue,lineChar){
        // this.mychart3 = true
        // this.mychart4 = false
       var my_chart3_price = this.$echarts.init(document.getElementById('my_chart3_price'));
       my_chart3_price.setOption({
         tooltip: {
                trigger: 'item',
                 formatter: '{b}: {c}<br/>占比:{d}%'
            },
          legend: {
                 top: 'bottom',
                 left: 'center',
                 itemWidth: 12,
                 itemHeight: 12,
                 data:lineName,

               },
          title:{
                 text:lineChar.percentage ? lineChar.percentage : '',
                 left:"center",
                 top:"50%",
                 textStyle:{
                     color:"#777",
                      fontSize:25,
                     align:"center"
                 }
              },
          graphic:{
                  type:"text",
                  left:"center",
                  top:"45%",
                  style:{
                      text: lineChar.name ? lineChar.name : '',
                      textAlign:"center",
                      fill:"#55aaff",
                      fontSize:14,

                  }
              },
            color:['#55ffff','#ffaa00','#ffff00','#00ff00','#55aa00'],
          series: [
                  {

                      type: 'pie',
                      radius: ['40%', '60%'],
                      data:lineValue
                  }
              ]
       })
        my_chart3_price.on("click", this.eConsole);
    },
    colorFun(){
      var codeLength = 6, checkCode = '', arr = [];
            for(var j = 0; j < 30; j++){
                checkCode = ''
                for(var i = 0; i < codeLength; i++) {
                    checkCode += '0123456789abcdef'[Math.floor(Math.random()*16)]
                }
                arr.push('#' + checkCode)
            }
        return arr
        },
   eConsole:function(param){           　　
     this.mychart3 = false
     this.mychart4 = true

      this.checkName = param.name;
   
      this.getQueryPriceGroupProportionFun();
    },
   /* colorFun(color) {

        if ((color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) && (color.length == 6)) {
            return color
        } else {
            return arguments.callee(color);
        }
        console.log('#' + color)
    }, */
    getQueryPriceGroupProportionFun(){
      this.Dataloading4 = true;
      this.mycheck = true;
     // this.check_name = this.checkName
     let lineName = [];
     let lineValue = [];
     let lineChar = {};
      this.getQueryPriceNodeTypeProportionFun1(lineName,lineValue,lineChar,);
      let district_name = '';
      let node_type = '';
      let check_node_type = this.checkName;
      if(this.selectThree=='所属区域'){
        district_name = '';
      }else{
        if(this.selectThree.indexOf(',')==-1){
          district_name = "'" + this.selectThree + "'";
        }else{
          let str = '';
          let arr = this.selectThree.split(',');
          arr.forEach(ele=>{
            str += "'" + ele + "',";
          })
          district_name = str.substr(0,str.length-1);
        }
      }
      if(this.selectTwo=='节点类型'){
        node_type = '';
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
      let obj = {
          "district_name":district_name,
          "node_type":node_type,
          "check_node_type":check_node_type
      }
      getQueryPriceGroupProportion(obj)
        .then(res => {

           res.data.groupProportionList.forEach(ele=>{
              lineName.push(ele.group_name);
              lineValue.push({
                       name: ele.group_name,
                       value: ele.group_count
                   });
           })
           if(lineName.length>0){
             console.log(lineName)
             let colorArr = this.colorFun()
             this.getQueryPriceGroupProportion1(lineName,lineValue, colorArr);
             this.lineShow = false;
           }else{
             this.lineShow = true;
             this.Dispose('my_chart4_price')
           }
           this.Dataloading4 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    getQueryPriceGroupProportion1(lineName,lineValue, colorArr){
      // this.mychart3 = false
      // this.mychart4 = true;
       var my_chart4_price = this.$echarts.init(document.getElementById('my_chart4_price'));
        my_chart4_price.setOption({
          tooltip: {
                  trigger: 'item',
                  formatter: '{b} : {c} ({d}%)'
              },
          legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 10,
                  top: 20,
                  bottom: 20,
                  data:lineName

              },
              color: colorArr,
            series: [
                   {
                       type: 'pie',
                       radius: '55%',
                       center: ['40%', '50%'],
                       data: lineValue,
                       emphasis: {
                           itemStyle: {
                               shadowBlur: 10,
                               shadowOffsetX: 0,
                               shadowColor: 'rgba(0, 0, 0, 0.5)'
                           }
                       }
                   }
               ]
        })
    },
    markerFun1(list){
       var style = [
         {
          url:'static/image/fangshan.png',
          anchor:new AMap.Pixel(6, 6),
          size:new AMap.Size(20, 20)
        },
        {
         url:'static/image/chaoyang.png',
         anchor:new AMap.Pixel(4, 4),
         size:new AMap.Size(20, 20)
        },
        {         //疾病red01
          url:'static/image/xicheng.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/dongcheng.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
        },
        {
         url:'static/image/haidian.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/changping.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/daxing.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/pinggu.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/miyun.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/mentougou.png',
         anchor:new AMap.Pixel(3, 3),
        size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/tongzhou.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/shijingshan.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/huairou.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/fengtai.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/hoairou.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       },
       {
         url:'static/image/yanqing.png',
         anchor:new AMap.Pixel(3, 3),
         size:new AMap.Size(20, 20)
       }
       ];
       var status ='';
       let mydata = [];
       for(var i=0; i<list.length;i++){
          if(list[i].x_coordinate && list[i].y_coordinate){
            let district_name = list[i].district_name;
            let arr = [list[i].x_coordinate, list[i].y_coordinate];
            if(district_name == '房山区'){
              status =0;
            }else if(district_name=='朝阳区'){
             status =1;
            }else if(district_name=='西城区'){
              status =2;
            }else if(district_name=='东城区'){
              status =3;
            }else if(district_name=='海淀区'){
              status =4;
            }else if(district_name=='昌平区'){
             status =5;
            }else if(district_name=='大兴区'){
            status =6;
            }else if(district_name=='平谷区'){
              status =7;
            }else if(district_name=='密云区'){
              status =8;
            }else if(district_name=='门头沟'){
             status =9;
            }else if(district_name=='通州区'){
              status =10;
            }else if(district_name=='石景山区'){
              status =11;
            }else if(district_name=='怀柔区'){
              status =12;
            }else if(district_name=='丰台区'){
             status =13;
            }else if(district_name=='顺义区'){
              status =14;
            }else if(district_name=='延庆区'){
             status =15;
            }
            let obj = {
              lnglat:arr,
              name:district_name,
              style:status,
              node_name:list[i].node_name,
              addr:list[i].addr,
            };
             mydata.push(obj);
         }
      }
      var mass = new AMap.MassMarks(mydata, {
           zooms: [3, 19],
           opacity:0.8,
           zIndex: 111,
           cursor: 'pointer',
           style: style
      });
       var marker = new AMap.Marker({content: ' ', map: this.map}); //Marker点标记
      //可以添加图标的点击事件
      mass.on('mouseover', function (e) {
        marker.setPosition(e.data.lnglat);
        let html = '<div style="background-color: rgba(255,255,255,0.5);padding: 10px 15px;font-size: 14px;color: #333;">'+
        '<p>节点名称：'+e.data.node_name+'</p>'+
        '<p>地址：'+e.data.addr+'</p>'+
        '<p>归属区县：'+e.data.name+'</p>'+
        '</div>';
        marker.setLabel({content: html})
      });
      mass.on('mouseout', function (e) {
       marker.setLabel({content:'' })
      });
      mass.setMap(this.map);
    },
    selectFun(ele){
        this.queryGetGoodsAvgFun1();
        this.queryGetGoodsAvgFun2();
        this.queryGetGoodsAvgFun3();

    },
    getQueryPriceDistrictProportionFun1(lineName,lineValue,lineChar){
       var my_chart2_price = this.$echarts.init(document.getElementById('my_chart2_price'));
        my_chart2_price.setOption({
          tooltip: {
                  trigger: 'item',
                  formatter: '{b} : {c} ({d}%)'
              },
          legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 10,
                  top: 20,
                  bottom: 20,
                  data:lineName,
                  selected: lineChar
              },
            series: [
                   {
                       type: 'pie',
                       radius: '55%',
                       center: ['40%', '50%'],
                       data: lineValue,
                       emphasis: {
                           itemStyle: {
                               shadowBlur: 10,
                               shadowOffsetX: 0,
                               shadowColor: 'rgba(0, 0, 0, 0.5)'
                           }
                       }
                   }
               ]
        })
    },
    getChartFun1(title, data1, data2, data3){
        let legend = []
        let count1 = 0, count2 = 0, count3 = 0;
        data1.forEach(val => {
            if(val == '0.00'){
                count1++
            }
        })
        if(count1 == data1.length){
            data1 = []
        }
        data2.forEach(val => {
            if(val == '0.00'){
                count2++
            }
        })
        if(count2 == data2.length){
            data2 = []
        }
        data3.forEach(val => {
            if(val == '0.00'){
                count3++
            }
        })
        if(this.radio == '鲜猪肉'){
          data1 = []
        }
        if(count3 == data3.length){
            data3 = []
        }
        if(data1.length != 0){
            legend.push(this.radio == '白条猪' ? '批发价格' : '商超配送价格')
        }
        if(data3.length != 0){
            legend.push('菜车菜店零售价格')
        }
        if(data2.length != 0){
            legend.push('超市零售价格')
        }
        // 基于准备好的dom，初始化echarts实例
        var my_chart1_price = this.$echarts.init(document.getElementById('my_chart1_price'));
        // 绘制图表
        my_chart1_price.setOption({
            tooltip: {
                trigger: 'axis',
                // formatter: '{b}: {c} 元/公斤'
            },
            legend: {
                data: legend
            },
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                data: title,
            },
            yAxis: {
                type: 'value',
                name: '价格（元/公斤）',
            },
            series: [
              
                {
                    name: this.radio == '白条猪' ? '批发价格' : '商超配送价格',
                    type: 'line',
                    data: data1,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                        ]
                    },
                    itemStyle:{
                        normal:{
                            color: this.radio == '白条猪' ? '#0BA360' : '#199ED8'
                        }
                    },
                },
                {
                    name: '菜车菜店零售价格',
                    type: 'line',
                    data: data3,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                        ]
                    },
                    itemStyle:{
                        normal:{
                            color:'#FF6666'
                        }
                    },
                },
                {
                    name: '超市零售价格',
                    type: 'line',
                    data: data2,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                        ]
                    },
                    itemStyle:{
                        normal:{
                            color:'#FF9966'
                        }
                    },
                },
            ]
        });
    },
    // 选择价格走势类型
    handleClick(tab, event) {
        if(this.activeName == 'first'){
            this.categoryArr = [
                {name: '白条猪'},
                {name: '鲜猪肉'},
            ]
            this.radio = '白条猪'
            this.goods_type = '猪肉类'
        }else if(this.activeName == 'second'){
            this.categoryArr = [
                {name: '蔬菜'},
                {name: '大白菜'},
                {name: '土豆'},
                {name: '西红柿'},
                {name: '黄瓜'},
                {name: '葱头'},
                {name: '胡萝卜'},
                {name: '圆茄子'},
                {name: '豆角'},
                {name: '圆白菜'},
                {name: '芹菜'},
                {name: '白萝卜'},
                {name: '心里美萝卜'},
                {name: '青椒'},
                {name: '冬瓜'},
                {name: '菠菜'},
                {name: '小白菜'},
                {name: '莴笋'},
                {name: '菜花'},
                {name: '韭菜'},
                {name: '蒜苗'},
                {name: '生菜'},
                {name: '尖椒'},
                {name: '平菇'},
                {name: '苦瓜'},
                {name: '生姜'},
                {name: '油菜'},
                {name: '大葱'},
                {name: '大蒜'},
                {name: '黄豆芽'},
                {name: '绿豆芽'},
                {name: '油麦菜'},
            ]
            this.radio = '蔬菜'
            this.goods_type = '蔬菜'
        }else if(this.activeName == 'third'){
            this.categoryArr = [
                {name: '水果'},
                // {name: '橙子'},
                // {name: '冬枣'},
                {name: '富士苹果'},
                {name: '国产香蕉'},
                {name: '哈密瓜'},
                // {name: '红心柚'},
                {name: '皇冠梨'},
                {name: '火龙果'},
                // {name: '巨峰葡萄'},
            ]
            this.radio = '水果'
            this.goods_type = '水果类'
        }else if(this.activeName == 'fourth'){
            this.categoryArr = [
                {name: '鲜牛肉'}
            ]
            this.radio = '鲜牛肉'
            this.goods_type = '牛肉类'
        }else if(this.activeName == 'fifth'){
            this.categoryArr = [
                {name: '禽肉'},
                {name: '白条鸡'},
                {name: '鸭子'},
            ]
            this.radio = '禽肉'
            this.goods_type = '禽肉类'
        }else if(this.activeName == 'sixth'){
            this.categoryArr = [
                // {name: ''}
            ]
            this.radio = ''
            this.goods_type = '粮油副食'
        }else if(this.activeName == 'seventh'){
            this.categoryArr = [
                {name: '鲜羊肉'}
            ]
            this.radio = '鲜羊肉'
            this.goods_type = '羊肉类'
        }else if(this.activeName == 'eighth'){
            this.categoryArr = [
                {name: '鸡蛋'}
            ]
            this.radio = '鸡蛋'
            this.goods_type = '禽蛋类'
        }
        this.queryGetGoodsAvgFun1();
        this.queryGetGoodsAvgFun2();
        this.queryGetGoodsAvgFun3();

    },
    handlerCommand(command){
			if(command.flag==0){
			  this.dateIndex = command.index;
			  this.selectOne = '事件日期';
			  if(command.value=='全部日期'){
			    this.selectOne = '事件日期';
			  }else{
			    this.selectOne = command.value;
			  }
        if(command.value=='自定义时间'){
          this.mydata = true;
        }
			}
			if(command.flag==1){
			  this.nodeTypeIndex = command.index;
			  this.selectTwo = '节点类型';
			  if(command.value=='全部'){
			    this.selectTwo = '节点类型';
			  }else{
			    this.selectTwo = command.value;
			  }
			}
			if(command.flag==2){
			  this.districtIndex = command.index;
			  this.selectThree = '所属区域';
			  if(command.value=='全部'){
			    this.selectThree = '所属区域';
			  }else{
			    this.selectThree = command.value;
			  }
			}
      if(command.value!='自定义时间'){
        this.init();
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
    handlerClose(){
      this.mymask = false;
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', preD, {passive: false})
    },
    handlerClose1(){
      this.mydata = false;
      document.body.style.overflow = '' // 出现滚动条
      document.removeEventListener('touchmove', preD, {passive: false})
    },
    allDataAddFun(){
      this.startDate = this.sizeForm.date1
      this.endDate = this.sizeForm.date2
      this.init();
      this.handlerClose1();
    },
    handlerAdd(item,index){
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
      this.AddData = [];
      this.AddName = [];
      if(this.Index==0){
        this.AddDataOne = [];
      }else if(this.Index==1){
        this.AddDataTwo = [];
      }
    },
    handlerChoose(type){
      this.Index = type;
      this.mymask = true;
      let arr = [];
      if(type==0){
          this.nodeTypeList.forEach(ele=>{
            if(ele.nodeTypeList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataOne;
      }
      else if(type==1){
        this.districtList.forEach(ele=>{
          if(ele.districtList!='全部'){
            let obj = {
              Addshow:false,
              name:ele.district_name
            }
            arr.push(obj);
          }
        })
        this.multiData = arr;
        this.AddData = this.AddDataTwo;
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

        }else{
          if(this.Index==0){
            this.selectTwo = arr. join(',');
          }else if(this.Index==1){
            this.selectThree = arr. join(',');
          }
        }
      }else{
        if(this.Index==0){
          this.selectTwo = '节点类型';
          this.AddDataOne = [];
        }else if(this.Index==1){
          this.selectThree = '所属区域';
          this.AddDataTwo = [];
        }
      }
      if(this.Index==0){
        this.AddDataOne = this.AddData;
      }else if(this.Index==1){
        this.AddDataTwo = this.AddData;
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
    .one{
        margin-top: 10px;
        width: 100%;
        height: 470px;
        background: #fff;
        .title{
            padding: 15px 50px;
            font-size: 14px;
        }
        .category{
            margin: 0 50px 20px;
            display: flex;
            width: 100%;
            font-size: 14px;
            p{
                width: 60px;
            }
            .el-radio-group{
                flex: 1;
            }
        }
        .msg{
            margin: 10px auto;
            display: flex;
            width: 400px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            background: #13C2C2;
            color: #fff;
            p{
                flex: 1;
                text-align: center;
            }
        }
        .echart{
            margin: 0 auto;
            width: 100%;
            height:300px;
        }
    }
		.two{
      width: 100%;
      height: 400px;
      background: #fff;
      .echarts-item1{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 15px 50px;
             font-size: 14px;
         }

      }
      .echarts-item2{
          width: 49%;
          height: 400px;
          float: left;
          .title{
              padding: 20px 50px;
              font-size: 14px;
          }
          .map{
           top: 10px;
           bottom: 32px;
           left: 40px;
           right: 40px;
          }

      }
    }
    .three{
      width: 100%;
      height: 400px;
      background: #fff;
      .title{
          padding: 15px 50px;
          font-size: 14px;
      }
      .title1{
        padding-left: 15px;
        font-size: 14px;
        color: #999999;
      }
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
    .mulda{
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: -250px;
            margin-left: -250px;
            width: 332px;
            height: 309px;
            background: #F0F2F3;
            z-index: 999;
            .mulda-head{
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
            .mulda-title-span{
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
            .mulda-mybtn{
              float: right;
              padding-top: 50px;
              margin-bottom: 10px;
            }


      }
  }
</style>
<style lang="less">
  .transactionPrice{
    .el-tabs{
      margin: 0 50px;
    }
    .el-radio{
      width: 80px;
    }
  }
</style>
