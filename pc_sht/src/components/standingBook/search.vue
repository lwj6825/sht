<template>
    <div class="search">
        <!--展开-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'block'} : {display: 'none'}">
            <el-form-item label="商户信息" v-if="isShow">
                <el-input class="third-text" v-model="form.user" placeholder="输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="进货时间" style="width: 430px;" >
                <span>
                    <el-date-picker
                    v-model="form.value1"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </span><span>至</span>
                <span>
                    <el-date-picker
                    v-model="form.value2"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                    </el-date-picker>
                </span>
            </el-form-item>
            <el-form-item label="数据来源">
                <el-select v-model="form.source" placeholder="请选择数据来源">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="电子秤" value="1"></el-option>
                    <el-option label="手动录入" value="2"></el-option>
                    <el-option label="Excel导入" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单据上传">
                <el-select v-model="form.upload" placeholder="请选择上传状态">
                    <el-option label="全部" value="1"></el-option>
                    <el-option label="已上传" value="2"></el-option>
                    <el-option label="未上传" value="3"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="欠款">
                <el-select v-model="form.debt" placeholder="请选择欠款状态">
                    <el-option label="全部" value="a1"></el-option>
                    <el-option label="有欠款" value="a2"></el-option>
                    <el-option label="无欠款" value="a3"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="searchFun(form)" class="search-btn white-bth" style="margin-left: 10px;">搜索</el-button>
                <el-button class="file-btn no-btn">导出</el-button>
                <span class="clear-content" @click="clearFun">清空筛选条件</span>
            </el-form-item>
        </el-form>
        <!--收起-->
        <el-form ref="form" :inline="true" :model="form" label-width="80px" :style="show ? {display: 'none'} : {display: 'block'}" v-if="isShow">
            <el-form-item label="商户信息">
                <el-input v-model="form.user" placeholder="输入商户名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="search-btn white-bth" @click="searchFun(form)">搜索</el-button>
                <el-button class="file-btn no-btn">导出</el-button>
                <span class="clear-content" @click="clearFun">清空筛选条件</span>
            </el-form-item>
        </el-form>
        <p class="unfold" @click="unfoldFun">{{unfold}}筛选条件</p>
    </div>
</template>

<script>
export default {
    name: "search",     
    data() {
        return {
            form: {
                user: '',
                source: '',
                value1: '',
                value2: '',
                upload: '',
            },
            unfold: '展开',
            show: false,
            inline: true,
            isShow: true,
            isRegion: '',
        }
    },
    mounted() {
        this.isRegion = localStorage.getItem('isRegion')
        if(this.isRegion == 'false'){
            this.isShow = false
            this.show = true
            this.unfold = '收起'
        }
    },
    methods: {
        unfoldFun(){
            if(this.show == false){
                this.show = true
                this.unfold = '收起'
            }else{
                this.show = false
                this.unfold = '展开'
            }
        },
        clearFun(){
            this.form = {
                user: '',
                source: '',
                value1: '',
                value2: '',
                upload: '',
            }
            this.$emit('clear',this.form)
        },
        searchFun(form){
            this.$emit('search',form)
        }
    }
    
}
</script>

<style lang='less' scoped>
    .search{
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
        .unfold{
            text-align: center;
            font-size: 14px;
            color: #409EFF;
            cursor: pointer;
        }
        .el-form{
            width: 1000px;
        }
        .el-input,.el-date-picker,.el-select{
            width: 160px;
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
    }
</style>
