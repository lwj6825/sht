<template>
    <div class="content TotalTransaction" ref="content">
         <!-- <div class="header">
              <p @click="skipStatistical">返回</p>&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;<div>交易额明细</div>
         </div> -->
         
         <div class="second">
               <div class="seacher">
                    <p class="data_time"  >日期&nbsp;</p>
                    <el-date-picker style="width:300px;float:left;margin-top:23px;margin-left:65px;"
                        v-model="time" value-format="yyyy-MM-dd" default-value="2019-07-25" 
                        type="daterange" 
                        align="left" :picker-options="pickerOptions"
                        unlink-panels
                        range-separator="至" clear-icon	
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <div class="goods_name">
                        <el-button type="primary" plain style="margin-left:25px;"
                        @click="handleBtnQuery()"  
                        >搜索</el-button>
                        <!-- <el-button plain >导出Excel</el-button> -->
                    </div>
                 </div>
         </div>
         <div class="totol"  v-loading.body="fullscreenLoading1">
              <div class="title"><p style="float:left;font-size:15px;padding:9px 0;margin-left:12px;">交易额明细</p><p style="font-size:13px;float:left;padding:9px 0;">【总交易额:&nbsp;{{title_count}}元；</p></div>
              <p style="margin-top:6px;font-size:13px;float:left;padding:9px 0;" v-for="(item,index) in count_price" :key="index" >
                 &nbsp;&nbsp;{{item.name}}交易额：{{item.交易额}}元(占{{item.百分比}})；
              </p>
              <p style="margin-top:14px;font-size:13px;float:left;">】</p>
              <el-table :data="this.tableData"  style="width:100%;margin-left:20px;" :default-sort = "{prop: 'date', order: 'descending'}" fit :row-style="{height:'40px'}" :header-cell-style="{background:'#f5f5f5'}" >
                <el-table-column v-for="(item,index) in headerList" :key='index' :label="item" fit :prop='item'>
                 </el-table-column>  
             </el-table>
             <div class="block">
                <el-pagination v-if="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total,sizes, prev, pager, next, jumper"
                :total="totalCount">
                </el-pagination>
            </div>
         </div>
                <!-- http://192.168.1.40:8088/#/home/totalTransaction/totalTransaction -->
    </div>
</template>
 <script>
import {QueryArea} from '../../js/area/area.js';
import {QueryGoodsRankCurrentYear,QueryGoodsRankCurrentMonth,QueryGoodsRankCurrentWeek,QueryGoodsRankCurrentDay,
    QueryBizRankCurrentWeek,QueryBizRankCurrentDay,QueryBizRankCurrentMonth,QueryBizRankCurrentYear,
    GetTzInfoUploadDays,GetTzInfoUploadBizNum,GetBizOnlineTime,GetGoodsWeightRankAndAvgPrice,
    ComputNode,ComputNodeNumWeek,ComputPluNumWeek,QueryMoneyLittleTime,
    QueryMoneyCurrentWeek,QueryMoneyCurrentMonth,QueryMoneyCurrentDayHour,QueryMoneyCurrentYear
} from '../../js/statistical/statistical.js'
export default {
    name:"TotalTransaction",
    data(){
        return{
            pickerOptions:{
                disabledDate: (time) => {
                    return time.getTime() > Date.now();
                }
            },
            time:'',
            start_time:'',  //开始时间
            end_time:'',  //结束时间
            headerList:[],
            value1:'',  
            total:0,  // 总数
            pork:0,  // 猪肉
            vegetables:0, //蔬菜
            porkPer: 0 , //猪肉百分比
            vegetablesPer : 0 ,// 蔬菜百分比
            currentPage:1, // 第几页  
            fit:'',
            tableData: [],
            input:'',
            pageSize:40,
            totalCount:0, //所有数据 
            cols:40,
            page:1,
            tableData1:[],
            title:'',
            title_count:'',
            total_name:'',
            total_price:'',
            total_pricePer:'',
            loading:true,
            count_price:[],
            fullscreenLoading1:false
        }
    },
    mounted(){
        this.userId = localStorage.getItem('userId');
        this.loginId = localStorage.getItem('loginId');
        this.getTime(); //先执行的这个函数
        this.handleBtnQuery();
        setTimeout(() => {
                 this.loading = false
        }, 2000);
    },
    methods: {
         getTime(){
            var now = new Date(); //当前日期
                var nowDayOfWeek = now.getDay(); //今天本周的第几天
                var nowDay = now.getDate(); //当前日
                var nowMonth = now.getMonth(); //当前月
                var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0; //
                function formatDate(date) {
                    var myyear = date.getFullYear();
                    var mymonth = date.getMonth()+1;
                    var myweekday = date.getDate();
                    if(mymonth < 10){
                        mymonth = "0" + mymonth;
                    }
                    if(myweekday < 10){
                        myweekday = "0" + myweekday;
                    }
                    return (myyear+"-"+mymonth + "-" + myweekday);
                }
                function formatTen(num) { 
                    return num > 9 ? (num + "") : ("0" + num); 
                } 
                var start = new Date(); 
                var year = start.getFullYear(); 
                var month = start.getMonth() + 1; 
                var day = start.getDate(); 
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                this.start_time = formatDate(monthStartDate);  // 开始时间
                this.end_time = year + "-"+formatTen(month) + "-" +formatTen(day) // 结束时间
                this.time = [this.start_time,this.end_time]
                // this.getQueryMoneyLittleTimeFun(); // 请求数据

        },
        // 搜索
        handleBtnQuery() {
            this.fullscreenLoading1 = true;
            setTimeout(() => {
                this.fullscreenLoading1 = false;
            }, 2000);
            var start_time = this.time[0];
            var end_time = this.time[1];
            this.start_time = start_time;
            this.end_time = end_time;
            this.getQueryMoneyLittleTimeFun();
            
        },
        skipStatistical(){
            this.$router.push({path:'statistical'})
        },
        handleSizeChange(val) {
             this.pageSize = val ;
            this.getQueryMoneyLittleTimeFun()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getQueryMoneyLittleTimeFun()
        },
        skipStatistical(){
                this.$router.push({path:'statistical'})
        },
        //  请求月总交易额的数据
        getQueryMoneyLittleTimeFun(){
               let str = 'node_id='+this.loginId+'&start_date='+this.start_time+'&end_date='+this.end_time+'&page='+this.currentPage+'&cols='+this.pageSize;
               QueryMoneyLittleTime(str)
                    .then(res => {
                         let arr = res.data; // 获取数据 
                         this.headerList = res.data.headerList;  //存储动态表头
                        this.title = arr.zjMap;
                        this.title_count = this.title.total.总额.toFixed(2);  //总额
                        this.count_price = [];
                        this.title.total.regionList.forEach(val=>{
                            console.log(val)
                            if(val.百分比 != '0.0%'){
                                this.count_price.push(val);
                            }
                            // console.log(this.count_price)
                        })
                         this.tableData = res.data.list ; // 存储表格数据  
                         this.cols = res.data.cols;   // 每页10条
                         this.totalCount = res.data.totalCount; // 总条数
                    })
                    .catch(res => {
                        console.log(res)
                    })
        }
    }
}
</script>
<style scoped lang='less'>
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
    .second {
        width: 100%;
        height: 75px;
        background-color: #ffffff;
        line-height: 75px;
        margin-bottom: 15px;
        .seacher{
            position: relative;
            .data_time{
                font-size:14px;
                position: absolute;
                top: 8px;
                left: 17px;
                line-height: 60px;
            }
        }
        
        .block{
            margin-left: 35px;
            float: left;
        } 
    }
    .count-totol{
        width: 100%;
        height: 150px;
        background-color: #ffffff;
        .border{
            width: 230px;
            height: 100px;
            margin-top: 23px;
            margin-left: 170px;
            border: 1px solid #ccc;
            float: left;
            .title{
                font-size: 15px;
                color:#ccc;
                margin-left: 10px;
                margin-top: 20px;

            }
            .money{
                 text-align: center ;
                 margin-top: 5px;
            }
            .left{
                 height: 100px;
                 width: 130px;
                 float: left;
                 p{
                     margin-left: 15px;
                 }
            }
            .right{
                 width: 100px;
                 height: 100px;
                 float: right;
                 .el-progress{
                     margin-top: 15px;
                 }
            }
            .money{
                font-size: 25px;
            }
        }
    }
    .totol{
         width: 100%;
         background-color: #fff;
         .title{
            //  padding-top:10px;
             display:block;
             font-size: 15px;
             margin-left:8px;
             height:30px;
             line-height: 30px;
             float: left;
         }
    } 
</style>
<style lang="less">
    .TotalTransaction {
        .el-date-editor .el-range-separator{
            line-height: 23px;
        }
        .el-date-editor .el-range__icon{
            line-height: 21px;
        }
        .el-date-editor .el-range__close-icon{
            line-height:22px;
        }
        .el-table__header-wrapper{
            margin-top:10px;
        }
    }
</style>