<template>
    <div class="content jxsjMonitor">
      <div v-loading="Dataloading">
        <div class="searchs" ref="searchs">
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                  <div class="select">
                    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        {{selectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{value:item,flag:0,index:index}" :class="dataIndex == index ? 'active':''" v-for="(item,index) in dataList" :key="index">{{item}}</el-dropdown-item>
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
                         <el-dropdown-item :command="{value:item.district_name,flag:1,index:index1}" :class="districtIndex == index1 ? 'active':''" v-for="(item,index1) in district_name" :key="index1">{{item.district_name}}</el-dropdown-item>
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
                          <el-dropdown-item :command="{value:item.node_type,flag:2,index:index4+1}" :class="nodeIndex == index4+1 ? 'active':''" v-for="(item,index4) in nodeList" :key="index4">{{item.node_type}}</el-dropdown-item>
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
                          <el-dropdown-item :command="{value:item.node_detail_type,flag:3,index:index5+1}" :class="nodeTypeIndex == index5+1 ? 'active':''" v-for="(item,index5) in nodeTypeList" :key="index5">{{item.node_detail_type}}</el-dropdown-item>
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
                          <el-dropdown-item :command="{value:item.mode,flag:4,index:index6+1}" :class="modeIndex == index6+1 ? 'active':''" v-for="(item,index6) in modeList" :key="index6">{{item.mode}}</el-dropdown-item>
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
                          <el-dropdown-item :command="{value:item.group_name,flag:5,index:index7+1}" :class="groupIndex == index7+1 ? 'active':''" v-for="(item,index7) in groupList" :key="index7">{{item.group_name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <span class="choose" @click="handlerChoose(5)">多选</span>
                    </div>

                </el-form>
        </div>
        <div class="table">
          <div class="subject">
            <div class="subAll" style="border-bottom: 3px solid #E8EBED;">
              <div class="sub-item sub-item1" @click="handlesubmit">
                <p class="myp">主体备案</p>
                <p class="num">{{node_count}}<span>家</span></p>
              </div>
              <div class="sub-item"  @click="handlesubmit1">
                <p class="myp">屠宰企业</p>
                <p class="num">{{type1}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">批发市场</p>
                <p class="num">{{type2}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">分割肉企业</p>
                <p class="num">{{type3}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">包装菜企业</p>
                <p class="num">{{type4}}<span>家</span></p>
              </div>
            </div>
            <div class="subAll">
              <div class="sub-item sub-item1">
                <p class="myp">商户备案</p>
                <p class="num">{{business_count}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">菜市场</p>
                <p class="num">{{type5}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">直营直供门店</p>
                <p class="num">{{type6}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">超市及生鲜超市</p>
                <p class="num">{{type7}}<span>家</span></p>
              </div>
              <div class="sub-item">
                <p class="myp">餐饮门店</p>
                <p class="num">{{type8}}<span>家</span></p>
              </div>
            </div>

          </div>
          <div class="myEcharts">
            <div class="echarts-item">
                <div id="echartsOne" class="myecharts"></div>
            </div>
            <div class="echarts-item" style="border-right: none;">
              <div id="echartsTwo" class="myecharts"></div>
            </div>
          </div>

          <div class="myEcharts">
            <div class="echarts-item">
                <div id="echartsBJ" class="myecharts"></div>
            </div>
            <div class="echarts-item" style="border-right: none;">
              <!-- <baidu-map class="map" ak="bbXubLQnW7BMIFxVbsNKbzGgNqo2PZIg" :zoom="map.zoom" :center="{lng: map.center.lng, lat: map.center.lat}"
                @ready="handler" :scroll-wheel-zoom="true">
                <div v-for="(marker,index)  in  postionMap" :key="index">
                   <BmMarker :position="{lng: marker.x_coordinate, lat: marker.y_coordinate}"
                   ></BmMarker>

                </div>
                <BmMarker v-for="marker in postionMap" :key="marker.node_id" :position="{lng: marker.lng, lat: marker.lat}" @click="handleMarkerClick(marker)"></BmMarker>

                 <bm-point-collection :points="postionMap" shape="BMAP_POINT_SHAPE_CIRCLE" color="red" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
                </baidu-map> -->
                <div id="map_canvas" class="map" tabindex="0" style="width:100%; height:300px;"></div>
            </div>
          </div>

        </div>
        </div>
        <div class="myBorder"></div>
        <div class="mytables" style="margin-bottom: 20px;">
            <el-table :data="node_list" v-el-table-infinite-scroll="handleload" :header-cell-style="rowClass" :height="500">
                <el-table-column width="120px" prop="node_type" label="节点类型"> </el-table-column>
                <el-table-column  width="90px" prop="node_id" label="节点编码"></el-table-column>
                <el-table-column prop="node_name" label="节点名称"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column  width="80px" prop="district_name" label="归属区县"></el-table-column>
                <el-table-column width="80px" prop="legal_represent" label="法人代表"></el-table-column>
                <el-table-column width="110px" prop="tel" label="电话"></el-table-column>
            </el-table>
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
                  <div class="left-item" @mouseenter="enter(index2)" @mouseleave="leave(index2)" v-for="(item,index2) in multiData" :key="index2">
                    <span class="mytext">{{item.name}}</span>
                    <span v-if="item.Addshow" class="myadd"  @click="handlerAdd(item,index2)">添加</span></div>
                </div>
                <div class="ng-scope" @click="handlerAllAdd"><span>全部添加</span></div>
              </div>
            </div>
            <div class="multi-left">
              <div class="left-head">已添加</div>
              <div class="left-con">
                <div class="tooltip" v-if="AddData.length==0">请从左侧列表选择添加</div>
                <div class="all-item">
                  <div class="left-item" :class="item.Deleteshow?'hover':''" @mouseenter="enter1(index3)" @mouseleave="leave1(index3)" v-for="(item,index3) in AddData" :key="index3">
                  <span class="mytext">{{item.name}}</span>
                  <span class="myadd" v-if="item.Deleteshow" @click="handlerDelete(item,index3)">删除</span></div>
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
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import BmScale from 'vue-baidu-map/components/controls/Scale';
import BmNavigation from 'vue-baidu-map/components/controls/Navigation';
import BmMarkerClusterer from  'vue-baidu-map/components/extra/MarkerClusterer';
import BmMarker from 'vue-baidu-map/components/overlays/Marker';
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow';
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection';
import '../../../node_modules/echarts/map/js/province/beijing.js' // 引入北京地图数据
import axios from 'axios';
import {getQueryRegionNodeTypeInfo,getQueryNodeTypeInfo,getQueryNodeTypeDetailInfo,getQueryTraceNode,getQueryModeInfo,getTraceEnterpriseType} from '../../js/platform/platform.js';
import '../../assets/css/common.css';
// import elTableInfiniteScroll from 'el-table-infinite-scroll';
import AMap from 'AMap';

var preD = function (e) {
     e.preventDefault()
}
export default {
    name:"dataControl",
    data() {
        return {
            form:{
                node_name:'',
                minNum:'',
                maxNum:'',
                info_type:'',
                group_name:'',
                node_detail_type:'包装菜企业',
                data_collection_way:'',
                district_name:''
            },
            map:{
              zoom:0,
              center:{
                lng:0,
                lat:0
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
            postionMap:[],
            points:[],
            dataList:[],
            district_name:[],
            districtIndex:0,
            dataIndex:0,
            mymask:false,
            multiData:[],
            AddData:[],
            AddName:[],
            Index:'',
            selectOne:'所属大区',
            selectTwo:'归属区县',
            selectThree:'节点类型',
            selectFour:'节点详细类型',
            selectFive:'建设模式',
            selectSix:'集团名称',
            AddDataOne:[],
            AddDataTwo:[],
            AddDataThree:[],
            AddDataFour:[],
            AddDataFive:[],
            AddDataSix:[],
            nodeList:[],
            nodeIndex:0,
            nodeTypeList:[],
            nodeTypeIndex:0,
            modeList:[],
            modeIndex:0,
            groupList:[],
            groupIndex:0,
            show:false,
            markers:[],
            business_count:'',
            node_count:'',
            type1:'',
            type2:'',
            type3:'',
            type4:'',
            type5:'',
            type6:'',
            type7:'',
            type8:'',
            userlocation: { lng: "", lat: "" },
            node_list:[],
            Dataloading:false,
            first:true,
            cols:300,
            page:1,
            page1:1,
            map:'',
            node_count1:0,
        }
    },
    // directives: {
    //   'el-table-infinite-scroll': elTableInfiniteScroll
    // },
    components: {
        BaiduMap,
        BmScale,
        BmNavigation,
        BmMarkerClusterer,
        BmMarker,
        BmInfoWindow,
        BmPointCollection
    },
    mounted() {
        this.getQueryRegionNodeTypeInfoFun();
        // this.getQueryNodeTypeInfoFun();
        // this.getQueryNodeTypeDetailInfoFun();

        this.getTraceEnterpriseTypeFun();

        this.getQueryModeInfoFun();
        // this.getQueryTraceNodeFun();
        this.TypeFun();
        this.regionFun();
        this.beijingFun();
        this.$nextTick(function() {
           this.drawMap1();
        });
        this.getQueryTraceNodeFun1();
         // this.drawMap1();
    },
    methods: {
      handlesubmit(){
        this.$router.push({name: "New_file"})
      },
      handlesubmit1(){
        this.$router.push({name: "Hahaha"})
      },
      handleload() {
        if(this.node_count1>this.node_list.length){
          this.page1 = this.page1 + 1;
          this.getQueryTraceNodeFun1();
        }
      },
      rowClass({ row, rowIndex}) {
          return {
              background: '#f2f2f2',
              color: '#333'
          }
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
          {
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
      drawMap1(){
        this.Dataloading = true;
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
        this.map = new AMap.Map('map_canvas', { //创建地图
            zoom: 13, //地图显示的缩放级别
            center: [116.3977432251, 39.9078927749]  ,//地图中心点坐标值
             mapStyle: 'amap://styles/000ddddacab790d37780d4e1b43b1862'//设置地图的显示样式
        });
        this.getQueryTraceNodeFun();
      },
         //单选条件
      handlerCommand(command){
         this.first = false;
        if(command.flag==0){
          this.dataIndex = command.index;
          this.selectTwo = '归属区县';
          this.selectThree = '节点类型';
          this.selectFour = '节点详细类型';
          this.districtIndex = 0,
          this.AddDataTwo = [];
          this.AddDataFour = [];
          this.AddDataThree = [];
          if(command.value=='全部'){
            this.selectOne = '所属大区';
            this.getQueryRegionNodeTypeInfoFun();
          }else{
            this.selectOne = command.value;
            this.getQueryRegionNodeTypeInfoFun1();
          }
        }else if(command.flag==1){
          this.districtIndex = command.index;
          if(command.value=='全部'){
            this.selectTwo = '归属区县';
          }else{
            this.selectTwo = command.value;
          }
          this.nodeList = [];
          this.AddDataFour = [];
          this.AddDataThree = [];
          this.nodeIndex = 0;
          this.selectThree = '节点类型';
          this.selectFour = '节点详细类型';
          this.getQueryNodeTypeInfoFun();

        }else if(command.flag==2){
          this.nodeIndex = command.index;
          if(command.value=='全部'){
            this.selectThree = '节点类型';
          }else{
            this.selectThree = command.value;
          }
          this.nodeTypeList = [];
          this.nodeTypeIndex = 0;
          this.selectFour = '节点详细类型';
          this.AddDataFour = [];
          this.getQueryNodeTypeDetailInfoFun();
        }else if(command.flag==3){
          this.nodeTypeIndex = command.index;
          this.AddDataFour = [];
          if(command.value=='全部'){
            this.selectFour = '节点详细类型';
          }else{
            this.selectFour = command.value;
          }
        }else if(command.flag==4){
          this.modeIndex = command.index;
          if(command.value=='全部'){
            this.selectFive = '建设模式';
          }else{
            this.selectFive = command.value;
          }
        }else if(command.flag==5){
          this.modeIndex = command.index;
          if(command.value=='全部'){
            this.selectSix = '建设模式';
          }else{
            this.selectSix = command.value;
          }
        }
        // this.getQueryTraceNodeFun();
        this.drawMap1();
        this.node_list = [];
        this.page1 = 1;
        this.getQueryTraceNodeFun1();
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
      //添加
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
      //删除
      handlerDelete(item,index){
         this.AddData.splice(index,1);
         this.AddName.splice(index,1);
         if(this.Index==0){
           this.AddDataOne =  this.AddData;
         }else if(this.Index==1){
           this.AddDataTwo =  this.AddData;
         }else if(this.Index==2){
           this.AddDataThree =  this.AddData;
         }else if(this.Index==3){
           this.AddDataFour =  this.AddData;
         }else if(this.Index==4){
           this.AddDataFive =  this.AddData;
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
        }else if(this.Index==2){
          this.AddDataThree = [];
        }else if(this.Index==3){
          this.AddDataFour = [];
        }else if(this.Index==4){
          this.AddDataFive = [];
        }
      },

      handlerChoose(type){
        this.Index = type;
        this.mymask = true;
        this.AddName = [];
        let arr = [];
        if(type==0){
          this.dataList.forEach(ele=>{
            if(ele!='全部'){
              let obj = {
                Addshow:false,
                name:ele
              }
              arr.push(obj);
            }
          })
          this.multiData = arr.reverse();
          this.AddData = this.AddDataOne;
          this.AddDataOne.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }else if(type==1){
          this.district_name.forEach(ele=>{
            if(ele.district_name!='全部'){
              let obj = {
                Addshow:false,
                name:ele.district_name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataTwo;
          this.AddDataTwo.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }else if(type==2){
          this.nodeList.forEach(ele=>{
              let obj = {
                Addshow:false,
                name:ele.node_type
              }
              arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataThree;
          this.AddDataThree.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }else if(type==3){
          this.nodeTypeList.forEach(ele=>{
              let obj = {
                Addshow:false,
                name:ele.node_detail_type
              }
              arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataFour;
          this.AddDataFour.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }else if(type==4){
          this.modeList.forEach(ele=>{
              let obj = {
                Addshow:false,
                name:ele.mode
              }
              arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataFive;
          this.AddDataFive.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }else if(type==5){
          this.groupList.forEach(ele=>{
              let obj = {
                Addshow:false,
                name:ele.group_name
              }
              arr.push(obj);

          })
          this.multiData = arr;
          this.AddData = this.AddDataSix;
          this.AddDataSix.forEach(ele=>{
            this.AddName.push(ele.name)
          })
        }
        document.body.style.overflow = 'hidden';
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
              this.selectOne = arr[0];
              this.getQueryRegionNodeTypeInfoFun1();
            }else if(this.Index==1){
              this.selectTwo = arr[0];
              this.nodeList = [];
              this.nodeIndex = 0;
              this.selectThree = '节点类型';
              this.getQueryNodeTypeInfoFun();
            }else if(this.Index==2){
              this.selectThree = arr[0];

              this.nodeTypeList = [];
              this.nodeTypeIndex = 0;
              this.selectFour = '节点详细类型';
              this.getQueryNodeTypeDetailInfoFun();
            }else if(this.Index==3){
              this.selectFour = arr[0];
            }else if(this.Index==4){
              this.selectFive = arr[0];
            }else if(this.Index==5){
              this.selectSix = arr[0];
            }
          }else{
            if(this.Index==0){
              this.selectOne = arr. join(',');
              this.getQueryRegionNodeTypeInfoFun1();

            }else if(this.Index==1){
              this.selectTwo = arr. join(',');
              this.nodeList = [];
              this.nodeIndex = 0;
              this.selectThree = '节点类型';
              this.getQueryNodeTypeInfoFun();
            }else if(this.Index==2){
              this.selectThree = arr. join(',');
              this.nodeTypeList = [];
              this.nodeTypeIndex = 0;
              this.selectFour = '节点详细类型';
              this.getQueryNodeTypeDetailInfoFun();
            }else if(this.Index==3){
              this.selectFour = arr. join(',');
            }else if(this.Index==4){
              this.selectFive = arr. join(',');
            }else if(this.Index==5){
              this.selectSix = arr. join(',');
            }
          }
        }else{
          if(this.Index==0){
            this.selectOne = '所属大区';
            this.AddDataOne = [];
            this.getQueryRegionNodeTypeInfoFun();
          }else if(this.Index==1){
            this.selectTwo = '归属区县';
            this.AddDataTwo = [];
            this.nodeList = [];
            this.nodeIndex = 0;
            this.selectThree = '节点类型';
            this.getQueryNodeTypeInfoFun();
          }else if(this.Index==2){
            this.selectThree = '节点类型';
            this.AddDataThree = [];
            this.nodeTypeList = [];
            this.nodeTypeIndex = 0;
            this.selectFour = '节点详细类型';
            this.getQueryNodeTypeDetailInfoFun();
          }else if(this.Index==3){
            this.selectFour = '节点详细类型';
            this.AddDataFour = [];
          }else if(this.Index==4){
            this.selectFive = '建设模式';
            this.AddDataFive = [];
          }else if(this.Index==5){
            this.selectSix = '集团名称';
            this.AddDataSix = [];
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
        }else if(this.Index==4){
          this.AddDataFive = this.AddData;
        }
        this.handlerClose();
        this.node_list = [];
        this.page1 = 1;
        this.getQueryTraceNodeFun1();
        this.drawMap1();
      },
      getTraceEnterpriseTypeFun(){
          getTraceEnterpriseType()
              .then( res => {
                let arr = [];
                // console.log(res);
              })
              .catch(error => {
                  console.log(error)
              })
      },

      //选择大区时查询归属区县
      getQueryRegionNodeTypeInfoFun1(){
          getQueryRegionNodeTypeInfo()
              .then( res => {
                let arr = [];
                if(this.selectOne.indexOf(',')==-1){
                  res.data.dataList.forEach(ele=>{
                      if(this.selectOne==ele.region){
                        arr = arr.concat(ele.district_name);
                      }
                  })
                  this.district_name = arr;
                }else{
                  let select = this.selectOne.split(',');
                  res.data.dataList.forEach(ele=>{
                    select.forEach(val=>{
                      if(val==ele.region){
                        arr = arr.concat(ele.district_name);
                      }
                    })
                  })
                  this.district_name = arr;
                }
                this.nodeList = [];
                this.nodeIndex = 0;
                this.selectThree = '节点类型';
                setTimeout(()=>{
                   this.getQueryNodeTypeInfoFun();
                },50)
              })
              .catch(error => {
                  console.log(error)
              })
      },
      //查询大区联动区域
      getQueryRegionNodeTypeInfoFun(){
          getQueryRegionNodeTypeInfo()
              .then( res => {
                let arr = [];
                res.data.dataList.forEach(ele=>{
                  arr.push(ele.region);
                })
                this.dataList = arr.reverse();
                this.district_name = res.data.dataList[res.data.dataList.length-1].district_name;
                this.nodeList = [];
                this.nodeIndex = 0;
                this.selectThree = '节点类型';
                setTimeout(()=>{
                   this.getQueryNodeTypeInfoFun();
                },50)
              })
              .catch(error => {
                  console.log(error)
              })
      },
      //查询节点类型
      getQueryNodeTypeInfoFun(){
        let district_name = '';
        if(this.selectOne=='所属大区'){
          if(this.selectTwo=='归属区县'){
            district_name = '';
          }else{
            if(this.selectTwo.indexOf(',')==-1){
              district_name = "'" + this.selectTwo + "'";
            }else{
              let str = '';
              let arr = this.selectTwo.split(',');
              arr.forEach(ele=>{
                if(ele.district_name!='全部'){
                  str += "'" + ele.district_name + "',";
                }
              })
              district_name = str.substr(0,str.length-1);
            }
          }
        }else{
         if(this.selectTwo=='归属区县'){
           let str = '';
           this.district_name.forEach(ele=>{
             if(ele.district_name!='全部'){
               str += "'" + ele.district_name + "',";
             }
           })
           district_name = str.substr(0,str.length-1);
         }else{
           let str = '';
           if(this.selectTwo.indexOf(',')==-1){
             district_name = "'" + this.selectTwo + "'";
           }else{
             console.log(this.selectTwo);
             let arr = this.selectTwo.split(',');
             arr.forEach(ele=>{
               if(ele!='全部'){
                 str += "'" + ele + "',";
               }
             })
             console.log(str);
             district_name = str.substr(0,str.length-1);
           }

         }
        }
        let str = 'district_name=' + district_name;
          getQueryNodeTypeInfo(str)
              .then( res => {
                res.data.dataList.forEach(ele=>{
                  this.nodeList.push(ele);
                })
                this.nodeTypeList = [];
                this.nodeTypeIndex = 0;
                this.selectFour = '节点详细类型';
                setTimeout(()=>{
                  this.getQueryNodeTypeDetailInfoFun();
                },50)
              })
              .catch(error => {
                  console.log(error)
              })
      },
      //根据节点类型查询详细节点类型
      getQueryNodeTypeDetailInfoFun(){
        let node_type = '';
        if(this.first){
          node_type = '';
        }else{
          if(this.selectThree=='节点类型'){
             let str = '';
            this.nodeList.forEach(ele=>{
              if(ele.node_type!='全部'){
                str += "'" + ele.node_type + "',";
              }
            })
            node_type = str.substr(0,str.length-1);
          }else{
            if(this.selectThree.indexOf(',')==-1){
              node_type = "'" + this.selectThree + "'";
            }else{
              let str = '';
              let arr = this.selectThree.split(',');
              arr.forEach(ele=>{
                if(ele!='全部'){
                  str += "'" + ele + "',";
                }
              })
              node_type = str.substr(0,str.length-1);
            }
          }
        }

        let str = 'node_type=' + node_type;
          getQueryNodeTypeDetailInfo(str)
              .then( res => {
                res.data.dataList.forEach(ele=>{
                   this.nodeTypeList.push(ele);
                })
              })
              .catch(error => {
                  console.log(error)
              })
      },
      //建设模式
      getQueryModeInfoFun(){
        getQueryModeInfo()
            .then( res => {
              res.data.dataList.forEach(ele=>{
                this.modeList.push(ele);
              })
              res.data.groupList.forEach(ele=>{
                this.groupList.push(ele);
              })

            })
            .catch(error => {
                console.log(error)
            })
      },
      ormat_number(n){
         var b=parseInt(n).toString();
         var len=b.length;
         if(len<=3){return b;}
         var r=len%3;
         return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
         },
      //总体数据
      getQueryTraceNodeFun(){
        let selectOne = '';
        let selectTwo = '';
        let selectThree = '';
        let selectFour = '';
        let selectFive= '';
         let selectSix= '';
        if(this.selectOne=='所属大区'){
          selectOne = '全部';
        }else{
          selectOne = this.selectOne;
        }
        if(this.selectTwo=='归属区县'){
          selectTwo = '全部';
        }else{
          if(this.selectTwo.indexOf(',')==-1){
            selectTwo = "'" + this.selectTwo + "'";
          }else{
            let str = '';
            let arr = this.selectTwo.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectTwo = str.substr(0,str.length-1);
          }
        }
        if(this.selectThree=='节点类型'){
          selectThree = '全部';
        }else{
          if(this.selectThree.indexOf(',')==-1){
            selectThree = "'" + this.selectThree + "'";
          }else{
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectThree = str.substr(0,str.length-1);
          }
        }
        if(this.selectFour=='节点详细类型'){
          selectFour = '全部';
        }else{
          if(this.selectFour.indexOf(',')==-1){
             selectFour = "'" + this.selectFour + "'";
          }else{
            let str = '';
            let arr = this.selectFour.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectFour = str.substr(0,str.length-1);
          }
        }
        if(this.selectFive=='建设模式'){
          selectFive = '全部';
        }else{
          if(this.selectFive.indexOf(',')==-1){
            selectFive = "'" + this.selectFive + "'";
          }else{
            let str = '';
            let arr = this.selectFive.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectFive = str.substr(0,str.length-1);
          }
        }
        if(this.selectSix=='集团名称'){
          selectSix = '全部';
        }else{
          if(this.selectSix.indexOf(',')==-1){
            selectSix = "'" + this.selectSix + "'";
          }else{
            let str = '';
            let arr = this.selectSix.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectSix = str.substr(0,str.length-1);
          }
        }

        let obj = {
            "page": this.page,
            "cols": this.cols,
            "region":selectOne,
            "district_name":selectTwo,
            "node_type":selectThree,
            "node_detail_type":selectFour,
            "mode":selectFive,
            "group_name":selectSix
        }
        getQueryTraceNode(obj)
        .then(res=>{
          let BarName = [];
          let BarValue = [];
          let one = 0;
          let two = 0;
          this.type1 = 0;
          this.type2 = 0;
          this.type3 = 0;
          this.type4 = 0;
          this.type5 = 0;
          this.type6 = 0;
          this.type7 = 0;
          this.type8 = 0;
          this.Dataloading = false;
          document.body.style.overflow = '' // 出现滚动条
          document.removeEventListener('touchmove', preD, {passive: false})
          // console.log(res)
          this.node_count = this.ormat_number(res.data.node_count);
          this.business_count = this.ormat_number(res.data.business_count);
          res.data.node_detail_type_count.forEach(ele=>{
           if(ele.node_detail_type=='屠宰企业'){
             this.type1 = ele.node_count;
           }else if(ele.node_detail_type=='批发市场'){
             this.type2 = ele.node_count;
           }else if(ele.node_detail_type=='分割肉企业'){
             this.type3 = ele.node_count;
           }else if(ele.node_detail_type=='包装菜企业'){
             this.type4 = ele.node_count;
           }else if(ele.node_detail_type=='菜市场'){
             this.type5 = ele.node_count;
           }else if(ele.node_detail_type=='直营直供门店'){
             this.type6 = ele.node_count;
           }else if(ele.node_detail_type=='超市门店'){
             one = ele.node_count;
           }else if(ele.node_detail_type=='生鲜超市'){
             two = ele.node_count;
           }else if(ele.node_detail_type=='团体消费门店'){
             this.type8 = this.ormat_number(ele.node_count);
           }
           this.type7 = this.ormat_number(one + two);
         })
          res.data.nodeTypeList.forEach(ele=>{
            BarName.push(ele.node_type);
            let obj = {
              value:ele.node_type_count,
              name:ele.node_type
            }
            BarValue.push(obj);
          })
          // this.node_list = this.node_list.concat(res.data.node_list);
          // this.node_list = res.data.node_list;
          // this.addPoints(res.data.node_list);
          this.TypeFun(BarName,BarValue);
          let lineName = [];
          let lineValue = [];
          let mapList = [
                  { name: '昌平区', value: 0, lng: 116.237832, lat: 40.226854 },
                  { name: '朝阳区', value: 0, lng: 116.449767, lat: 39.927254 },
                  { name: '大兴区', value: 0, lng: 116.348053, lat: 39.732833 },
                  { name: '东城区', value: 0, lng: 116.42272, lat: 39.934579 },
                  { name: '房山区', value: 0, lng: 116.149892, lat: 39.755039 },
                  { name: '丰台区', value: 0, lng: 116.293105, lat: 39.865042 },
                  { name: '海淀区', value: 0, lng: 116.304872, lat: 39.96553 },
                  { name: '怀柔区', value: 0, lng: 116.63853, lat: 40.322563 },
                  { name: '门头沟区', value: 0, lng: 116.108179, lat: 39.94648 },
                  { name: '密云区', value: 0, lng: 116.849551, lat: 40.382999 },
                  { name: '平谷区', value: 0, lng: 117.128025, lat: 40.147115 },
                  { name: '石景山区', value: 0, lng: 116.229612, lat: 39.912017 },
                  { name: '顺义区', value: 0, lng: 116.663242, lat: 40.1362 },
                  { name: '通州区', value: 0, lng: 116.662928, lat: 39.917001 },
                  { name: '西城区', value: 0, lng: 116.372397, lat: 39.918561 },
                  { name: '延庆区', value: 0, lng: 115.981186, lat: 40.462706 },
                ]
          res.data.node_area.forEach(ele=>{
            if(ele.district_name!='北京市' && ele.district_name!='上海市'){
              lineName.push(ele.district_name);
              lineValue.push(ele.node_count);
              mapList.forEach(val=>{
                if(val.name == ele.district_name){
                  val.value = ele.node_count;
                }
              })
            }
          })
          this.regionFun(lineName,lineValue);
          this.beijingFun(mapList);
           let list = res.data.node_x_y_list;
          // for(var i=0; i<list.length;i++){
          //   // 创建point, 将x,y值传入
          //   if(list[i].x_coordinate && list[i].y_coordinate){
          //     let pointNumber = new BMap.Point(list[i].x_coordinate, list[i].y_coordinate)
          //     // 创建信息窗口对象
          //     let html = '<div style="background-color: rgba(255,255,255,0.5);padding: 10px 15px;font-size: 14px;color: #333;">'+
          //     '<p>节点名称：'+list[i].node_name+'</p>'+
          //     '<p>地址：'+list[i].addr+'</p>'+
          //     '<p>归属区县：'+list[i].district_name+'</p>'+
          //     '</div>';
          //     let infoWindow = new BMap.InfoWindow("World", {
          //       enableMessage : false,
          //       width: 300,     // 信息窗口宽度
          //       height: 80,     // 信息窗口高度
          //       title:   html// 信息窗口标题
          //     });
          //     // 将data中的name加入地图中
          //     var label = new BMap.Label(list[i].node_name, {
          //       offset: new BMap.Size(25, 5)
          //     });
          //     let district_name = list[i].district_name
          //     this.markerFun(pointNumber, infoWindow, label, district_name)
          //   }
          // }
          this.markerFun1(list);
        })
        .catch(res=>{
          console.log(res);
        })
      },
      getQueryTraceNodeFun1(){
        let selectOne = '';
        let selectTwo = '';
        let selectThree = '';
        let selectFour = '';
        let selectFive= '';
        let selectSix = '';
        if(this.selectOne=='所属大区'){
          selectOne = '全部';
        }else{
          selectOne = this.selectOne;
        }
        if(this.selectTwo=='归属区县'){
          selectTwo = '全部';
        }else{
          if(this.selectTwo.indexOf(',')==-1){
            selectTwo = "'" + this.selectTwo + "'";
          }else{
            let str = '';
            let arr = this.selectTwo.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectTwo = str.substr(0,str.length-1);
          }
        }
        if(this.selectThree=='节点类型'){
          selectThree = '全部';
        }else{
          if(this.selectThree.indexOf(',')==-1){
            selectThree = "'" + this.selectThree + "'";
          }else{
            let str = '';
            let arr = this.selectThree.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectThree = str.substr(0,str.length-1);
          }
        }
        if(this.selectFour=='节点详细类型'){
          selectFour = '全部';
        }else{
          if(this.selectFour.indexOf(',')==-1){
             selectFour = "'" + this.selectFour + "'";
          }else{
            let str = '';
            let arr = this.selectFour.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectFour = str.substr(0,str.length-1);
          }
        }
        if(this.selectFive=='建设模式'){
          selectFive = '全部';
        }else{
          if(this.selectFive.indexOf(',')==-1){
            selectFive = "'" + this.selectFive + "'";
          }else{
            let str = '';
            let arr = this.selectFive.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectFive = str.substr(0,str.length-1);
          }
        }
        if(this.selectSix=='集团名称'){
          selectSix = '全部';
        }else{
          if(this.selectSix.indexOf(',')==-1){
            selectSix = "'" + this.selectSix + "'";
          }else{
            let str = '';
            let arr = this.selectSix.split(',');
            arr.forEach(ele=>{
              str += "'" + ele + "',";
            })
            selectSix = str.substr(0,str.length-1);
          }
        }
        let obj = {
            "page": this.page1,
            "cols": this.cols,
            "region":selectOne,
            "district_name":selectTwo,
            "node_type":selectThree,
            "node_detail_type":selectFour,
            "mode":selectFive,
            "group_name":selectSix
        }
        getQueryTraceNode(obj)
        .then(res=>{
          this.node_count1 = res.data.node_count;
          this.node_list = this.node_list.concat(res.data.node_list);
        })
        .catch(res=>{
          console.log(res);
        })
      },
      TypeFun(BarName,BarValue){
          let mychart = this.$echarts.init(document.getElementById('echartsOne'))
            // 监听屏幕变化自动缩放图表
            window.addEventListener('resize', function () {
              mychart.resize()
            })
            let option = {
              title: {
                  text: '主体备案-按类型',
                  subtext: '',
                  top: 15,
                  left: 'center',
                  textStyle:{
                  	fontSize:18
                  }
              },
              tooltip: {
                  trigger: 'item',
                  formatter: '{b} : {c} ({d}%)'
                  // formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                  // orient: 'vertical',
                  // top: 'middle',
                  bottom: 10,
                  left: 'center',
                  data: BarName
              },

              color : [ '#B7D62D', '#8AC98B','#8D9E69', 'yellow', 'green'],
              series: [
                  {
                      type: 'pie',
                      radius: '65%',
                      center: ['50%', '50%'],
                      selectedMode: 'single',
                      data: BarValue,
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
            };
            mychart.setOption(option);
        },
        regionFun(lineName,lineValue){
            let mychart = this.$echarts.init(document.getElementById('echartsTwo'))
              // 监听屏幕变化自动缩放图表
              window.addEventListener('resize', function () {
                mychart.resize()
              })
              mychart.setOption({
                	title: {
                		text: '主体备案-按地区',
                		subtext: '',
                		left: 'center',
                		top:15,
                		textStyle:{
                			fontSize:18
                		}
                	},
                  dataZoom : {//实现缩放功能
                      show : true,
                      realtime : true,
                      start : 0,
                      end : 70
                  },
                	tooltip: {
                		trigger: 'axis',
                	},
                	xAxis: {
                		type: 'category',
                		data: lineName
                	},
                	yAxis: {
                		type: 'value',
                		splitLine:{
                		　　　show:false
                		}
                	},
                	series: [{
                		data: lineValue,
                		type: 'bar',
                		itemStyle:{
                		  normal:{
                		    // color:'#4F81BD',
                        color: function(params) {
                          // 给出颜色组
                          var colorList = ['#3FB27E','#9BCC66','#F35352','#F7CB4A','#F88D48','#69D4DB','#5182E4','#9BCC66','#5186D2','#D42D6B','#CE62D6','#F7CB6A','#51B4F1','#D85ED3','#5156B8','#8954D4'];
                          return colorList[params.dataIndex]
                        },
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
                	}]
              })
          },
        beijingFun(mapList){
          let mychart = this.$echarts.init(document.getElementById('echartsBJ'))
                // 监听屏幕变化自动缩放图表
                window.addEventListener('resize', function () {
                  mychart.resize()
                })
                // 绘制图表
                mychart.setOption({
                  // 图表主标题
                  title: {
                    text: '主体备案-按地区',
                    // 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
                    top: 15,
                    // 值: 'left', 'center', 'right' 同上
                    left: 'center',
                    textStyle: {
                      fontSize: 18,
                      // fontWeight: 650,
                      // color: '#333'
                    }
                  },
                  // 提示框组件
                  tooltip: {
                    // 触发类型, 数据项图形触发
                    trigger: 'item',
                    // 使用函数模板，传入的数据值 ——> value: number | Array
                    formatter: function (val) {
                      return val.data.name + ': ' + val.data.value
                    }
                  },

                  // 视觉映射组件
                  visualMap: {
                    // continuous 类型为连续型
                    type: 'continuous',
                    show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
                    // 指定 visualMapContinuous 组件的允许的最小/大值 min/max 必须用户指定
                    min: 0,
                    // min,max 形成了视觉映射的定义域
                    max: 400,
                    // 文本样式
                    textStyle: {
                      // 字体大小
                      fontSize: 15,
                      // 字体颜色
                      color: '#fff'
                    },
                    // 拖拽时，是否实时更新
                    realtime: false,
                    // 是否显示拖拽用的手柄
                    calculable: true,
                    // 定义在选中范围中的视觉元素
                    inRange: {
                      // 图元的颜色
                      color: ['#9fb5ea', '#e6ac53', '#74e2ca', '#85daef', '#9feaa5', '#5475f5'],
                      // color:['#3FB27E','#9BCC66','#F35352','#F7CB4A','#F88D48','#69D4DB','#5182E4','#9BCC66','#5186D2','#D42D6B','#CE62D6','#F7CB6A','#51B4F1','#D85ED3','#5156B8','#8954D4']
                    }
                  },
                  series: [
                    {
                    	// 类型
                      type: 'map',
                      // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
                      map: '北京',
                      // 地图类型
                      zoom: 1, //当前视角的缩放比例
                      roam: true, //是否开启平游或缩放
                      //如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
                      scaleLimit: { //滚轮缩放的极限控制
                        min: 1,
                        max: 2
                      },
                      mapType: 'province',
                      // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
                      top: 60,
                      // 图形上的文本标签
                      label: {
                        show: false // 是否显示对应地名
                      },
                      // 地图区域的多边形 图形样式
                      itemStyle: {
                     	  // 地图区域的颜色 如果设置了visualMap, 这个属性将不起作用
                        areaColor: '#E6E8EA',
                        // 描边线宽 为 0 时无描边
                        borderWidth: 0.5,
                        // 图形的描边颜色 支持的颜色格式同 color
                        borderColor: '#000',
                        // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                        borderType: 'solid'
                      },
                      // 高亮状态
                      emphasis: {
                        // 文本标签
                        label: {
                          // 是否显示标签
                          show: true,
                          // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
                          color: '#fff'
                        },
                        // 图形样式
                        itemStyle: {
                          // 地图区域的颜色
                          areaColor: '#FF6347'
                        }
                      },
                      // 地图系列中的数据内容数组，数组项可以为单个数值
                      data: mapList
                    }
                  ]
                })
        },
        handler({BMap,map}){
          this.map.center.lng = 116.424966;
          this.map.center.lat = 39.907408;
          this.map.zoom = 11;
        },
        addPoints (node_list) {
              const points = [];
              for (var i = 0; i < node_list.length-1; i++) {
                if(node_list[i].district_name == '房山区'){
                  // node_list[i].color = '#3FB27E';
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:chaoyang}
                  points.push(position)
                }
                else if(node_list[i].district_name=='朝阳区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:chaoyang}
                  points.push(position)
                }else if(node_list[i].district_name=='西城区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:xicheng}
                  points.push(position)
                }else if(node_list[i].district_name=='东城区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:dongcheng}
                  points.push(position)
                }else if(node_list[i].district_name=='海定区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:haiding}
                  points.push(position)
                }else if(node_list[i].district_name=='昌平区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:changping}
                  points.push(position)
                }else if(node_list[i].district_name=='大兴区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:daxing}
                  points.push(position)
                }else if(node_list[i].district_name=='平谷区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:pinggu}
                  points.push(position)
                }else if(node_list[i].district_name=='密云区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:miyun}
                  points.push(position)
                }else if(node_list[i].district_name=='门头沟'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:mentougou}
                  points.push(position)
                }else if(node_list[i].district_name=='通州区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:tongzhou}
                  points.push(position)
                }else if(node_list[i].district_name=='石景山区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:shijingshan}
                  points.push(position)
                }else if(node_list[i].district_name=='怀柔区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:huairou}
                  points.push(position)
                }else if(node_list[i].district_name=='丰台区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:fengtai}
                  points.push(position)
                }else if(node_list[i].district_name=='顺义区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:shunyi}
                  points.push(position)
                }else if(node_list[i].district_name=='延庆区'){
                  const position = {lng: node_list[i].x_coordinate, lat: node_list[i].y_coordinate,icon:yanqing}
                  points.push(position)
                }

              }
              this.postionMap = points;
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
        .table{
            margin-top: 10px;
            /* padding: 10px; */
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
                .sub-item1{
                  width: 36%;
                  border-left: none;
                  .num{
                    color: #42BC85;
                  }
                }
              }
            }
            .myEcharts{
              overflow: hidden;
              /* margin-top: 30px; */
              border-top: 10px solid #F2F2F2;
              .echarts-item{
                width: 50%;
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
          font-size: 12px !important;
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
                          display: flex;
                          align-items: center;
                          .mytext{
                            width: 80%;
                            display: inline-block;
                          }
                          .myadd{
                            color: #2EA7E0;
                            cursor: pointer;
                            float: right;
                            /* margin-right: 10px; */
                          }
                          .myadd:hover{
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
.enterprise{
  .active{
    color:#2EA7E0;
  }
}
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
.el-dropdown-menu{
  height: 240px;
  overflow: auto;
  width: 170px;
}
.mytables .el-table .cell{
  font-size: 12px;
}
.amap-logo,.amap-copyright {display:none !important;}
</style>
