<template>
  <div class="content content-table">
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
                  <el-dropdown-item :command="{value:'全部',flag:1,index:0}" :class="areaIndex == 0 ? 'active':''">全部</el-dropdown-item>
                  <el-dropdown-item :command="{value:item.district_name,flag:1,index:index1 + 1}" :class="areaIndex == index1 +1 ? 'active':''" v-for="(item,index1) in areaList" :key="index1">{{item.district_name}}</el-dropdown-item>
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
                  <el-dropdown-item :command="{value:'全部',flag:3,index:0}" :class="groupNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                  <el-dropdown-item :command="{value:item.group_name,flag:3,index:index3 + 1}" :class="groupNameIndex == index3 +1 ? 'active':''" v-for="(item,index3) in groupNameList" :key="index3">{{item.group_name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="choose" @click="handlerChoose(3)">多选</span>
            </div>
          </el-form>
        </div>
        <div class="table">
          <div class="draw-table" v-loading="Dataloading1" style="border-bottom: 5px solid #E8EBED;">
            <!-- <div class="draw-title" >

             </div> -->

               <el-tabs v-model="activeName" @tab-click="handleClick1">
                  <el-tab-pane v-for="(item,type) in nodeDetailTypeList1" :key="type" :label="item.node_detail_type" :name="item.node_detail_type"></el-tab-pane>
                </el-tabs>
                <el-table :data="tz_list" border  class="mytable"  :header-cell-style="rowClass" :height="400" >
                    <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                    <el-table-column   prop="node_name"  label="节点名称">
                       <template slot-scope="scope">
                           <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column   prop="info_type" label="信息类型">
                      <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
                     </template>
                    </el-table-column>
                    <el-table-column  prop="date" label="最后上报日期">
                      <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.date}}</div>
                     </template>
                    </el-table-column>
                    <el-table-column   prop="days" label="连续未上报天数">
                      <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                            <p v-if="item.days == 0"><span :style="{'background': 'green'}" class="ball"></span>{{item.days}}</p>
                            <p v-else-if="0 < item.days && item.days < 4"><span :style="{'background': 'yellow'}" class="ball"></span>{{item.days}}</p>
                            <p v-else-if="item.days > 3"><span class="ball"></span>{{item.days}}</p>
                           </div>
                     </template>
                    </el-table-column>
                    <el-table-column  prop="data_collection_way" label="数据来源">
                      <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.data_collection_way}}</div>
                     </template>
                    </el-table-column>
                    <el-table-column label="操作" width='60'>
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index" v-if="item.data_collection_way == 'FTP上传'">
                              <el-button type="text" size="small" @click="lookFun(item)">查看</el-button>
                            </div>
                         </template>
                    </el-table-column>
                </el-table>


          </div>
          <div class="draw-table" v-loading="Dataloading2" style="border-bottom: 5px solid #E8EBED;">
              <div class="draw-title" >
                   <el-tabs v-model="activeName2" @tab-click="handleClick2">
                      <el-tab-pane v-for="(item,type1) in nodeDetailTypeList2" :key="type1" :label="item.node_detail_type" :name="item.node_detail_type"></el-tab-pane>
                    </el-tabs>
                 </div>
                 <div class="draw-table">
                    <el-table :data="ttxf_list" :cell-style="cellStyle1" border  class="mytable"  :header-cell-style="rowClass" :height="400" >
                        <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                        <el-table-column   prop="node_name"  label="节点名称">
                           <template slot-scope="scope">
                               <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column   prop="info_type" label="信息类型">
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
                         </template>
                        </el-table-column>
                        <el-table-column  prop="date" label="最后上报日期">
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.date}}</div>
                         </template>
                        </el-table-column>
                        <el-table-column   prop="days" label="连续未上报天数">
                          <template slot-scope="scope">
                                <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                  <p v-if="item.days == 0"><span :style="{'background': 'green'}" class="ball"></span>{{item.days}}</p>
                                  <p v-else-if="0 < item.days && item.days < 4"><span :style="{'background': 'yellow'}" class="ball"></span>{{item.days}}</p>
                                  <p v-else-if="item.days > 3"><span class="ball"></span>{{item.days}}</p>
                                 </div>
                           </template>
                        </el-table-column>
                        <el-table-column  prop="data_collection_way" label="数据来源">
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.data_collection_way}}</div>
                         </template>
                        </el-table-column>
                        <el-table-column label="操作" width='60'>
                            <template slot-scope="scope">
                                <div class="item" v-for="(item, index) in scope.row.node" :key="index" v-if="item.data_collection_way == 'FTP上传'">
                                  <el-button type="text" size="small" @click="lookFun(item)">查看</el-button>
                                </div>
                             </template>
                        </el-table-column>
                    </el-table>
                 </div>
          </div>
          <div class="draw-table" v-loading="Dataloading3" style="border-bottom: 5px solid #E8EBED;">
              <div class="draw-title" >
                 <el-tabs v-model="activeName3" @tab-click="handleClick3">
                    <el-tab-pane v-for="(item,type3) in nodeDetailTypeList3" :key="type3" :label="item.node_detail_type" :name="item.node_detail_type"></el-tab-pane>
                  </el-tabs>
               </div>
               <div class="draw-table">
                  <el-table :data="pfsc_list" :cell-style="cellStyle1" border  class="mytable"  :header-cell-style="rowClass" :height="400" >
                      <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                      <el-table-column   prop="node_name"  label="节点名称">
                         <template slot-scope="scope">
                             <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column   prop="info_type" label="信息类型">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column  prop="date" label="最后上报日期">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.date}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column   prop="days" label="连续未上报天数">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                              <p v-if="item.days == 0"><span :style="{'background': 'green'}" class="ball"></span>{{item.days}}</p>
                              <p v-else-if="0 < item.days && item.days < 4"><span :style="{'background': 'yellow'}" class="ball"></span>{{item.days}}</p>
                              <p v-else-if="item.days > 3"><span class="ball"></span>{{item.days}}</p>
                             </div>
                       </template>
                      </el-table-column>
                      <el-table-column  prop="data_collection_way" label="数据来源">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.data_collection_way}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column label="操作" width='60'>
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index" v-if="item.data_collection_way == 'FTP上传'">
                                <el-button type="text" size="small" @click="lookFun(item)">查看</el-button>
                              </div>
                           </template>
                      </el-table-column>
                  </el-table>
               </div>
          </div>
          <div class="draw-table" v-loading="Dataloading4" style="border-bottom: 5px solid #E8EBED;">
              <div class="draw-title" >
                 <el-tabs v-model="activeName4" @tab-click="handleClick4">
                    <el-tab-pane v-for="(item,type4) in nodeDetailTypeList4" :key="type4" :label="item.node_detail_type" :name="item.node_detail_type"></el-tab-pane>
                  </el-tabs>
               </div>
               <div class="draw-table">
                  <el-table :data="supermarket_list" :cell-style="cellStyle1" border  class="mytable"  :header-cell-style="rowClass" :height="400" >
                      <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                      <el-table-column   prop="node_name"  label="节点名称">
                         <template slot-scope="scope">
                             <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column   prop="info_type" label="信息类型">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column  prop="date" label="最后上报日期">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.date}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column   prop="days" label="连续未上报天数">
                        <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                <p v-if="item.days == 0"><span :style="{'background': 'green'}" class="ball"></span>{{item.days}}</p>
                                <p v-else-if="0 < item.days && item.days < 4"><span :style="{'background': 'yellow'}" class="ball"></span>{{item.days}}</p>
                                <p v-else-if="item.days > 3"><span class="ball"></span>{{item.days}}</p>
                               </div>
                         </template>
                      </el-table-column>
                      <el-table-column  prop="data_collection_way" label="数据来源">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.data_collection_way}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column label="操作" width='60'>
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index" v-if="item.data_collection_way == 'FTP上传'">
                                <el-button type="text" size="small" @click="lookFun(item)">查看</el-button>
                              </div>
                           </template>
                      </el-table-column>
                  </el-table>
               </div>
          </div>
          <div class="draw-table" v-loading="Dataloading5" style="border-bottom: 5px solid #E8EBED;">
              <div class="draw-title" >
                 <el-tabs v-model="activeName5" @tab-click="handleClick5">
                    <el-tab-pane v-for="(item,type5) in nodeDetailTypeList5" :key="type5" :label="item.node_detail_type" :name="item.node_detail_type"></el-tab-pane>
                  </el-tabs>
               </div>
               <div class="draw-table">
                  <el-table :data="lcsc_list" :cell-style="cellStyle1" border  class="mytable"  :header-cell-style="rowClass" :height="400" >
                      <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                      <el-table-column   prop="node_name"  label="节点名称">
                         <template slot-scope="scope">
                             <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column   prop="info_type" label="信息类型">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.info_type}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column  prop="date" label="最后上报日期">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.date}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column   prop="days" label="连续未上报天数">
                       <template slot-scope="scope">
                           <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                             <p v-if="item.days == 0"><span :style="{'background': 'green'}" class="ball"></span>{{item.days}}</p>
                             <p v-else-if="0 < item.days && item.days < 4"><span :style="{'background': 'yellow'}" class="ball"></span>{{item.days}}</p>
                             <p v-else-if="item.days > 3"><span class="ball"></span>{{item.days}}</p>
                            </div>
                      </template>
                      </el-table-column>
                      <el-table-column  prop="data_collection_way" label="数据来源">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.data_collection_way}}</div>
                       </template>
                      </el-table-column>
                      <el-table-column label="操作" width='60'>
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index" v-if="item.data_collection_way == 'FTP上传'">
                                <el-button type="text" size="small" @click="lookFun(item)">查看</el-button>
                              </div>
                           </template>
                      </el-table-column>
                  </el-table>
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
//getNotReportedMonitoringType
import {getNotReportedMonitoringType,getQueryNotReportedMonitoring} from '../../js/platform/platform.js';
var preD = function (e) {
     e.preventDefault()
}
export default {
  name:"dataControl",
  data() {
    return{
      show:true,
      Dataloading:false,
      Dataloading1:false,
      Dataloading2:false,
      Dataloading3:false,
      Dataloading4:false,
      Dataloading5:false,
      mymask:false,
      selectOne:'所属大区',
      selectTwo:'所属区县',
      selectThree:'节点类型',
      selectFour:'集团名称',
      multiData:[],
      AddDataOne:[],
      AddDataTwo:[],
      AddDataThree:[],
      AddDataFour:[],
      AddData:[],
      AddName:[],
      tz_list:[],
      ttxf_list:[],
      pfsc_list:[],
      lcsc_list :[],
      supermarket_list:[],
      Index:'',
      type1 : '',
      index1:0,
      dataList:[],
      activeName: '0',
      activeName2 : '',
      activeName3 :'',
      activeName4 :'',
       activeName5 :'',
      nodeDetailTypeList1 : [],
      nodeDetailTypeList2 : [],
      nodeDetailTypeList3 : [],
      nodeDetailTypeList4 : [],
      nodeDetailTypeList5 : [],
      regionIndex : 0,
      areaIndex : 0,
      nodeTypeIndex : 0,
      groupNameIndex : 0,
      groupNameList : [],
      nodeTypeList :[],
      areaList : [],
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
        form:{
        }
    }

  },
  mounted() {
      this.getNotReportedMonitoringTypeFun();
     /* this.$nextTick(function() {
         this.init();
      }); */
  },
  methods: {
    cellStyle1({row, column, rowIndex, columnIndex}){
      if(column.label == '集团名称'){
               return {
                 'verticalAlign': 'initial'
               }
      }
    },
    init(){
       this.getQueryNotReportedMonitoringFun1();
       this.getQueryNotReportedMonitoringFun2();
       this.getQueryNotReportedMonitoringFun3();
       this.getQueryNotReportedMonitoringFun4();
        this.getQueryNotReportedMonitoringFun5();
    },
    rowClass({ row, rowIndex}) {
        return {
            background: '#f2f2f2',
            color: '#333'
        }
    },
    recordFun(row){

    },
    lookFun(row){
      this.$router.push({name: 'ViewNodeReport', params: row})
    },
    getQueryNotReportedMonitoringFun1(){
      this.Dataloading1 = true;
      let selectOne = '';
      let selectTwo = '';
      let selectThree = '';
      let selectFour = '';
      this.tz_list = [];

      if(this.selectOne=='所属大区'){
        selectOne = '全部';
      }else{
       selectOne = this.selectOne;
      }
      if(this.selectTwo=='所属区县'){
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
      } if(this.selectFour=='集团名称'){
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
      let obj = {
          "region":selectOne,
          "district_name":selectTwo,
          "node_type": '屠宰企业',
          "group_name": selectFour
      }
       getQueryNotReportedMonitoring(obj)
        .then( res => {

            res.data.NotReportedMonitoring.forEach(ele=>{
              if(ele.node_detail_type == this.activeName){
                 ele.group.forEach(ele1=>{
                    this.tz_list.push(ele1);
                 })
              }
            })
            this.Dataloading1 = false;
          })
           .catch(error => {
               console.log(error)
           })


    },
    getQueryNotReportedMonitoringFun2(){
      this.Dataloading2 = true;
      let selectOne = '';
      let selectTwo = '';
      let selectThree = '';
      let selectFour = '';
      this.ttxf_list = [];

      if(this.selectOne=='所属大区'){
        selectOne = '全部';
      }else{
       selectOne = this.selectOne;
      }
      if(this.selectTwo=='所属区县'){
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
      } if(this.selectFour=='集团名称'){
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
      let obj = {
          "region":selectOne,
          "district_name":selectTwo,
          "node_type": '团体消费单位',
          "group_name": selectFour
      }
       getQueryNotReportedMonitoring(obj)
        .then( res => {
            res.data.NotReportedMonitoring.forEach(ele=>{
              if(ele.node_detail_type == this.activeName2){
                 ele.group.forEach(ele1=>{
                    this.ttxf_list.push(ele1);
                 })
              }
            })
            this.Dataloading2 = false;
          })
           .catch(error => {
               console.log(error)
           })


    },
    getQueryNotReportedMonitoringFun3(){
      this.Dataloading3 = true;
      let selectOne = '';
      let selectTwo = '';
      let selectThree = '';
      let selectFour = '';
      this.pfsc_list = [];

      if(this.selectOne=='所属大区'){
        selectOne = '全部';
      }else{
       selectOne = this.selectOne;
      }
      if(this.selectTwo=='所属区县'){
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
      } if(this.selectFour=='集团名称'){
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
      let obj = {
          "region":selectOne,
          "district_name":selectTwo,
          "node_type": '批发市场',
          "group_name": selectFour
      }
       getQueryNotReportedMonitoring(obj)
        .then( res => {
            res.data.NotReportedMonitoring.forEach(ele=>{
              if(ele.node_detail_type == this.activeName3){
                 ele.group.forEach(ele1=>{
                    this.pfsc_list.push(ele1);
                 })
              }
            })
            this.Dataloading3 = false;
          })
           .catch(error => {
               console.log(error)
           })

    },
    getQueryNotReportedMonitoringFun4(){
      this.Dataloading4 = true;
      let selectOne = '';
      let selectTwo = '';
      let selectThree = '';
      let selectFour = '';
      this.supermarket_list = [];

      if(this.selectOne=='所属大区'){
        selectOne = '全部';
      }else{
       selectOne = this.selectOne;
      }
      if(this.selectTwo=='所属区县'){
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
      } if(this.selectFour=='集团名称'){
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
      let obj = {
          "region":selectOne,
          "district_name":selectTwo,
          "node_type": '超市',
          "group_name": selectFour
      }
       getQueryNotReportedMonitoring(obj)
        .then( res => {
            res.data.NotReportedMonitoring.forEach(ele=>{
              if(ele.node_detail_type == this.activeName4){
                 ele.group.forEach(ele1=>{
                    this.supermarket_list.push(ele1);
                 })
              }
            })
             this.Dataloading4 = false;
          })
           .catch(error => {
               console.log(error)
           })

    },
    getQueryNotReportedMonitoringFun5(){
      this.Dataloading5 = true;
      let selectOne = '';
      let selectTwo = '';
      let selectThree = '';
      let selectFour = '';
      this.lcsc_list = [];

      if(this.selectOne=='所属大区'){
        selectOne = '全部';
      }else{
       selectOne = this.selectOne;
      }
      if(this.selectTwo=='所属区县'){
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
      } if(this.selectFour=='集团名称'){
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
      let obj = {
          "region":selectOne,
          "district_name":selectTwo,
          "node_type": '零售市场',
          "group_name": selectFour
      }
       getQueryNotReportedMonitoring(obj)
        .then( res => {
            res.data.NotReportedMonitoring.forEach(ele=>{
              if(ele.node_detail_type == this.activeName5){
                 ele.group.forEach(ele1=>{
                    this.lcsc_list.push(ele1);
                 })
              }
            })
            this.Dataloading5 = false;
          })
           .catch(error => {
               console.log(error)
           })

    },
      getNotReportedMonitoringTypeFun(){
        this.Dataloading = true;
        this.Dataloading1 = true;
        this.Dataloading2 = true;
        this.Dataloading3 = true;
        this.Dataloading4 = true;
        this.Dataloading5 = true;
        document.body.style.overflow = 'hidden';
        document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
        getNotReportedMonitoringType()
           .then( res => {
             this.nodeDetailTypeList1 = []
             this.nodeDetailTypeList2 = []
             this.nodeDetailTypeList3 = []
             this.nodeDetailTypeList4 = []
             this.nodeDetailTypeList5 = []
             res.data.area.forEach(ele=>{
               this.areaList.push(ele);
             })
             res.data.nodelist.forEach(ele=>{
               this.nodeTypeList.push(ele);
               ele.node_detail_type.forEach(ele1=>{
                  if(ele.node_type == '屠宰企业'){
                     this.nodeDetailTypeList1.push(ele1);
                  }
                  if(ele.node_type == '团体消费单位'){
                     this.nodeDetailTypeList2.push(ele1);
                  }
                  if(ele.node_type == '批发市场'){
                     this.nodeDetailTypeList3.push(ele1);
                  }
                  if(ele.node_type == '超市'){
                     this.nodeDetailTypeList4.push(ele1);
                  }
                  if(ele.node_type == '零售市场'){
                     this.nodeDetailTypeList5.push(ele1);
                  }
               })

             })
             this.activeName = this.nodeDetailTypeList1[0].node_detail_type
             this.activeName2 = this.nodeDetailTypeList2[0].node_detail_type
             this.activeName3 = this.nodeDetailTypeList3[0].node_detail_type
             this.activeName4 = this.nodeDetailTypeList4[0].node_detail_type
             this.activeName5 = this.nodeDetailTypeList5[0].node_detail_type
             res.data.grouplist.forEach(ele=>{
               this.groupNameList.push(ele);
             })

            setInterval(()=>{
              this.Dataloading = false;
            },100)
            this.show = false;
            document.body.style.overflow = '' // 出现滚动条
            document.removeEventListener('touchmove', preD, {passive: false})
             this.getQueryNotReportedMonitoringFun1();
             this.getQueryNotReportedMonitoringFun2();
             this.getQueryNotReportedMonitoringFun3();
             this.getQueryNotReportedMonitoringFun4();
             this.getQueryNotReportedMonitoringFun5();

           })
           .catch(error => {
               console.log(error)
           })

      },
      handleClick1(tab, event) {

         this.getQueryNotReportedMonitoringFun1();
      },
      handleClick2(tab, event) {

         this.getQueryNotReportedMonitoringFun2();
      },
      handleClick3(tab, event) {

         this.getQueryNotReportedMonitoringFun3();
      },
      handleClick4(tab, event) {

         this.getQueryNotReportedMonitoringFun4();
      },
      handleClick5(tab, event) {

         this.getQueryNotReportedMonitoringFun5();
      },
      handlerCommand(command){
        if(command.flag==0){
          this.regionIndex = command.index;
          this.selectOne = '所属大区';
          if(command.value=='全部'){
            this.selectOne = '所属大区';
          }else{
            this.selectOne = command.value;
          }
        }else if(command.flag==1){
          this.areaIndex = command.index1;
          this.selectTwo = '所属区县';
          if(command.value=='全部'){
            this.selectTwo = '所属区县';
          }else{
            this.selectTwo = command.value;
          }
        }else if(command.flag==2){
          this.nodeTypeIndex = command.index2;
          this.selectThree = '节点类型';
          if(command.value=='全部'){
            this.selectThree = '节点类型';
          }else{
            this.selectThree = command.value;
          }
        }else if(command.flag==3){
          this.groupNameIndex = command.index3;
          this.selectFour = '集团名称';
          if(command.value=='全部'){
            this.selectFour = '集团名称';
          }else{
            this.selectFour = command.value;
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
         else if(this.Index==2){
           this.AddDataThree.splice(index,1);
         }
         else if(this.Index==3){
           this.AddDataFour.splice(index,1);
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
        this.areaList.forEach(ele=>{
          if(ele.areaList!='全部'){
            let obj = {
              Addshow:false,
              name:ele.district_name
            }
            arr.push(obj);
          }
        })
        this.multiData = arr;
        this.AddData = this.AddDataTwo;
      }else if(type==2){
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
        this.AddData = this.AddDataThree;
      }else if(type==3){
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
        this.AddData = this.AddDataFour;
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
            }else if(this.Index==2){
              this.selectThree = arr[0];
            } else if(this.Index==3){
              this.selectFour = arr[0];
            }
          }else{
            if(this.Index==0){
              this.selectOne = arr. join(',');
            }else if(this.Index==1){
              this.selectTwo = arr. join(',');
            } else if(this.Index==2){
              this.selectThree = arr. join(',');
            }else if(this.Index==3){
              this.selectFour = arr. join(',');
            }
          }
        }else{
          if(this.Index==0){
            this.selectOne = '所属大区';
            this.AddDataOne = [];
          }else if(this.Index==1){
            this.selectTwo = '所属区县';
            this.AddDataTwo = [];
          }else if(this.Index==2){
            this.selectThree = '节点类型';
            this.AddDataThree = [];
          }else if(this.Index==3){
            this.selectFour = '集团名称';
            this.AddDataFour = [];
          }
        }
        if(this.Index==0){
          this.AddDataOne = this.AddData;
        }else if(this.Index==1){
          this.AddDataTwo = this.AddData;
        }
        else if(this.Index==2){
          this.AddDataThree = this.AddData;
        }
        else if(this.Index==3){
          this.AddDataFour = this.AddData;
        }
        this.handlerClose();
       this.init();

      }
  }
}

</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
   .content{
      width: 100%;
      height: 100%;
      .myDiv{
        height: 800px;
        width: 100%;
      }
      .table-btn{
          margin: 0 5px;
          float: left;
          cursor: pointer;
          font-size: 14px;
      }
      .ball{
        margin: 0 10px;
        width: 10px;
        height: 10px;
        display: inline-block;
        background: red;
        border-radius: 50%;
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
      .table{
        margin-top: 10px;
        /* padding: 10px; */
        position: relative;
        background: #fff;
        .draw-table{
          width: 100%;
          height: 500px;
        }
      }
   }
</style>
<style lang="less">
  .content-table{

    .el-table .cell{
      padding: 0 !important;
      line-height: ;
    }
  }

</style>
