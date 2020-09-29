<template>
 <div class="content transactionVolume">
   <div v-if="show" class="myDiv" v-loading="Dataloading"></div>
	<div>
		<div class="searchs" ref="searchs"  style="border-bottom: 10px solid #E8EBED;">
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
			 <!-- <div class="select">
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
			  </div> -->

			</el-form>
		</div>
    <div class="one" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading1">
      <div class="echarts1-itme1" style="border-right: 3px solid #E8EBED;">
        <p class="title">批发市场白条来源省份</p>
        <div id="my_chart1_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
      <div class="echarts1-itme2">
        <p class="title">批发市场白条生产单位</p>
        <div id="my_chart2_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
    </div>
    <div class="two" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading2">
      <div class="echarts2-itme1" style="border-right: 3px solid #E8EBED;">
        <p class="title">菜市场猪肉来源省份</p>
        <div id="my_chart3_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
      <div class="echarts2-itme2">
        <p class="title">菜市场猪肉生产单位</p>
        <div id="my_chart4_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
    </div>
    <div class="three" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading3">
      <div class="echarts3-itme1" style="border-right: 3px solid #E8EBED;">
        <p class="title">超市猪肉来源省份</p>
        <div id="my_chart5_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
      <div class="echarts3-itme2">
        <p class="title">超市猪肉来源省份</p>
        <div id="my_chart6_volume"  style="height: 300px;width: 100%;" ></div>
      </div>
    </div>
    <div class="four" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading4">
      <p class="title">超市猪肉交易量趋势（吨）</p>
      <div id="my_chart7_volume"  style="height: 300px;width: 100%;" ></div>
    </div>
    <div class="five" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading5">
      <p class="title">超市蔬菜来源省份</p>
      <div id="my_chart8_volume"  style="height: 300px;width: 100%;" ></div>
    </div>
    <div class="six" style="border-bottom: 3px solid #E8EBED;" v-loading="Dataloading4">
      <p class="title">超市蔬菜交易量趋势（吨）</p>
      <div id="my_chart9_volume"  style="height: 300px;width: 100%;" ></div>
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

import {queryGetPriceTransactionType,getWholesaleMeatSource,getVegetableWholesaleSource,getSupermarketMeatSource,getMeatVegTransactionStatistics,getSupermarketVegProvince} from '../../js/platform/platform.js';
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
      mydata:false,
      multiData:[],
      AddDataTwo:[],
      AddData:[],
      AddName:[],
      Index:'',
			selectOne : '事件日期',
			selectThree : '所属区域',
      districtIndex : 0,
			dateIndex : 0,
      nodeTypeIndex : 0,
      districtList:[],
      nodeTypeList:[],
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
     this.getWholesaleMeatSourceFun();
     this.getVegetableWholesaleSourceFun();
     this.getSupermarketMeatSourceFun();
     this.getMeatVegTransactionStatisticsFun();
     this.getSupermarketVegProvinceFun();
	},
	methods:{
    init(){
       this.getWholesaleMeatSourceFun();
       this.getVegetableWholesaleSourceFun();
       this.getSupermarketMeatSourceFun();
       this.getMeatVegTransactionStatisticsFun();
       this.getSupermarketVegProvinceFun();
    },
    queryGetPriceTransactionTypeFun(){
      this.Dataloading = true;
      document.body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preD, {passive: false}); // 禁止页面滑动
      queryGetPriceTransactionType()
        .then( res => {
          res.data.districtList.forEach(ele=>{
            if(ele.district_name != '北京市'){
              this.districtList.push(ele);
            }
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
    getWholesaleMeatSourceFun(){
       this.Dataloading1 = true;
      this.getWholesaleMeatSourceFun1();
      this.getWholesaleMeatSourceFun2();
     // let district_name = '';
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
      // if(this.selectThree=='所属区域'){
      //   district_name = '全部';
      // }else{
      //   if(this.selectThree.indexOf(',')==-1){
      //     district_name = "'" + this.selectThree + "'";
      //   }else{
      //     let str = '';
      //     let arr = this.selectThree.split(',');
      //     arr.forEach(ele=>{
      //       str += "'" + ele + "',";
      //     })
      //     district_name = str.substr(0,str.length-1);
      //   }
      // }
      let obj = {
          "type": type,
          "startDate": startDate,
          "endDate":endDate
          //"district_name":district_name
      }
      getWholesaleMeatSource(obj)
        .then(res => {
           let lineName = [];
           let lineValue = [];
           let lineName1 = [];
           let lineValue1 = [];
             res.data.批发白条猪来源省份图标.forEach(ele=>{
                  lineName.push(ele.SHENG);
                  lineValue.push({
                           name: ele.SHENG,
                           value: ele.百分比.split('%')[0]
                       });
              })
              let i= 1;
                res.data.批发白条猪生产单位份图标.forEach(ele=>{
                  if(i<=10){
                    lineName1.push(ele.WS_SUPPLIER_NAME);
                    lineValue1.push(parseFloat(ele.weekWeight).toFixed(2));
                  }
                  i++;
                })
          this.getWholesaleMeatSourceFun1(lineName,lineValue);
          this.getWholesaleMeatSourceFun2(lineName1,lineValue1);
          this.Dataloading1 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    getVegetableWholesaleSourceFun(){
      this.Dataloading2 = true;
      this.getVegetableWholesaleSourceFun1();
      this.getVegetableWholesaleSourceFun2();
     // let district_name = '';
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
      // if(this.selectThree=='所属区域'){
      //   district_name = '全部';
      // }else{
      //   if(this.selectThree.indexOf(',')==-1){
      //     district_name = "'" + this.selectThree + "'";
      //   }else{
      //     let str = '';
      //     let arr = this.selectThree.split(',');
      //     arr.forEach(ele=>{
      //       str += "'" + ele + "',";
      //     })
      //     district_name = str.substr(0,str.length-1);
      //   }
      // }
      let obj = {
          "type": type,
          "startDate": startDate,
          "endDate":endDate
        //  "district_name":district_name
      }
      getVegetableWholesaleSource(obj)
        .then(res => {
           let lineName = [];
           let lineValue = [];
           let lineName1 = [];
           let lineValue1 = [];
             res.data.菜市场猪肉省份来源图标.forEach(ele=>{
                  lineName.push(ele.SHENG);
                  lineValue.push({
                           name: ele.SHENG,
                           value: ele.百分比.split('%')[0]
                       });
              })
              let i= 1;
                res.data.菜市场猪肉生产单位来源图标.forEach(ele=>{
                  if(i<=10){
                    lineName1.push(ele.WS_SUPPLIER_NAME);
                    lineValue1.push(parseFloat(ele.weekWeight).toFixed(2));
                  }
                  i++;
                })
          this.getVegetableWholesaleSourceFun1(lineName,lineValue);
          this.getVegetableWholesaleSourceFun2(lineName1,lineValue1);
          this.Dataloading2 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    getSupermarketMeatSourceFun(){
      this.Dataloading3 = true;
    //  let district_name = '';
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
      // if(this.selectThree=='所属区域'){
      //   district_name = '全部';
      // }else{
      //   if(this.selectThree.indexOf(',')==-1){
      //     district_name = "'" + this.selectThree + "'";
      //   }else{
      //     let str = '';
      //     let arr = this.selectThree.split(',');
      //     arr.forEach(ele=>{
      //       str += "'" + ele + "',";
      //     })
      //     district_name = str.substr(0,str.length-1);
      //   }
      // }
      let obj = {
          "type": type,
          "startDate": startDate,
          "endDate":endDate
        //  "district_name":district_name
      }
      getSupermarketMeatSource(obj)
        .then(res => {
           let lineName = [];
           let lineValue = [];
           let lineName1 = [];
           let lineValue1 = [];
             res.data.超市猪肉省份来源图标.forEach(ele=>{
                  lineName.push(ele.SHENG);
                  lineValue.push({
                           name: ele.SHENG,
                           value: ele.百分比.split('%')[0]
                       });
              })
              let i= 1;
                res.data.超市猪肉生产单位图标.forEach(ele=>{
                  if(i<=10){
                    lineName1.push(ele.WS_SUPPLIER_NAME);
                    lineValue1.push(ele.weightSum.split('吨')[0]);
                  }
                  i++;
                })
          this.getSupermarketMeatSourceFun1(lineName,lineValue);
          this.getSupermarketMeatSourceFun2(lineName1,lineValue1);
          this.Dataloading3 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    getMeatVegTransactionStatisticsFun(){
       this.Dataloading4 = true;
     // let district_name = '';
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
      // if(this.selectThree=='所属区域'){
      //   district_name = '全部';
      // }else{
      //   if(this.selectThree.indexOf(',')==-1){
      //     district_name = "'" + this.selectThree + "'";
      //   }else{
      //     let str = '';
      //     let arr = this.selectThree.split(',');
      //     arr.forEach(ele=>{
      //       str += "'" + ele + "',";
      //     })
      //     district_name = str.substr(0,str.length-1);
      //   }
      // }
      let obj = {
          "type": type,
          "startDate": startDate,
          "endDate":endDate
        //  "district_name":district_name
      }
      getMeatVegTransactionStatistics(obj)
        .then(res => {
           let lineName = [];
           let lineValue = [];
           let lineName1 = [];
           let lineValue1 = [];
             res.data.猪肉类.forEach(ele=>{
                lineName.push(ele.in_date);
                lineValue.push(ele.num.split('吨')[0]);
              })
              res.data.蔬菜类.forEach(ele=>{
                  lineName1.push(ele.in_date);
                  lineValue1.push(ele.num.split('吨')[0]);
              })
          this.getMeatVegTransactionStatisticsFun1(lineName,lineValue);
          this.getMeatVegTransactionStatisticsFun2(lineName1,lineValue1);
          this.Dataloading4 = false;
        })
        .catch((res) => {
            console.log(res)
        })
    },
    getSupermarketVegProvinceFun(){
       this.Dataloading5 = true;
     // let district_name = '';
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
      // if(this.selectThree=='所属区域'){
      //   district_name = '全部';
      // }else{
      //   if(this.selectThree.indexOf(',')==-1){
      //     district_name = "'" + this.selectThree + "'";
      //   }else{
      //     let str = '';
      //     let arr = this.selectThree.split(',');
      //     arr.forEach(ele=>{
      //       str += "'" + ele + "',";
      //     })
      //     district_name = str.substr(0,str.length-1);
      //   }
      // }
      let obj = {
          "type": type,
          "startDate": startDate,
          "endDate":endDate
         // "district_name":district_name
      }
      getSupermarketVegProvince(obj)
        .then(res => {
           let lineName = [];
           let lineValue = [];
             res.data.图标.forEach(ele=>{
                lineName.push(ele.SHENG);
                lineValue.push({
                        name: ele.SHENG,
                        value: ele.百分比.split('%')[0]
                    });
              })
          this.getSupermarketVegProvinceFun1(lineName,lineValue);
          this.Dataloading5 = false;
        })
        .catch((res) => {
            console.log(res)
        })

    },
    getSupermarketVegProvinceFun1(lineName,lineValue){
      var my_chart8_volume = this.$echarts.init(document.getElementById('my_chart8_volume'));
      my_chart8_volume.setOption({
        tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%'
            },
        legend: {
                 top: 'bottom',
                 left: 'center',
                 itemWidth: 12,
                 itemHeight: 12,
                 data:lineName

            },
        color:['#55aaff','#ffaa00','#55ff7f','#aaffff','#aaaaff','#ff5500','#aa55ff','#55aa00','#005500','#ffaa7f','#55557f'],
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
    getSupermarketMeatSourceFun1(lineName,lineValue){
      var my_chart5_volume = this.$echarts.init(document.getElementById('my_chart5_volume'));
      my_chart5_volume.setOption({
        tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%'
            },
        legend: {
                 top: 'bottom',
                 left: 'center',
                 itemWidth: 12,
                 itemHeight: 12,
                 data:lineName

            },
        color:['#55aaff','#ffaa00','#55ff7f','#aaffff','#aaaaff','#ff5500','#aa55ff','#55aa00','#005500','#ffaa7f','#55557f'],
        series: [
               {
                   type: 'pie',
                   radius: '55%',
                   center: ['50%', '50%'],
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
    getVegetableWholesaleSourceFun1(lineName,lineValue){
      var my_chart3_volume = this.$echarts.init(document.getElementById('my_chart3_volume'));
      my_chart3_volume.setOption({
        tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%'
            },
        legend: {
                 top: 'bottom',
                 left: 'center',
                 itemWidth: 12,
                 itemHeight: 12,
                 data:lineName

            },
        color:['#55aaff','#ffaa00','#55ff7f','#aaffff','#aaaaff','#ff5500','#aa55ff','#55aa00','#005500','#ffaa7f','#55557f'],
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
    getWholesaleMeatSourceFun1(lineName,lineValue){
      var my_chart1_volume = this.$echarts.init(document.getElementById('my_chart1_volume'));
      my_chart1_volume.setOption({
        tooltip: {
                trigger: 'item',
                formatter: '{b} : {d}%'
            },
        legend: {
                 top: 'bottom',
                 left: 'center',
                 itemWidth: 12,
                 itemHeight: 12,
                 data:lineName

            },
        color:['#55aaff','#ffaa00','#55ff7f','#aaffff','#aaaaff','#ff5500','#aa55ff','#55aa00','#005500','#ffaa7f','#55557f'],
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
    getSupermarketMeatSourceFun2(lineName1,lineValue1){
      var my_chart6_volume = this.$echarts.init(document.getElementById('my_chart6_volume'));
      my_chart6_volume.setOption({
           tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid:{
                    x:220,
                    y:25

                },
          dataZoom : {//实现缩放功能
              show : true,
              realtime : true,
              start : 0,
              end : 100
          },
          xAxis: {
                  type: 'value',
                  axisTick: {
                     show: false
                 },
                 splitLine:{
                 　　　　show:false
                 },
                 formatter:function(value){
                     var texts=value;
                     if(texts.length>9){ // 具体多少字就看自己了
                         texts=texts.substr(0,9)+'...';
                     }
                     return texts;
                 }
              },
          yAxis: {

                  axisTick: {
                      show: false
                  },
                  splitLine:{
              　　　　show:false
              　　 },
                  axisLabel:{
                        show:true,
                        formatter:function(value){
                            var texts=value;
                            if(texts.length>9){ // 具体多少字就看自己了
                                texts=texts.substr(0,9)+'...';
                            }
                            return texts;
                        }
                    },
                  type: 'category',
                  data: lineName1
              },
          series: [
            {
                type: 'bar',
                itemStyle:{
                  normal:{
                     color:'#55ff7f',

                  }
                },
                data: lineValue1
            }
          ]

       })
    },
    getVegetableWholesaleSourceFun2(lineName1,lineValue1){
      var my_chart4_volume = this.$echarts.init(document.getElementById('my_chart4_volume'));
      my_chart4_volume.setOption({
           tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid:{
                    x:220,
                    y:25

                },
          dataZoom : {//实现缩放功能
              show : true,
              realtime : true,
              start : 0,
              end : 100
          },
          xAxis: {
                  type: 'value',
                  axisTick: {
                     show: false
                 },
                 splitLine:{
                 　　　　show:false
                 },
                 formatter:function(value){
                     var texts=value;
                     if(texts.length>9){ // 具体多少字就看自己了
                         texts=texts.substr(0,9)+'...';
                     }
                     return texts;
                 }
              },
          yAxis: {

                  axisTick: {
                      show: false
                  },
                  splitLine:{
              　　　　show:false
              　　 },
                  axisLabel:{
                        show:true,
                        formatter:function(value){
                            var texts=value;
                            if(texts.length>9){ // 具体多少字就看自己了
                                texts=texts.substr(0,9)+'...';
                            }
                            return texts;
                        }
                    },
                  type: 'category',
                  data: lineName1
              },
          series: [
            {
                type: 'bar',
                itemStyle:{
                  normal:{
                     color:'#aa00ff',

                  }
                },
                data: lineValue1
            }
          ]

       })
    },
    getWholesaleMeatSourceFun2(lineName1,lineValue1){
      var my_chart2_volume = this.$echarts.init(document.getElementById('my_chart2_volume'));
      my_chart2_volume.setOption({
           tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          grid:{
                    x:220,
                    y:25

                },
          dataZoom : {//实现缩放功能
              show : true,
              realtime : true,
              start : 0,
              end : 100
          },
          xAxis: {
                  type: 'value',
                  axisTick: {
                     show: false
                 },
                 splitLine:{
                 　　　　show:false
                 }
              },
          yAxis: {

                  axisTick: {
                      show: false
                  },
                  splitLine:{
              　　　　show:false
              　　 },
                  axisLabel:{
                        show:true,
                        formatter:function(value){
                            var texts=value;
                            if(texts.length>9){ // 具体多少字就看自己了
                                texts=texts.substr(0,9)+'...';
                            }
                            return texts;
                        }
                    },
                  type: 'category',
                  data: lineName1
              },
          series: [
            {
                type: 'bar',
                itemStyle:{
                  normal:{
                     color:'#55aaff',

                  }
                },
                data: lineValue1
            }
          ]

       })
    },
    getMeatVegTransactionStatisticsFun1(lineName,lineValue){
      var my_chart7_volume = this.$echarts.init(document.getElementById('my_chart7_volume'));
       my_chart7_volume.setOption({
         tooltip: {
             trigger: 'axis',
             formatter:  '{b}<br/>{a}:{c}',
             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
             }
         },
         dataZoom : {//实现缩放功能
             show : true,
             realtime : true,
             start : 0,
             end : 100
         },
         xAxis: {
                  axisTick: {
                      show: false
                  },
                  splitLine:{
              　　　　show:false
              　　 },
                  type: 'category',
                  data: lineName
              },
          yAxis: {
                 type: 'value',
                 axisTick: {
                     show: false
                 },
                 splitLine:{
                 　　show:false
                 }
             },
           color : "#55557f",
           series: [
                  {
                      name:'交易量',
                      type: 'bar',
                      data: lineValue,
                      label: {
                          show: true,
                          position: 'top',
                          color:'#7d7d7d'

                      }
                  }
              ]
       })
    },
    getMeatVegTransactionStatisticsFun2(lineName1,lineValue1){
      var my_chart9_volume = this.$echarts.init(document.getElementById('my_chart9_volume'));
       my_chart9_volume.setOption({
         tooltip: {
             trigger: 'axis',
             formatter:  '{b}<br/>{a}:{c}',
             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
             }
         },
         dataZoom : {//实现缩放功能
             show : true,
             realtime : true,
             start : 0,
             end : 100
         },
         xAxis: {
                  axisTick: {
                      show: false
                  },
                  splitLine:{
              　　　　show:false
              　　 },
                  type: 'category',
                  data: lineName1
              },
          yAxis: {
                 type: 'value',
                 axisTick: {
                     show: false
                 },
                 splitLine:{
                 　　show:false
                 }
             },
           color : "#55557f",
           series: [
                  {
                      name:'交易量',
                      type: 'bar',
                      data: lineValue1,
                      label: {
                          show: true,
                          position: 'top',
                          color:'#7d7d7d'

                      }
                  }
              ]
       })
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
			// if(command.flag==2){
			//   this.districtIndex = command.index;
			//   this.selectThree = '所属区域';
			//   if(command.value=='全部'){
			//     this.selectThree = '所属区域';
			//   }else{
			//     this.selectThree = command.value;
			//   }
			// }
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
       }
       // else if(this.Index==2){
       //   this.AddDataThree.splice(index,1);
       // }
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
      if(type==1){
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
     //  if(this.AddData.length>0){
     //     this.first = false;
     //     let arr = [];
     //     this.AddData.forEach(ele=>{
     //      arr.push(ele.name);
     //     })
     //    if(this.AddData.length==1){
     //      if(this.Index==1){
     //        this.selectThree = arr[0];
     //      }

     //    }else{
     //      if(this.Index==1){
     //        this.selectThree = arr. join(',');
     //      }
     //    }
     //  }else{
     //    // if(this.Index==1){
     //    //   this.selectThree = '所属区域';
     //    //   this.AddDataTwo = [];
     //    // }
     //  }
     // if(this.Index==1){
     //    this.AddDataTwo = this.AddData;
     //  }
     //  this.init();
     //  this.handlerClose();
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
    .one{
      width: 100%;
      height: 400px;
      background: #fff;
      .echarts1-itme1{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
      .echarts1-itme2{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
    }
    .two{
      width: 100%;
      height: 400px;
      background: #fff;
      .echarts2-itme1{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
      .echarts2-itme2{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
    }
    .three{
      width: 100%;
      height: 400px;
      background: #fff;
      .echarts3-itme1{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
      .echarts3-itme2{
         width: 47%;
         height: 400px;
         float: left;
         .title{
             padding: 20px 50px;
             font-size: 14px;
         }
      }
    }
    .four{
      width: 100%;
      height: 400px;
      background: #fff;
      .title{
          padding: 20px 50px;
          font-size: 14px;
      }
    }
    .five{
      width: 100%;
      height: 400px;
      background: #fff;
      .title{
          padding: 20px 50px;
          font-size: 14px;
      }
    }
    .six{
      width: 100%;
      height: 400px;
      background: #fff;
      .title{
          padding: 20px 50px;
          font-size: 14px;
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
