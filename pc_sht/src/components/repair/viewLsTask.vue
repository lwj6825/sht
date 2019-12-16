<template>
    <div class="content viewLsTask">
        <div class="box">
            <div class="list-title">
                <div class="left">
                    <p class="task">任务内容</p>
                    <p class="btn" @click="showFun">任务日志</p>
                </div>
                <div class="right">
                    <div class="sign"></div>
                    <p>已解决</p>
                </div>
            </div>
            <div class="view">
                <div class="list">
                    <div class="data data3">
                        <div class="title">任务ID</div>
                        <div class="msg">{{id ? id : '无'}}</div>
                    </div>
                    <div class="data data3">
                        <div class="title">所属节点</div>
                        <div class="msg">{{node_name ? node_name : '无'}}</div>
                    </div>
                    <div class="data data3">
                        <div class="title">报修模式</div>
                        <div class="msg">{{bxms_name ? bxms_name : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data data2">
                        <div class="title">任务内容</div>
                        <div class="msg">{{task_msg ? task_msg : '无'}}</div>
                    </div>
                </div>
                <div class="list">
                    <div class="data data2">
                        <div class="msg" v-if="imgArr1.length > 0">
                            <div class="msg-item">   
                                <div class="img-list">
                                    <ul>
                                        <li v-for="(item,index) in imgArr1" :key="index" @click="bigImgFun(item)" v-if="item.img_url">
                                            <figure class="image">
                                                <img :src="item.img_url">
                                            </figure>
                                        </li>
                                    </ul>
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
                    <div class="data">
                        <div class="title">设备信息</div>
                        <div class="msg">{{equipment ? equipment : '无'}}</div>
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
            <div class="list-title">
                <div class="list-tit">解决方案</div>
            </div>
            <div class="list">
                <div class="data data4">
                    <div class="title">解决方案</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
                </div>
            </div>
            <div class="list">
                <div class="data data4">
                    <div class="title">设备名称</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
                </div>
                <div class="data data4">
                    <div class="title">设备问题</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
                </div>
                <div class="data data4">
                    <div class="title">更换部件</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
                </div>
                <div class="data data4">
                    <div class="title">解决方案</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
                </div>
                <div class="data data4">
                    <div class="title">维修结果</div>
                    <div class="msg">{{solve ? solve : '无'}}</div>
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
                    <el-timeline-item placement="top">
                        <el-card>
                            <div class="operation">
                                <p>2019-12-10 15:40</p>
                                <p>删除</p>
                                <p>操作人：王萍</p>
                            </div>
                            <p class="msg">删除了任务</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item placement="top">
                        <el-card>
                            <div class="operation">
                                <p>2019-12-10 15:40</p>
                                <p>删除</p>
                                <p>操作人：王萍</p>
                            </div>
                            <p class="msg">删除了任务</p>
                            <p class="msg">删除了任务</p>
                            <p class="msg">删除了任务</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item placement="top">
                        <el-card>
                            <div class="operation">
                                <p>2019-12-10 15:40</p>
                                <p>删除</p>
                                <p>操作人：王萍</p>
                            </div>
                            <p class="msg">删除了任务</p>
                        </el-card>
                    </el-timeline-item>
                    <el-timeline-item placement="top">
                        
                    </el-timeline-item>
                </el-timeline>
                <div class="btn">
                    <el-button type="primary" @click="closeFun">关闭</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"viewLsTask",
    data() {
        return {
            id: '',
            node_name: '', // 选择节点
            bxms_name: '', // 报修模式
            task_msg: '', // 任务内容
            zpg_name: '', // 指派给
            work_name: '', // 工作组
            priority: 0, // 优先级
            equipment: '', // 设备信息
            remarke: '', // 备注
            solve: '', // 解决方案
            peolpe: '',
            time: '',
            isShow: false,
            imgArr1: [],
            isBigImg: false,
        }
    },
    mounted() {
       
    },
    methods: {
        showFun(){
            this.isShow = true
        },
        closeFun(){
            this.isShow = false
        },
    },
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
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
                        background: #009900;
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
                margin: 5px 20px;
                width: 20%;
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
                .msg-item{
                    margin: 10px 0;
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
                }
                .msg{
                    color: #999;
                    line-height: 22px;
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
