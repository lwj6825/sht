<template>
   <div class="content jxsjMonitor">
    <div class="">
      表格
    </div>
    <el-table :data="biz_not_reported" :span-method="objectSpanMethod" border  height="200">
          <el-table-column prop="region" label="ID" width="180" >
          </el-table-column>
          <el-table-column prop="info_type" label="姓名">
          </el-table-column>
          <el-table-column prop="node_name" label="数值 1（元）">
          </el-table-column>
          <el-table-column prop="date" label="数值 2（元）">
          </el-table-column>
          <el-table-column prop="biz_name" label="数值 3（元）">
          </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="150">
        </el-table-column>
        <el-table-column label="配送信息">
          <el-table-column
            prop="name"
            label="姓名"
            width="120">
          </el-table-column>
          <el-table-column label="地址">
            <el-table-column
              prop="province"
              label="省份"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-table
         :data="tableData1"
          style="width: 100%">
              <el-table-column :label=title[key] v-for="(item,key) in title" :key="key">
                <el-table-column
                  label="合格"
                  class-name="normal-color">
                  <template slot-scope="scope">
                    {{scope.row[key*2]}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="不合格"
                  class-name="red-color">
                  <template slot-scope="scope">
                    {{scope.row[(key*2+1)]}}
                  </template>
                </el-table-column>
              </el-table-column>
      </el-table>
    <el-table :data="nodeList" border style="width: 100%;height: 200px; margin-top: 20px">
          <el-table-column prop="region" label="区域" width="180">
          </el-table-column>
          <el-table-column prop="group_name" label="节点">
          </el-table-column>
          <el-table-column>
               <!-- <el-table-column :prop="tableData[index].province" :label="tableData[index].date" v-for="(item,index) in scope.row.week" :key="index">
                </el-table-column> -->
            <el-table-column :prop="tableData[index].province" :label="tableData[index].date" v-for="(item,index) in arr" :key="index">
            </el-table-column>
              <!-- <el-table-column prop="group_name" label="2222">
              </el-table-column> -->
          </el-table-column>

    </el-table>

    <my-table :col="caidan"
      :data="shuju">
    </my-table>
  </div>
</template>

<script>
  import {getQueryBizNotReportedMonitor} from '../../js/platform/platform.js';
  import MyTable from './MyTable'
  export default {
    data() {
          return {
            arr:['1','2'],
            title:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月"],
            tableData1:[1],
          spanArr:[],
           tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                  }],
            tableData6: [{
              id: '1',
              name: '王小虎',
              amount1: '234',
              amount2: '3.2',
              amount3: 10
            }, {
              id: '1',
              name: '王小虎',
              amount1: '165',
              amount2: '4.43',
              amount3: 12
            }, {
              id: '2',
              name: '王小虎',
              amount1: '324',
              amount2: '1.9',
              amount3: 9
            }, {
              id: '2',
              name: '王小虎',
              amount1: '621',
              amount2: '2.2',
              amount3: 17
            }, {
              id: '2',
              name: '王小虎',
              amount1: '539',
              amount2: '4.1',
              amount3: 15
            }],
            biz_not_reported:[],
            nodeList:[],
            col: [
              {
                prop: 'date',
                label: '日期'
              },
              {
                label: '配送信息',
                children: [
                  {
                    prop: 'name',
                    label: '姓名'
                  },
                  {
                    label: '地址',
                    children: [
                      {
                        prop: 'province',
                        label: '省份'
                      },
                      {
                        prop: 'city',
                        label: '市区'
                      },
                      {
                        prop: 'address',
                        label: '地址'
                      }
                    ]
                  }
                ]
              }
            ],
            data: [
              {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              },
              {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
              }
            ],
            arrList:'',
            shuju:[],
            caidan:[]
          };
        },
        components: {
          MyTable
        },
        mounted: function () {
                // 组件创建完后获取数据，
                // 此时 data 已经被 observed 了
                // this.getSpanArr(this.tableData6);
                this.getQueryBizNotReportedMonitorFun();
                this.moreTable();
            },
            methods: {
              moreTable(){
                let weekList = [
                  {
                      "region":"北区",
                      "data":[
                          {
                              "group_name":"万方西单商场",
                              "week":[
                                  {
                                      "week_num":"24周",
                                      "sum_node":"24周数据量",
                                      "start_time":"2020-06-08"
                                  },
                                  {
                                      "week_num":"23周",
                                      "sum_node":"23周数据量",
                                      "start_time":"2020-06-08"
                                  }
                              ]
                          },
                          {
                              "group_name":"万方西单商场11111",
                              "week":[
                                  {
                                      "week_num":"24周111",
                                      "sum_node":"24周数据量111",
                                      "start_time":"2020-06-08"
                                  },
                                  {
                                      "week_num":"23周11",
                                      "sum_node":"23周数据量11",
                                      "start_time":"2020-06-08"
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "region":"南区",
                      "data":[
                          {
                              "group_name":"万方西单商场",
                              "week":[
                                  {
                                      "week_num":"24周",
                                      "sum_node":"24周数据量",
                                      "start_time":"2020-06-08"
                                  },
                                  {
                                      "week_num":"23周",
                                      "sum_node":"23周数据量",
                                      "start_time":"2020-06-08"
                                  }
                              ]
                          },
                          {
                              "group_name":"万方西单商场11111",
                              "week":[
                                  {
                                      "week_num":"24周111",
                                      "sum_node":"24周数据量111",
                                      "start_time":"2020-06-08"
                                  },
                                  {
                                      "week_num":"23周11",
                                      "sum_node":"23周数据量11",
                                      "start_time":"2020-06-08"
                                  }
                              ]
                          }
                      ]
                  }
              ];

              weekList.forEach(ele=>{
                ele.data.forEach(val=>{
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
                      label:val1.week_num
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
                })
                 this.shuju.push(this.arrList);
              })
              },


                getQueryBizNotReportedMonitorFun(){
                        // let obj = {
                        //     "type": selectThree,
                        //     "startDate": startDate,
                        //     "endDate":endDate,
                        //     "region":selectOne,
                        //     "node_detail_type":selectTwo,
                        // }
                         let obj = {
                        "type": "month",
                        "startDate": "2019-06-02",
                        "endDate":"2020-06-02",
                        "region":"东区",
                        "node_detail_type":"全部"
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
                                          val4.node_detail_type = val2.node_detail_type
                                          val4.node_name = val3.node_name
                                          val4.node_id = val3.node_id
                                        }else{
                                          val4.node_detail_type = ''
                                          val4.node_name = ''
                                          val4.node_id = ''
                                        }
                                        arr.push(val4)
                                      })
                                  })
                              })
                          })
                          this.biz_not_reported = arr;
                          this.getSpanArr1(this.biz_not_reported);
                          // console.log(this.biz_not_reported)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                      },
                getSpanArr1(data) {
                      for (var i = 0; i < data.length; i++) {
                        if (i === 0) {
                          this.spanArr.push(1);
                          this.pos = 0
                        } else {
                          // 判断当前元素与上一个元素是否相同
                        if (data[i].region=='') {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                          } else {
                            this.spanArr.push(1);
                            this.pos = i;
                          }
                        }

                    }
                     console.log(this.spanArr)
                },

              getSpanArr(data) {　
                  for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                      this.spanArr.push(1);
                      this.pos = 0
                    } else {
                      // 判断当前元素与上一个元素是否相同
                    if (data[i].id === data[i - 1].id) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                      } else {
                        this.spanArr.push(1);
                        this.pos = i;
                      }
                    }
                    // console.log(this.spanArr)
                }
            },
             objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
                        const _row = this.spanArr[rowIndex];
                        const _col = _row > 0 ? 1 : 0;
                        // console.log(`rowspan:${_row} colspan:${_col}`)
                        return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                              rowspan: _row,
                              colspan: _col
                        }
                      }
                    }
                   }
  }
</script>

<style scoped lang="less">
  .content{
      width: 100%;
      height: 100%;
      margin-bottom: 100px;
    }
</style>
