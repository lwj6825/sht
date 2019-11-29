<template>
    <div class="content" ref="content">
        <div class="create-code" ref="createCode">
            <el-select v-model="value" placeholder="选择市场区域">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary">生成邀请码</el-button>
        </div>
        <div class="list" > 
            <ul>
                <li class="area-list" v-for='item in areaCodeMsg' :key="item.id">
                    <header class="title">{{item.areaName}}</header>
                    <ul class="code-list">
                        <li class="code-li" v-for='code in item.codeList' :key='code.id' :class='{copy:code.isCopy}'>
                            <div class="item-code">
                                <span class="code">{{code.code}}</span>
                                <span class="copy-btn" @click="copyCode(item.id,code.id)">复制</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {QueryArea} from '../../js/area/area.js';
export default {
    name:'invitationMerchants',
    data(){
        return{
            options: [],
            value: '',
            areaCodeMsg:[
                {
                    id:"00",
                    areaName:'北一厅邀请码',                    
                    codeList:[
                        {code:'S3D4F9',id:'01',isCopy:false,},
                        {code:'S3D4F9',id:'02',isCopy:false,},
                        {code:'S3D4F9',id:'03',isCopy:false,},
                        {code:'S3D4F9',id:'04',isCopy:false,},
                        {code:'S3D4F9',id:'05',isCopy:false,},
                        {code:'S3D4F9',id:'06',isCopy:false,},
                    ]
                },
                {
                    id:"01",
                    areaName:'南一厅邀请码',
                    codeList:[
                        {code:'S3D4F9',id:'01',isCopy:false,},
                        {code:'S3D4F9',id:'02',isCopy:false,},
                        {code:'S3D4F9',id:'03',isCopy:false,},
                        {code:'S3D4F9',id:'04',isCopy:false,},
                        {code:'S3D4F9',id:'05',isCopy:false,},
                        {code:'S3D4F9',id:'06',isCopy:false,},
                    ]
                },
                {
                    id:"02",
                    areaName:'菜零售邀请码',
                    codeList:[
                        {code:'S3D4F9',id:'01',isCopy:false,},
                        {code:'S3D4F9',id:'02',isCopy:false,},
                        {code:'S3D4F9',id:'03',isCopy:false,},
                        {code:'S3D4F9',id:'04',isCopy:false,},
                        {code:'S3D4F9',id:'05',isCopy:false,},
                        {code:'S3D4F9',id:'06',isCopy:false,},
                    ]
                },
            ],
            userId: '',
            node_id: '',
        }
    },
    mounted(){
        this.getAreaList();//获取区域列表 
    },
    created() {
        this.userId = localStorage.getItem('userId')
        this.node_id = localStorage.getItem('loginId');
    },
    methods:{
        copyCode(areaId,codeId){
            // console.log(areaId,codeId)
            this.areaCodeMsg.forEach(ele => {
                if(ele.id == areaId){
                    ele.codeList.forEach(ele => {
                        if(ele.id == codeId){
                            ele.isCopy = !ele.isCopy;
                        }
                    })
                }
            });
        },
        getAreaList(){
            let data = {
                page:"1",
                cols:"15",
                total:"",
                userId: this.userId,
                name:"",
                boothName:"",
                node_id: this.node_id
            }
            QueryArea(data)
                .then(res =>{
                    // console.log(res.data)
                    res.data.dataList.forEach(ele => {
                        this.options.push({
                            value: ele.userId ,
                            label: ele.name
                        });
                    })                    
                })
                .catch(res =>{
                    console.log(res)
                })
        },
    }
}
</script>

<style rel="stylesheet/less" lang='less' scoped>
    .content{
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
        height: 100%;
        background: #fff;
        overflow: hidden;
        box-sizing: border-box;
    }
    .create-code{
        margin: 0 auto 20px;
        padding-left: 50px;
    }
    .list{
        padding: 0 30px;
        overflow-y: scroll;
        width: 97%;
        .area-list,.code-list{
            overflow: hidden;
        }
        .title{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ddd;
        }
        .code-li{
            float: left;
            .item-code{
                margin-right: 15px;
                margin-top: 10px;
                border:1px solid #ddd;
                font-size: 14px;
                overflow: hidden;
            }
            .code{
                float: left;
                display: block;
                padding: 5px 15px;
                border-right: 1px solid #ddd;
            }
            .copy-btn{
                float: left;
                display: block;
                padding: 5px 15px;
                cursor: pointer;
            }
            &.copy{
                .item-code{
                    border-color: #409EFF;
                }
                .code{
                    color: #fff;
                    background: #409EFF;
                }
                .copy-btn{
                    color: #409EFF;
                }
            }
        }
    }
</style>
