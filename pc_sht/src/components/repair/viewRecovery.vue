<template>
    <div class="content viewRecovery">
        <div class="box">
            <div class="list-title">
                <div class="left">
                    <p class="task">任务内容</p>
                    <p class="btn" @click="showFun">任务日志</p>
                </div>
                <div class="right">
                    <div class="sign"></div>
                    <p>未解决</p>
                </div>
            </div>
            <div class="view">
                <div class="list">
                    <div class="data">
                        <div class="title">任务ID</div>
                        <div class="msg">{{id ? id : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">所属节点</div>
                        <div class="msg">{{node_name ? node_name : '无'}}</div>
                    </div>
                    <div class="data" v-if="isTypes == true">
                        <div class="title">所属商户</div>
                        <div class="msg">{{biz_name ? biz_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">报修模式</div>
                        <div class="msg">{{bxms_name ? bxms_name : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data data2">
                        <div class="title">任务内容</div>
                    </div>
                </div>
                <div class="taskmsg">
                    <div class="list">
                        <div class="data data2">
                            <div class="msg">{{task_msg ? task_msg : '无'}}</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="data data2">
                            <div class="msg" v-if="imgArr1.length > 0">
                                <div class="msg-item">   
                                    <div class="img-list">
                                        <ul>
                                            <li v-for="(item,index) in imgArr1" :key="index" @click="bigImgFun(item,1)" v-if="item.img_url">
                                                <figure class="image">
                                                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                                                </figure>
                                            </li>
                                            <li v-for="(item3,index3) in videoArr" :key="item3.id" @click="bigImgFun(item3,5)" v-if="item3.video_url">
                                                <img class="stop" src="/static/stop.png" alt="">
                                                <video class="borders" width="50" height="50" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item3.video_url" 
                                            ></video>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">指派给</div>
                        <div class="msg">{{zpg_name ? zpg_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">工作组</div>
                        <div class="msg">{{work_name ? work_name : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">优先级</div>
                        <div class="msg">{{priority ? priority : '无'}}</div>
                    </div>
                    <div class="data" v-if="isTypes == true">
                        <div class="title">设备信息</div>
                        <div class="msg">{{equipment ? equipment : '无'}}</div>
                    </div>
                    <div class="data" v-if="isTypes == false">
                        <div class="title">任务类型</div>
                        <div class="msg">
                            <p>{{task_model}}</p>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <div class="data">
                        <div class="title">备注</div>
                        <div class="msg">{{remarke ? remarke : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">创建人</div>
                        <div class="msg">{{peolpe ? peolpe : '无'}}</div>
                    </div>
                    <div class="data">
                        <div class="title">创建时间</div>
                        <div class="msg">{{time ? time : '无'}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="passwrd" v-if="isShow">
            <div class="text">
                <div class="box-title">
                    <p class="tit">任务日志</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="clear"></div>
                <el-timeline>
                    <el-timeline-item placement="top" v-for="(item, index) in taskList" :key="index">
                        <el-card>
                            <div class="operation">
                                <p>{{item.operation_time}}</p>
                                <p class="method">{{item.operation_type}}</p>
                                <p>操作人：{{item.operation_name}}</p>
                            </div>
                            <p class="msg">{{item.operation_text}}</p>
                            <div class="data-msg">
                                <div class="msg-item">   
                                    <div class="img-list">
                                        <ul>
                                            <li v-for="(item2,index2) in item.img_list" :key="index2" @click="bigImgFun(item2,4,item)" v-if="item2.url">
                                                <figure class="image">
                                                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item2.url">
                                                </figure>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item placement="top" v-if="taskList.length > 0"></el-timeline-item>
                </el-timeline>
                <div class="btn">
                    <el-button type="primary" @click="closeFun">关闭</el-button>
                </div>
            </div>
        </div>
        <div class="bigimg-box" v-show="isBigImg" ref="boxsize">
            <p class="iconfont icon-close close" @click="closeFun2"></p>
            <div class="videos" v-if="video_url">
                <video width="500" height="600" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + video_url" 
                    controls="controls"></video>
            </div>
            <div class="imgBox" v-else>
                <el-carousel trigger="click" :autoplay="autoplay" :initial-index="current" :height="imgHeight + 'px'">
                    <el-carousel-item  v-for="(item,index) in imgArr" :key="index" v-if="imgArr">
                        <figure class="images" v-if="item.img_url">
                            <img :style="sizeObj" :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com/' + item.img_url">
                        </figure>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </div>
</template>

<script>
import {GetAssetsTaskInfo,GetAssetsTaskImg,GetAssetsTaskResult,GetAssetsTaskLog} from '../../js/repair/repair.js'
export default {
    name:"viewRecovery",
    data() {
        return {
            id: '',
            node_name: '', // 选择节点
            biz_name: '',
            bxms_name: '', // 报修模式
            task_msg: '', // 任务内容
            zpg_name: '', // 指派给
            work_name: '', // 工作组
            priority: 0, // 优先级
            equipment: '', // 设备信息
            remarke: '', // 备注
            solve: '', // 解决方案
            create_name: '',
            peolpe: '',
            time: '',
            isShow: false,
            imgArr1: [],
            imgArr2: [],
            isBigImg: false,
            equipmentList: [],
            taskList: [],
            task_type: '',
            task_model: '',
            isTypes: false,
            sizeObj: {},
            autoplay: false,
            current: 0,
            imgHeight: '',
            imgArr: [],
            videoArr: [],
            video_url: '',
        }
    },
    mounted() {
        let msg = this.$route.params
        this.id = msg.id
        this.node_name = msg.node_name // 选择节点
        this.biz_name = msg.biz_name
        this.bxms_name = msg.repair_model // 报修模式
        this.task_msg = msg.task_content // 任务内容
        this.zpg_name = msg.assigned_name // 指派给
        this.work_name = msg.group_name // 工作组
        this.priority = msg.level // 优先级
        this.remarke = msg.remark // 备注
        this.peolpe = msg.create_name // 
        this.time = msg.record_time
        if(msg.task_type == '1'){
            this.isTypes = true
            this.getGetAssetsTaskInfo()
        }else{
            this.isTypes = false
            this.task_model = msg.task_model
        }
        this.getImgFun()
        this.getGetAssetsTaskResult()
        this.getGetAssetsTaskLog()
    },
    methods: {
        getGetAssetsTaskLog(){
            let str = 'id=' + this.id;
            GetAssetsTaskLog(str)
                .then(res => {
                    this.taskList = res.data
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        closeFun2(){
            this.imgArr = []
            this.video_url = ''
            this.isBigImg = false
        },
        bigImgFun(item,ele2,ele3){
            if(ele2 == 1){
                this.imgArr1.forEach((ele,index) => {
                    if(item.id == ele.id){
                        this.current = index
                    }
                })
                this.imgArr = this.imgArr1
            }else if(ele2 == 2){
                this.imgArr2.forEach((ele,index) => {
                    if(item.id == ele.id){
                        this.current = index
                    }
                })
                this.imgArr = this.imgArr2
            }else if(ele2 == 3){
                ele3.info_list.forEach((ele,index) => {
                    ele.img_url = ele.url
                    if(item.id == ele.id){
                        this.current = index
                    }
                })
                this.imgArr = ele3.info_list
            }else if(ele2 == 4){
                ele3.img_list.forEach((ele,index) => {
                    ele.img_url = ele.url
                    if(item.id == ele.id){
                        this.current = index
                    }
                })
                this.imgArr = ele3.img_list
            }else if (ele2 == 5){
                this.video_url = item.video_url
            }
            this.$nextTick(()=>{            
                this.imgHeight = this.$refs.boxsize.offsetHeight - 60
                let sizeObj = {
                    'max-height': this.$refs.boxsize.offsetHeight - 60 + 'px',
                    'max-width': this.$refs.boxsize.offsetWidth - 60 + 'px',
                    'margin-bottom': 10 + 'px'
                }
                this.sizeObj = sizeObj
            })
            this.isBigImg = true
        },
        // 查看解决方案
        getGetAssetsTaskResult(){
            let str = 'id=' + this.id;
            GetAssetsTaskResult(str)
                .then(res => {
                    if(res.data){
                        this.solve = res.data.text
                        if(res.data.img_list.length > 0){
                            res.data.img_list.forEach(val => {
                                val.img_url = val.url
                                this.imgArr2.push(val)
                            })
                        }
                    }
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        // 查看图片
        getImgFun(){
            this.imgArr1 = []
            let params = {
                id: this.id,
            }
            GetAssetsTaskImg(params)
                .then(res => {
                    res.data.forEach(val => {
                        if(val.url.substr(val.url.length - 4, val.url.length - 1) == '.mp4'){
                            val.video_url = val.url
                            this.videoArr.push(val)
                        }
                        if(val.url.substr(val.url.length - 4, val.url.length - 1) != '.mp4'){
                            val.img_url = val.url
                            this.imgArr1.push(val)
                        }
                    })
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        // 获取数据已保存设备
        getGetAssetsTaskInfo(){
            let str = 'id=' + this.id;
            GetAssetsTaskInfo(str)
                .then(res => {
                    this.equipmentList = res.data
                })
                .catch(res => {
                    console.log(res);
                })
        },
        showFun(){
            this.getGetAssetsTaskLog()
            this.isShow = true
        },
        closeFun(){
            this.isShow = false
            this.taskList = []
        },
    },
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        .taskmsg{
            margin-bottom: 10px;
            border: 1px solid #ccc;
        }
        .view{
            margin: 0 10px;
        }
        .bigimg-box{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .videos{
                margin-top: 100px;
                text-align: center;
            }
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 666;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
            .images{
                text-align: center;
            }
            .el-carousel{
                margin: 30px auto;
                padding: 10px 0;
                width: 90%;
                height: 90%;
                .image{
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
            }
            .el-carousel__container{
                width: 100%;
                height: 100%;
            }
            .el-carousel__item{
                color: #475669;
                font-size: 14px;
                margin: 0;
            }
        }
        .box{
            padding: 10px 20px;
            background: #fff;
            .list-title{
                padding: 30px 0;
                margin: 0 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                .left, .right{
                    display: flex;
                    align-items: center;
                }
                .left{
                    .task{
                        font-size: 16px;
                        font-weight: bolder;
                    }
                    .btn{
                        margin-left: 30px;
                        width: 60px;
                        height: 22px;
                        line-height: 22px;
                        font-size: 12px;
                        text-align: center;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }
                .right{
                    .sign{
                        margin-right: 10px;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #e6a23c;
                    }
                }
                .list-tit{
                    font-size: 16px;
                    font-weight: bolder;
                }
            }
            .list{
                display: flex;
                flex-wrap: wrap;
            }
            .data{
                margin: 5px 10px;
                width: 22%;
                font-size: 14px;
                .title{
                    margin-bottom: 10px;
                }
                .msg{
                    color: #999;
                }
                .img-list{
                    ul{
                        display: flex;
                        flex-wrap:wrap;
                        li{
                            position: relative;
                            top: 0;
                            left: 0;
                            margin: 0 10px;
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
                            .stop{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 50px;
                                height: 50px;
                                border: none;
                            }
                            img{
                                width: 50px;
                                height: 50px;
                            }
                        }
                    }
                }
                .msg-item{
                    width: 500px;
                    display: flex;
                }
            }
            .data2{
                width: 100%;
            }
            .data3{
                width: 28%;
            }
            .data4{
                display: flex;
                width: 100%;
                .title{
                    margin-right: 30px;
                }
            }
            .btn{
                clear: both;
                margin-right: 100px;
                text-align: right;
            }
        }
        .passwrd{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 666;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .text{
                position: relative;
                top: 50%;
                left: 50%;
                margin-top: -300px;
                margin-left: -300px;
                width: 600px;
                height: 600px;
                background: #fff;
                font-size: 14px;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        line-height: 40px;
                        font-size: 14px;
                    }
                    .close{
                        float: right;
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
                .clear{
                    clear: both;
                }
                .operation{
                    display: flex;
                    p{
                        flex: 1;
                    }
                    .method{
                        text-align: center;
                        font-weight: bolder;
                    }
                }
                .msg{
                    color: #999;
                    line-height: 22px;
                }
                .data-msg{
                    .img-list{
                        ul{
                            display: flex;
                            flex-wrap:wrap;
                            li{
                                position: relative;
                                top: 0;
                                left: 0;
                                margin: 0 10px;
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
                    .msg-item{
                        width: 470px;
                        display: flex;
                    }
                }
                .btn{
                    margin-top: 10px;
                    margin-left: 280px;
                }
            }
        }
        .el-timeline{
            margin: 15px 20px;
            height: 480px;
            overflow: auto;
        }
    }
</style>
