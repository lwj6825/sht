<template>
    <div class="content">
        <el-form label-width="160px" :model="form" style="width: 80%;margin-left: 20%">
            <el-form-item label="营业执照号：">{{form.licence_no}}</el-form-item>
            <el-form-item label="身份证号：">{{form.regId}}</el-form-item>
            <el-form-item label="供应商名称：">{{form.biz_name}}</el-form-item>
            <el-form-item label="联系人：">{{form.concact_name}}</el-form-item>
            <el-form-item label="联系电话：">{{form.cellphone}}</el-form-item>
            <el-form-item label="所在地区/地址：">
                <span class="info-text">{{form.areaName}}{{form.area_name}}</span>
            </el-form-item>
            <el-form-item label="产地：" prop="origin_name">{{form.area_origin_name}} </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "supplierXq",
    data() {
        return {
            form: {    
                account:'',
                password:'',
                role:"",
                roleId:'',
                switchStatus:true,
                code:'',
                companyName:'',
                idCard:'',
                contantName:'',
                phone:'',
                areaId:'',
                areaName:'',
                addr:'',
                node:'',
                shopBoothId:'',
            },
            addrForm: {
                addr:[],
                addrInfo:'',
            },  
        }
    },
    mounted() {
        this.form = this.$route.params
        this.form.areaName=this.$route.params.addr
    },
}
</script>

<style scoped lang="less">
    .content{
        padding: 10px;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
    }
    .el-form{
        width: 30%;
        margin-left: 100px;
        margin-top: 50px;
    }
    .el-form-item__content{
        margin-left: 100px;
        margin: 0 auto;
        text-align: center;
    }
    .el-col-2{
        text-align: center;
    }
</style>