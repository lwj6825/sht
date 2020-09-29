<template>
  <div class="content content-table">
    <div v-if="show" class="myDiv" v-loading="Dataloading"></div>
    <div>
      <div class="searchs" ref="searchs">
          <el-form ref="form" :inline="true" :model="form" label-width="100px">
            <div class="select">
              <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                <span class="el-dropdown-link">
                  {{selectThree}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{value:item.name,flag:2,index:item.index}" :class="dataIndex == item.index ? 'active':''" v-for="(item,index) in dataList" :key="index">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="select">
              <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                <span class="el-dropdown-link">
                  {{selectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{value:'全部',flag:0,index:0}" :class="regionIndex == 0 ? 'active':''">全部</el-dropdown-item>
                  <el-dropdown-item :command="{value:item.name,flag:0,index:item.index}" :class="regionIndex == item.index ? 'active':''" v-for="(item,index) in regionList" :key="index">{{item.name}}</el-dropdown-item>
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
                  <el-dropdown-item :command="{value:'全部',flag:1,index:0}" :class="nodeDetailTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
                  <el-dropdown-item :command="{value:item.node_detail_type,flag:1,index:index1 + 1}" :class="nodeDetailTypeIndex == index1 +1 ? 'active':''" v-for="(item,index1) in nodeDetailTypeList" :key="index1">{{item.node_detail_type}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="choose" @click="handlerChoose(1)">多选</span>
            </div>
          </el-form>
      </div>
      <div class="table">
        <div class="subject" style="border-bottom: 3px solid #E8EBED;">
          <div class="subAll" style="border-right: 3px solid #E8EBED;" v-loading="Dataloading1">
            <div class="sub-item" style="border-bottom: 3px solid #E8EBED;">
               <p class="myp">商户总数</p>
               <p class="sum">{{biz_sum}}</p>
               <p class="online"><span>今日商户在线数     </span>{{biz_online}}</p>
            </div>
            <div class="sub-item1">
             <p class="myp">今日商户在线率</p>
             <p class="proportion">{{biz_proportion}}</p>
            </div>
          </div>
          <div class="subAll1" v-loading="Dataloading2">
             <div class="lineShow" style="height: 392px;line-height: 392px;color: #999;font-size: 14px;text-align: center;" v-if="lineShow">暂无数据</div>
           <div id="echartsOne_report" class="myecharts" style="height: 350px;width: 958px;"></div>
          </div>
        </div>
        <div class="mydraw" style="border-bottom: 3px solid #E8EBED;">
         <div class="draw-item" style="border-right: 3px solid #E8EBED;" v-loading="Dataloading3">
           <div class="draw-title">
            <span>商户在线监控</span>
           </div>
           <div class="draw-table">
            <el-table :data="biz_online_list" :row-style="rowStyle" :cell-style="cellStyle" class="mytable" v-el-table-infinite-scroll="handleload" :header-cell-style="rowClass" :height="350" >
              <el-table-column width="143px" prop="node_detail_type" label="节点详细分类"></el-table-column>
              <el-table-column  width="90px" prop="online_count"  label="商户在线数"></el-table-column>
              <el-table-column prop="total_count" label="商户基数"></el-table-column>
              <el-table-column width="110px" prop="proportion" label="商户在线率"></el-table-column>
              <el-table-column  width="165px" prop="online_sum" label="商户上报数量总量"></el-table-column>
              <el-table-column width="185px" prop="avg_num" label="平均数量"></el-table-column>
            </el-table>
           </div>
         </div>
         <div class="draw-item1">
          <div id="echartsTwo_report" class="myecharts1" style="height: 400px;" v-loading="Dataloading3"></div>
         </div>
        </div>
        <div class="mytable" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading4">
          <div class="mytable-title">
            <span>商户在线监控</span>
          </div>
          <div class="my-draw-table">
            <el-table :data="node_type_monitor_list" border :cell-style="cellStyle1" class="mytable" v-el-table-infinite-scroll="handleload" :header-cell-style="rowClass" :height="494" >
               <el-table-column width="128px" prop="node_detail_type" label="节点详细分类"></el-table-column>
               <el-table-column width="238px" prop="node_name" label="节点名称">
                   <template slot-scope="scope">
                    <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                    </template>
                 </el-table-column>
             <el-table-column  width="92px" prop="total_count"  label="商户基数">
              <template slot-scope="scope">
                 <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.total_count}}</div>
              </template>
             </el-table-column>
             <el-table-column  width="92px" prop="online_count"  label="商户在线数">
              <template slot-scope="scope">
                 <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.online_count}}</div>
              </template>
             </el-table-column>
             <el-table-column width="104px" prop="proportion" label="商户在线率">
               <template slot-scope="scope">
                 <div class="item" v-for="(item, index) in scope.row.node" :key="index"
                :class="parseFloat(item.proportion) < 60 ? 'cellClass' : ''">{{item.proportion}}</div>
               </template>
             </el-table-column>
             <el-table-column width="163px" prop="online_sum" label="商户上报数据总量">
              <template slot-scope="scope">
                <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.online_sum}}</div>
              </template>
             </el-table-column>
             <el-table-column  width="381px" prop="avg_num" label="平均数据量">
               <template slot-scope="scope">
                 <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.avg_num}}</div>
               </template>
             </el-table-column>
           </el-table>
          </div>

        </div>
        <div class="mytable1" v-loading="Dataloading5">
          <div class="mytable1-title">
            <span>商户未连续上报监控</span>
          </div>
          <div class="my-draw-table1">
            <el-table :data="biz_not_reported" border class="mytable" v-el-table-infinite-scroll="handleload" :header-cell-style="rowClass" :height="550" >
                <el-table-column width="77px" prop="region" label="所属大区"></el-table-column>
                <el-table-column  width="116px" prop="node_detail_type"  label="节点详细分类">
                  <!-- <template slot-scope="scope">
                      <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                            {{item2.node_detail_type}}
                      </div>
                    </template> -->
                </el-table-column>
                <el-table-column width="94px" prop="node_id" label="节点编码">
                    <!-- <template slot-scope="scope">
                        <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                              {{item2.node_id}}
                        </div>
                      </template> -->
                </el-table-column>
                <el-table-column width="169px" prop="node_name" label="节点名称">
                  <!-- <template slot-scope="scope">
                      <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                            {{item2.node_name}}
                      </div>
                    </template> -->
                </el-table-column>
                <el-table-column  width="128px" prop="biz_id" label="商户编码">
                   <!-- <template slot-scope="scope">
                       <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                             {{item2.biz_id}}
                       </div>
                     </template> -->
                </el-table-column>
                <el-table-column width="144px" prop="biz_name" label="商户名称">
                  <!-- <template slot-scope="scope">
                      <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                                                        {{item2.biz_name}}
                      </div>
                  </template> -->
                </el-table-column>
                <el-table-column width="124px" prop="date" label="最后上报日期">
                  <!-- <template slot-scope="scope">
                      <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                                                        {{item2.date}}
                      </div>
                  </template> -->
                </el-table-column>
                <el-table-column width="367px" prop="days_count" label="连续未上报天数">
                    <!-- <template slot-scope="scope">
                      <div class="item" v-for="(item, index) in scope.row.children" :key="index">
                            {{item2.days_count}}
                      </div>
                    </template> -->
                </el-table-column>
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

  </div>
</template>

<script>

 import {getQueryBizType,getQueryTodayBiz,getQueryBizOnlineMonitor,getQueryBizOnlineNodeTypeMonitor,getQueryBizOnlineNodeTypeMonitorList,getQueryBizNotReportedMonitor} from '../../js/platform/platform.js';
var preD = function (e) {
     e.preventDefault()
}
  export default {
    name:"dataControl",
    data() {
       return {
         show:true,
         selectOne:'归属大区',
         selectTwo:'节点详细分类',
         selectThree:'事件日期',
         regionIndex:0,
         mymask:false,
         mydata:false,
         multiData:[],
         AddDataOne:[],
         AddDataTwo:[],
         AddData:[],
         AddName:[],
         Index:'',
         lineShow:false,
         Dataloading:false,
         Dataloading1:false,
         Dataloading2:false,
         Dataloading3:false,
         Dataloading4:false,
         Dataloading5:false,
         nodeDetailTypeList : [],
         nodeDetailTypeIndex : 0,
         endDate:'',
         startDate:'',
         node_detail_type:'',
         online_count:'',
         online_sum:'',
         proportion:'',
         total_count:'',
         startDate:'',
         endDate:'',
         node_name:'',
         avg_num:'',
         regionList:[
           {
             name:'东区',
             index: '东区'
           },
           {
             name:'北区',
             index: '北区'
           },
           {
             name:'南区',
             index: '南区'
           }
           ],
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
               name:'最一年',
               index: '最一年'
             },
             {
               name:'自定义时间',
               index: '自定义时间'
             }
           ],
           dataIndex : '全部日期',
           biz_sum:'',
           biz_online:'',
           biz_proportion:'',
           in_date:'',
           biz_online_list:[],
           node_type_monitor_list:[],
           biz_not_reported:[],
           form:{
           },
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
    //初始化后加载
    mounted(){
        this.getQueryBizTypeFun();
        this.getQueryTodayBizFun();
        this.getQueryBizOnlineMonitorFun();
        this.getQueryBizNotReportedMonitorFun()
        // this.getQueryBizOnlineMonitorFun1();
        this.getQueryBizOnlineNodeTypeMonitorFun();
        this.getQueryBizOnlineNodeTypeMonitorListFun();
    },
    //函数
    methods:{
      rowStyle({row, rowIndex}){
        if(row.node_detail_type == '列总计'){
          return {
              background: '#f2f2f2',
          }
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(column.label == '商户在线率'){
          if(parseFloat(row.proportion) < 60){
            return {
                background: 'red',
                color: '#fff'
            }
          }
        }
      },
      cellStyle1({row, column, rowIndex, columnIndex}){

        if(column.label == '商户在线率'){
           row.node.forEach(ele=>{
               console.log(parseFloat(ele.proportion))
               if(parseFloat(ele.proportion) < 60){
                 return {
                     background: 'red',
                     color: '#fff'
                 }
               }

           })

        }
      },
      handleload() {

      },
      rowClass({ row, rowIndex}) {
          return {
              background: '#f2f2f2',
              color: '#333'
          }
      },
        drawMap1(){
         // this.getQueryTodayBizFun();
          this.getQueryBizOnlineMonitorFun();
          this.getQueryBizOnlineNodeTypeMonitorFun();
          this.getQueryBizOnlineNodeTypeMonitorListFun();
          this.getQueryBizNotReportedMonitorFun()
        },
        getQueryBizTypeFun(){
          this.Dataloading = true;
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
          getQueryBizType()
           .then( res => {
             res.data.list.forEach(ele=>{
               this.nodeDetailTypeList.push(ele);
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
        getQueryTodayBizFun(){
          this.Dataloading1 = true;
          this.biz_sum = 0;
          this.biz_online = 0;
          this.biz_proportion = 0;
          getQueryTodayBiz()
          .then( res => {

              this.biz_sum = res.data.map.biz_total;
              this.biz_online = res.data.map.biz_online;
              this.biz_proportion = res.data.map.proportion;
               this.Dataloading1 = false;
            })
            .catch(error => {
                console.log(error)
            })

        },
        getQueryBizOnlineMonitorFun(){
          this.Dataloading2 = true;
          let selectOne = '';
          let selectTwo = '';
          let selectThree = '';
          let startDate = '';
          let endDate = '';
          if(this.selectThree == '事件日期'){
             selectThree = 'month';
          }else if(this.selectThree == '今天'){
            selectThree = 'day';
          }else if(this.selectThree == '昨天'){
            selectThree = 'yesDay';
          }else if(this.selectThree == '最近7天'){
            selectThree = 'week';
          }else if(this.selectThree == '最近30天'){
            selectThree = 'month';
          }else if(this.selectThree == '最近90天'){
            selectThree = 'three_month';
          }
          else if(this.selectThree == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.selectThree == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.selectOne=='归属大区'){
            selectOne = '全部';
          }else{
          selectOne = this.selectOne;
          }
          if(this.selectTwo=='节点详细分类'){
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
          let obj = {
              "type": selectThree,
              "startDate": startDate,
              "endDate":endDate,
              "region":selectOne,
              "node_detail_type":selectTwo,

          }

          let lineName = [];
          let lineValue = [];
          let lineChart = [];
          getQueryBizOnlineMonitor(obj)
          .then(res=>{
            res.data.list.forEach(ele=>{
              lineName.push(ele.date);
              lineValue.push(Number(ele.onlinecount));
              lineChart.push(ele.proportion);
            })
             if(lineName.length>0){
                this.lineShow = false;
                this.getQueryBizOnlineMonitorFun1(lineName,lineValue,lineChart);
             }else{
                this.Dispose('echartsOne_report')
                this.lineShow = true;
             }
            
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
        getQueryBizOnlineNodeTypeMonitorFun(){
          this.Dataloading3 = true;
          let selectOne = '';
          let selectTwo = '';
          let selectThree = '';
          let startDate = '';
          let endDate = '';
          if(this.selectThree == '事件日期'){
             selectThree = 'month';
          }else if(this.selectThree == '今天'){
            selectThree = 'day';
          }else if(this.selectThree == '昨天'){
            selectThree = 'yesDay';
          }else if(this.selectThree == '最近7天'){
            selectThree = 'week';
          }else if(this.selectThree == '最近30天'){
            selectThree = 'month';
          }else if(this.selectThree == '最近90天'){
            selectThree = 'three_month';
          }
          else if(this.selectThree == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.selectThree == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.selectOne=='归属大区'){
            selectOne = '全部';
          }else{
          selectOne = this.selectOne;
          }
          if(this.selectTwo=='节点详细分类'){
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
          let obj = {
              "type": selectThree,
              "startDate": startDate,
              "endDate":endDate,
              "region":selectOne,
              "node_detail_type":selectTwo,

          }


          getQueryBizOnlineNodeTypeMonitor(obj)
          .then(res=>{
            this.biz_online_list = []
            this.biz_online_list = res.data.list
            let data = res.data.sumList

            let lineName = [];
            let lineValue = [];
            res.data.list.forEach(ele=>{

              lineName.push(ele.node_detail_type);
              lineValue.push(Number(ele.proportion.split('%')[0]));

            })

             this.getQueryBizOnlineNodeTypeMonitor1(lineName,lineValue);
            this.biz_online_list.push({
              "online_count": data[0].sum_online,
              "online_sum": data[0].sum_total,
              "node_detail_type": "列总计",
              "proportion": data[0].sum_proportion,
              "total_count":  data[0].sum_num,
              "avg_num": data[0].avg_num,
            })
            this.Dataloading3 = false;
          })
          .catch(res=>{
            console.log(res);
          })
        },
        getQueryBizOnlineNodeTypeMonitorListFun(){
           this.Dataloading4 = true;
          let selectOne = '';
          let selectTwo = '';
          let selectThree = '';
          let startDate = '';
          let endDate = '';
          if(this.selectThree == '事件日期'){
             selectThree = 'month';
          }else if(this.selectThree == '今天'){
            selectThree = 'day';
          }else if(this.selectThree == '昨天'){
            selectThree = 'yesDay';
          }else if(this.selectThree == '最近7天'){
            selectThree = 'week';
          }else if(this.selectThree == '最近30天'){
            selectThree = 'month';
          }else if(this.selectThree == '最近90天'){
            selectThree = 'three_month';
          }
          else if(this.selectThree == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.selectThree == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.selectOne=='归属大区'){
            selectOne = '全部';
          }else{
          selectOne = this.selectOne;
          }
          if(this.selectTwo=='节点详细分类'){
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
          let obj = {
              "type": selectThree,
              "startDate": startDate,
              "endDate":endDate,
              "region":selectOne,
              "node_detail_type":selectTwo,

          }


          getQueryBizOnlineNodeTypeMonitorList(obj)
          .then( res => {
            this.node_type_monitor_list = res.data.list;
            this.Dataloading4 = false;
          })
          .catch(error => {
              console.log(error)
          })
        },
        getQueryBizNotReportedMonitorFun(){
          this.Dataloading5 = true;
          let selectOne = '';
          let selectTwo = '';
          let selectThree = '';
          let startDate = '';
          let endDate = '';
          if(this.selectThree == '事件日期'){
             selectThree = 'month';
          }else if(this.selectThree == '今天'){
            selectThree = 'day';
          }else if(this.selectThree == '昨天'){
            selectThree = 'yesDay';
          }else if(this.selectThree == '最近7天'){
            selectThree = 'week';
          }else if(this.selectThree == '最近30天'){
            selectThree = 'month';
          }else if(this.selectThree == '最近90天'){
            selectThree = 'three_month';
          }
          else if(this.selectThree == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.selectThree == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.selectOne=='归属大区'){
            selectOne = '全部';
          }else{
          selectOne = this.selectOne;
          }
          if(this.selectTwo=='节点详细分类'){
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
          let obj = {
              "type": selectThree,
              "startDate": startDate,
              "endDate":endDate,
              "region":selectOne,
              "node_detail_type":selectTwo,

          }


          getQueryBizNotReportedMonitor(obj)
          .then( res => {
            let arr = []
            let list = res.data.list
            list.forEach((val1, ele1) => {
                val1.node_type.forEach((val2, ele2) => {
                    val2.nodeDetailType.forEach((val3, ele3) => {
                        val3.biz.forEach((val4, ele4) => {
                          if(ele4 == 0 && ele2 == 0){
                            val4.region = val1.region
                          }else{
                            val4.region = ''
                          }
                          if(ele4 == 0){
                            val4.region = val1.region
                            val4.node_detail_type = val2.node_detail_type
                            val4.node_name = val3.node_name
                            val4.node_id = val3.node_id
                          }else{
                            val4.node_detail_type = ''
                            val4.node_name = ''
                            val4.node_id = ''
                            val4.region = ''
                          }
                          arr.push(val4)
                        })
                    })
                })
            })
            this.biz_not_reported = arr;
            this.Dataloading5 = false;
          })
          .catch(error => {
              console.log(error)
          })
        },
        getQueryBizOnlineNodeTypeMonitor1(lineName,lineValue){
           let echartsTwo_report = this.$echarts.init(document.getElementById('echartsTwo_report'))
           window.addEventListener('resize', function () {
             echartsTwo_report.resize()
           })
         echartsTwo_report.setOption({
         //
                         	title: {
                         		text: '商户在线监控',
                         		subtext: '',
                         		left: 'left',
                         		top:32,
                             left:25,
                         		 textStyle:{
                         			fontSize:14

                         		}

                         	},
                       grid: [{
                               top: 100,
                               left: 110

                           }],
                           // dataZoom : {//实现缩放功能
                           //     show : true,
                           //     realtime : true,
                           //     start : 0,
                           //     end : 70
                           // },
                         	tooltip: {
                         		trigger: 'axis',
                            formatter: '{b}<br/>{a}:{c}%'
                         	},
                           // legend: {
                           //      data: ['电子秤在线数','电子秤在线率']
                           //        },
                         	xAxis: {

                            type: 'value',
                            splitLine:{
                            　　　　show:false
                            　　 }

                         	},
                         	yAxis: {
                         	        type: 'category',
                         	        data:  lineName,
                                  splitLine:{
                                  　　　　show:false
                                  　　 }
                         	    },
                         	series: [
                             {
                         		data: lineValue,
                             name: '电子秤在线数',
                         		type: 'bar',
                         		 itemStyle:{
                         		   normal:{
                         		      color:'#55aaff',

                         		   }
                         		 }

                         	}]


                       })

        },
        getQueryBizOnlineMonitorFun1(lineName,lineValue,lineChart){

            let echartsOne_report = this.$echarts.init(document.getElementById('echartsOne_report'))
              // 监听屏幕变化自动缩放图表
              window.addEventListener('resize', function () {
                echartsOne_report.resize()
              })

              echartsOne_report.setOption({
//
                	title: {
                		text: '商户在线监控',
                		subtext: '',
                		left: 'left',
                		top:23,
                    left:25,
                		textStyle:{
                			fontSize:14

                		}

                	},
              grid: [{
                      top: 100,
                      left: 110

                  }],
                  // dataZoom : {//实现缩放功能
                  //     show : true,
                  //     realtime : true,
                  //     start : 0,
                  //     end : 70
                  // },
                	tooltip: {
                		trigger: 'axis',
                    //formatter: '{b}<br/>{a}<br/>{c}%'
                	},
                  // legend: {
                  //      data: ['电子秤在线数','电子秤在线率']
                  //        },
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
                          name: '电子秤在线数',
                         // nameLocation: 'center'
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
                                },

                         min: 0,
                         max: 2400,
                        interval: 600,
                      },
                      {
                          type: 'value',
                          name: '电子秤在线率',
                         axisLabel: {
                                     formatter: function(value,index){
                                 		return value+'%'
                                 	}
                                 },
                          nameLocation: 'middle',
                             nameGap: 50,
                              axisLine: {show:false},
                              axisTick: {show:false},
                              splitLine:{
                          　　　　show:false
                          　　 }
                      },
                  ],
                	series: [
                    {
                		data: lineValue,
                    name: '电子秤在线数',
                		type: 'bar',
                    label: {
                        show: true,
                        position: 'top'
                    },
                		itemStyle:{
                		  normal:{
                		     color:'#479CE2',

                		  }
                		}
                	},
                  {
                  	data: lineChart,
                  	type: 'line',
                    name: '电子秤在线率',
                    yAxisIndex: 1,
                     label: {
                        show: true,
                        formatter: '{c}%',
                        position: 'top'
                    },
                  	itemStyle:{
                  	  normal:{
                  	     color:'rgb(247, 203, 74)',

                  	  }
                  	}
                  },
                  ]


              })
          },
        handlerCommand(command){
          if(command.flag==0){
            this.regionIndex = command.index;
            this.selectOne = '归属大区';
            if(command.value=='全部'){
              this.selectOne = '归属大区';
            }else{
              this.selectOne = command.value;
            }
          }else if(command.flag==1){
            this.nodeDetailTypeIndex = command.index1;
            this.selectTwo = '节点详细分类';
            if(command.value=='全部'){
              this.selectTwo = '节点详细分类';
            }else{
              this.selectTwo = command.value;
            }
          }else if(command.flag==2){
            this.nodeDetailTypeIndex = command.index1;
            this.selectThree = '事件日期';
            if(command.value=='全部日期'){
              this.selectThree = '事件日期';
            }else{
              this.selectThree = command.value;
            }
            if(command.value=='自定义时间'){
              this.mydata = true;
            }
          }
          if(command.value!='自定义时间'){
            this.drawMap1();
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
             this.AddDataOne.splice(index,1);
           }else if(this.Index==1){
             this.AddDataTwo.splice(index,1);
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
          this.AddName = []
          if(this.Index==0){
            this.AddDataOne = [];
          }else if(this.Index==1){
            this.AddDataTwo = [];
          }
        },
        dataChoose(type){
          this.dataChoose = true;
          if(type==0){

          }
        },
        handlerChoose(type){
          this.Index = type;
          this.mymask = true;
          let arr = [];
          if(type==0){
              this.regionList.forEach(ele=>{
                if(ele.name!='全部'){
                  let obj = {
                    Addshow:false,
                    name:ele.name
                  }
                  arr.push(obj);
                }
              })
              this.multiData = arr;
              this.AddData = this.AddDataOne;
          }else if(type==1){
          this.nodeDetailTypeList.forEach(ele=>{
            if(ele.node_detail_type!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_detail_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataTwo;
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

              }else if(this.Index==1){
                this.selectTwo = arr[0];
                this.getQueryBizTypeFun();
              }
            }else{
              if(this.Index==0){
                this.selectOne = arr. join(',');

              }else if(this.Index==1){
                this.selectTwo = arr. join(',');
                this.getQueryBizTypeFun();
              }
            }
          }else{
            if(this.Index==0){
              this.selectOne = '归属大区';
              this.AddDataOne = [];
            }else if(this.Index==1){
              this.selectTwo = '节点详细分类';
              this.AddDataTwo = [];
              this.nodeDetailTypeList = [];
              this.getQueryBizTypeFun();
            }
          }
          if(this.Index==0){
            this.AddDataOne = this.AddData;
          }else if(this.Index==1){
            this.AddDataTwo = this.AddData;
          }
          this.handlerClose();
          // this.getQueryTraceNodeFun();
          this.drawMap1();
        },
        allDataAddFun(){

          this.startDate = this.sizeForm.date1
          this.endDate = this.sizeForm.date2
          this.handlerClose1();
          this.drawMap1();
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
     .item{
       width: 100%;
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
       line-height: 30px;
       border-bottom: 1px solid #EBEEF5;
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
     .myDiv{
       height: 800px;
       width: 100%;
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
         height: 392px;
         display: flex;
         .subAll{
           height: 392px;
           width: 220px;
           float: left;
            .sub-item{
              height: 150px;
              width: 220px;
              float: left;
              text-align: center;
              color: rgb(0, 0, 0);
              font-family: "Microsoft YaHei";
              font-weight: normal;
              font-style: normal;
              line-height: 12px;
              font-size: 12px;
              padding-top: 47px;
              .sum{
                color: rgb(0, 0, 0);
                font-family: Avenir;
                font-weight: normal;
                font-style: normal;
                line-height: normal;
                font-size: 31px;
              }
              .online{
                color: rgb(64, 178, 126);
                font-family: "Microsoft YaHei";
                font-weight: normal;
                font-style: normal;
               line-height: normal;
                span{
                  color: rgb(0, 0, 0);
                  font-family: "Microsoft YaHei";
                  font-weight: normal;
                  font-style: normal;
                  line-height: 12px;
                  font-size: 12px;
                }
              }

            }
            .sub-item1{
              height: 192px;
              width: 220px;
             color: rgb(0, 0, 0);
             font-family: "Microsoft YaHei";
             font-weight: normal;
             font-style: normal;
             line-height: 12px;
             font-size: 12px;
             padding-top: 276px;
            text-align: center;
              .proportion{
                color: rgb(64, 178, 126);
                font-size: 31px;
                 font-family: "Microsoft YaHei";
                 font-weight: normal;
                 font-style: normal;
                line-height: normal;
              }
            }
         }
         .subAll1{
            height: 392px;
            width: 1100px;
          }
       }
        .mydraw{
         margin-top: 10px;
         height: 493px;
         width: 1321px;
         .draw-item{
           height: 493px;
           width: 650px;
           float: left;
            .draw-title{
              padding-top: 32px;
              padding-left: 37px;
             font-size: 14px;
             font-weight: 700;
            }
            .draw-table{
                height: 220px;
                width: 579px;
                padding-top: 10px;
                padding-left: 37px;
            }
         }
         .draw-item1{
           height: 493px;
           width: 657px;
           float: left;
         }
       }
       .mytable{
         margin-top: 10px;
         height: 593px;
         width: 1321px;
         .mytable-title{
           height: 33px;
           width: 1321px;
           padding-top: 32px;
           padding-left: 37px;
           font-size: 14px;
           font-weight: 700;
         }
         .my-draw-table{
           height: 516px;
           width: 1219px;
           padding-left: 40px;
         }
       }
       .mytable1{
         margin-top: 10px;
         height: 650px;
         width: 1321px;
         .mytable1-title{
           height: 33px;
           width: 1321px;
           padding-top: 32px;
           padding-left: 37px;
           font-size: 14px;
           font-weight: 700;
         }
         .my-draw-table1{
           height: 600px;
           width: 1219px;
           padding-left: 40px;
         }
       }
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
     .cellClass{
       background: red;
       color: #fff;
     }
   }
</style>
<style lang="less">
  /* .content-table{

    .el-table .cell{
      padding: 0 !important;
    }
  } */
 .content-table{
    .el-tabs{
      margin: 0 50px;
    }
  }
</style>
