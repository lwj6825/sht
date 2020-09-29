<template>
  <div class="content DataVolume">
    <div class="searchs" ref="searchs">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <!-- 事件日期开始 -->
        <div class="select">
          <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
            <span class="el-dropdown-link">
              {{selectDate}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:'全部时间',flag:6,index:0}" :class="dateIndex == 0 ? 'active':''">全部时间</el-dropdown-item>
             <!-- <el-dropdown-item :command="{value:'今天',flag:6,index:1}" :class="dateIndex == 1 ? 'active':''">今天</el-dropdown-item>
              <el-dropdown-item :command="{value:'昨天',flag:6,index:2}" :class="dateIndex == 2 ? 'active':''">昨天</el-dropdown-item> -->
              <el-dropdown-item :command="{value:'最近七天',flag:6,index:3}" :class="dateIndex == 3 ? 'active':''">最近七天</el-dropdown-item>
              <el-dropdown-item :command="{value:'最近30天',flag:6,index:4}" :class="dateIndex == 4 ? 'active':''">最近30天</el-dropdown-item>
              <el-dropdown-item :command="{value:'最近90天',flag:6,index:5}" :class="dateIndex == 5 ? 'active':''">最近90天</el-dropdown-item>
              <el-dropdown-item :command="{value:'最近一年',flag:6,index:6}" :class="dateIndex == 6 ? 'active':''">最近一年</el-dropdown-item>
           <!--   <el-dropdown-item :command="{value:'自定义时间段',flag:6,index:7}" :class="dateIndex == 7 ? 'active':''">自定义时间段</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 事件日期结束 -->
        <div class="select">
          <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
            <span class="el-dropdown-link">
              {{selectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:item,flag:0,index:index}" :class="dataIndex == index ? 'active':''"
                v-for="(item,index) in dataList" :key="index">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(0)">多选</span>
        </div>
        <div class="select">
          <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
            <span class="el-dropdown-link">
              {{selectTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:item.district_name,flag:1,index:index1}" :class="districtIndex == index1 ? 'active':''"
                v-for="(item,index1) in district_name" :key="index1">{{item.district_name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(1)">多选</span>
        </div>
        <div class="select">
          <el-dropdown trigger="click" @command="handlerCommand">
            <span class="el-dropdown-link">
              {{selectThree}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:'全部',flag:2,index:0}" :class="nodeIndex == 0 ? 'active':''">全部</el-dropdown-item>
              <el-dropdown-item :command="{value:item.node_type,flag:2,index:index4+1}" :class="nodeIndex == index4+1 ? 'active':''"
                v-for="(item,index4) in nodeList" :key="index4">{{item.node_type}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(2)">多选</span>
        </div>
        <div class="select">
          <el-dropdown trigger="click" @command="handlerCommand">
            <span class="el-dropdown-link">
              {{selectFour}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:'全部',flag:3,index:0}" :class="nodeTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
              <el-dropdown-item :command="{value:item.node_detail_type,flag:3,index:index5+1}" :class="nodeTypeIndex == index5+1 ? 'active':''"
                v-for="(item,index5) in nodeTypeList" :key="index5">{{item.node_detail_type}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(3)">多选</span>
        </div>
        <div class="select">
          <el-dropdown trigger="click" @command="handlerCommand">
            <span class="el-dropdown-link">
              {{selectFive}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{value:'全部',flag:4,index:0}" :class="modeIndex == 0 ? 'active':''">全部</el-dropdown-item>
              <el-dropdown-item :command="{value:item.mode,flag:4,index:index6+1}" :class="modeIndex == index6+1 ? 'active':''"
                v-for="(item,index6) in modeList" :key="index6">{{item.mode}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(4)">多选</span>
        </div>
        <div class="select">
          <el-dropdown trigger="click" @command="handlerCommand">
            <span class="el-dropdown-link">
              {{selectSix}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item :command="{value:'全部',flag:4,index:0}" :class="modeIndex == 0 ? 'active':''">全部</el-dropdown-item> -->
              <el-dropdown-item :command="{value:item.group_name,flag:5,index:index7}" :class="groupIndex == index7 ? 'active':''"
                v-for="(item,index7) in groupList" :key="index7">{{item.group_name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="choose" @click="handlerChoose(5)">多选</span>
        </div>
      </el-form>
    </div>
    <div class="Echarts">
      <div style="height: 400px;background: #fff;border-bottom: 3px solid #E8EBED;" v-loading="Dataloading1">
        <div id="echartsDataOne" class="myEcharts" ></div>
        <div id="echartsOnePath" class="myPath" style="cursor:pointer;">
          <span @click="getPath(1)" >
            事件日期
          </span>
          <span @click="getPath(2)" >
            {{pathTwo}}
          </span>
          <span >
            {{pathThree}}
          </span>
        </div>
      </div>
      <div style="height: 400px;background: #fff;border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
        <div id="echartsDataTwo" class="myEcharts"></div>
      </div>
      <div style="height: 400px;background: #fff;border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
         <div id="echartsDataThree" class="myEcharts"></div>
      </div>
      <div class="mytables" v-loading="Dataloading3">
        <p style="font-weight: bold;margin-left: 15px;font-size: 14px;padding-top: 26px;">追溯数据上报量对比</p>
        <div class="my-table-itms" style="height: 380   padding-top: 20px;padding-left: 43px;">
          <my-table :col="caidan" :data="shuju" :spanArr="spanArr">
          </my-table>
        </div>
      </div>
      <div style="height: 400px;background: #fff;border-bottom: 3px solid #E8EBED;" v-loading="Dataloading4">
        <p style="font-weight: bold;margin-left: 15px;font-size: 14px;padding-top: 26px;">追溯数据上报查询</p>
        <div class="draw-table">
          <el-table :data="nodeQuantityReportedList" border :header-cell-style="rowClass" :height="300">
            <el-table-column  prop="node_type" label="节点类型-中心"> </el-table-column>
            <el-table-column  prop="node_detail_type" label="节点详细分类" ></el-table-column>
            <el-table-column  prop="in_date" label="事件日期"></el-table-column>
            <el-table-column  prop="group_name" label="集团名称"></el-table-column>
            <el-table-column  prop="sum_node" label="数据量"></el-table-column>
            <el-table-column  prop="count_node" label="上报数"></el-table-column>
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
              <div class="left-item" @mouseenter="enter(index2)" @mouseleave="leave(index2)" v-for="(item,index2) in multiData"
                :key="index2">{{item.name}}
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
              <div class="left-item" :class="item.Deleteshow?'hover':''" @mouseenter="enter1(index3)" @mouseleave="leave1(index3)"
                v-for="(item,index3) in AddData" :key="index3">{{item.name}}
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
    <!-- 自定义时间段 -->
    <div class="multi" v-if="mymask1">
      <div class="multi-head">
        选择时间范围
        <span @click="handlerClose" class="iconfont icon-close"></span>
      </div>
      <div class="multi-con">
        <div class="multi-left multi-left1">
          <div class="left-head">开始时间</div>
          <div class="left-con">
            <div class="all-item">
              <div class="left-item" @mouseenter="enter(index2)" @mouseleave="leave(index2)" v-for="(item,index2) in multiData"
                :key="index2">{{item.name}}
                <span v-if="item.Addshow" @click="handlerAdd(item,index2)">添加</span></div>
            </div>
            <div class="ng-scope" @click="handlerAllAdd"><span>全部添加</span></div>
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
  import axios from 'axios';
  import {
    getQueryRegionNodeTypeInfo,
    getQueryNodeTypeInfo,
    getQueryNodeTypeDetailInfo,
    getQueryQuantityReported,
    getQueryModeInfo,
    getTraceEnterpriseType,
    getQueryTraceNodeQuantityReported,
    getQueryTraceNodeTypeQuantityReported,
    getQuerytraceNodeTypeGroupQuantityReported,
    getQueryQuantityReportedContrast,
    getQuerytraceNodeQuantityReported,
  } from '../../js/platform/platform.js';
  import '../../assets/css/common.css';
  import AMap from 'AMap';
  import MyTable from './MyTable'

  var preD = function(e) {
    e.preventDefault()
  }
  export default {
    name: "dataControl",
    data() {
      return {
        form: {
          node_name: '',
          minNum: '',
          maxNum: '',
          info_type: '',
          group_name: '',
          node_detail_type: '包装菜企业',
          data_collection_way: '',
          district_name: ''
        },
        map: {
          zoom: 0,
          center: {
            lng: 0,
            lat: 0
          }
        },
        mapStyle: {
          styleJson: [
            {
              "featureType": "all",
              "elementType": "geometry",
              "stylers": {
                "hue": "#007fff",
                "saturation": 89
              }
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": {
                "color": "#ffffff"
              }
            }
          ]
        },
        postionMap: [],
        points: [],
        dataList: [],
        district_name: [],
        districtIndex: 0,
        dataIndex: 0,
        Dataloading1:false,
        Dataloading2:false,
        Dataloading3:false,
        Dataloading4:false,
        mymask: false,
        mymask1: false,
        multiData: [],
        AddData: [],
        AddName: [],
        Index: '',
        selectOne: '所属大区',
        selectTwo: '归属区县',
        selectThree: '节点类型',
        selectFour: '节点详细类型',
        selectFive: '建设模式',
        selectSix: '集团名称',
        AddDataOne: [],
        AddDataTwo: [],
        AddDataThree: [],
        AddDataFour: [],
        AddDataFive: [],
        AddDataSix: [],
        nodeList: [],
        nodeIndex: 0,
        nodeTypeList: [],
        nodeTypeIndex: 0,
        modeList: [],
        modeIndex: 0,
        groupList: [],
        groupIndex: 0,
        show: false,
        markers: [],
        business_count: '',
        node_count: '',
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        type5: '',
        type6: '',
        type7: '',
        type8: '',
        userlocation: {
          lng: "",
          lat: ""
        },
        node_list: [],
        arrList:[],
        Dataloading: false,
        first: true,
        cols: 30,
        page: 1,
        map: '',
        selectDate: '事件日期',
        dateIndex: 0,
        startDate: '',
        endDate: '',
        nodeQuantityReportedList:[],
        type: 'week',
        Onedate: '',
        pathTwo: '',
        pathThree:'',
        OneEchartsIndex: 1, //第一个图表是第几层 默认1层
        node_type_one: '',//第一个图  第二次下钻时存储选择的节点类型，不能回显
        tableChild: '',
        timeTitleList: [],
        shuju:[],
        caidan:[],
        nodeQuantityReportedList:[],
        params: {
          "startDate": this.startDate,
          "endDate": this.endDate,
          "type": this.type,
          "region": '',
          "district_name": '',
          "node_type": '',
          "node_detail_type": '',
          "mode": '',
          "group_name": '',
          "date": ''
        },
        params1: {
          "startDate": this.startDate,
          "endDate": this.endDate,
          "type": this.type,
          "region": '',
          "district_name": '',
          "node_type": '',
          "node_detail_type": '',
          "mode": '',
          "group_name": '',
          "date": '',
          "node_type_new": ''
        },
        spanArr:[]
      }
    },
    mounted() {
      document.getElementById("echartsOnePath").style.display="none";
      this.getQueryRegionNodeTypeInfoFun();
      this.getTraceEnterpriseTypeFun();
      this.getQueryModeInfoFun();
      this.getQueryQuantityReportedFun();
      this.getParams();
      this.getQueryTraceNodeQuantityReportedFun(); //加载图表
      this.loadTableOne();
      this.getQuerytraceNodeQuantityReportedFun();
        // this.moreTable();
        // this.regionFun();
        // this.regionFun2();
     // this.echartsG = this|.$echarts.init(document.getElementById('dev-echarts'), 'dark');
    },
    components:{
      MyTable
    },
    methods: {
      handleload() {

      },
      rowClass({
        row,
        rowIndex
      }) {
        return {
          background: '#f2f2f2',
          color: '#333'
        }
      },
      //单选条件
      handlerCommand(command) {
        this.first = false;
        if (command.flag == 0) {
          this.dataIndex = command.index;
          this.selectTwo = '归属区县';
          this.districtIndex = 0,
            this.AddDataTwo = [];
          if (command.value == '全部') {
            this.selectOne = '所属大区';
            this.getQueryRegionNodeTypeInfoFun();
          } else {
            this.selectOne = command.value;
            this.getQueryRegionNodeTypeInfoFun1();
          }
        } else if (command.flag == 1) {
          this.districtIndex = command.index;
          if (command.value == '全部') {
            this.selectTwo = '归属区县';
          } else {
            this.selectTwo = command.value;
          }
          this.nodeList = [];
          this.nodeIndex = 0;
          this.selectThree = '节点类型';
          this.getQueryNodeTypeInfoFun();

        } else if (command.flag == 2) {
          this.nodeIndex = command.index;
          if (command.value == '全部') {
            this.selectThree = '节点类型';
          } else {
            this.selectThree = command.value;
          }
          this.nodeTypeList = [];
          this.nodeTypeIndex = 0;
          this.selectFour = '节点详细类型';
          this.getQueryNodeTypeDetailInfoFun();
        } else if (command.flag == 3) {
          this.nodeTypeIndex = command.index;
          if (command.value == '全部') {
            this.selectFour = '节点详细类型';
          } else {
            this.selectFour = command.value;
          }
        } else if (command.flag == 4) {
          this.modeIndex = command.index;
          if (command.value == '全部') {
            this.selectFive = '建设模式';
          } else {
            this.selectFive = command.value;
          }
        } else if (command.flag == 5) {
          this.modeIndex = command.index;
          if (command.value == '全部') {
            this.selectSix = '建设模式';
          } else {
            this.selectSix = command.value;
          }
        } else if (command.flag == 6) {
          this.modeIndex = command.index;
          if (command.value == '全部时间') {
            this.selectDate = '事件日期';
            this.type = 'week';
          } else {
            this.selectDate = command.value;
            if (this.selectDate == '今天') {
              this.type = 'day';
            } else if (this.selectDate == '昨天') {
              this.type = 'yesDay';
            } else if (this.selectDate == '最近七天') {
              this.type = 'week';
            } else if (this.selectDate == '最近30天') {
              this.type = 'month';
            } else if (this.selectDate == '最近90天') {
              this.type = 'three_month';
            } else if (this.selectDate == '最近一年') {
              this.type = 'year';
            } else if (this.selectDate == '自定义时间段') {
              this.type = '';
              this.mymask1 = true;
            }
          }
        }
        // this.drawMap1();
        // console.log(this.OneEchartsIndex)
        // 加载图表
        if(command.value!='自定义时间段'){
          if(this.OneEchartsIndex == 1){
            this.getQueryTraceNodeQuantityReportedFun();
          }else if (this.OneEchartsIndex == 2){
            this.getQueryTraceNodeTypeQuantityReportedFun();
          }else if (this.OneEchartsIndex == 3){
            this.getQuerytraceNodeTypeGroupQuantityReportedFun();
          }
          this.getQuerytraceNodeQuantityReportedFun();
          this.getQueryQuantityReportedFun();
          this.shuju = [];
          this.loadTableOne();
        }
        /* if(this.OneEchartsIndex == 1){
          this.getQueryTraceNodeQuantityReportedFun();
        }else if (this.OneEchartsIndex == 2){
          this.getQueryTraceNodeTypeQuantityReportedFun();
        }else if (this.OneEchartsIndex == 3){
          this.getQuerytraceNodeTypeGroupQuantityReportedFun();
        }

        this.getQueryQuantityReportedFun();
         this.loadTableOne(); */
      },
      todayFun() {
        var date = new Date();
        var y = date.getYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        let today = y + '-' + m + '-' + d;
        return today;
      },
      leave(index) {
        this.multiData[index].Addshow = false;
      },
      enter(index) {
        this.multiData[index].Addshow = true;
      },
      leave1(index) {
        this.AddData[index].Deleteshow = false;
      },
      enter1(index) {
        this.AddData[index].Deleteshow = true;
      },
      handlerClose() {
        this.mymask = false;
        this.mymask1 = false;
        document.body.style.overflow = '' // 出现滚动条
        document.removeEventListener('touchmove', preD, {
          passive: false
        })
      },
      //添加
      handlerAdd(item, index) {
        if (this.AddName.indexOf(item.name) == -1) {
          let obj = {
            index: index,
            name: item.name,
            Deleteshow: false
          }
          this.AddData.push(obj);
          this.AddName.push(item.name);
        } else {
          this.$message('该筛选项已存在');
        }

      },
      //删除
      handlerDelete(item, index) {
        this.AddData.splice(index, 1);
        this.AddName.splice(index, 1);
        if (this.Index == 0) {
          this.AddDataOne.splice(index, 1);
        } else if (this.Index == 1) {
          this.AddDataTwo.splice(index, 1);
        } else if (this.Index == 2) {
          this.AddDataThree.splice(index, 1);
        } else if (this.Index == 3) {
          this.AddDataFour.splice(index, 1);
        } else if (this.Index == 4) {
          this.AddDataFive.splice(index, 1);
        }
      },
      //全部添加
      handlerAllAdd() {
        let arr = [];
        let arr1 = [];
        this.multiData.forEach((ele, index) => {
          let obj = {
            index: index,
            name: ele.name,
            Deleteshow: false
          }
          if (this.AddData.length > 0) {
            if (this.AddName.indexOf(ele.name) == -1) {
              this.AddData.push(obj);
              this.AddName.push(ele.name);
            }
          } else {
            arr.push(obj);
            arr1.push(ele.name);
          }
        })
        if (this.AddData.length == 0) {
          this.AddData = arr;
          this.AddName = arr1;
        }
      },
      //清空
      handlerAllDelete() {
        this.AddData = [];
        this.AddName = [];
        if (this.Index == 0) {
          this.AddDataOne = [];
        } else if (this.Index == 1) {
          this.AddDataTwo = [];
        } else if (this.Index == 2) {
          this.AddDataThree = [];
        } else if (this.Index == 3) {
          this.AddDataFour = [];
        } else if (this.Index == 4) {
          this.AddDataFive = [];
        }
      },

      handlerChoose(type) {
        this.Index = type;
        this.mymask = true;
        let arr = [];
        if (type == 0) {
          this.dataList.forEach(ele => {
            if (ele != '全部') {
              let obj = {
                Addshow: false,
                name: ele
              }
              arr.push(obj);
            }
          })
          this.multiData = arr.reverse();
          this.AddData = this.AddDataOne;
        } else if (type == 1) {
          this.district_name.forEach(ele => {
            if (ele.district_name != '全部') {
              let obj = {
                Addshow: false,
                name: ele.district_name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataTwo;
        } else if (type == 2) {
          this.nodeList.forEach(ele => {
            let obj = {
              Addshow: false,
              name: ele.node_type
            }
            arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataThree;
        } else if (type == 3) {
          this.nodeTypeList.forEach(ele => {
            let obj = {
              Addshow: false,
              name: ele.node_detail_type
            }
            arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataFour;
        } else if (type == 4) {
          this.modeList.forEach(ele => {
            let obj = {
              Addshow: false,
              name: ele.mode
            }
            arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataFive;
        } else if (type == 5) {
          this.groupList.forEach(ele => {
            let obj = {
              Addshow: false,
              name: ele.group_name
            }
            arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataSix;
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preD, {
          passive: false
        }); // 禁止页面滑动
      },
      allAddFun() { //多选确认
        if (this.AddData.length > 0) {
          this.first = false;
          let arr = [];
          this.AddData.forEach(ele => {
            arr.push(ele.name);
          })
          if (this.AddData.length == 1) {
            if (this.Index == 0) {
              this.selectOne = arr[0];
              this.getQueryRegionNodeTypeInfoFun1();
            } else if (this.Index == 1) {
              this.selectTwo = arr[0];
              this.nodeList = [];
              this.nodeIndex = 0;
              this.selectThree = '节点类型';
              this.getQueryNodeTypeInfoFun();
            } else if (this.Index == 2) {
              this.selectThree = arr[0];

              this.nodeTypeList = [];
              this.nodeTypeIndex = 0;
              this.selectFour = '节点详细类型';
              this.getQueryNodeTypeDetailInfoFun();
            } else if (this.Index == 3) {
              this.selectFour = arr[0];
            } else if (this.Index == 4) {
              this.selectFive = arr[0];
            } else if (this.Index == 5) {
              this.selectSix = arr[0];
            }
          } else {
            if (this.Index == 0) {
              this.selectOne = arr.join(',');
              this.getQueryRegionNodeTypeInfoFun1();

            } else if (this.Index == 1) {
              this.selectTwo = arr.join(',');
              this.nodeList = [];
              this.nodeIndex = 0;
              this.selectThree = '节点类型';
              this.getQueryNodeTypeInfoFun();
            } else if (this.Index == 2) {
              this.selectThree = arr.join(',');
              this.nodeTypeList = [];
              this.nodeTypeIndex = 0;
              this.selectFour = '节点详细类型';
              this.getQueryNodeTypeDetailInfoFun();
            } else if (this.Index == 3) {
              this.selectFour = arr.join(',');
            } else if (this.Index == 4) {
              this.selectFive = arr.join(',');
            } else if (this.Index == 4) {
              this.selectSix = arr.join(',');
            }
          }
        } else {
          if (this.Index == 0) {
            this.selectOne = '所属大区';
            this.AddDataOne = [];
            this.getQueryRegionNodeTypeInfoFun();
          } else if (this.Index == 1) {
            this.selectTwo = '归属区县';
            this.AddDataTwo = [];
            this.nodeList = [];
            this.nodeIndex = 0;
            this.selectThree = '节点类型';
            this.getQueryNodeTypeInfoFun();
          } else if (this.Index == 2) {
            this.selectThree = '节点类型';
            this.AddDataThree = [];
            this.nodeTypeList = [];
            this.nodeTypeIndex = 0;
            this.selectFour = '节点详细类型';
            this.getQueryNodeTypeDetailInfoFun();
          } else if (this.Index == 3) {
            this.selectFour = '节点详细类型';
            this.AddDataFour = [];
          } else if (this.Index == 4) {
            this.selectFive = '建设模式';
            this.AddDataFive = [];
          } else if (this.Index == 5) {
            this.selectSix = '集团名称';
            this.AddDataSix = [];
          }
        }
        if (this.Index == 0) {
          this.AddDataOne = this.AddData;
        } else if (this.Index == 1) {
          this.AddDataTwo = this.AddData;
        } else if (this.Index == 2) {
          this.AddDataThree = this.AddData;
        } else if (this.Index == 3) {
          this.AddDataFour = this.AddData;
        } else if (this.Index == 4) {
          this.AddDataFive = this.AddData;
        }
        this.handlerClose();
        // this.drawMap1();
        //加载图表
        if(this.OneEchartsIndex == 1){
          this.getQueryTraceNodeQuantityReportedFun();
        }else if (this.OneEchartsIndex == 2){
          this.getQueryTraceNodeTypeQuantityReportedFun();
        }else if (this.OneEchartsIndex == 3){
          this.getQuerytraceNodeTypeGroupQuantityReportedFun();
        }
        this.getQueryQuantityReportedFun();
        this.getQuerytraceNodeQuantityReportedFun();
        this.shuju = [];
        this.loadTableOne();
      },
      getTraceEnterpriseTypeFun() {
        getTraceEnterpriseType()
          .then(res => {
            let arr = [];
            // console.log(res);
          })
          .catch(error => {
            console.log(error)
          })
      },

      //选择大区时查询归属区县
      getQueryRegionNodeTypeInfoFun1() {
        getQueryRegionNodeTypeInfo()
          .then(res => {
            let arr = [];
            if (this.selectOne.indexOf(',') == -1) {
              res.data.dataList.forEach(ele => {
                if (this.selectOne == ele.region) {
                  arr = arr.concat(ele.district_name);
                }
              })
              this.district_name = arr;
            } else {
              let select = this.selectOne.split(',');
              res.data.dataList.forEach(ele => {
                select.forEach(val => {
                  if (val == ele.region) {
                    arr = arr.concat(ele.district_name);
                  }
                })
              })
              this.district_name = arr;
            }
            this.nodeList = [];
            this.nodeIndex = 0;
            this.selectThree = '节点类型';
            setTimeout(() => {
              this.getQueryNodeTypeInfoFun();
            }, 50)
          })
          .catch(error => {
            console.log(error)
          })
      },
      //查询大区联动区域
      getQueryRegionNodeTypeInfoFun() {
        getQueryRegionNodeTypeInfo()
          .then(res => {
            let arr = [];
            res.data.dataList.forEach(ele => {
              arr.push(ele.region);
            })
            this.dataList = arr.reverse();
            this.district_name = res.data.dataList[res.data.dataList.length - 1].district_name;
            this.nodeList = [];
            this.nodeIndex = 0;
            this.selectThree = '节点类型';
            setTimeout(() => {
              this.getQueryNodeTypeInfoFun();
            }, 50)
          })
          .catch(error => {
            console.log(error)
          })
      },
      //查询节点类型
      getQueryNodeTypeInfoFun() {
        let district_name = '';
        if (this.selectOne == '所属大区') {
          if (this.selectTwo == '归属区县') {
            district_name = '';
          } else {
            if (this.selectTwo.indexOf(',') == -1) {
              district_name = "'" + this.selectTwo + "'";
            } else {
              let str = '';
              let arr = this.selectTwo.split(',');
              arr.forEach(ele => {
                if (ele.district_name != '全部') {
                  str += "'" + ele.district_name + "',";
                }
              })
              district_name = str.substr(0, str.length - 1);
            }
          }
        } else {
          if (this.selectTwo == '归属区县') {
            let str = '';
            this.district_name.forEach(ele => {
              if (ele.district_name != '全部') {
                str += "'" + ele.district_name + "',";
              }
            })
            district_name = str.substr(0, str.length - 1);
          } else {
            let str = '';
            if (this.selectTwo.indexOf(',') == -1) {
              district_name = "'" + this.selectTwo + "'";
            } else {
              let arr = this.selectTwo.split(',');
              arr.forEach(ele => {
                if (ele != '全部') {
                  str += "'" + ele + "',";
                }
              })
              district_name = str.substr(0, str.length - 1);
            }

          }
        }
        let str = 'district_name=' + district_name;
        getQueryNodeTypeInfo(str)
          .then(res => {
            res.data.dataList.forEach(ele => {
              this.nodeList.push(ele);
            })
            this.nodeTypeList = [];
            this.nodeTypeIndex = 0;
            this.selectFour = '节点详细类型';
            setTimeout(() => {
              this.getQueryNodeTypeDetailInfoFun();
            }, 50)
          })
          .catch(error => {
            console.log(error)
          })
      },
      //根据节点类型查询详细节点类型
      getQueryNodeTypeDetailInfoFun() {
        let node_type = '';
        if (this.first) {
          node_type = '';
        } else {
          if (this.selectThree == '节点类型') {
            let str = '';
            this.nodeList.forEach(ele => {
              if (ele.node_type != '全部') {
                str += "'" + ele.node_type + "',";
              }
            })
            node_type = str.substr(0, str.length - 1);
          } else {
            if (this.selectThree.indexOf(',') == -1) {
              node_type = "'" + this.selectThree + "'";
            } else {
              let str = '';
              let arr = this.selectThree.split(',');
              arr.forEach(ele => {
                if (ele != '全部') {
                  str += "'" + ele + "',";
                }
              })
              node_type = str.substr(0, str.length - 1);
            }
          }
        }

        let str = 'node_type=' + node_type;
        getQueryNodeTypeDetailInfo(str)
          .then(res => {
            res.data.dataList.forEach(ele => {
              this.nodeTypeList.push(ele);
            })
          })
          .catch(error => {
            console.log(error)
          })
      },
      //建设模式
      getQueryModeInfoFun() {
        getQueryModeInfo()
          .then(res => {
            res.data.dataList.forEach(ele => {
              this.modeList.push(ele);
            })
            res.data.groupList.forEach(ele => {
              this.groupList.push(ele);
            })

          })
          .catch(error => {
            console.log(error)
          })
      },




      getParams(){
        let selectOne = '';
        let selectTwo = '';
        let selectThree = '';
        let selectFour = '';
        let selectFive = '';
        let selectSix = '';
        let startDate = '';
        let endDate = '';
        if (this.selectOne == '所属大区') {
          selectOne = '全部';
        } else {
          selectOne = this.selectOne;
        }
        if (this.selectTwo == '归属区县') {
          selectTwo = '全部';
        } else {
          if (this.selectTwo.indexOf(',') == -1) {
            selectTwo = "'" + this.selectTwo + "'";
          } else {
            let str = '';
            let arr = this.selectTwo.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectTwo = str.substr(0, str.length - 1);
          }
        }
        if (this.selectThree == '节点类型') {
          selectThree = '全部';
        } else {
          if (this.selectThree.indexOf(',') == -1) {
            selectThree = "'" + this.selectThree + "'";
          } else {
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectThree = str.substr(0, str.length - 1);
          }
        }
        if (this.selectFour == '节点详细类型') {
          selectFour = '全部';
        } else {
          if (this.selectFour.indexOf(',') == -1) {
            selectFour = "'" + this.selectFour + "'";
          } else {
            let str = '';
            let arr = this.selectFour.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectFour = str.substr(0, str.length - 1);
          }
        }
        if (this.selectFive == '建设模式') {
          selectFive = '全部';
        } else {
          if (this.selectFive.indexOf(',') == -1) {
            selectFive = "'" + this.selectFive + "'";
          } else {
            let str = '';
            let arr = this.selectFive.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectFive = str.substr(0, str.length - 1);
          }
        }
        if (this.selectSix == '集团名称') {
          selectSix = '全部';
        } else {
          if (this.selectSix.indexOf(',') == -1) {
            selectSix = "'" + this.selectSix + "'";
          } else {
            let str = '';
            let arr = this.selectSix.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectSix = str.substr(0, str.length - 1);
          }
        }
        if (this.selectDate == '事件日期') {
          startDate = '';
          endDate = '';
        } else {
          // if()
        }
        this.params = {
          "startDate": this.startDate,
          "endDate": this.endDate,
          "type": this.type,
          // "type":1,
          "region": selectOne,
          "district_name": selectTwo,
          "node_type": selectThree,
          "node_detail_type": selectFour,
          "mode": selectFive,
          "group_name": selectSix,
          "date": this.Onedate
        }

      },
      getParams1(){
        let selectOne = '';
        let selectTwo = '';
        let selectThree = '';
        let selectFour = '';
        let selectFive = '';
        let selectSix = '';
        let startDate = '';
        let endDate = '';
        let node_type_new = '';
        if (this.selectOne == '所属大区') {
          selectOne = '全部';
        } else {
          selectOne = this.selectOne;
        }
        if (this.selectTwo == '归属区县') {
          selectTwo = '全部';
        } else {
          if (this.selectTwo.indexOf(',') == -1) {
            selectTwo = "'" + this.selectTwo + "'";
          } else {
            let str = '';
            let arr = this.selectTwo.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectTwo = str.substr(0, str.length - 1);
          }
        }
        if (this.selectThree == '节点类型') {
          selectThree = '全部';
        } else {
          if (this.selectThree.indexOf(',') == -1) {
            selectThree = "'" + this.selectThree + "'";
          } else {
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectThree = str.substr(0, str.length - 1);
          }
        }
        if (this.selectFour == '节点详细类型') {
          selectFour = '全部';
        } else {
          if (this.selectFour.indexOf(',') == -1) {
            selectFour = "'" + this.selectFour + "'";
          } else {
            let str = '';
            let arr = this.selectFour.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectFour = str.substr(0, str.length - 1);
          }
        }
        if (this.selectFive == '建设模式') {
          selectFive = '全部';
        } else {
          if (this.selectFive.indexOf(',') == -1) {
            selectFive = "'" + this.selectFive + "'";
          } else {
            let str = '';
            let arr = this.selectFive.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectFive = str.substr(0, str.length - 1);
          }
        }
        if (this.selectSix == '集团名称') {
          selectSix = '全部';
        } else {
          if (this.selectSix.indexOf(',') == -1) {
            selectSix = "'" + this.selectSix + "'";
          } else {
            let str = '';
            let arr = this.selectSix.split(',');
            arr.forEach(ele => {
              str += "'" + ele + "',";
            })
            selectSix = str.substr(0, str.length - 1);
          }
        }
        if (this.selectDate == '事件日期') {
          startDate = '';
          endDate = '';
        } else {
          // if()
        }
        this.params1 = {
          "startDate": this.startDate,
          "endDate": this.endDate,
          "type": this.type,
          // "type":1,
          "region": selectOne,
          "district_name": selectTwo,
          "node_type": selectThree,
          "node_detail_type": selectFour,
          "mode": selectFive,
          "group_name": selectSix,
          "date": this.Onedate,
          "node_type_new":node_type_new
        }

      },
      getPath(chartsIndex){
        console.log('getPaht')
        if(chartsIndex == 1){
          this.OneEchartsIndex = 1;
          this.pathTwo = '';
          document.getElementById("echartsOnePath").style.display="none";
          this.getQueryTraceNodeQuantityReportedFun();
        }else if(chartsIndex == 2){
          this.pathThree = '';
          this.getQueryTraceNodeTypeQuantityReportedFun();
        }

      },

      // 追溯数据上报量及企业走势
      getQueryTraceNodeQuantityReportedFun() {
        this.Dataloading1 = true;
        this.getParams()
        getQueryTraceNodeQuantityReported(this.params)
          .then(res => {
            let data = [];
            let sum_node = [];
            let count_node = [];
            if (res.result) {
              res.data.list.forEach(ele => {
                data.push(ele.data)
                sum_node.push(ele.sum_node)
                count_node.push(ele.count_node)
              })
            } else {
              console.log("追溯数据上报量及企业走势:->请求失败！")
            }
            this.regionFun(data, sum_node, count_node)
            this.Dataloading1 = false;
          })
          .catch(error => {
            console.log(error)
          })
      },

      // 追溯数据上报量及企业走势 -- 钻取企业类型
      getQueryTraceNodeTypeQuantityReportedFun() {
        this.Dataloading1 = true;
        this.OneEchartsIndex = 2;
        this.getParams()
        getQueryTraceNodeTypeQuantityReported(this.params)
          .then(res => {
            let node_type = [];
            let sum_node = [];
            let count_node = [];
            if (res.result) {
              res.data.list.forEach(ele => {
                node_type.push(ele.node_type)
                sum_node.push(ele.sum_node)
                count_node.push(ele.count_node)
              })
            } else {
              console.log("追溯数据上报量及企业走势:->请求失败！")
            }
            this.regionFun(node_type, sum_node, count_node)
            this.Dataloading1 = false;
          })
          .catch(error => {
            console.log(error)
          })
      },

      // 追溯数据上报量及企业走势 -- 钻取各个企业
      getQuerytraceNodeTypeGroupQuantityReportedFun() {
        this.Dataloading1 = true;
        this.OneEchartsIndex = 3 ;
        this.getParams1()
        console.log(this.node_type_one);
        this.params1.node_type_new = this.node_type_one;
       // let node_type_new = this.node_type_one;
        getQuerytraceNodeTypeGroupQuantityReported(this.params1)
          .then(res => {
            let group_name = [];
            let sum_node = [];
            let count_node = [];
            if (res.result) {
              res.data.list.forEach(ele => {
                group_name.push(ele.group_name)
                sum_node.push(ele.sum_node)
                count_node.push(ele.count_node)
              })
            } else {
              console.log("追溯数据上报量及企业走势:->请求失败！")
            }
            this.regionFun(group_name, sum_node, count_node)
            this.Dataloading1 = false;
          })
          .catch(error => {
            console.log(error)
          })
      },

      // 追溯数据上报量（数）走势-按环节  第二、三个图
      getQueryQuantityReportedFun() {
        this.Dataloading2 = true;
        this.getParams()

        getQueryQuantityReported(this.params)
          .then(res => {
            let in_date = [];
            let in_date2 = [];
            let legend_data = [];
            let series_data = [];
            let legend_data2 = [];
            let series_data2 = [];
            if (res.result && res.data.sumlist.length > 0) {  //
              let date_len = res.data.sumlist.length; //多少天的数据 7
              let type_index = 0;
              let type_len = res.data.sumlist[0].node_type_sum.length; // 5 几种类型

 // 取出 《示例图类型》
              res.data.sumlist[0].node_type_sum.forEach(ele => {
                legend_data.push(ele.node_type)
              })
// 取出 《时间》
              res.data.sumlist.forEach((ele,index) => {
                in_date.push(ele.in_date)
                let temp = ele.node_type_sum.length
                if(temp >= type_len){
                  type_len = temp;
                  type_index = index;
                }
              })
              var node_type = '';
              let dataList = res.data.sumlist[0].node_type_sum;
              for(let i = 0; i < dataList.length ; i++){
                let data_arr = [];
                let node_type = dataList[i].node_type;
                for(let j = 0; j < date_len ; j++){  //天
                  // console.log('天数'+j +',类型：'+i +',实际：'+res.data.sumlist[j].node_type_sum.length)
                  if(type_len == res.data.sumlist[j].node_type_sum.length){ //正常的push
                    data_arr.push(res.data.sumlist[j].node_type_sum[i].sum_node)
                  }else{ //少数据项的

                      let flag = true;
                      //循环查找符合type的，如果没就放入0
                      for(let k = 0; k < res.data.sumlist[j].node_type_sum.length ; k++){
                        let temp = res.data.sumlist[j].node_type_sum[k].node_type;
                        //   console.log(node_type)
                        // console.log('333------', temp)
                        if(node_type == temp){
                          data_arr.push(res.data.sumlist[j].node_type_sum[k].sum_node)
                          flag = false;
                        }
                      }
                      if(flag){
                        data_arr.push(0)
                      }
                    }

                  }

                let obj = {
                  name: node_type,
                  type: 'bar',
                  stack: '上报量',
                  data: data_arr
                }
                 series_data.push(obj)
              }
            }
            if (res.result && res.data.countlist.length > 0) {
              let date_len = res.data.countlist.length; //多少天的数据 7
              let type_index = 0;
              let type_len = res.data.countlist[0].node_type_count.length; // 5 几种类型


// 取出 《时间》
              res.data.countlist.forEach((ele,index) => {
                in_date2.push(ele.in_date)
                let temp = ele.node_type_count.length;
                if(temp >= type_len){
                  type_index = index;
                  type_len = temp;
                }
              })
  // 取出 《示例图类型》
              res.data.countlist[type_index].node_type_count.forEach(ele => {
                legend_data2.push(ele.node_type)
              })

              for(let i = 0; i < type_len ; i++){
                let data_arr = [];
                let node_type = res.data.countlist[type_index].node_type_count[i].node_type;

                for(let j = 0; j < date_len ; j++){  //天
                  // console.log('天数'+j +',类型：'+i +',实际：'+res.data.countlist[j].node_type_count.length)
                  if(type_len == res.data.countlist[j].node_type_count.length){ //正常的push
                    data_arr.push(res.data.countlist[j].node_type_count[i].count_node)
                  }else{ //少数据项的

                      let flag = true;
                      //循环查找符合type的，如果没就放入0
                      for(let k = 0; k < res.data.countlist[j].node_type_count.length ; k++){
                        let temp = res.data.countlist[j].node_type_count[k].node_type;
                        if(node_type == temp){
                          data_arr.push(res.data.countlist[j].node_type_count[k].count_node)
                          flag = false;
                        }
                      }
                      if(flag){
                        data_arr.push(0)
                      }
                    }

                  }

                let obj = {
                  name: node_type,
                  type: 'bar',
                  stack: '上报数',
                  data: data_arr
                }
                 series_data2.push(obj)
              }

            }
            if(res.result == false){
              // alert("溯数据上报量（数）走势-按环节:->请求失败！")
              console.log('溯数据上报量（数）走势-按环节:->请求失败！')
            }
            console.log(series_data);
            this.regionFun2(in_date,in_date2,legend_data, series_data,legend_data2, series_data2)
            this.Dataloading2 = false;
          })
          .catch(error => {
            console.log(error)
            this.Dataloading2 = false;
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


      //第一个图形渲染
      regionFun(data, sum_node, count_node) {

        let in_date2 = [];
        //判断
        if(data != null && data.length > 0 && (this.OneEchartsIndex == 1 )){
          data.forEach(ele => {
            let one_date = ele.substring(0,10).split('-');
            let new_date = one_date[0] + '年' + one_date[1] + '月' + one_date[2] + '日';
            in_date2.push(new_date);
          })
          data = in_date2;
        }

        this.Dispose('echartsDataOne')
        let mychart = this.$echarts.init(document.getElementById('echartsDataOne'))
        // console.log(this.OneEchartsIndex)
        mychart.on('click', (params) => {
          /* if ( this.OneEchartsIndex != 3  ){
            mychart.showLoading({
              text: '统计中，请稍候...'
              , maskColor: 'rgba(3,3,8,0.5)',
              textColor: '#fff600'
            });
          }else if ( this.OneEchartsIndex == 3  ){
            return;
           }
 */

          console.log(this.OneEchartsIndex)
          // console.log(params)
          if(this.OneEchartsIndex == 1){

            console.log('=====111=====')
            let date = params.name;
            this.pathTwo = ' > '+date;
            date = date.replace('年','-').replace('月','-').replace('日','');
            //图一钻取
            this.Onedate = date;
            document.getElementById("echartsOnePath").style.display="block";
            this.getQueryTraceNodeTypeQuantityReportedFun();
            // return;
          }else if (this.OneEchartsIndex == 2){
            console.log('=====222=====')
            this.node_type_one = params.name;
            this.pathThree = ' > '+params.name;
            this.getQuerytraceNodeTypeGroupQuantityReportedFun();
            // return;
          }

        })
        // 监听屏幕变化自动缩放图表
        window.addEventListener('resize', function() {
          mychart.resize()
        })

        mychart.hideLoading();
        mychart.setOption({
          title: {
            text: '追溯数据上报量及企业走势',
            subtext: '',
            left: 'left',
            left: '15px',
            textStyle: {
              fontSize: 14
            }
          },
          dataZoom: { //实现缩放功能
            show: true,
            realtime: true,
            start: 0,
            end: 100
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: [{
            type: 'category',
            data: data,
            axisPointer: {
              type: 'shadow'
            }
          }],
          yAxis: [{
              type: 'value',
              name: '数据量',
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: {
                show: false
              }
            },
            {
              type: 'value',
              name: '活跃节点数',
              axisLabel: {
                formatter: '{value} '
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [{
              name: '数据量',
              type: 'bar',
              data: sum_node,
              itemStyle: {
                normal: {
                  color: '#89A64E',
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
              name: '活跃节点数',
              type: 'line',
              yAxisIndex: 1,
              data: count_node,
              itemStyle: {
                normal: {
                  color: '#B9CE97',
                  label: {
                    show: false, //开启显示
                    position: 'right', //在上方显示
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
      },



      //第二/三个图形渲染
      regionFun2(in_date,in_date2, legend_data, series_data,legend_data2, series_data2) {

        let echartsDataNum = 'echartsDataTwo';
        let echarts_text = '追溯数据上报量走势-按环节'
        this.regionFun3(in_date,legend_data,series_data,echarts_text,echartsDataNum);

        echartsDataNum = 'echartsDataThree';
        echarts_text = '追溯数据上报数走势-按环节'
        this.regionFun3(in_date2,legend_data2,series_data2,echarts_text,echartsDataNum);
      },

      //第二/三个图形渲染
      regionFun3(in_date, legend_data, series_data,echarts_text,echartsDataNum) {
        if(in_date != null && in_date.length > 0 ){
          let in_date2 = [];
          in_date.forEach(ele => {
            let one_date = ele.substring(0,10).split('-');
            let new_date = one_date[0] + '年' + one_date[1] + '月' + one_date[2] + '日';
            in_date2.push(new_date);
          })
          in_date = in_date2;
         }
         this.Dispose(echartsDataNum)
        let mychart = this.$echarts.init(document.getElementById(echartsDataNum))
        // 监听屏幕变化自动缩放图表
        window.addEventListener('resize', function() {
          mychart.resize()
        })
        mychart.setOption({
            title: {
              text: echarts_text,
              subtext: '',
              left: 'left',
              left: '15px',
              textStyle: {
                fontSize: 14
              }
            },
            // dataZoom: { //实现缩放功能
            //   show: true,
            //   realtime: true,
            //   start: 0,
            //   end: 100
            // },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              top: '20px',
              left: 'right',
              data: legend_data
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: in_date
            }],
            yAxis: [{
              type: 'value'
            }],
            series:  series_data,
        })
      },

  getSpanArr(){
      let contactDot = 0;
        this.shuju.forEach( (item,index) => {
            if(index===0){
                this.spanArr.push(1)
            }else{
              if(item.region === this.shuju[index-1].region){
                  this.spanArr[contactDot] += 1;
                  this.spanArr.push(0)
              }else{
                  contactDot = index
                  this.spanArr.push(1)
              }
            }
        })
      },
      //数据量上报对比 - 表
      loadTableOne(){
        this.Dataloading3 = true;
        this.getParams();
        getQueryQuantityReportedContrast(this.params)
        .then(res=>{
          // console.log(res)
          let weekList = res.data.regionList;
           // console.log(weekList)
        weekList.forEach(ele=>{
          ele.group.forEach(val=>{
            let arr = [];
            let arr1 = []
            this.arrList = {
              region:ele.region,
              group_name:val.group_name
            }
            let data1 = []
            val.week.forEach((val1,index)=>{
              let num = 'col' + index;
              let str = {
                prop:num,
                label:val1.date
              }
              arr.push(str);
              let dataStr = {
                [num]:val1.sum_node
              };
              Object.assign(this.arrList,dataStr);
            })
           this.caidan = [
                {
                  prop: 'region',
                  label: '区域'
                },
                {
                  prop: 'group_name',
                  label: '节点'
                },{
                  label: '数据量分析',
                  children: arr
                }
            ];
            this.shuju.push(this.arrList);
          })

        })
        // this.getSpanArr();
        console.log(this.shuju);
        console.log(this.caidan);
        this.Dataloading3 = false;
        })
        .catch(res=>{
          console.log(res);
        })
      },

      getQuerytraceNodeQuantityReportedFun(){
        this.Dataloading4 = true;
        this.getParams();
         this.nodeQuantityReportedList = [];
        getQuerytraceNodeQuantityReported(this.params)
          .then(res=>{
            let list = res.data.list, arr = [];
            list.forEach((val1, ele1) => {
                 val1.node.forEach((val2, ele2) => {
                     val2.NodeTypeDetail.forEach((val3, ele3) => {
                         val3.date.forEach((val4, ele4) => {
                             val4.node_type = val1.node_type
                             val4.node_detail_type = val2.node_detail_type
                             val4.in_date = val3.in_date
                             arr.push(val4)
                         })
                     })
                 })
             })
            this.nodeQuantityReportedList = arr
            this.Dataloading4 = false;
          })
      }
    },

  }
</script>

<style scoped lang='less'>
  @import '../../assets/css/common.css';

  .content {
    width: 100%;
    height: 100%;

    .table-btn {
      margin: 0 5px;
      float: left;
      cursor: pointer;
      font-size: 14px;
    }
    .draw-table{
      width: 90%;
      height: 90%;
      padding-top: 20px;
      padding-left: 43px;
    }
    .searchs {
      padding: 10px;
      background: #fff;

      .file-btn {
        color: #777;
        background: #fff;
        border-color: #eaeaea;
      }

      .search-btn {
        color: #409EFF;
        background: #fff;
      }

      .clear-content {
        margin-left: 10px;
        cursor: pointer;
        color: #999999;
        font-size: 14px;
      }

      .el-form {
        min-width: 950px;
      }

      .el-input,
      .el-date-picker,
      .el-select,
      .el-cascader {
        width: 200px;
      }

      .unfold {
        text-align: center;
        font-size: 14px;
        color: #409EFF;
        cursor: pointer;
      }

      .el-form-item {
        margin-bottom: 0;
      }

      .select {
        cursor: pointer;
        display: inline-block;
        margin-right: 20px;
        font-size: 14px;

        .el-dropdown {
          margin-right: 3px;
        }

        .el-dropdown-link {
          border-bottom: 1px solid rgba(81, 130, 228, .5);
          height: 30px;
          line-height: 30px;
          display: inline-block;
          font-size: 14px;
        }

        .choose {
          cursor: pointer;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #666;
        }
      }

    }

    .Echarts {
      margin-top: 10px;
      .myEcharts {
        padding-top: 20px;
        height: 350px;
        width: 100%;
      /*  margin-top: 10px; */
        background-color: #fff;
      }
      .mytables{
        height: 400px;
        background: #fff;
        border-bottom: 3px solid #E8EBED;
      }
      .myPath {
        margin-left: 50px;
        color: rgba(0, 170, 255, 0.6);
      }
    }



    .multi {
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -250px;
      margin-left: -250px;
      width: 500px;
      height: 500px;
      background: #F0F2F3;
      z-index: 999;

      .multi-head {
        line-height: 30px;
        color: rgba(10, 18, 32, .64);
        font-size: 14px;
        padding: 10px 20px;

        .icon-close {
          font-size: 18px;
          float: right;
          cursor: pointer;
        }
      }

      .multi-con {
        background-color: #fff;
        margin: 10px 30px;
        height: 380px;
        overflow: hidden;
        box-shadow: 0 0 6px 0 rgba(0, 0, 0, .06), 0 10px 12px 0 rgba(118, 153, 222, .1);

        .multi-left {
          float: left;
          width: 50%;
          box-sizing: border-box;
          height: 380px;

          .left-head {
            margin: 11px 16px;
            position: relative;
            color: rgba(10, 18, 32, .64);
            font-size: 13px;
          }

          .left-con {
            width: 100%;
            height: 340px;
            position: relative;
            margin-top: 15px;

            .tooltip {
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              margin: -32px 0 0;
              line-height: 32px;
              text-align: center;
              color: rgba(10, 18, 32, .46);
              font-size: 13px;
            }

            .all-item {
              height: 300px;
              overflow: auto;

              .left-item {
                position: relative;
                line-height: 32px;
                padding-left: 16px;
                color: rgba(10, 18, 32, .64);
                font-size: 13px;

                span {
                  color: #2EA7E0;
                  cursor: pointer;
                  float: right;
                  margin-right: 15px;
                }

                span:hover {
                  text-decoration: underline;
                }
              }

              .hover {
                background-color: #F1F3F4;
              }
            }

            .ng-scope {
              line-height: 25px;
              position: absolute;
              bottom: 15px;
              left: 0;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: rgba(10, 18, 32, .46);

              span {
                color: #2EA7E0;
                cursor: pointer;
              }

              span:hover {
                text-decoration: underline;
              }
            }
          }
        }

        .multi-left1 {
          box-shadow: 2px 0 0 0 rgba(0, 0, 0, .03);
        }
      }

      .mybtn {
        float: right;
        margin: 10px 0;
      }
    }

    .mask {
      position: fixed;
      z-index: 998;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(213, 217, 220, .94);
      opacity: 0.94;
    }
  }
</style>
<style lang="less">
  .DataVolume{
    .el-upload--picture-card {
      height: 60px !important;
      width: 60px !important;
    }

    .el-upload-list--picture-card .el-upload-list__item {
      height: 60px !important;
      width: 60px !important;
    }

    .el-table__body .el-table__row {
      height: 40px;
      line-height: 40px;
    }

    .BMap_cpyCtrl {
      display: none;
    }

    .anchorBL {
      display: none;
    }

    .active {
      color: #2EA7E0;
    }

    .el-dropdown-menu {
      height: 240px;
      overflow: auto;
      width: 170px;
    }
    .mytables{
      // margin-top: 10px;
      background: #fff;
    }
    .mytables .el-table .cell {
      font-size: 14px;
      color: #333333;
    }
  }
</style>
