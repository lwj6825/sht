<template>
    <div class="content">
        <div class="searchs" ref="searchs" v-if="roleId != 80">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="日期">
                        <el-date-picker style="width: 200px;" v-model="form.dataTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" 
                            placeholder="选择日期" :picker-options="pickerOptions" :clearable="false"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun"style="margin-left: 10px;">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="iframe" v-if="roleId == 80">
            <iframe :src="url" 
            scrolling="auto" width="100%" height="100%" frameborder="0" id="contentIframe"></iframe>
        </div>
    </div>
</template>

<script>
// 时间戳转日期格式
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    // var h = date.getHours() + ':';
    // var m = date.getMinutes() + ':';
    // var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y+M+D;
}
// 标准时间转日期格式
function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
export default {
    name:"dataPricePort",
    data() {
        return {
            url: 'https://shop.zhdtech.com/necessities/?0',
            mainList: [],
            form: {
                dataTime: '',
            },
            currentTime: '',
            pickerOptions: { 
                // disabledDate(time) {
                //     return time.getTime() >  new Date(this.currentTime).getTime()
                // }
            },
            roleId: '',
        }
    },
    mounted() {
        var start = new Date();
        var startTime = start.setTime(start.getTime() - 3600 * 1000 * 24)
        this.form.dataTime = timestampToTime(startTime)
        this.pickerOptions = { 
            disabledDate(time) {
                return time.getTime() >  new Date(startTime).getTime()
            }
        }
        this.mainList = JSON.parse(localStorage.getItem('menuList'))
        this.mainList.forEach(val => {
            if(val.node == 'dataPort'){
                if(!val.children.url){
                    val.children.nodeList.forEach(val2 => {
                        if(val2.children.nodeList[0].id == '510'){
                            // this.url = val2.children.nodeList[0].dashId
                        }
                    })
                }
            }
        })
        this.roleId = localStorage.getItem('roleId')
    },
    methods: {
        searchFun(){
            if(this.roleId != '80'){
                window.open('https://shop.zhdtech.com/necessities/' + '?' + this.form.dataTime)
            }
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
                    width: 500px;
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
            height: 680px;
        }
    }
</style>
