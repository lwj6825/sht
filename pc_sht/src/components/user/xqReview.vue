<template>
    <div class="content xqReview">
        <div class="title">企业基本信息</div>
        <div class="data">
            <p class="data-tit">企业名称</p>
            <p class="data-msg">{{form.name}}</p>
        </div>
        <div class="data">
            <p class="data-tit">营业执照号</p>
            <p class="data-msg">{{form.license}}</p>
        </div>
        <div class="data">
            <p class="data-tit">法人代表</p>
            <p class="data-msg">{{form.behalf}}</p>
        </div>
        <div class="data">
            <p class="data-tit">经营地址</p>
            <p class="data-msg">{{form.addr}}</p>
        </div>
        <div class="data">
            <p class="data-tit">详细地址</p>
            <p class="data-msg">{{form.address}}</p>
        </div>
        <div class="title user-msg">联系人信息</div>
        <div class="data">
            <p class="data-tit">联系人姓名</p>
            <p class="data-msg">{{form.contact}}</p>
        </div>
        <div class="data">
            <p class="data-tit">联系人电话</p>
            <p class="data-msg">{{form.phone}}</p>
        </div>
        <div class="data">
            <p class="data-tit">联系人邮箱</p>
            <p class="data-msg">{{form.email}}</p>
        </div>
        <div class="title user-msg">审核信息</div>
        <div class="data">
            <p class="data-tit">审核状态</p>
            <p class="data-msg" v-if="this.form.states == 1">待审核</p>
            <p class="data-msg" v-if="this.form.states == 2">审核通过</p>
            <p class="data-msg" v-if="this.form.states == 3">审核驳回</p>
        </div>
        <div class="data">
            <el-button type="primary" size="small" @click="saveStateFun(3)">驳回</el-button>
            <el-button type="primary" size="small" @click="saveStateFun(2)">审核通过</el-button>
        </div>
    </div>
</template>

<script>
import {UpdateNodeApply} from '../../js/user/user.js'
export default {
    name:'xqReview',
    data(){
        return{           
            form:{
                name: '',
                license: '',
                behalf: '',
                address: '',
                addr: '',
                contact: '',
                phone: '',
                email: '',
                states: '',
            },
            statesArr: [
                {name: "待审核", value: "1"},
                {name: "审核通过", value: "2"},
                {name: "审核驳回", value: "3"},
            ],
            ids: '',
            states: '',
        }
    },
    mounted(){
        console.log(this.$route.params)
        let data = this.$route.params
        this.form.name = data.node_name
        this.form.license = data.social_credit_code
        this.form.behalf = data.legal_represent
        this.form.addr = data.area_name
        this.form.address = data.addr
        this.form.contact = data.contacts
        this.form.phone = data.tel
        this.form.email = data.mail
        this.form.states = data.apply_state
        this.states = data.apply_state
        this.ids = data.id
    },
    methods: {
        // jumpFun(ele){
        //     this.$router.push({name: "EnterpriseAudit"})
        // },
        saveStateFun(ele){
            let params = {
                apply_state: ele,  //  2审核通过，3驳回
                id: this.ids
            }
            UpdateNodeApply(params)
                .then(res => {
                    console.log(res)
                    if (res.result == true) {
                        this.$message.success(res.message);
                        this.$router.push({name: "EnterpriseAudit"})
                    }else{
                        this.$message.error(res.message);
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
             
        }

    }
}
</script>

<style scoped lang='less'>
    .content{
        padding: 10px 30px 0;
        height: 100%; 
        background: #fff;
        box-sizing: border-box;
        .title{
            margin: 20px 0;
            font-size: 15px;
        }
        .data{
            margin: 20px;
            display: flex;
            width: 500px;
            font-size: 14px;
            .data-tit{
                margin-right: 20px;
                width: 120px;
                text-align: right;
            }
            .data-msg{
                flex: 1;
            }
            .el-button{
                margin-left: 30px;
            }
        }
    }
</style>
<style lang='less'>
    .xqReview{
        .el-input__suffix{
            top: 5px;
        }
    }
</style>
