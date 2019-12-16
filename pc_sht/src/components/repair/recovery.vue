<template>
    <div class="content recovery">
        <div class="table">
            <div class="title">
                <p class="tz-title">任务列表</p>
            </div>
            <el-table :data="tableData" :header-cell-style="rowClass">
                <el-table-column prop="node_id" label="任务ID"> </el-table-column>
                <el-table-column prop="task_name" label="任务内容"> 
                    <template slot-scope="scope">
                        <div class="task_name">
                            <el-tooltip class="item" effect="dark" :content="scope.row.task_name" placement="top">
                                <p>{{scope.row.task_name}}</p>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="parse_type_num" label="所属节点"> </el-table-column>
                <el-table-column prop="record_date" label="指派给">
                    <template slot-scope="scope">
                        <div class="zpg" v-if="!scope.row.record_date">
                            <span style="font-weight: bolder">未指派</span>
                            <span></span>
                        </div>
                        <div class="zpg" v-else>
                            <span>{{scope.row.record_date}}</span>
                            <span></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="beanString" label="工作组"> </el-table-column>
                <el-table-column prop="downPath" label="操作人"> </el-table-column>
                <el-table-column prop="upPath" label="操作时间"> </el-table-column>
                <el-table-column label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="viewFun(scope.row)">查看</el-button>
                        <el-button type="text" size="small" @click="editFun(scope.row)">恢复</el-button>
                        <el-button type="text" size="small" @click="deleteFun(scope.row)">彻底删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-if="total" background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <!--指派给-->
        <div class="passwrd assign" v-if="isAssign">
            <div class="text">
                <div class="box-title">
                    <p class="tit">指派给</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <div class="clear"></div>
                <div class="msg">
                    <p>工作组</p>
                    <el-select v-model="work_id" filterable clearable placeholder="请选择">
                        <el-option v-for="(item,index) in workArr" :key="index" :label="item.node_name"
                        :value="item.node_id">
                        </el-option>
                    </el-select>
                    <p>运维人员</p>
                    <el-select v-model="assign_id" filterable clearable placeholder="请选择">
                        <el-option v-for="(item,index) in assignArr" :key="index" :label="item.node_name"
                        :value="item.node_id">
                        </el-option>
                    </el-select>
                </div>
                <div class="btn">
                    <el-button @click="closeFun">取消</el-button>
                    <el-button type="primary" @click="saveAssignFun">指派</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"recovery",
    data() {
        return {
            page: 1,
            cols: 15,
            total: 0,
            tableData: [{record_date: '回收',task_name: '回收任务内容任务内容任务内容任务内容'},{method: '已关闭'}],
            isAssign: false,
        }
    },
    mounted() {
       
    },
    methods: {
        submitForm2(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun2()
                } else {
                    return false;
                }
            });
        },
        // 新增编辑保存
        saveFun2(){

        },
        // 关闭新增编辑
        closeFun3(){
            this.isSolve = false
            this.form3 = {
                solve: '',
            },
            this.file = ''
            this.imgArr1 = []
        },
        fileFun(event){
            this.count = 1
            this.imgArr1 = []
            let that = this
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('img_url', this.file);   
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };
            const ajaxPost = function (url, params,config) {
                return new Promise((resolve, reject) => {
                    axios
                        .post(url, params,{config})
                        .then((res) => {

                            resolve(res.data)
                        })
                        .catch(() => {
                            reject('error')
                        })
                })
            }  
            // let url = uploadImg
            // ajaxPost(url,formData,config)
            //     .then(res => {
            //         if(res.result == true){
            //             this.imgArr1 = []
            //             let obj = {
            //                 img_url: res.data
            //             }
            //             let arr = []
            //             arr.push(obj)
            //             this.imgArr1 = arr
            //             if(this.prompt == '修改'){
            //                 this.editImgArr.push(res.data)
            //             }
            //             this.$message.success(res.message);
            //         }else{
            //             this.$message.error(res.message);
            //         }
            //         that.$refs.file.value = null
            //         this.file = null
            //     })
            //     .catch(res => {
            //         console.log(res)
            //     })

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFun()
                } else {
                    return false;
                }
            });
        },
        // 新增编辑保存
        saveFun(){

        },
        // 关闭新增编辑
        closeFun2(){
            this.isEdits = false
            this.form2 = {
                node_id: '', // 选择节点
                bxms_id: '', // 报修模式
                task_msg: '', // 任务内容
                equipment: '', // 设备信息
                work_id: '', // 工作组
                assign_id: '', // 技术人员
                priority: 0, // 优先级
                remarke: '', // 备注
            }
            this.prompt = '新增'
            this.file = ''
            this.imgArr1 = []
        },
        // 打开指派
        assignFun(){
            this.isAssign = true
        },
        // 关闭指派
        closeFun(){
            this.isAssign = false // 指派
            this.assign_id = '' // 运维人员
            this.work_id = '' // 工作组
        },
        // 保存指派
        saveAssignFun(){

        },
        addFun(){
            this.isEdits = true
        },
        viewFun(ele){
            this.$router.push({name: 'ViewRecovery',params: {ele}})
        },
        editFun(ele){
            this.isEdits = true
            this.prompt = '编辑'
        },
        stopFun(ele){
            this.isSolve = true
        },
        deleteFun(){
            
        },
        selectTypesFun(){

        },
        getDataFun(){
            let params = {
                cols: this.cols,
                page: this.page,
                node_name: this.form.node_name,
            }
            GetNodeInfoXt(params)
                .then(res => {
                    this.tableData = res.data.list
                    this.total = res.data.bean.total;
                })
                .catch((res) => {
                    this.$message.error("出错啦!");
                    console.log(res)
                })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getDataFun()
        },
        searchFun(){
            this.page = 1
            this.getDataFun()
        },
        clearFun(){
            this.form = {
                msg: '',
                node_id: '',
                bxms_id: '',
                zpg_id: '',
                work_id: '',
                people: '',
            }
            this.page = 1
            this.getDataFun()
        },
        rowClass({ row, rowIndex}) {
            return {
                background: '#f2f2f2',
                color: '#333'
            }
        },
    },
}
</script>

<style scoped lang='less'>
    @import '../../assets/css/common.css';
    .content{
        width: 100%;
        height: 100%;
        .search-btn{
            color: #409EFF;
            background: #fff;
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
                margin-top: -250px;
                margin-left: -300px;
                width: 600px;
                height: 500px;
                background: #fff;
                font-size: 14px;
                .clear{
                    clear: both;
                }
                .form{
                    margin-top: 10px;
                    .el-select, .el-input{
                        width: 400px;
                    }
                    .zpg{
                        .el-select, .el-input{
                            width: 200px;
                        }
                    }
                }
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
                .msg-box{
                    clear: both;
                    margin: 15px 0;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    font-size: 14px;
                    .data{
                        margin: 0 10px 10px;
                        width: 280px;
                        display: flex;
                        .tit{
                            width: 100px;
                        }
                        .el-select{
                            width: 150px;
                        }
                    }
                }
                .tips{
                    margin-left: 20px;
                    margin-bottom: 15px;
                    font-size: 12px;
                    color: #ccc;
                }
                .search{
                    display: flex;
                    justify-content: space-between;
                    div{
                        width: 310px;
                    }
                    .el-input{
                        margin-left: 30px;
                        width: 200px;
                    }
                    .ss-btn{
                        margin-left: 20px;
                        background: #fff;
                        color: #409EFF;
                    }
                    .znlr-btn{
                        margin-right: 30px;
                    }
                }
                .btn{
                    margin-top: 10px;
                    margin-left: 330px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 10px auto;
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 90px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                } 
                .table{
                    margin-top: 0;
                    .price{
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
        }
        .assign{
            .text{
                margin-top: -130px;
                margin-left: -120px;
                width: 240px;
                height: 260px;
                .msg{
                    margin: 0 30px;
                    p{
                        margin: 10px 0;
                    }
                    .el-select{
                        width: 180px;
                    }
                }
                .btn{
                    margin-top: 20px;
                    margin-left: 60px;
                    span{
                        font-size: 14px;
                        color: #999;
                    }
                }
            }
        }
        .solve{
            .text{
                margin-top: -220px;
                height: 440px;
                textarea{
                    margin: 10px;
                    width: 400px;
                    height: 200px;
                    border: 1px solid #ccc;
                }
                .submit{
                    left: 120px;
                }
            }
        }
        .searchs{
            padding: 10px 0;
            background: #fff;
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
                .el-form{
                    min-width: 950px;
                }
                .el-input,.el-date-picker,.el-select,.el-cascader{
                    width: 200px;
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
        }
        .table{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
            .title{
                display: flex;
                margin: 10px 0;
                .tz-title{
                    flex: 1;
                    padding-left: 4px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    box-sizing: border-box;
                    border-left: 2px solid #409EFF;
                }
                div{
                    display: flex;
                    width: 300px;
                    justify-content: flex-end;
                }
            }
            .zpg{
                display: flex;
                align-items: center;
                span:last-child{
                    height: 16px;
                }
            }
            .task_name{
                p{
                    width: 100%;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
            }
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
        }
        
    }
</style>
