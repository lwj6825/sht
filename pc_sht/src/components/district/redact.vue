<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="100px" style="width: 30%;margin-left: 150px">
            <el-form-item label="区域名称：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="经营范围：">
                <el-select v-model="form.boothType" placeholder="请选择经营范围">
                    <el-option label="肉类" value="肉类"></el-option>
                    <el-option label="蔬菜" value="蔬菜"></el-option>
                    <el-option label="水果类" value="水果类"></el-option>
                    <el-option label="禽蛋类" value="禽蛋类"></el-option>
                    <el-option label="粮油副食" value="粮油副食"></el-option>
                    <el-option label="酒水饮料" value="酒水饮料"></el-option>
                    <el-option label="干货类" value="干货类"></el-option>
                    <el-option label="水产类" value="水产类"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="负责人：">
                <el-input v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group>
                    <el-checkbox label="1" name="type" value="1">是否短信告知负责人？</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="saveFun">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {AddMarkets } from '../../js/district/district.js';
export default {
    name: "redact",
    data() {
        return {
            form: {
                name: '', // 区域名称
                boothType: '', // 经营范围
                contacts: '', // 负责人
                sendMsg: '1', // 是否通知
                telephone: '', // 联系方式
            },
            dataArr: [],
            userId: '',
            roleOptions: [
                
            ],
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
    },
    mounted() {
        console.log(this.$route.params)
        if(this.$route.params.userId){
            this.form.name = this.$route.params.name
            this.form.boothType = this.$route.params.bootList[0].booth_type
            this.form.contacts = this.$route.params.contacts
            this.form.telephone = this.$route.params.telephone
        }
    },
    methods: {
        saveFun(){
            // let obj = {
            //     nodeName: this.form.name, 
            //     contact: this.form.contacts, 
            //     callphone: this.form.telephone, 
            //     boothType: this.form.boothType,
            //     // bindgys: this.bindgys,
            //     userId: this.userId
            // }
            // AddMarkets(obj)
            //     .then(res => {
            //         this.$message.success(res.message);
            //         this.$router.go(-1);
            //     })
            //     .catch(() => {
            //         this.$message.error("出错啦!");
            //     })
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding: 10px;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
    }
    .el-form{
        margin-left: 100px;
        margin-top: 50px;
        .el-input,.el-select{
            width: 344px;
        }
    }
    .el-form-item__content{
        margin-left: 100px;
        margin: 0 auto;
        text-align: center;
    }
</style>
