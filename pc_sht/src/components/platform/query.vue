<template>
  <div class="content content-table">
    <div v-loading="Dataloading">
      <div class="subAll" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading1">
          <div class="sub-item" style="border-right: 3px solid #E8EBED;">
            <div class="box">
               <div class="sub-num1">
                  <p class="myp">查询机总数</p>
                  <p class="sum">{{machine_sum}}<span>个</span></p>
               </div>
               <div class="sub-num2">
                  <p class="myp">查询机在线数量</p>
                  <p class="online">{{machine_online}}<span>个</span></p>
                  <p class="fault"><span>查询故障</span>
                        <i class="el-icon-arrow-up"></i>
                        {{machine_fault}}</p>
               </div>

            </div>
             <div class="sub-num3">
              <p class="myp" style="padding-left: 34px;font-weight: 700;">查询机情况</p>
              <p class="percentage" >
                    {{machine_percentage}}</p>
              <p v-if="machine_percentage.split('%')[0] > 80"  class="title1">正常比例</p>
              <p v-if="machine_percentage.split('%')[0] < 80"  class="title1">非正常比例</p>
              <div id="echartsOne_query" class="myecharts" style="height: 200px;width: 196;"></div>
             </div>
          </div>
          <div class="sub-item2">
               <div class="map-title">查询机分布</div>
               <div id="map_canvas1" class="map" tabindex="0" style="width:90%; height:391px;"></div>
          </div>
      </div>
      <div class="mytable" style="border-bottom: 3px solid #E8EBED;">
        <div class = "table-item1">

            <div class="searchs1" ref="searchs">
              <span class="table-item1-title">查询机不在线天数</span>
                  <el-form ref="form" :inline="true" :model="form" label-width="100px" >
                    <div class="select" >
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{table1selectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item :command="{value:'全部',flag:0,index:0}" :class="nodeIndex == 0 ? 'active':''">全部</el-dropdown-item>
                           <el-dropdown-item :command="{value:item.node_name,flag:0,index:index+1}" :class="nodeIndex == index+1 ? 'active':''" v-for="(item,index) in nodeList" :key="index">{{item.node_name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <span class="choose" @click="handlerChoose(0)">多选</span>
                    </div>
                     <div class="select" >
                       <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                         <span class="el-dropdown-link">
                           {{table1selectTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                         <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item :command="{value:'全部',flag:1,index:0}" :class="regionIndex == 0 ? 'active':''">全部</el-dropdown-item>
                           <el-dropdown-item :command="{value:item.name,flag:1,index:item.index}" :class="regionIndex == item.index ? 'active':''" v-for="(item,index1) in regionList" :key="index1">{{item.name}}</el-dropdown-item>
                         </el-dropdown-menu>
                       </el-dropdown>
                       <span class="choose" @click="handlerChoose(1)">多选</span>
                     </div>
                  </el-form>
          </div>
            <div class="dtaw-table1" v-loading="Dataloading2">
                <el-table :data="region_list" border  class="mytable" :cell-style="cellStyle" :header-cell-style="rowClass" :height="450" >
                   <el-table-column  prop="region" label="所属大区"></el-table-column>
                   <el-table-column prop="node_id" label="节点编码">
                      <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_id}}</div>
                     </template>
                    </el-table-column>
                   <el-table-column   prop="node_name"  label="节点名称">
                     <template slot-scope="scope">
                          <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                     </template>
                   </el-table-column>
                    <el-table-column   prop="in_date"  label="最后在线日期">
                      <template slot-scope="scope">
                          <div class="item"  v-for="(item, index) in scope.row.node" :key="index">{{item.in_date}}</div>
                     </template>
                    </el-table-column>
                   <el-table-column  prop="days" label="连续不在线天数">
                     <template slot-scope="scope">
                           <!-- <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.days}}</div> -->
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                <p v-if="parseFloat(item.days) < 3" style="background: #ffaa00;color: #FFFFFF;" >{{item.days}}</p>
                                <p v-else-if="parseFloat(item.days) > 2" style="background:#ff0000;color: #FFFFFF;">{{item.days}}</p>
                             </div> 
                     </template>
                   </el-table-column>
               </el-table>
            </div>
        </div>
        <div class = "table-item2">
            <div class="searchs1" ref="searchs">
                  <el-form ref="form" :inline="true" :model="form" label-width="100px">
                      <span class="table-item2-title">查询机在线监测 - 最早在线时间</span>
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{table1selectFour}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item :command="{value:'全部',flag:2,index:0}" :class="nodeIndex == 0 ? 'active':''">全部</el-dropdown-item>
                           <el-dropdown-item :command="{value:item.node_name,flag:2,index:index2+1}" :class="nodeIndex == index2+1 ? 'active':''" v-for="(item,index2) in nodeList" :key="index2">{{item.node_name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                      <span class="choose" @click="handlerChoose(2)">多选</span>
                    </div>
                     <div class="select">
                       <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                         <span class="el-dropdown-link">
                           {{table1selectThree}}<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                         <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:'全部',flag:3,index:0}" :class="groupNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                          <el-dropdown-item :command="{value:item.group_name,flag:3,index:index3+1}" :class="groupNameIndex == index3+1 ? 'active':''" v-for="(item,index3) in groupNameList" :key="index3">{{item.group_name}}</el-dropdown-item>
                         </el-dropdown-menu>
                       </el-dropdown>
                       <span class="choose" @click="handlerChoose(3)">多选</span>
                     </div>
                  </el-form>
                </div>
                <div class="dtaw-table2" v-loading="Dataloading3">
                  <el-table :data="minMachine_list" border  class="mytable"  :header-cell-style="rowClass" :height="450" >
                     <el-table-column  prop="group_name" label="集团名称"></el-table-column>
                     <el-table-column prop="node_name" label="节点名称">
                        <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.node_name}}</div>
                       </template>
                      </el-table-column>
                     <el-table-column width="293px"   prop="in_date"  label="查询机最早在线时间">
                       <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.in_date}}</div>
                       </template>
                     </el-table-column>
                 </el-table>
              </div>
        </div>
      </div>
      <div class="myEcharts1" style="border-bottom: 3px solid #E8EBED;">
         <div class="searchs1" ref="searchs">
               <el-form ref="form" :inline="true" :model="form" label-width="100px">
                   <span class="echarts-title1">查询机在线情况</span>
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{echartsselectOne}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{value:'全部时间',flag:4,index:0}" :class="dataIndex == 0 ? 'active':''">全部时间</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.indata,flag:4,index:index4+1}" :class="dataIndex == index4+1 ? 'active':''" v-for="(item,index4) in dataList" :key="index4">{{item.indata}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                 </div>
               </el-form>
             </div>
             <div  v-loading="Dataloading4">
               <div class="echarts-num">
                   <p class="num">{{num}}</p>
                   <p class="myp">{{time}}</p>
               </div>
               <div id="echartsTwo_query" class="myecharts" style="height: 320px;" ></div>
             </div>



      </div>
      <div class="myEcharts2"  style="border-bottom: 3px solid #E8EBED;">
           <span class="echarts2-title">北京E追溯查询结果监控</span>
           <div class="searchs1" ref="searchs">
             <el-form ref="form" :inline="true" :model="form" label-width="100px">
               <div class="select">
                 <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                   <span class="el-dropdown-link">
                     {{echartsselectTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                   <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="{value:item.name,flag:5,index:item.index}" :class="dataIndex1 == item.index ? 'active':''" v-for="(item,index) in dataList1" :key="index">{{item.name}}</el-dropdown-item>
                  </el-dropdown-menu>
                 </el-dropdown>
               </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{traceResult}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item :command="{value:item.name,flag:6,index:item.index}" :class="traceResultIndex == item.index6 ? 'active':''" v-for="(item,index6) in traceResultList" :key="index6">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{nodeTypeSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item :command="{value:'全部',flag:7,index:0}" :class="nodeTypeIndex == 0 ? 'active':''">全部</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.node_type,flag:7,index:item.index7 + 1}" :class="nodeTypeIndex == item.index7 ? 'active':''" v-for="(item,index7) in NodeTypeList" :key="index7">{{item.node_type}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                   <span class="choose" @click="handlerChoose(4)">多选</span>
                </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{nodeTypeDetailSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item :command="{value:'全部',flag:8,index:0}" :class="nodeTypeDetailIndex == 0 ? 'active':''">全部</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.node_detail_type,flag:8,index:item.index8 + 1}" :class="nodeTypeDetailIndex == item.index8 ? 'active':''" v-for="(item,index8) in NodeTypeDetailList" :key="index8">{{item.node_detail_type}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                    <span class="choose" @click="handlerChoose(5)">多选</span>
                </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{groupNameSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item :command="{value:'全部',flag:9,index:0}" :class="groupNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.group_name,flag:9,index:item.index9 + 1}" :class="groupNameIndex == item.index9 ? 'active':''" v-for="(item,index9) in GroupNameList" :key="index9">{{item.group_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                     <span class="choose" @click="handlerChoose(6)">多选</span>
                </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{nodeNameSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item :command="{value:'全部',flag:10,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.node_name,flag:10,index:item.index10 + 1}" :class="nodeNameIndex == item.index10 +1 ? 'active':''" v-for="(item,index10) in nodeNameList" :key="index10">{{item.node_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                   <span class="choose" @click="handlerChoose(7)">多选</span>
                </div>
                <div class="select">
                  <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                    <span class="el-dropdown-link">
                      {{regionSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">

                       <el-dropdown-item :command="{value:'全部',flag:11,index:0}" :class="regionIndex1 == 0 ? 'active':''">全部</el-dropdown-item>
                       <el-dropdown-item :command="{value:item.name,flag:11,index:item.index}" :class="regionIndex1== item.index11 ? 'active':''" v-for="(item,index11) in regionList1" :key="index11">{{item.name}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                   <span class="choose" @click="handlerChoose(8)">多选</span>
                </div>
             </el-form>
           </div>
           <div>
             <div class="lineShow2" style="height: 392px;line-height: 392px;color: #999;font-size: 14px;text-align: center;" v-if="lineShow2">暂无数据</div>
              <div id="echartsThree_query" class="myecharts" style="height: 300px;" v-loading="Dataloading5"></div>
           </div>

      </div>
      <div  class="myEcharts3"  style="border-bottom: 3px solid #E8EBED;">

         <div class="myEcharts3-item1">
            <p class="echarts3-item1-title">追溯查询失败与成功占比</p>
            <div class="searchs1" ref="searchs" >
                <el-form ref="form" :inline="true" :model="form" label-width="100px">
                  <div class="select">
                    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        {{dataSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                           <el-dropdown-item :command="{value:item.name,flag:12,index:item.index}" :class="dataIndex2 == item.index ? 'active':''" v-for="(item,index) in dataList2" :key="index">{{item.name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="select">
                    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        {{nodeNameSelect1}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:'全部',flag:13,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                          <el-dropdown-item :command="{value:item.node_name,flag:13,index:item.index13 + 1}" :class="nodeNameIndex == item.index13 +1 ? 'active':''" v-for="(item,index13) in nodeNameList" :key="index13">{{item.node_name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                         <span class="choose" @click="handlerChoose(9)">多选</span>
                  </div>
                  <div class="select">
                    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        {{deviceSelect}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:'全部',flag:14,index:0}" :class="deviceIndex == 0 ? 'active':''">全部</el-dropdown-item>
                          <el-dropdown-item :command="{value:item.check_type,flag:14,index:item.index14 + 1}" :class="deviceIndex == item.index14 +1 ? 'active':''" v-for="(item,index14) in deviceList" :key="index14">{{item.check_type}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                        <span class="choose" @click="handlerChoose(10)">多选</span>
                  </div>
                  <div class="select">
                    <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                      <span class="el-dropdown-link">
                        {{traceResultSelect1}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{value:item.name,flag:15,index:item.index}" :class="traceResultIndex == item.index15 ? 'active':''" v-for="(item,index15) in traceResultList" :key="index15">{{item.name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </el-form>
              </div>
              <div>
                 <div class="lineShow" style="height: 380px;line-height: 380px;color: #999;font-size: 14px;text-align: center;" v-if="lineShow">暂无数据</div>
                 <div id="echartsFour_query" class="myecharts" v-loading="Dataloading6" style="height: 320px;"></div>
              </div>

         </div>
         <div  class="myEcharts3-item2" >
              <p class="echarts3-item2-title">追溯查询日志明细</p>
              <div class="searchs1" ref="searchs" >
                  <el-form ref="form" :inline="true" :model="form" label-width="100px">
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{dataSelect1}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                             <el-dropdown-item :command="{value:item.name,flag:16,index:item.index}" :class="dataIndex2 == item.index ? 'active':''" v-for="(item,index) in dataList2" :key="index">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{nodeNameSelect2}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{value:'全部',flag:17,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                            <el-dropdown-item :command="{value:item.node_name,flag:17,index:item.index17 + 1}" :class="nodeNameIndex == item.index17 +1 ? 'active':''" v-for="(item,index17) in nodeNameList" :key="index17">{{item.node_name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                           <span class="choose" @click="handlerChoose(11)">多选</span>
                    </div>
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{deviceSelect1}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{value:'全部',flag:18,index:0}" :class="deviceIndex == 0 ? 'active':''">全部</el-dropdown-item>
                            <el-dropdown-item :command="{value:item.check_type,flag:18,index:item.index18 + 1}" :class="deviceIndex == item.index18 +1 ? 'active':''" v-for="(item,index18) in deviceList" :key="index18">{{item.check_type}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                          <span class="choose" @click="handlerChoose(12)">多选</span>
                    </div>
                    <div class="select">
                      <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                        <span class="el-dropdown-link">
                          {{traceResultSelect2}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item :command="{value:item.name,flag:19,index:item.index}" :class="traceResultIndex == item.index19 ? 'active':''" v-for="(item,index19) in traceResultList" :key="index19">{{item.name}}</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-form>
                </div>

                <div class="echarts3-item2-table"  v-loading="Dataloading7">
                    <el-table :data="TraceResultDetailList" border  class="mytable" :cell-style="cellStyle" :header-cell-style="rowClass" :height="340" >
                       <el-table-column  prop="node_name" label="节点名称"></el-table-column>
                       <el-table-column prop="check_type" label="查询设备">
                          <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.check_type}}</div>
                         </template>
                        </el-table-column>
                       <el-table-column   prop="trace_result"  label="查询结果">
                         <template slot-scope="scope">
                               <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                    <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                          {{item1.trace_result}}
                                    </div>
                                </div>
                          </template>
                       </el-table-column>
                        <el-table-column   prop="result_count"  label="查询次数">
                         <template slot-scope="scope">
                               <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                    <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                          <div class="item" v-for="(item2, index2) in item1.result" :key="index2">
                                                 {{item2.result_count}}
                                          </div>
                                    </div>
                                </div>
                          </template>
                        </el-table-column>
                   </el-table>
                </div>
         </div>
      </div>
      <div  class="myEcharts4"  style="border-bottom: 3px solid #E8EBED;">
        <div class="myEcharts4-item1">
           <p class="echarts4-item1-title">追溯查询失败原因占比</p>
           <div class="searchs1" ref="searchs" >
               <el-form ref="form" :inline="true" :model="form" label-width="100px">
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{dataSelect2}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:item.name,flag:20,index:item.index}" :class="dataIndex2 == item.index ? 'active':''" v-for="(item,index) in dataList2" :key="index">{{item.name}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                 </div>
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{nodeNameSelect3}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item :command="{value:'全部',flag:21,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                         <el-dropdown-item :command="{value:item.node_name,flag:21,index:item.index21 + 1}" :class="nodeNameIndex == item.index21 +1 ? 'active':''" v-for="(item,index21) in nodeNameList" :key="index21">{{item.node_name}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                        <span class="choose" @click="handlerChoose(13)">多选</span>
                 </div>
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{deviceSelect2}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item :command="{value:'全部',flag:22,index:0}" :class="deviceIndex == 0 ? 'active':''">全部</el-dropdown-item>
                         <el-dropdown-item :command="{value:item.check_type,flag:22,index:item.index22 + 1}" :class="deviceIndex == item.index22 +1 ? 'active':''" v-for="(item,index22) in deviceList" :key="index22">{{item.check_type}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                       <span class="choose" @click="handlerChoose(14)">多选</span>
                 </div>
               </el-form>
             </div>
             <div>
               <div class="lineShow" style="height: 220px;line-height: 220px;color: #999;font-size: 14px;text-align: center;" v-if="lineShow1">暂无数据</div>
                <div id="echartsFive_query" class="myecharts" style="height: 220px;" v-loading="Dataloading8"></div>
             </div>

        </div>
        <div  class="myEcharts4-item2">
           <p class="echarts4-item2-title">追溯查询错误原因日志明细</p>
           <div class="searchs1" ref="searchs" >
               <el-form ref="form" :inline="true" :model="form" label-width="100px">
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{dataSelect3}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="{value:item.name,flag:23,index:item.index}" :class="dataIndex2 == item.index ? 'active':''" v-for="(item,index) in dataList2" :key="index">{{item.name}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                 </div>
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{nodeNameSelect4}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item :command="{value:'全部',flag:24,index:0}" :class="nodeNameIndex == 0 ? 'active':''">全部</el-dropdown-item>
                         <el-dropdown-item :command="{value:item.node_name,flag:24,index:item.index24 + 1}" :class="nodeNameIndex == item.index24 +1 ? 'active':''" v-for="(item,index24) in nodeNameList" :key="index24">{{item.node_name}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                        <span class="choose" @click="handlerChoose(15)">多选</span>
                 </div>
                 <div class="select">
                   <el-dropdown @command="handlerCommand" trigger="click" placement="bottom-start">
                     <span class="el-dropdown-link">
                       {{deviceSelect3}}<i class="el-icon-arrow-down el-icon--right"></i>
                     </span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item :command="{value:'全部',flag:25,index:0}" :class="deviceIndex == 0 ? 'active':''">全部</el-dropdown-item>
                         <el-dropdown-item :command="{value:item.check_type,flag:25,index:item.index25 + 1}" :class="deviceIndex == item.index25 +1 ? 'active':''" v-for="(item,index25) in deviceList" :key="index25">{{item.check_type}}</el-dropdown-item>
                     </el-dropdown-menu>
                   </el-dropdown>
                       <span class="choose" @click="handlerChoose(16)">多选</span>
                 </div>
               </el-form>
             </div>
           <div class="echarts4-item2-table" v-loading="Dataloading9">
               <el-table :data="TraceErrorResultDetailList" border  class="mytable"  :cell-style="cellStyle" :header-cell-style="rowClass" :height="280" >
                  <el-table-column  prop="node_name" width="143px" label="节点名称"></el-table-column>
                  <el-table-column prop="check_type" width="85px" label="查询设备">
                     <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">{{item.check_type}}</div>
                       </template>
                   </el-table-column>
                  <el-table-column   prop="trace_type" width="77px"  label="码类型">
                    <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                               <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                     {{item1.trace_type}}
                               </div>
                           </div>
                       </template>
                  </el-table-column>
                   <el-table-column   prop="trace_code" width="110px"  label="查询码">
                    <template slot-scope="scope">
                            <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                               <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                     <div class="item" v-for="(item2, index2) in item1.trace" :key="index2">
                                            {{item2.trace_code}}
                                     </div>
                               </div>
                           </div>
                       </template>
                   </el-table-column>
                   <el-table-column   prop="error_msg" width="414px"  label="错误信息">
                     <template slot-scope="scope">
                             <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                      <div class="item" v-for="(item2, index2) in item1.trace" :key="index2">
                                             {{item2.error_msg}}
                                      </div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column   prop="trace_count" width="140px"  label="查询次数">
                      <template slot-scope="scope">
                              <div class="item" v-for="(item, index) in scope.row.node" :key="index">
                                 <div class="item" v-for="(item1, index1) in item.check" :key="index1">
                                       <div class="item" v-for="(item2, index2) in item1.trace" :key="index2">
                                              {{item2.trace_count}}
                                       </div>
                                 </div>
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
  // import '../../../node_modules/_echarts@4.8.0@echarts/map/js/province/beijing.js' // 引入北京地图数据
  import '../../../node_modules/echarts/map/js/province/beijing.js' 
  import axios from 'axios';
  import {getQueryMachineTimeliness,getQueryMachineType,getQueryMachineNotOnline,getQueryMinMachineDate,getQueryMachine,getQueryTraceResultType,getQueryTraceResult,getQueryTraceSuccessError,getQueryTraceResultDetail,getQueryTraceErrorResult,getQueryTraceErrorResultDetail} from '../../js/platform/platform.js';
  import '../../assets/css/common.css';
  // import elTableInfiniteScroll from 'el-table-infinite-scroll';
  import AMap from 'AMap';
  var preD = function (e) {
       e.preventDefault()
  }
  export default {
     name:"dataControl",
      data() {
        return{
          Dataloading:false,
          Dataloading1:false,
          Dataloading2:false,
          Dataloading3:false,
          Dataloading4:false,
          Dataloading5:false,
          Dataloading6:false,
          Dataloading7:false,
          Dataloading8:false,
          Dataloading9:false,
          mymask:false,
          mydata:false,
          seen:false,
          multiData:[],
          AddDataOne:[],
          AddDataTwo:[],
          AddDataThree:[],
          AddDataFour:[],
          AddDataFive:[],
          AddDataSix:[],
          AddDataSeven:[],
          AddDataEight:[],
          AddDataNine:[],
          AddData1:[],
          AddData2:[],
          AddData3:[],
          AddData4:[],
          AddData5:[],
          AddData6:[],
          AddData7:[],
          AddData8:[],
          AddData:[],
          AddName:[],
          Index:'',
          machine_sum : 0,
          machine_online : 0,
          machine_fault : 0,
          time : "",
          num : 0,
          machine_percentage :'0%',
          table1selectOne:'节点名称',
          table1selectTwo:'所属大区',
          table1selectThree:'集团名称',
          echartsselectOne : '事件日期',
          table1selectFour:'节点名称',
          nodeIndex : 0,
          regionIndex : 0,
          groupNameIndex : 0,
          deviceIndex : 0,
          region_list:[],
          groupNameList : [],
          minMachine_list : [],
          dataList : [],
          dataIndex : 0,
          echartsselectTwo :'查询日期',
          traceResult : '查询结果',
          nodeTypeSelect : '节点类型',
          nodeTypeDetailSelect : '节点详细分类',
          groupNameSelect : '集团名称',
          nodeNameSelect: '节点名称',
          regionSelect : '所属大区',
          dataSelect : '查询日期',
          dataSelect3 :"查询日期",
          nodeNameSelect1 : '节点名称',
          nodeNameSelect2 :'节点名称',
          nodeNameSelect3 : '节点名称',
          nodeNameSelect4 :'节点名称',
          deviceSelect : '查询设备',
          deviceSelect1 : '查询设备',
          deviceSelect2 : '查询设备',
           deviceSelect3 : '查询设备',
          traceResultSelect1 :'查询结果',
          traceResultSelect2:'查询结果',
          groupNameIndex : 0,
          nodeTypeDetailIndex : 0,
          nodeTypeIndex : 0,
          nodeNameIndex : 0,
          regionIndex1 : 0,
          nodeNameList : [],
          NodeTypeDetailList :[],
          NodeTypeList : [],
          GroupNameList : [],
          deviceList : [],
          TraceResultDetailList:[],
          TraceErrorResultDetailList:[],
          lineShow:false,
          lineShow1:false,
          lineShow2:false,
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
            regionList1:[
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
           traceResultIndex : '全部',
           traceResultList:[
             {
               name:'全部',
               index: '全部'
             },
             {
               name:'查询成功',
               index: '查询成功'
             },
             {
               name:'查询失败',
               index: '查询失败'
             }
             ],
          nodeList:[],
          dataList1 : [
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
          dataList2 : [
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
          dataIndex1 : '全部日期',
          dataIndex2 : '全部日期',
          dataSelect1:'查询日期',
          dataSelect2:'查询日期',
          form :{

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
                  },
          types: '',

        }
      },
      mounted() {
        this.getQueryMachineFun();
        this.getQueryTraceResultFun();
        this.getQueryMachineTimelinessFun();
        this.getQueryMachineTypeFun(),
        this.getQueryMachineNotOnlineFun();
        this.getQueryMinMachineDateFun();
        this.getTimeFun();
        this.getQueryTraceResultTypeFun();
        this.getQueryTraceSuccessErrorFun();
        this.getQueryTraceResultDetailFun();
        this.getQueryTraceErrorResultFun();
        this.getQueryTraceErrorResultDetailFun();
       this.$nextTick(function() {
           this.drawMap1();
        }); /* */

      },
      methods: {

        enter2(){
          this.seen = true;
        },
        leave2(){
          this.seen = false;
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
        cellStyle({row, column, rowIndex, columnIndex}){

          if(column.label == '节点名称' || column.label == '查询设备' || column.label == '码类型'){
            return {
              'verticalAlign': 'initial'
            }
          }
        },
        getTimeFun(){
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth()+2;
          let dd = new Date().getDate();
          let indate = '';
          let hoursObj = {};
          var dataObj = {};
          for(var i = 0; i < 12; i++) {
             mm = mm -1;
            if(mm <=0){
              yy = yy - 1;
              mm = 12;
              indate = yy + '年' + mm + '月';
            }else{
              indate = yy + '年' + mm + '月';

            }
            hoursObj = {"indata":indate};
            this.dataList.push(hoursObj);
          }
          this.dataList.forEach(ele=>{
            this.dataList.push(ele);
          })
        },
        getQueryMachineFun(){
          this.Dataloading4 = true;
          let startDate = '';
          let endDate = '';
          if(this.echartsselectOne=='事件日期'){
           let date = new Date();
           let year = date.getFullYear() + "";
           let month = (date.getMonth() + 1) + "";
           let dd = date.getDate();
           endDate = year + "-" + (month < 10 ?  ( '0' + month) : month) + "-" + (dd < 10 ?  ( '0' + dd) : dd);
           startDate = year + "-" + '01' + "-" + '01';
          }else{
            let time = this.echartsselectOne;
            let yy = time.split('年')[0];
            let mm = time.substring(time.indexOf("年")+1,time.indexOf("月"));
            startDate = yy + "-" + (mm < 10 ?  ( '0' + mm) : mm) + "-" + '01';
            var time1 = new Date(yy,mm,1);
            let dd = new Date(time1.getTime()-1000*60*60*24).getDate();
            endDate = yy + "-" + (mm < 10 ?  ( '0' + mm) : mm) + "-" +  (dd < 10 ?  ( '0' + dd) : dd);

          }
          let obj = {
              "startDate":startDate,
              "endDate":endDate
          }
          let lineName = [];
          let lineValue = [];
          let lineChart = [];
          let map = {};
          getQueryMachine(obj)
            .then( res => {
              res.data.图表.forEach(ele=>{
                lineName.push(ele.indate);
                lineValue.push(ele.onlineCount);
                map = {"indate":ele.indate,"onlineCount":ele.onlineCount}
              })
              this.time = map.indate;
              this.num = map.onlineCount;
              this.getQueryMachineFun1(lineName,lineValue);
              this.Dataloading4 = false;
            })
            .catch(error => {
                console.log(error)
            })
        },
        getQueryMachineFun1(lineName,lineValue){
             let echartsTwo_query = this.$echarts.init(document.getElementById('echartsTwo_query'));
             window.addEventListener('resize', function () {
               echartsTwo_query.resize()
             })
              echartsTwo_query.setOption({
                tooltip: {
                	trigger: 'axis',
                  formatter:  '{b}<br/>{a}:{c}'
                },
                 xAxis: {
                        type: 'category',
                        data: lineName
                    },
                    yAxis: {
                         show:true,
                         type: 'value',
                         name: '查询机在线情况',
                         min: 0,
                         max: 480,
                         interval: 120,
                         nameLocation: 'middle',
                         nameGap: 50,
                         axisLine: {show:false},
                         axisTick: {show:false},
                         splitLine:{
                     　　　　show:false
                     　　 }

                    },
                    dataZoom : {//实现缩放功能
                        show : true,
                        realtime : true,
                        start : 0,
                        end : 20
                    },
                    color : "#55aa00",
                    series: [{
                        data: lineValue,
                        type: 'line',
                        name:'查询机在线数量',
                        label: {
                            show: true,
                            position: 'top',
                            color:'#000000'

                        }
                    }]

              })
        },
        getQueryMachineTimelinessFun(){
          this.Dataloading1 = true;
          getQueryMachineTimeliness()
          .then(res => {

               this.machine_sum = res.data.MachineMap.MachineSum;
               this.machine_online = res.data.MachineMap.online;
               this.machine_fault = res.data.MachineMap.fault;
               this.machine_percentage = res.data.MachineMap.percentage;
               let percentage = this.machine_percentage.split('%')[0];
               this.getQueryMachineTimelinessFun1(percentage);

                 let list = res.data.dataList;
                 this.markerFun1(list);
               this.Dataloading1 = false;
            })

            .catch(error => {
                console.log(error)
            })
        },
        getQueryMachineTimelinessFun1(percentage){
          var echartsOne_query = this.$echarts.init(document.getElementById('echartsOne_query'));
          /* myChart8.setOption({
           let echartsOne = this.$echarts.init(document.getElementById('echartsOne'));
           window.addEventListener('resize', function () {
             echartsOne.resize()
           }) */
            echartsOne_query.setOption({
               tooltip: {
                      formatter: '{a} <br/>{b} : {c}%'
                  },

              series: [
                  {
                      name: '查询机在线率',
                      type: 'gauge',
                      axisLabel: {
                          show: false
                      },
                      detail: {formatter: '{value}%',fontSize: 14},
                      data:  [{value: percentage}]


                  }
              ]
            })
        },
        getQueryMachineNotOnlineFun(){
          this.Dataloading2 = true;
          let table1selectOne = '';
          let table1selectTwo = '';
          if(this.table1selectOne=='节点名称'){
            table1selectOne = '全部';
          }else{
            if(this.table1selectOne.indexOf(',')==-1){
              table1selectOne = "'" + this.table1selectOne + "'";
            }else{
              let str = '';
              let arr = this.table1selectOne.split(',');
              arr.forEach(ele=>{
                str += "'" + ele + "',";
              })
              table1selectOne = str.substr(0,str.length-1);
            }
          }
          if(this.table1selectTwo=='所属大区'){
            table1selectTwo = '全部';
          }else{
             table1selectTwo = this.table1selectTwo;
          }
          let obj = {
              "region":table1selectTwo,
              "node_name":table1selectOne
          }
          getQueryMachineNotOnline(obj)
             .then( res => {
                 this.region_list =  res.data.Regionlist
                 this.Dataloading2 = false;
               })
                .catch(error => {
                    console.log(error)
                })
        },
        getQueryMinMachineDateFun(){
          this.Dataloading3 = true;
          let table1selectOne = '';
          let table1selectThree = '';
          if(this.table1selectFour=='节点名称'){
            table1selectOne = '全部';
          }else{
            if(this.table1selectFour.indexOf(',')==-1){
              table1selectOne = "'" + this.table1selectFour + "'";
            }else{
              let str = '';
              let arr = this.table1selectFour.split(',');
              arr.forEach(ele=>{
                str += "'" + ele + "',";
              })
              table1selectOne = str.substr(0,str.length-1);
            }
          }
          if(this.table1selectThree=='集团名称'){
            table1selectThree = '全部';
          }else{
             if(this.table1selectThree.indexOf(',')==-1){
               table1selectThree = "'" + this.table1selectThree + "'";
             }else{
               let str = '';
               let arr = this.table1selectThree.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               table1selectThree = str.substr(0,str.length-1);
             }
          }
          let obj = {
              "group_name":table1selectThree,
              "node_name":table1selectOne
          }
           getQueryMinMachineDate(obj)
           .then( res => {
                this.minMachine_list =  res.data.MachineList
                this.Dataloading3 = false;
             })
              .catch(error => {
                  console.log(error)
              })

        },
        getQueryTraceResultFun(){
          this.Dataloading5 = true;
          let node_type = '';
          let node_detail_type = '';
          let group_name = '';
          let region = '';
          let type = '';
          let trace_result = '';
          let node_name = '';
          let startDate = '';
          let endDate = '';
           if(this.echartsselectTwo == '查询日期'){
              type = 'month';
           }else if(this.echartsselectTwo == '今天'){
             type = 'day';
           }else if(this.echartsselectTwo == '昨天'){
             type = 'yesDay';
           }else if(this.echartsselectTwo == '昨天'){
             type = 'yesDay';
           }else if(this.echartsselectTwo == '最近7天'){
             type = 'week';
           }else if(this.echartsselectTwo == '最近30天'){
             type = 'month';
           }else if(this.echartsselectTwo == '最近90天'){
             type = 'three_month';
           }else if(this.echartsselectTwo == '近一年'){
             type = 'year';
           }
           else if(this.echartsselectTwo == '自定义时间'){
            startDate = this.startDate;
            endDate = this.endDate;
           }
           else if(this.selectThree == ''){
             startDate = this.startDate;
             endDate = this.endDate;
           }
          if(this.traceResult=='查询结果'){
            trace_result = '';
          }else{
            if(this.traceResult == '查询成功'){
              trace_result = '1';
            }
            if(this.traceResult == '查询失败'){
              trace_result = '0';
            }

          }
          if(this.nodeTypeSelect=='节点类型'){
            node_type = '';
          }else{
             if(this.nodeTypeSelect.indexOf(',')==-1){
               node_type = "'" + this.nodeTypeSelect + "'";
             }else{
               let str = '';
               let arr = this.nodeTypeSelect.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               node_type = str.substr(0,str.length-1);
             }
          }
          if(this.nodeTypeDetailSelect=='节点详细分类'){
            node_detail_type = '';
          }else{
             if(this.nodeTypeDetailSelect.indexOf(',')==-1){
               node_detail_type = "'" + this.nodeTypeDetailSelect + "'";
             }else{
               let str = '';
               let arr = this.nodeTypeDetailSelect.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               node_detail_type = str.substr(0,str.length-1);
             }
          }
          if(this.groupNameSelect=='集团名称'){
            group_name = '';
          }else{
             if(this.groupNameSelect.indexOf(',')==-1){
               group_name = "'" + this.groupNameSelect + "'";
             }else{
               let str = '';
               let arr = this.groupNameSelect.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               group_name = str.substr(0,str.length-1);
             }
          }
          if(this.nodeNameSelect=='节点名称'){
            node_name = '';
          }else{
             if(this.nodeNameSelect.indexOf(',')==-1){
               node_name = "'" + this.nodeNameSelect + "'";
             }else{
               let str = '';
               let arr = this.nodeNameSelect.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               node_name = str.substr(0,str.length-1);
             }
          }
          if(this.regionSelect=='所属大区'){
            region = '';
          }else{
             region = this.regionSelect;
          }
          let obj = {
              "node_type":node_type,
              "node_detail_type":node_detail_type,
              "group_name":group_name,
              "region":region,
              "type":type,
              "trace_result":trace_result,
              "node_name":node_name,
              "startDate":startDate,
              "endDate":endDate
          }
          console.log(obj);
          let lineName = [];
          let lineValue = [];
          let lineChart = [];
          getQueryTraceResult(obj)
          .then( res => {
              res.data.list.forEach(ele=>{
                 lineName.push(ele.in_date);
                 lineValue.push(ele.success_count);
                 lineChart.push(ele.error_count);
              })
              if(lineName.length>0){
                this.lineShow2 = false;
                 this.getQueryTraceResultFun1(lineName,lineValue,lineChart);
              }else{
                this.Dispose('echartsThree_query')
                this.lineShow2 = true;
              }

              this.Dataloading5 = false;
            })
             .catch(error => {
                 console.log(error)
             })
        },
        getQueryTraceResultFun1(lineName,lineValue,lineChart){
          let echartsThree_query = this.$echarts.init(document.getElementById('echartsThree_query'));
          window.addEventListener('resize', function () {
            echartsThree_query.resize()
          })
          echartsThree_query.setOption({
            tooltip: {
            	trigger: 'axis',
              // formatter:function(params){
              //   var res = "", sum = 0;
              //   res = params[0].axisValue + "<br/>";
              //   for (var i = 0; i < params.length; i++) {
              //    var series = params[i];
              //    sum += Number(series.data);
              //    res += series.marker + series.seriesName + "：" + series.data + "<br/>";
              //   }
              //   return res;
              //  }
            },
           legend: {
                  orient: 'vertical',
                  right: 100,
                  data: ['查询成功', '查询失败']
              },
              dataZoom : {//实现缩放功能
                  show : true,
                  realtime : true,
                  start : 0,
                  end : 50
              },
            xAxis: {
                   type: 'category',
                   data: lineName
               },
           yAxis: {
                show:true,
                type: 'value',
                name: '查询结果',
                nameLocation: 'middle',
                nameGap: 50,
                axisLine: {show:false},
                axisTick: {show:false},
                splitLine:{
            　　　　show:false
            　　 },
                axisLabel: {
              //             color: '#fff',
                          //fontSize: 16,
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
               max: 2000,
              interval: 500,

           },
         series: [{
                      data: lineChart,
                      type: 'bar',
                       stack: '总量',
                      name:'查询失败',
                      color: "#ff0000",
                      label: {
                          show: false,
                          position: 'insideRight'
                      }
                  },{
                      data: lineValue,
                      type: 'bar',
                       stack: '总量',
                      name:'查询成功',
                      color: "#55aa00",
                      label: {
                          show: false,
                          position: 'insideRight'
                      }
                  }]
          })

        },
        drawMap1(){

          // document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
          this.map = new AMap.Map('map_canvas1', { //创建地图
              zoom: 13, //地图显示的缩放级别
            center: [116.3977432251, 39.9078927749]  ,//地图中心点坐标值
             mapStyle: 'amap://styles/000ddddacab790d37780d4e1b43b1862'//设置地图的显示样式
          });
          // this.getQueryMachineTimelinessFun();
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
        getQueryMachineTypeFun(){
          getQueryMachineType()
            .then( res => {
              res.data.nodeList.forEach(ele=>{
                this.nodeList.push(ele);
              })
              res.data.groupList.forEach(ele=>{
                this.groupNameList.push(ele);
              })
            })
            .catch(error => {
                console.log(error)
            })
        },
        getQueryTraceResultTypeFun(){
          getQueryTraceResultType()
            .then( res => {
              res.data.NodeTypeList.forEach(ele=>{
                this.NodeTypeList.push(ele);
              })
              res.data.NodeTypeDetailList.forEach(ele=>{
                this.NodeTypeDetailList.push(ele);
              })
              res.data.GroupNameList.forEach(ele=>{
                this.GroupNameList.push(ele);
              })
              res.data.nodeNameList.forEach(ele=>{
                this.nodeNameList.push(ele);
              })
              res.data.device.forEach(ele=>{
                this.deviceList.push(ele);
              })

            })
            .catch(error => {
                console.log(error)
            })
        },
        getQueryTraceSuccessErrorFun(){
          this.Dataloading6 = true;
          let check_type = '';
          let type = '';
          let trace_result = '';
          let node_name = '';
          let startDate = '';
          let endDate = '';
         if(this.dataSelect == '查询日期'){
            type = 'month';
         }else if(this.dataSelect == '今天'){
           type = 'day';
         }else if(this.dataSelect == '昨天'){
           type = 'yesDay';
         }else if(this.dataSelect == '昨天'){
           type = 'yesDay';
         }else if(this.dataSelect == '最近7天'){
           type = 'week';
         }else if(this.dataSelect == '最近30天'){
           type = 'month';
         }else if(this.dataSelect == '最近90天'){
           type = 'three_month';
         }else if(this.dataSelect == '近一年'){
           type = 'year';
         }
         else if(this.dataSelect == '自定义时间'){
          startDate = this.startDate;
          endDate = this.endDate;
         }
         else if(this.dataSelect == ''){
           startDate = this.startDate;
           endDate = this.endDate;
         }
         if(this.nodeNameSelect1=='节点名称'){
           node_name = '';
         }else{
            if(this.nodeNameSelect1.indexOf(',')==-1){
              node_name = "'" + this.nodeNameSelect1 + "'";
            }else{
              let str = '';
              let arr = this.nodeNameSelect1.split(',');
              arr.forEach(ele=>{
                str += "'" + ele + "',";
              })
              node_name = str.substr(0,str.length-1);
            }
         }
         if(this.deviceSelect=='查询设备'){
           check_type = '';
         }else{
            if(this.deviceSelect.indexOf(',')==-1){
              check_type = "'" + this.deviceSelect + "'";
            }else{
              let str = '';
              let arr = this.deviceSelect.split(',');
              arr.forEach(ele=>{
                str += "'" + ele + "',";
              })
              check_type = str.substr(0,str.length-1);
            }
         }
         if(this.traceResultSelect1=='查询结果'){
           trace_result = '';
         }else{
            if(this.traceResultSelect1 == '查询成功'){
              trace_result = '1';
            }
            if(this.traceResultSelect1 == '查询失败'){
              trace_result = '0';
            }
         }
         let obj = {
             "type":type,
             "trace_result":trace_result,
             "node_name":node_name,
             "check_type":check_type,
             "startDate":startDate,
             "endDate":endDate
         }
         console.log(obj);
         let lineName = '';
         let lineValue = '';
         let lineChar = {};
         getQueryTraceSuccessError(obj)
          .then( res => {
           /*   res.data.list.forEach(ele=>{
                 lineName.push(ele.success);
                 lineValue.push(ele.error);
              }) */
              lineName = res.data.list[0].success_count;
              lineValue = res.data.list[0].error_count;
              if(parseFloat(lineName)>parseFloat(lineValue)){

                    lineChar = {"name":'查询成功',"count": res.data.list[0].success}
              }else if(parseFloat(lineName)<parseFloat(lineValue)){
                    lineChar = {"name":'查询失败',"count": res.data.list[0].error}
              }
              // lineChar = res.data.list[0].success;
               console.log(lineName);
               console.log(lineValue);
               if(lineName!=null && lineValue!=null){
                 this.lineShow = false;
                 this.getQueryTraceSuccessErrorFun1(lineName,lineValue,lineChar);
               }else{
                 this.lineShow = true;
                 this.Dispose('echartsFour_query')
               }
               this.Dataloading6 = false;
            })
             .catch(error => {
                 console.log(error)
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
        getQueryTraceSuccessErrorFun1(lineName,lineValue,lineChar){
          let echartsFour_query = this.$echarts.init(document.getElementById('echartsFour_query'));
          window.addEventListener('resize', function () {
            echartsFour_query.resize()
          })
          echartsFour_query.setOption({
             tooltip: {
                    trigger: 'item',
                     formatter: '{b}: {c}<br/>占比:{d}%'
                },
            legend: {
                     bottom: 10,
                     left: 'center',
                     data: ['查询成功', '查询失败'],

                 },
             color:['#A1CB80','#c74a66'],
             title:{
                             text:lineChar.count,
                             left:"center",
                             top:"50%",
                             textStyle:{
                                 color:"#777",
                                  fontSize:30,
                                 align:"center"
                             }
                         },
             graphic:{
                             type:"text",
                             left:"center",
                             top:"45%",
                             style:{
                                 text: lineChar.name,
                                 textAlign:"center",
                                 fill:"#A1CB80",
                                 fontSize:20,

                             }
                         },
            series: [
                    {

                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'

                        },
                        labelLine: {
                           how: true,
                           fontSize: '16',
                           fontWeight: 'bold'
                        },
                        data: [
                            {value: lineName, name: '查询成功'},
                            {value: lineValue, name: '查询失败'}
                        ]
                    }
                ]
          },true)
        },
        getQueryTraceResultDetailFun(){
             this.Dataloading7 = true;
             let check_type = '';
             let type = '';
             let trace_result = '';
             let node_name = '';
             let startDate = '';
             let endDate = '';
            if(this.dataSelect1 == '查询日期'){
               type = 'month';
            }else if(this.dataSelect1 == '今天'){
              type = 'day';
            }else if(this.dataSelect1 == '昨天'){
              type = 'yesDay';
            }else if(this.dataSelect1 == '最近7天'){
              type = 'week';
            }else if(this.dataSelect1 == '最近30天'){
              type = 'month';
            }else if(this.dataSelect1 == '最近90天'){
              type = 'three_month';
            }else if(this.dataSelect1 == '近一年'){
              type = 'year';
            }
            else if(this.dataSelect1 == '自定义时间'){
             startDate = this.startDate;
             endDate = this.endDate;
            }
            else if(this.dataSelect1 == ''){
              startDate = this.startDate;
              endDate = this.endDate;
            }
            if(this.nodeNameSelect2=='节点名称'){
              node_name = '';
            }else{
               if(this.nodeNameSelect2.indexOf(',')==-1){
                 node_name = "'" + this.nodeNameSelect2 + "'";
               }else{
                 let str = '';
                 let arr = this.nodeNameSelect2.split(',');
                 arr.forEach(ele=>{
                   str += "'" + ele + "',";
                 })
                 node_name = str.substr(0,str.length-1);
               }
            }
            if(this.deviceSelect1=='查询设备'){
              check_type = '';
            }else{
               if(this.deviceSelect1.indexOf(',')==-1){
                 check_type = "'" + this.deviceSelect1 + "'";
               }else{
                 let str = '';
                 let arr = this.deviceSelect1.split(',');
                 arr.forEach(ele=>{
                   str += "'" + ele + "',";
                 })
                 check_type = str.substr(0,str.length-1);
               }
            }
            if(this.traceResultSelect2=='查询结果'){
              trace_result = '';
            }else{
               if(this.traceResultSelect2 == '查询成功'){
                 trace_result = '1';
               }
               if(this.traceResultSelect2 == '查询失败'){
                 trace_result = '0';
               }
            }
            let obj = {
                "type":type,
                "trace_result":trace_result,
                "node_name":node_name,
                "check_type":check_type,
                "startDate":startDate,
                "endDate":endDate
            }
            console.log(obj);
            getQueryTraceResultDetail(obj)
              .then( res => {
                    this.TraceResultDetailList = res.data.list
                    this.Dataloading7 = false;
                })
               .catch(error => {
                   console.log(error)
               })
        },
        getQueryTraceErrorResultFun(){
          this. Dataloading8 = true;
           let check_type = '';
           let type = '';
           let node_name = '';
           let startDate = '';
           let endDate = '';
          if(this.dataSelect2 == '查询日期'){
             type = 'month';
          }else if(this.dataSelect2 == '今天'){
            type = 'day';
          }else if(this.dataSelect2 == '昨天'){
            type = 'yesDay';
          }else if(this.dataSelect2 == '最近7天'){
            type = 'week';
          }else if(this.dataSelect2 == '最近30天'){
            type = 'month';
          }else if(this.dataSelect2 == '最近90天'){
            type = 'three_month';
          }else if(this.dataSelect2 == '近一年'){
            type = 'year';
          }
          else if(this.dataSelect2 == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.dataSelect2 == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.nodeNameSelect3=='节点名称'){
            node_name = '';
          }else{
             if(this.nodeNameSelect3.indexOf(',')==-1){
               node_name = "'" + this.nodeNameSelect3 + "'";
             }else{
               let str = '';
               let arr = this.nodeNameSelect3.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               node_name = str.substr(0,str.length-1);
             }
          }
          if(this.deviceSelect2=='查询设备'){
            check_type = '';
          }else{
             if(this.deviceSelect2.indexOf(',')==-1){
               check_type = "'" + this.deviceSelect2 + "'";
             }else{
               let str = '';
               let arr = this.deviceSelect2.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               check_type = str.substr(0,str.length-1);
             }
          }
          let obj = {
              "type":type,
              "node_name":node_name,
              "check_type":check_type,
              "startDate":startDate,
              "endDate":endDate
          }
          console.log(obj);
          let lineName = []
          let lineValue = {}

          getQueryTraceErrorResult(obj)
            .then( res => {
              res.data.list.forEach(ele=>{
                   let map = {}
                if(!lineValue.name){

                    lineValue = {"name":ele.errorResult,"count":ele.errorCount,"percentage":ele.percentage}
                }else{
                 if(parseFloat(ele.errorCount) >  parseFloat(lineValue.count)){
                      lineValue = {"name":ele.errorResult,"count":ele.errorCount,"percentage":ele.percentage}
                 }
                }
                map = {"name":ele.errorResult,"value":ele.errorCount}
                lineName.push(map);
              })
                 console.log(lineValue)

            if(lineName.length>0 && lineValue!='{}'){
              this.lineShow1 = false;
              this.getQueryTraceErrorResultFun1(lineName,lineValue);
            }else{
              this.lineShow1 = true;
              this.Dispose('echartsFive_query');
            }
            this. Dataloading8 = false;
            })
            .catch(error => {
                console.log(error)
            })
        },
        getQueryTraceErrorResultFun1(lineName,lineValue){
          let echartsFive_query = this.$echarts.init(document.getElementById('echartsFive_query'));
          window.addEventListener('resize', function () {
            echartsFive_query.resize()
          })
          echartsFive_query.setOption({
             tooltip: {
                    trigger: 'item',
                     formatter: '{b}: {c}<br/>占比:{d}%'
                },
            legend: {
                     top: 'bottom',
                     left: 'center',
                     itemWidth: 12,
                     itemHeight: 12,
                     data: ['门店缺码', '其他原因','未上传追溯信息','查询码异常'],

                 },
             color:['#A1CB80','#c74a66','#ffff00','#0055ff'],
            title:{
                             text:lineValue.percentage,
                             left:"center",
                             top:"50%",
                             textStyle:{
                                 color:"#777",
                                  fontSize:20,
                                 align:"center"
                             }
                          },
             graphic:{
                             type:"text",
                             left:"center",
                             top:"45%",
                             style:{
                                 text: lineValue.name ? lineValue.name : '',
                                 textAlign:"center",
                                 fill:"#ff0000",
                                 fontSize:14,

                             }
                         },
            series: [
                    {

                        type: 'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'

                        },
                        labelLine: {
                           how: true,
                           fontSize: '16',
                           fontWeight: 'bold'
                        },
                        data:lineName
                    }
                ]
          })
        },
        getQueryTraceErrorResultDetailFun(){
          this.Dataloading9 = true;
          let check_type = '';
           let type = '';
           let node_name = '';
           let startDate = '';
           let endDate = '';
          if(this.dataSelect3 == '查询日期'){
             type = 'month';
          }else if(this.dataSelect3 == '今天'){
            type = 'day';
          }else if(this.dataSelect3 == '昨天'){
            type = 'yesDay';
          }else if(this.dataSelect3 == '最近7天'){
            type = 'week';
          }else if(this.dataSelect3 == '最近30天'){
            type = 'month';
          }else if(this.dataSelect3 == '最近90天'){
            type = 'three_month';
          }else if(this.dataSelect3 == '近一年'){
            type = 'year';
          }
          else if(this.dataSelect3 == '自定义时间'){
           startDate = this.startDate;
           endDate = this.endDate;
          }
          else if(this.dataSelect3 == ''){
            startDate = this.startDate;
            endDate = this.endDate;
          }
          if(this.nodeNameSelect4=='节点名称'){
            node_name = '';
          }else{
             if(this.nodeNameSelect4.indexOf(',')==-1){
               node_name = "'" + this.nodeNameSelect4 + "'";
             }else{
               let str = '';
               let arr = this.nodeNameSelect4.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               node_name = str.substr(0,str.length-1);
             }
          }
          if(this.deviceSelect3=='查询设备'){
            check_type = '';
          }else{
             if(this.deviceSelect3.indexOf(',')==-1){
               check_type = "'" + this.deviceSelect3 + "'";
             }else{
               let str = '';
               let arr = this.deviceSelect3.split(',');
               arr.forEach(ele=>{
                 str += "'" + ele + "',";
               })
               check_type = str.substr(0,str.length-1);
             }
          }
          let obj = {
              "type":type,
              "node_name":node_name,
              "check_type":check_type,
              "startDate":startDate,
              "endDate":endDate
          }
          console.log(obj);
          getQueryTraceErrorResultDetail(obj)
            .then( res => {
                  this.TraceErrorResultDetailList = res.data.list
                  this.Dataloading9 = false;
              })
             .catch(error => {
                 console.log(error)
             })

        },
        handlerCommand(command){
          if(command.flag==0){
            this.nodeIndex = command.index;
            this.table1selectOne = '节点名称';
            if(command.value=='全部'){
              this.table1selectOne = '节点名称';
            }else{
              this.table1selectOne = command.value;
            }
          }else if(command.flag==1){
            this.regionIndex = command.index;
            this.table1selectTwo = '所属大区';
            if(command.value=='全部'){
              this.table1selectTwo = '所属大区';
            }else{
              this.table1selectTwo = command.value;
            }
          }
          else if(command.flag==2){
            this.nodeIndex = command.index;
            this.table1selectFour = '节点名称';
            if(command.value=='全部'){
              this.table1selectFour = '节点名称';
            }else{
              this.table1selectFour = command.value;
            }
          }
          else if(command.flag==3){
            this.groupNameIndex = command.index;
            this.table1selectThree = '集团名称';
            if(command.value=='全部'){
              this.table1selectThree = '集团名称';
            }else{
              this.table1selectThree = command.value;
            }
          }else if(command.flag==4){
            this.dataIndex = command.index;
            this.echartsselectOne = '事件日期';
            if(command.value=='全部时间'){
              this.echartsselectOne = '事件日期';
            }else{
              this.echartsselectOne = command.value;
            }
          }else if(command.flag==5){
            this.dataIndex1 = command.index;
            this.echartsselectTwo = '查询日期';
            if(command.value=='全部日期'){
              this.echartsselectTwo = '查询日期';
            }else{
              this.echartsselectTwo = command.value;
            }
            if(command.value=='自定义时间'){
              this.types  = 1
              this.mydata = true;

            }
          }else if(command.flag==6){
            this.traceResultIndex = command.index;
            this.traceResult = '查询结果';
            if(command.value=='全部'){
              this.traceResult = '查询结果';
            }else{
              this.traceResult = command.value;
            }
          }else if(command.flag==7){
            this.nodeTypeIndex = command.index;
            this.nodeTypeSelect = '节点类型';
            if(command.value=='全部'){
              this.nodeTypeSelect = '节点类型';
            }else{
              this.nodeTypeSelect = command.value;
            }
          }else if(command.flag==8){
            this.nodeTypeDetailIndex = command.index;
            this.nodeTypeDetailSelect = '节点详细类型';
            if(command.value=='全部'){
              this.nodeTypeDetailSelect = '节点详细类型';
            }else{
              this.nodeTypeDetailSelect = command.value;
            }
          }else if(command.flag==9){
            this.groupNameIndex= command.index;
            this.groupNameSelect = '集团名称';
            if(command.value=='全部'){
              this.groupNameSelect = '集团名称';
            }else{
              this.groupNameSelect = command.value;
            }
          }else if(command.flag==10){
            this.nodeNameIndex = command.index;
            this.nodeNameSelect = '节点名称';
            if(command.value=='全部'){
              this.nodeNameSelect = '节点名称';
            }else{
              this.nodeNameSelect = command.value;
            }
          }else if(command.flag==11){
            this.regionIndex1 = command.index;
            this.regionSelect = '所属大区';
            if(command.value=='全部'){
              this.regionSelect = '所属大区';
            }else{
              this.regionSelect = command.value;
            }
          }else if(command.flag==12){
            this.dataIndex2 = command.index;
            this.dataSelect = '查询日期';
            if(command.value=='全部日期'){
              this.dataSelect = '查询日期';
            }else{
              this.dataSelect = command.value;
            }
            if(command.value=='自定义时间'){
              this.types = 2
              this.mydata = true;

            }
          }else if(command.flag==13){
            this.nodeNameIndex = command.index;
            this.nodeNameSelect1 = '节点名称';
            if(command.value=='全部'){
              this.nodeNameSelect1 = '节点名称';
            }else{
              this.nodeNameSelect1 = command.value;
            }
          }else if(command.flag==14){
            this.deviceIndex = command.index;
            this.deviceSelect = '查询设备';
            if(command.value=='全部'){
              this.deviceSelect = '查询设备';
            }else{
              this.deviceSelect = command.value;
            }
          } else if(command.flag==15){
            this.traceResultIndex = command.index;
            this.traceResultSelect1 = '查询结果';
            if(command.value=='全部'){
              this.traceResultSelect1 = '查询结果';
            }else{
              this.traceResultSelect1 = command.value;
            }
          }else if(command.flag==16){
            this.dataIndex2 = command.index;
            this.dataSelect1 = '查询日期';
            if(command.value=='全部日期'){
              this.dataSelect1 = '查询日期';
            }else{
              this.dataSelect1 = command.value;
            }
            if(command.value=='自定义时间'){
              this.types = 3
              this.mydata = true;

            }
          }else if(command.flag==17){
            this.nodeNameIndex = command.index;
            this.nodeNameSelect2 = '节点名称';
            if(command.value=='全部'){
              this.nodeNameSelect2 = '节点名称';
            }else{
              this.nodeNameSelect2 = command.value;
            }
          }else if(command.flag==18){
            this.deviceIndex = command.index;
            this.deviceSelect1 = '查询设备';
            if(command.value=='全部'){
              this.deviceSelect1 = '查询设备';
            }else{
              this.deviceSelect1 = command.value;
            }
          }else if(command.flag==19){
            this.traceResultIndex = command.index;
            this.traceResultSelect2 = '查询结果';
            if(command.value=='全部'){
              this.traceResultSelect2 = '查询结果';
            }else{
              this.traceResultSelect2 = command.value;
            }
          }else if(command.flag==20){
            this.dataIndex2 = command.index;
            this.dataSelect2 = '查询日期';
            if(command.value=='全部日期'){
              this.dataSelect2 = '查询日期';
            }else{
              this.dataSelect2 = command.value;
            }
            if(command.value=='自定义时间'){
              this.types = 4
              this.mydata = true;

            }
          }else if(command.flag==21){
            this.nodeNameIndex = command.index;
            this.nodeNameSelect3 = '节点名称';
            if(command.value=='全部'){
              this.nodeNameSelect3 = '节点名称';
            }else{
              this.nodeNameSelect3 = command.value;
            }
          }else if(command.flag==22){
            this.deviceIndex = command.index;
            this.deviceSelect2 = '查询设备';
            if(command.value=='全部'){
              this.deviceSelect2 = '查询设备';
            }else{
              this.deviceSelect2 = command.value;
            }
          }else if(command.flag==23){
            this.dataIndex2 = command.index;
            this.dataSelect3 = '查询日期';
            if(command.value=='全部日期'){
              this.dataSelect3 = '查询日期';
            }else{
              this.dataSelect3 = command.value;
            }
            if(command.value=='自定义时间'){
              this.types = 5
              this.mydata = true;

            }
          }else if(command.flag==24){
            this.nodeNameIndex = command.index;
            this.nodeNameSelect4 = '节点名称';
            if(command.value=='全部'){
              this.nodeNameSelect4 = '节点名称';
            }else{
              this.nodeNameSelect4 = command.value;
            }
          }else if(command.flag==25){
            this.deviceIndex = command.index;
            this.deviceSelect3 = '查询设备';
            if(command.value=='全部'){
              this.deviceSelect3 = '查询设备';
            }else{
              this.deviceSelect3 = command.value;
            }
          }
          if(command.flag==0 || command.flag==1){
            this.getQueryMachineNotOnlineFun();
          }
          if(command.flag==2 || command.flag==3){
            this.getQueryMinMachineDateFun();
          }
          if(command.flag==4 ){
            this.getQueryMachineFun();
          }
          if(command.flag==6 || command.flag==7 || command.flag==8 || command.flag==9 || command.flag==10 || command.flag==11){
            this.getQueryTraceResultFun();
          }
          if(command.flag==5 && command.value!='自定义时间'){
              this.getQueryTraceResultFun();
          }
          if(command.flag==13 || command.flag==14 || command.flag==15 ){
              this.getQueryTraceSuccessErrorFun();
          }
          if(command.flag==12 && command.value!='自定义时间'){
              this.getQueryTraceSuccessErrorFun();
          }
          if(command.flag==17 || command.flag==18 || command.flag==19 ){
              this.getQueryTraceResultDetailFun();
          }
          if(command.flag==16 && command.value!='自定义时间'){
              this.getQueryTraceResultDetailFun();
          }
          if(command.flag==21 || command.flag==22  ){
              this.getQueryTraceErrorResultFun();
          }
          if(command.flag==20 && command.value!='自定义时间'){
              this.getQueryTraceErrorResultFun();
          }
          if(command.flag==24 || command.flag==25  ){
              this.getQueryTraceErrorResultDetailFun();
          }
          if(command.flag==23 && command.value!='自定义时间'){
              this.getQueryTraceErrorResultDetailFun();
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
          console.log(this.types);

          this.startDate = this.sizeForm.date1
          this.endDate = this.sizeForm.date2
          if(this.types == 1){
            this.getQueryTraceResultFun();
            this.handlerClose1();
          }
          if(this.types == 2){
             this.getQueryTraceSuccessErrorFun();
             this.handlerClose1();
           }
           if(this.types == 3){
              this.getQueryTraceResultDetailFun();
              this.handlerClose1();
            }
          if(this.types == 4){
             this.getQueryTraceErrorResultFun();
             this.handlerClose1();
           }
           if(this.types == 5){
              this.getQueryTraceErrorResultDetailFun();
              this.handlerClose1();
            }
        },
        //添加
        handlerAdd(item,index){
          if(this.AddName.indexOf(item.name) == -1){
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
           else if(this.Index==4){
             this.AddDataFive.splice(index,1);
           }
           else if(this.Index==5){
             this.AddDataSix.splice(index,1);
           }
           else if(this.Index==6){
             this.AddDataSeven.splice(index,1);
           }
           else if(this.Index==7){
             this.AddDataEight.splice(index,1);
           }
           else if(this.Index==8){
             this.AddDataNine.splice(index,1);
           }
           else if(this.Index==9){
             this.AddData1.splice(index,1);
           }
           else if(this.Index==10){
             this.AddData2.splice(index,1);
           }
           else if(this.Index==11){
             this.AddData3.splice(index,1);
           }
           else if(this.Index==12){
             this.AddData4.splice(index,1);
           }
           else if(this.Index==13){
             this.AddData5.splice(index,1);
           }
           else if(this.Index==14){
             this.AddData6.splice(index,1);
           }
           else if(this.Index==15){
             this.AddData7.splice(index,1);
           }
           else if(this.Index==16){
             this.AddData8.splice(index,1);
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
          else if(this.Index==2){
            this.AddDataThree = [];
          }
          else if(this.Index==3){
            this.AddDataFour = [];
          }
          else if(this.Index==4){
            this.AddDataFive = [];
             }
          else if(this.Index==5){
            this.AddDataSix = [];
          }
          else if(this.Index==6){
            this.AddDataSeven = [];
          }
          else if(this.Index==7){
            this.AddDataEight = [];
          }
          else if(this.Index==8){
            this.AddDataNine = [];
          }
          else if(this.Index==9){
            this.AddData1 = [];
          }
          else if(this.Index==10){
            this.AddData2 = [];
          }
          else if(this.Index==11){
            this.AddData3 = [];
          }
          else if(this.Index==12){
            this.AddData4 = [];
          }
          else if(this.Index==13){
            this.AddData5 = [];
          }
          else if(this.Index==14){
            this.AddData6 = [];
          }
          else if(this.Index==15){
            this.AddData7 = [];
          }
          else if(this.Index==16){
            this.AddData8 = [];
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
              this.nodeList.forEach(ele=>{
                if(ele.nodeList!='全部'){
                  let obj = {
                    Addshow:false,
                    name:ele.node_name
                  }
                  arr.push(obj);
                }
              })
              this.multiData = arr;
              this.AddData = this.AddDataOne;
          }else if(type==1){
          this.regionList.forEach(ele=>{
            if(ele.regionList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataTwo;
        }
        else if(type==2){
          this.nodeList.forEach(ele=>{
            if(ele.nodeList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataThree;
        }
        else if(type==3){
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
        else if(type==4){
          this.NodeTypeList.forEach(ele=>{
            if(ele.NodeTypeList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataFive;
        }
        else if(type==5){
          this.NodeTypeDetailList.forEach(ele=>{
            if(ele.NodeTypeDetailList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.node_detail_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataSix;
        }
        else if(type==6){
          this.GroupNameList.forEach(ele=>{
            if(ele.GroupNameList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.group_name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataSeven;
        }else if(type==7){
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
          this.AddData = this.AddDataEight;
        }else if(type==8){
          this.regionList.forEach(ele=>{
            if(ele.regionList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.name
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddDataNine;
        }else if(type==9){
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
          this.AddData = this.AddData1;
        }
        else if(type==10){
          this.deviceList.forEach(ele=>{
            if(ele.deviceList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.check_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddData2;
        }else if(type==11){
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
          this.AddData = this.AddData3;
        }
        else if(type==12){
          this.deviceList.forEach(ele=>{
            if(ele.deviceList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.check_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddData4;
        }else if(type==13){
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
          this.AddData = this.AddData5;
        }
        else if(type==14){
          this.deviceList.forEach(ele=>{
            if(ele.deviceList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.check_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddData6;
        }else if(type==15){
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
          this.AddData = this.AddData7;
        }
        else if(type==16){
          this.deviceList.forEach(ele=>{
            if(ele.deviceList!='全部'){
              let obj = {
                Addshow:false,
                name:ele.check_type
              }
              arr.push(obj);
            }
          })
          this.multiData = arr;
          this.AddData = this.AddData8;
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
                this.table1selectOne = arr[0];
              }else if(this.Index==1){
                this.table1selectTwo = arr[0];
              }
              else if(this.Index==2){
                this.table1selectFour = arr[0];
              }
              else if(this.Index==3){
                this.table1selectThree = arr[0];
              }
              else if(this.Index==4){
                this.nodeTypeSelect = arr[0];
              }
              else if(this.Index==5){
                this.nodeTypeDetailSelect = arr[0];
              }
              else if(this.Index==6){
                this.groupNameSelect = arr[0];
              }
              else if(this.Index==7){
                this.nodeNameSelect = arr[0];
              }
              else if(this.Index==8){
                this.regionSelect = arr[0];
              }
              else if(this.Index==9){
                this.nodeNameSelect1 = arr[0];
              }
              else if(this.Index==10){
                this.deviceSelect = arr[0];
              } else if(this.Index==11){
                this.nodeNameSelect2 = arr[0];
              }
              else if(this.Index==12){
                this.deviceSelect1 = arr[0];
              }else if(this.Index==13){
                this.nodeNameSelect3 = arr[0];
              }
              else if(this.Index==14){
                this.deviceSelect2 = arr[0];
              }
              else if(this.Index==15){
                this.nodeNameSelect4 = arr[0];
              }
              else if(this.Index==16){
                this.deviceSelect3 = arr[0];
              }
            }else{
              if(this.Index==0){
                this.table1selectOne = arr. join(',');
              }else if(this.Index==1){
                this.table1selectTwo = arr. join(',');
              }
              else if(this.Index==2){
                this.table1selectFour = arr. join(',');
              }
              else if(this.Index==3){
                this.table1selectThree = arr. join(',');
              }
              else if(this.Index==4){
                this.nodeTypeSelect = arr. join(',');
              }
              else if(this.Index==5){
                this.nodeTypeDetailSelect = arr. join(',');
              }
              else if(this.Index==6){
                this.groupNameSelect = arr. join(',');
              }
              else if(this.Index==7){
                this.nodeNameSelect = arr. join(',');
              }
              else if(this.Index==8){
                this.regionSelect = arr. join(',');
              }
              else if(this.Index==9){
                this.nodeNameSelect1 = arr. join(',');
              }
              else if(this.Index==10){
                this.deviceSelect = arr. join(',');
              }else if(this.Index==11){
                this.nodeNameSelect2 = arr. join(',');
              }
              else if(this.Index==12){
                this.deviceSelect1 = arr. join(',');
              }else if(this.Index==13){
                this.nodeNameSelect3 = arr. join(',');
              }
              else if(this.Index==14){
                this.deviceSelect2 = arr. join(',');
              }else if(this.Index==15){
                this.nodeNameSelect4 = arr. join(',');
              }
              else if(this.Index==16){
                this.deviceSelect3 = arr. join(',');
              }
            }
          }else{
            if(this.Index==0){
              this.table1selectOne = '节点名称';
              this.AddDataOne = [];
            }else if(this.Index==1){
              this.table1selectTwo = '所属大区';
              this.AddDataTwo = [];
            }
            else if(this.Index==2){
              this.table1selectFour = '节点名称';
              this.AddDataThree = [];
            }
            else if(this.Index==3){
              this.table1selectThree = '集团名称';
              this.AddDataFour = [];
            }
            else if(this.Index==4){
              this.nodeTypeSelect = '节点类型';
              this.AddDataFive = [];
            }
            else if(this.Index==5){
              this.nodeTypeDetailSelect = '节点详细分类';
              this.AddDataSix = [];
            }
            else if(this.Index==6){
              this.groupNameSelect = '集团名称';
              this.AddDataSeven = [];
            }
            else if(this.Index==7){
              this.nodeNameSelect = '节点名称';
              this.AddDataEight = [];
            }
            else if(this.Index==8){
              this.regionSelect = '所属大区';
              this.AddDataNine = [];
            }
            else if(this.Index==9){
              this.nodeNameSelect1 = '节点名称';
              this.AddData1 = [];
            }
            else if(this.Index==10){
              this.deviceSelect = '查询设备';
              this.AddData2 = [];
            }
            else if(this.Index==11){
              this.nodeNameSelect2 = '节点名称';
              this.AddData3 = [];
            }
            else if(this.Index==12){
              this.deviceSelect1 = '查询设备';
              this.AddData4 = [];
            }
            else if(this.Index==13){
              this.nodeNameSelect3 = '节点名称';
              this.AddData5 = [];
            }
            else if(this.Index==14){
              this.deviceSelect2 = '查询设备';
              this.AddData6 = [];
            }
            else if(this.Index==15){
              this.nodeNameSelect4 = '节点名称';
              this.AddData7 = [];
            }
            else if(this.Index==16){
              this.deviceSelect3 = '查询设备';
              this.AddData8 = [];
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
          }else if(this.Index==5){
            this.AddDataSix = this.AddData;
          }else if(this.Index==6){
            this.AddDataSeven = this.AddData;
          }else if(this.Index==7){
            this.AddDataEight = this.AddData;
          }else if(this.Index==8){
            this.AddDataNine = this.AddData;
          }else if(this.Index==9){
            this.AddData1 = this.AddData;
          }else if(this.Index==10){
            this.AddData2 = this.AddData;
          }else if(this.Index==11){
            this.AddData3 = this.AddData;
          }else if(this.Index==12){
            this.AddData4 = this.AddData;
          }else if(this.Index==13){
            this.AddData5 = this.AddData;
          }else if(this.Index==14){
            this.AddData6 = this.AddData;
          }else if(this.Index==15){
            this.AddData7 = this.AddData;
          }else if(this.Index==16){
            this.AddData8 = this.AddData;
          }
          this.handlerClose();
          if(this.Index==0 || this.Index==1){
             this.getQueryMachineNotOnlineFun();
          }if(this.Index==2 || this.Index==3){
            this.getQueryMinMachineDateFun();
          }
          if(this.Index==4 || this.Index==5 || this.Index==6 || this.Index==7 || this.Index==8 ){
            this.getQueryTraceResultFun();
          }
          if(this.Index==9 || this.Index==10 ){
            this.getQueryTraceSuccessErrorFun();
          }
          if(this.Index==11 || this.Index==12 ){
            this.getQueryTraceResultDetailFun();
          }
          if(this.Index==13 || this.Index==14 ){
             this.getQueryTraceErrorResultFun();
          }
          if(this.Index==15 || this.Index==16 ){
              this.getQueryTraceErrorResultDetailFun();
          }
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
    .item:last-child{
      border: none;
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
    .title1{
      padding-left: 45px;
      font-size: 14px;
      color: #999999;
    }
    .percentage{
          padding-left: 45px;
         font-size: 36px;color: #999999;
         white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
          }
    .subAll{
      padding: 10px;
      background: #fff;
      width: 100%;
      height: 484px;
      border-bottom: 3px solid #E8EBED;
      .sub-item{
        width: 40%;
        height: 484px;
        float: left;
        border-right: 3px solid #E8EBED;
        .box{
          height: 190px;
          display: flex;
        }
        .sub-num1{
          flex: 1;
          height: 190px;
          text-align: center;
          border-right: 3px solid #E8EBED;
          border-bottom: 3px solid #E8EBED;
          .sum{
             margin-top: 5px;
            color: #000000;
            line-height: 35px;
            font-size: 36px;
            span{
               font-size: 13px;
               color: #000000;
            }
          }

          }
          .myp{
            font-size: 13px;
            line-height: 25px;
            margin-top: 44px;
          }

        }
        .sub-num2{
          flex: 1;
          height: 190px;
          text-align: center;
          border-bottom: 3px solid #E8EBED;
          .online{
            margin-top: 5px;
            font-size: 26px;
            color: #000000;
            line-height: 35px;
            font-size: 36px;
            span{
               font-size: 13px;
               color: #000000;
            }
          }
          .fault{
            font-size: 13px;
            color: #ff0000;
            span{
               font-size: 13px;
               color: #000000;
            }
            .el-icon-arrow-up{
              font-weight: bold;
            }
          .myp{
            font-size: 13px;
            line-height: 25px;
            margin-top: 44px;
          }
        }
        .sub-num3{
          clear: both;
          width: 430px;
          height: 285px;
          .myp{
            /* margin-top: 224px; */
            padding-left: 34px;
            line-height: 25px;
            font-size: 14px;
            font-weight: 700;
          }

        }
      }
      .sub-item2{
        width: 58%;
        height: 484px;
        float: left;
        .map-title{
          padding-top: 26px;
          padding-left: 34px;
          font-size: 14px;
          font-weight: 700;
        }
        .map{
          top: 21px;
          bottom: 32px;
          left: 40px;
          right: 40px;
        }
      }
    }
    .mytable{
      width: 100%;
      height: 579px;
       background: #fff;
      .table-item1{
       float: left;
        width: 48%;
        height: 579px;
        border-right: 3px solid #E8EBED;
        .table-item1-title{
         float: left;
         font-size: 14px;
         font-weight: 700;
         padding-top: 10px;
         padding-left: 37px;
        }
        .dtaw-table1{
          width: 90%;
          /* height: 70%; */
          padding-top: 10px;
          padding-left: 37px;
        }
      }
      .table-item2{
       float: left;
        width: 50%;
        height: 579px;
        .table-item2-title{
          float: left;
          font-size: 14px;
          font-weight: 700;
          padding-top: 10px;
          padding-left: 37px;
        }
        .dtaw-table2{
           width: 90%;
           height: 90%;
           padding-top: 10px;
           padding-left: 37px;
        }
      }

    }

    .myEcharts1{
       background: #fff;
      clear: both;
      width: 100%;
      height: 482px;
      .echarts-title1{
        font-size: 14px;
        font-weight: 700;
        padding-top: 10px;
        padding-left: 37px;
      }
      .echarts-num{
         height: 60px;
         padding-top: 10px;
         padding-left: 47px;
         .myp{
           font-size: 14px;
           font-weight: normal;
           font-family: Microsoft YaHei;
           color: #666;
         }
         .num{
           font-weight: normal;
           font-family: Microsoft YaHei;
           font-size: 30px;
           color: #666;
         }

      }
    }
    .myEcharts2{
      background: #fff;
      clear: both;
      width: 100%;
      height: 402px;
      .echarts2-title{
        float: left;
        font-size: 14px;
        font-weight: 700;
        padding-top: 20px;
        padding-left: 37px;
      }
    }
    .myEcharts3{
      background: #fff;
      clear: both;
      width: 100%;
      height: 480px;
      .myEcharts3-item1{
          border-right: 3px solid #E8EBED;
          width: 40%;
          height: 480px;
          float: left;
          .echarts3-item1-title{
            font-size: 14px;
            font-weight: 700;
            padding-top: 10px;
            padding-left: 37px;
          }

      }
      .myEcharts3-item2{
          width: 58%;
          height: 480px;
          float: left;
        .echarts3-item2-title{
          font-size: 14px;
          font-weight: 700;
          padding-top: 10px;
          padding-left: 37px;
        }
        .echarts3-item2-table{
          width: 90%;
          text-align: right;
          padding-top: 10px;
          padding-left: 40px;
        }
      }
    }
    .myEcharts4{
      background: #fff;
      clear: both;
      width: 100%;
      height: 400px;
      .myEcharts4-item1{
          border-right: 3px solid #E8EBED;
          width: 30%;
          height: 400px;
          float: left;
          .echarts4-item1-title{
            font-size: 14px;
            font-weight: 700;
            padding-top: 10px;
            padding-left: 37px;
          }
      }
      .myEcharts4-item2{
          width: 68%;
          height: 400px;
          float: left;
        .echarts4-item2-title{
          font-size: 14px;
          font-weight: 700;
          padding-top: 10px;
          padding-left: 37px;
        }
        .echarts4-item2-table{
          width: 90%;
          text-align: right;
          padding-top: 10px;
          padding-left: 40px;
        }
      }
    }
    .searchs1{
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
                /* min-width: 950px; */
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
              margin-left: 20px;
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
  .content-table{

    .el-table .cell{
      padding: 0 !important;
    }
  }
</style>
