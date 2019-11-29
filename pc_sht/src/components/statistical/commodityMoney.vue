<template>
   <div class="content" ref="content">
         <div class="areaBox" ref="areaBox">
              <AreaSelect @selectId='selectId' :gooduserId="gooduserId"></AreaSelect>
        </div>
        <div class="seacher">
                         <p class="data_time" >日期&nbsp;</p>
                         <el-date-picker style="width:300px;float:left;margin-top:20px;margin-right:25px;margin-left:60px;"
                            v-model="time" value-format="yyyy-MM-dd" default-value="2019-01-25"
                            type="daterange" 
                            align="left"
                            unlink-panels :picker-options="pickerOptions"
                            range-separator="至" clear-icon	
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                         <div class="goods_name">
                            商品名称&nbsp;&nbsp;&nbsp;
                            <el-input v-model="input" clearable style="width:175px;" placeholder="请输入商品名称"></el-input>
                            <el-button type="primary" plain style="margin-left:20px;" icon="el-icon-search"
                            @click="handleBtnQuery()" 
                            >搜索</el-button>
                            <!-- <el-button plain >导出Excel</el-button> -->
                         </div>
        </div>
        <div class="table_cell"  v-loading="loading"  v-loading.body="fullscreenLoading1"> 
            <div class="table_cell_title"  style="margin-left:20px;">
                    商品交易额明细&nbsp;&nbsp;&nbsp;【总交易额:{{this.totol_price}}元， 总交易量:{{this.weight}}公斤】
            </div>
            <el-table :data="tableData"  style="width:100%;margin-left:20px;height:448px;" :header-cell-style="{background:'#f5f5f5'}" fit
                   :row-style="{height:'40px'}"  >
                <el-table-column prop="plu_name" label="商品名称" fit></el-table-column>
                <el-table-column prop="price"  label="商品总交易额(元)"></el-table-column>
                <el-table-column prop="weight"  label="总公交易量(公斤)" ></el-table-column>
                <el-table-column prop="avg"  label="均价(元)" ></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <!-- <router-link to='/home/standingBook/saleTz'> -->
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <!-- </router-link> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination v-if="totalCount"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
                </el-pagination>
            </div>
        </div>
       
    </div>
</template>
<script>
import {GetMarkets} from '../../js/district/district';
import {QueryGoodsRankCurrentYear,QueryGoodsRankCurrentMonth,QueryGoodsRankCurrentWeek,QueryGoodsRankCurrentDay,
    QueryBizRankCurrentWeek,QueryBizRankCurrentDay,QueryBizRankCurrentMonth,QueryBizRankCurrentYear,
    GetTzInfoUploadDays,GetTzInfoUploadBizNum,GetBizOnlineTime,GetGoodsWeightRankAndAvgPrice,QueryMoneyAndWeightForBiz,
    ComputNode,ComputNodeNumWeek,ComputPluNumWeek,QueryMoneyAndWeightForGoods,QueryMoneyAndWeightForMarket,
    QueryMoneyCurrentWeek,QueryMoneyCurrentMonth,QueryMoneyCurrentDayHour,QueryMoneyCurrentYear
} from '../../js/statistical/statistical.js'
import AreaSelect from '../common/area';
export default {
     name:'CommodityMoney',
     props:["getshopList"],
     data(){
         return{
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            loading:true,
            loginId:'',
            titArr:'',
            userId:'',
            start_time:'',  //开始时间
            end_time:'',  //结束时间
            time:[],
            input:'',   
            page: 1,
            cols: 15,
            userId: 2,
            name: "",
            boothName: "",  
            areaId:'',//大区的shop_booth_id
            bigAreaId:'',//大区userId
            value1:'',
            tableData: [],
            currentPage: 1,  //默认第一页
            totol_price:'',
            weight:'',
            pageSize:10,
            currentTotal:'', 
            totalCount:0, //所有数据
            TodayTime:'',
            // dataMore:'',
            gooduserId: '',
            fullscreenLoading1:false,
            node_id: '',
        }
     },
     created(){
           this.gooduserId = this.$route.params.gooduserId;
     },
     mounted(){
        this.node_id = localStorage.getItem('loginId');
          window.scrollTo(0,0)
          this.userId = localStorage.getItem('userId');
          this.loginId = localStorage.getItem('loginId');
          this.defaultTzFun();
          this.getTime();
          this.gooduserId = this.$route.params.gooduserId;
        //   console.log(localStorage.getItem("Time"))
          if(localStorage.getItem("Time")){
              var arr = localStorage.getItem("Time").split(",")
              this.start_time = arr[0];
              this.end_time = arr[1];
              this.time = [this.start_time,this.end_time]
              this.input = arr[2];
              this.gooduserId = arr[3]
              localStorage.removeItem('Time')
          }else{
              localStorage.removeItem('Time')
          }
         
     },
     methods:{
        getTime(){
            function formatTen(num) { 
                    return num > 9 ? (num + "") : ("0" + num); 
            }
            var start = new Date(); 
            var year = start.getFullYear(); 
            var month = start.getMonth() + 1; 
            var day = start.getDate(); 
            this.start_time = year + "-"+formatTen(month) + "-" +formatTen(day-1)  
            this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day)
            this.start_time = this.$route.params.startTime; 
            this.end_time  = this.$route.params.endTime;
            this.time = [this.start_time,this.end_time]
            this.gooduserId = this.$route.params.gooduserId;
            this.input = this.$route.params.shopname;  
            if(!this.input){
                this.input = ""
            }else{
                this.input = this.$route.params.shopname;
            }
        },
        handleBtnQuery() {
            this.fullscreenLoading1 = true;
            setTimeout(() => {
                this.fullscreenLoading1 = false;
            }, 4000);
            var start_time = this.time[0];
            var end_time = this.time[1];
            this.start_time = start_time;
            this.end_time = end_time;
            if(this.input == ''){
                this.currentPage = 1;
                this.getqueryMoneyAndWeightForGoodsFun();
            }
            this.getQueryMoneyAndWeightForMarketFun();
            this.getqueryMoneyAndWeightForGoodsFun();
        },
        handleSizeChange(val) {  //触发每页条数
            this.pageSize = val ;
            this.getqueryMoneyAndWeightForGoodsFun();
        },
        handleCurrentChange(val) {  //触发每条页数
            this.currentPage = val ;
            this.getqueryMoneyAndWeightForGoodsFun()
        },
        handleClick(row) {
            let dataMore = [this.time,this.input,this.gooduserId]
            localStorage.setItem("Time", dataMore);
            this.input = row.plu_name
            this.$router.push({name:'StatisticalTz',
                           query:{shopname:this.input, 
                           startTime:this.start_time,  
                           endTime:this.end_time,
                        //    gooduserId:this.gooduserId
                            gooduserId:this.bigAreaId
                           }
            })
        },
        skipStatistical(){  // 返回统计页面
            this.$router.push({path:'statistical'})
        },
        defaultTzFun(){
            let data = {
                page: '1',
                cols: '100',
                total: '',
                userId: this.userId,
                contacts: this.contacts,
                nodeName: this.nodeName,
                node_id: this.node_id
            }
            GetMarkets(data)
                .then(res =>{
                    // console.log(data,"更多post数据")
                    if(this.$route.params.gooduserId){
                        res.data.dataList.forEach(ele => {
                            if(ele.userId == this.$route.params.gooduserId){
                                this.bigAreaId = ele.userId;
                                this.areaId = ele.bootList[0].shop_booth_id;
                            }
                        });
                    }else{
                        this.bigAreaId = res.data.dataList[0].userId;
                        this.areaId = res.data.dataList[0].bootList[0].shop_booth_id;
                    }
                    this.handleBtnQuery();
                })
                .catch(res =>{
                    console.log(res)
                })
        },
        selectId(id){//选择区域展示商户列表
            this.page = 1
            this.input = ''
            let data = {
                page: this.page,
                cols: this.cols,
                total: this.total,
                userId: this.userId,
                name: this.name,
                boothName: this.boothName,
                node_id: this.node_id
            }
            this.fullscreenLoading1 = true;
            setTimeout(()=>{
                this.fullscreenLoading1 = false;
            },4000)
            GetMarkets(data)
                .then(res =>{
                    this.titArr = res.data.dataList
                    res.data.dataList.forEach(ele => {
                        if(ele.userId == id){
                            this.bigAreaId = id;
                            this.areaId = ele.bootList[0].shop_booth_id;
                            this.getqueryMoneyAndWeightForGoodsFun()
                        }
                    });
                })
                .catch(res =>{
                    console.log(res)
                })
        },
       getQueryMoneyAndWeightForMarketFun(){   //商品总额
             let str = 'node_id='+this.loginId+'&region='+this.areaId+'&start_date='+this.start_time+'&end_date='+this.end_time;
             QueryMoneyAndWeightForMarket(str)
                  .then(res=>{
                    //   console.log(res,'商品总额')
                      var totol_price = res.data.price;
                      this.totol_price = Number(totol_price.toFixed(2));
                      var weight = res.data.weight;
                      this.weight = Number(weight.toFixed(2));
                  })
                  .catch(res=>{
                        console.log(res)
                  })
             
        },
        getqueryMoneyAndWeightForGoodsFun(){  //商品交易量
             let str = 'node_id='+this.loginId+'&region='+this.areaId+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page='+this.currentPage+'&cols='+this.pageSize+'&name='+this.input;
             QueryMoneyAndWeightForGoods(str)
                  .then(res=>{
                        // console.log(res , "商品交易量")
                        this.tableData = res.data.list
                        // console.log(res.data.list,'表格里的数据')
                        this.tableData.forEach(val=>{
                             val.price = val.price.toFixed(2);
                             val.weight = val.weight.toFixed(2);
                             val.avg = val.avg.toFixed(2)
                        })
                        this.totalCount = res.data.totalCount;  //总条数
                        this.cols = res.data.cols; // 每页条数
                        
                  })
                  .catch(res=>{
                        console.log(res)
                  })
        },
      
    },
    components:{
      AreaSelect,
    }
}
</script>
<style scoped lang='less'>
.back{
            width:100%;
            height:20px;
            line-height: 20px;
            margin-bottom:10px;
            background-Color:white;
            padding-left:20px;
            font-size:15px;
            cursor: pointer;
        }
.back:hover{
            color:#409EFF;  //
            text-decoration: underline;
        }
.header{
         width: 100%;
         height: 40px;
         line-height: 40px;
         background-color: #ffffff;
         margin-bottom: 10px;
         font-size:14px;
         p {
             display: inline-block;
             padding-left:10px;
         }
         div{
             display: inline-block;
             padding-left:10px;
         }
         p:hover{
             color:#3e9dff;
             text-decoration:underline;
         }
    }
.areaBox{
      padding: 10px;
      background: #fff;
      margin-bottom: 10px;
}
.seacher{
      height: 70px;
      line-height: 70px;
      background-color: #fff;
      position: relative;
      font-size: 14px;
      color: '#606266';
      .data_time{
          position: absolute;
          top: 5px;
          left: 17px;
          line-height: 60px;
      }
}
.button{
      float: left;
}
.table_cell{
    width: 100%;
    background-color: #ffffff;
    margin-top: 10px;

    .table_cell_title{
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }
}
</style>
<style lang="less">
    .content {
        .el-date-editor .el-range-separator{
            line-height: 21px;
            height:22px;
        }
        .el-date-editor .el-range__icon{
            line-height: 23px;
        }
        .el-date-editor .el-range__icon{
            margin-left:0px;
        }
        // .el-input__inner{
        //     padding:5px!important
        // }
        .el-date-editor .el-range__close-icon{
            line-height: 27px;
        }
    }
</style>