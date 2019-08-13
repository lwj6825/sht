<template>
    <div class="content szViewEnterprise">
        <div class="box">
            <div class="list-title">基本资料</div>
            <div class="list">
                <div class="data">
                    <div class="title">账号</div>
                    <div class="msg">{{form.account}}</div>
                </div>
                <div class="data">
                    <div class="title">密码</div>
                    <div class="msg">{{form.password}}</div>
                </div>
                <div class="data">
                    <div class="title">联系人</div>
                    <div class="msg">{{form.name}}</div>
                </div>
                <div class="data">
                    <div class="title">联系方式</div>
                    <div class="msg">{{form.callphone}}</div>
                </div>
                <!--<div class="data">
                    <div class="title">角色</div>
                    <div class="msg">{{form.role}}</div>
                </div>
                <div class="data">
                    <div class="title">企业编码</div>
                    <div class="msg">{{form.qyCoding}}</div>
                </div>
                <div class="data">
                    <div class="title">企业名称</div>
                    <div class="msg">{{form.qyName}}</div>
                </div>
                <div class="data">
                    <div class="title">状态</div>
                    <div class="msg">
                        <el-switch :width="widthNum" style="width: 150px;" v-model="form.states" active-text="启用" 
                            inactive-text="停用" active-value="启用" inactive-value="停用">
                        </el-switch>
                    </div>
                </div>-->
            </div>
        </div>
        <div class="enterprise">
            <div class="list-title">企业信息</div>
            <div class="data">
                <div class="title">企业名称</div>
                <div class="msg">{{form.enterprise}}</div>
            </div>
            <div class="data">
                <div class="title">营业执照号</div>
                <div class="msg">{{form.licenceNo}}</div>
            </div>
            <!--<div class="data">
                <div class="title">营业执照附件</div>
                <div class="msg">
                    <div class="msg-item">   
                        <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                    <figure class="image">
                                        <p class="icon-delete" @click="removeFun(index)">-</p>
                                        <img :src="item.img_url">
                                    </figure>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>-->
            <!--<div class="data">
                <div class="title">法人代表</div>
                <div class="msg">{{form.behalf}}</div>
            </div>-->
            <div class="data">
                <div class="title">联系地址</div>
                <div class="msg">{{form.addr}}</div>
            </div>
            <div class="data">
                <div class="title">详细地址</div>
                <div class="msg">{{form.inforAddr}}</div>
            </div>
            <!--<div class="data">
                <div class="title">经营范围</div>
                <div class="msg">{{form.jyScope}}</div>
            </div>-->
            <div class="list-title">联系人信息</div>
            <div class="data">
                <div class="title">联系人</div>
                <div class="msg">{{form.name}}</div>
            </div>
            <div class="data">
                <div class="title">联系方式</div>
                <div class="msg">{{form.callphone}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"szViewEnterprise",
    data() {
        return {
            form: {
                account: '', // 账号
                password: '', // 密码
                role: '', // 角色
                qyCoding: '', // 企业编码
                qyName: '', // 企业名称
                states: '', // 状态
                enterprise: '', // 企业信息 -- 企业名称
                licenceNo: '', // 营业执照号
                behalf: '', // 法人代表
                addr: '', // 联系地址
                inforAddr: '', // 详细地址
                jyScope: '', // 经营范围
                name: '', // 联系人
                callphone: '', // 联系方式
            },
            widthNum: 70,
            imgArr1: [],
        }
    },
    mounted() {
        console.log(this.$route.params)
        let param = this.$route.params
        this.form.account = param.username
        this.form.password = param.password
        this.form.enterprise = param.name
        this.form.licenceNo = param.licence_no
        this.form.addr = param.area_name
        this.form.inforAddr = param.addr
        this.form.name = param.contacts
        this.form.callphone = param.callphone
    },
    methods: {
        
    },
}
</script>

<style scoped lang='less'>
    .content{
        background: #fff;
        .list-title{
            padding-left: 20px;
            line-height: 40px;
        }
        .box{
            padding: 10px 20px;
            background: #fff;
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 20px;
                width: 28%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
            }
        }
        .enterprise{
            padding: 10px 20px;
            .data{
                display: flex;
                font-size: 14px;
                line-height: 60px;
                .title{
                    margin-right: 50px;
                    width: 120px;
                    text-align: right;
                }
            }
        }
        .msg-item{
            margin: 10px 0;
            width: 500px;
            display: flex;
            .img-list{
                ul{
                    display: flex;
                    flex-wrap:wrap;
                    li{
                        position: relative;
                        top: 0;
                        left: 0;
                        margin: 10px;
                        .icon-delete{
                            position: absolute;
                            top: -6px;
                            right: -6px;
                            width: 12px;
                            height: 12px;
                            text-align: center;
                            line-height: 7px;
                            font-size: 24px;
                            background: #990000;
                            color: #fff;
                            border-radius: 50%;
                            cursor: pointer;
                        }
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }

</style>
<style lang="less">
    .szViewEnterprise{
        .el-input__icon{
            line-height: 30px;
        }
        .el-switch__label--left{
            position: relative;
            left: 60px;
            color: #fff;
            z-index: -1111;
        }
        .el-switch__label--right{
            position: relative;
            right: 60px;
            color: #fff;
            z-index: -1111;
        }
        .el-switch__label.is-active{
            z-index: 1111;
            color: #fff;
        }
        .el-switch__core{
            width: 60px !important;
        }
    }
</style>
