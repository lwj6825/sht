<template>
    <div class="content">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期">
                        <el-select v-model="form.dataTime" filterable clearable placeholder="请选择">
                            <el-option v-for="(item, index) in timeArr" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="iframe">
            <iframe :src="url" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
var mydate = new Date();
function getFirstDayOfWeek (mydate) {
    var weekday = mydate.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
    mydate.setDate(mydate.getDate()-weekday+1);//往前算（weekday-1）天，年份、月份会自动变化
    return timeFormat(mydate);
}
function timeFormat(date) {
    if (!date || typeof(date) === "string") {
        this.error("参数异常，请检查...");
    }
    var y = date.getFullYear(); //年
    var m = date.getMonth() + 1; //月
    var d = date.getDate()-3; //日
        return y + "-" + m + "-" + d;
}
var date1 = getFirstDayOfWeek(mydate);
var date = '2020-01-04'; 
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays
}
//获取两个日期之间的所有日期
Date.prototype.format = function() {
    var s = '';
    var mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    var day = this.getDate()>=10?this.getDate():('0'+this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};
    
function getAll(begin, end) {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
    for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push((new Date(parseInt(k))).format());
    }
    return arr;
}
//分离日期
function group(source, step) { 
    if (source.length == 1) return [source];//这个情况要单独写一下
    var group = source.reduce((total, current, index) => {
        if (index == 1) {
            //init 第一次 total 是1 current 是 2
            if (step == 1) {
                total = [[total], [current]];
            } else {
                total = [[total, current]];
            }
        } else {
            var last = total[total.length - 1];
            if (last.length < step) {
                last.push(current);
            } else {
                total.push([current]);
            }
        }
        return total;
    });
    return group;
}
var source = getAll(date,date1);
var step = 7;
var list = group(source,step).reverse();
var j = 0;
var timeList = []
for(var i=0;i<list.length;i++){
    if(list[i].length==7){
        var arr = list[i];
        var arr1 = arr[0].split('-');
        var arr2 = arr[arr.length-1].split('-');
        var text = arr1.join('.')+'-'+arr2.join('.');
        timeList.push(text)
    }
}
export default {
    name:"dataWeekPort",
    data() {
        return {
            url: '',
            mainList: [],
            form: {
                dataTime: '',
                region: '全部',
            },
            timeArr: [],
        }
    },
    mounted() {
        this.timeArr = timeList
        this.form.dataTime = timeList[0]
        this.mainList = JSON.parse(localStorage.getItem('menuList'))
        this.mainList.forEach(val => {
            if(val.node == 'dataPort'){
                if(!val.children.url){
                    val.children.nodeList.forEach(val2 => {
                        if(val2.children.nodeList[0].id == '511'){
                            // this.url = val2.children.nodeList[0].dashId
                        }
                    })
                }
            }
        })
        // this.url = 'http://192.168.0.137:8848/Report/weekly.html' + '?time=' + this.form.dataTime + '&region=' + encodeURIComponent(this.form.region)
    },
    methods: {
        searchFun(){
            // this.isSearch = true
            // https://shop.zhdtech.com/necessities/
            // http://192.168.0.40:8848/necessities/index.html
            window.open('https://shop.zhdtech.com/necessities/' + '?1')
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .searchs{
            padding: 10px 0;
            margin-bottom: 10px;
            background: #fff;
            .search{
                .el-form{
                    margin: 0 auto;
                    text-align: center;
                    width: 660px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .iframe{
            width: 100%;
            height: 620px;
        }
    }
</style>
