<template>
    <div class="content szProcessing">
        <div class="searchs" ref="searchs">
            <div class="search">
                <el-form ref="form" :inline="true" :model="form" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-select v-model="goodName" filterable clearable placeholder="请选择">
                            <el-option v-for="item in goodList" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="search-btn" @click="searchFun" style="margin-left: 10px;">搜索</el-button>
                        <span class="clear-content" @click="clearFun">清空筛选条件</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p class="tz-title">全部加工工艺</p>
                <div>
                    <el-button type="primary" @click="newFun"> + 创建加工工艺</el-button>
                    <!--<el-button type="primary" id="btn-file" plain @click="isShowFun($event)" @onblur="closeFun">批量导入</el-button>
                    <el-button type="primary" plain @click="getDownloadAssetsBase">导出</el-button>-->
                </div>
            </div>
            <!--<div class="file-btns" v-if="isfile">
                <div>
                    <span class="submit">
                        批量新增
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="file" @change="fileFun($event,1)">
                        </form>
                    </span>
                </div>
                <div>
                    <span class="submit">
                        批量修改
                        <form id="upload" enctype="multipart/form-data" method="post"> 
                            <input type="file" class="file" ref="files" @change="fileFun($event,2)">
                        </form>
                    </span>
                </div>
                <el-button type="primary" plain @click="fileAddFun(1)">批量新增</el-button>
                <el-button type="primary" plain @click="fileAddFun(2)">批量修改</el-button>
            </div>-->
            <div class="tables" >
                <el-table :data="tableData" :header-cell-style="rowClass">
                    <el-table-column prop="assets_id" label="工艺名称"> </el-table-column>
                    <el-table-column prop="assets_name" label="周期"> </el-table-column>
                    <el-table-column prop="assets_type" label="工艺描述"> </el-table-column>
                    <el-table-column prop="bar_code" label="排序"> </el-table-column>
                    <el-table-column prop="serial_num" label="所属商品"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="viewFun(scope.row)">查看附件</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
            layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
        </div>
        <!--附件-->
        <div class="big-img" v-show="isBigImg" ref="boxsize">
            <p class="close" @click="closeFun2">X</p>
            <div class="imgBox">
                <figure class="images" v-for="(item,index) in imgArrs" :key="index" v-if="imgArrs.length > 0">
                    <img :style="sizeObj" :src="item.img_url" v-if="item.img_url">
                </figure>
            </div>
        </div>
        <!--新增 编辑-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}加工工艺</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form" :model="form" label-width="120px">
                    <el-form-item label="所属商品">
                        <el-select v-model="form.goodName" filterable clearable placeholder="请选择">
                            <el-option v-for="item in goodArr" :key="item.a_conf_id" :label="item.a_conf_item"
                            :value="item.a_conf_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工艺名称">
                        <el-input clearable v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="周期">
                        <el-input clearable v-model="form.cycle" placeholder="如：3-5天"></el-input>
                    </el-form-item>
                    <el-form-item label="工艺描述">
                        <el-input clearable v-model="form.cycle" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                    <figure class="image">
                                        <p class="icon-delete" @click="removeFun(index)">-</p><!---->
                                        <img :src="item.img_url">
                                    </figure>
                                </li>
                            </ul>
                            </div>
                            <div>
                                <div class="submit">
                                    上传图片
                                    <form id="upload" enctype="multipart/form-data" method="post"> 
                                        <input type="file" class="file" ref="file" @change="fileFun($event)">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input clearable v-model="form.cycle" placeholder="数字越大 排序越靠后"></el-input>
                    </el-form-item>
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm">确认</el-button>
                    </el-form-item>
                </el-form>
            
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"szProcessing",
    data() {
        return {
            goodName: '',
            goodList: '',
            page: 1,
            cols: 15,
            num: 0,
            tableData: [
                {assets_id: '55416541564'}
            ],
            isBigImg: false,
            sizeObj: {},
            url: '',
            imgArr1: [],
            imgArrs: [],
            prompt: '创建',
            isEdits: false,
            form: {
                goodName: '', // 所属商品
                name: '', // 工艺名称
                cycle: '', // 周期
            },
            goodArr: [],
        }
    },
    mounted() {
        
    },
    methods: {
        removeFun(ele){
            // this.imgArr1.splice(ele,1)
            // this.imgArr1.length - 1
        },
        submitForm(){
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         this.newAssetsTypeFun()
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        cancelFun(){
            this.closeFun()
        },
        newFun(){
            this.prompt = '创建'
            this.isEdits = true
        },
        closeFun(){
            this.isEdits = false
        },
        editFun(ele){
            this.prompt = '编辑'
            this.isEdits = true
        },
        viewFun(ele){
            this.isBigImg = true
        },
        handleCurrentChange(val) {
            this.page = val
            this.getQueryAssetsBase()
        },
        searchFun(){

        },
        clearFun(){
            this.goodName = ''
        },
        closeFun2(){
            this.isBigImg = false
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
            margin-top: 2px;
            margin-right: 10px;
            color: #409EFF;
            background: #fff;
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
            position: relative;
            background: #fff;
            .file-btns{
                position: absolute;
                top: 40px;
                right: 69px;
                z-index: 22;
                background: #fff;
                div{
                    margin-bottom: -5px;
                }
                .submit{
                    position: relative;
                    left: 0;
                    display: inline-block;
                    width: 78px;
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
                        width: 78px;
                        height: 30px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .submit:hover{
                    background: #409EFF;
                    color: #fff;
                }
            }
            .import{
                color: #409EFF;
                background: #fff;
            }
            .title{
                display: flex;
                margin-bottom: 10px;
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
        }
        .el-pagination{
            margin: 20px 0;
            text-align: center;
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
                margin-top: -270px;
                margin-left: -280px;
                width: 560px;
                height: 540px;
                background: #fff;
                .box-title{
                    margin: 0 10px;
                    height: 40px;
                    border-bottom: 1px solid #ccc;
                    .tit{
                        float: left;
                        margin-left: 10px;
                        width: 330px;
                        line-height: 40px;
                        font-size: 14px;
                    }
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
                .form{
                    clear: both;
                    margin-top: 20px;
                    margin-left: 30px;
                    .el-input,.el-select,.el-textarea{
                        width: 300px;
                    }
                    .btn{
                        margin-top: 20px;
                        margin-left: 80px;
                    }
                }
                .download{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                }
                .submit{
                    margin: 30px auto;
                    position: relative;
                    left: 40%;
                    display: inline-block;
                    width: 90px;
                    height: 30px;
                    line-height: 30px;
                    color: #409EFF;
                    background: #fff;
                    text-align: center;
                    overflow: hidden;
                    border-radius: 5px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #409EFF;
                    .file{
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        width: 90px;
                        height: 36px;
                        opacity: 0;
                        background: rgba(0,0,0,0);
                    }
                }
                .submit:hover{
                    background: #409EFF;
                    color: #fff;
                }
                .btn{
                    margin-left: 270px;
                }
            }
        }
        .big-img{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            .close{
                position: fixed;
                top: 0;
                right: 0;
                z-index: 999;
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
            .imgBox{
                margin: 50px 20px;
                padding: 10px 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
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
            
        }
        .msg-item{
            margin: 10px 0;
            width: 500px;
            display: flex;
            .submit{
                margin: 0 30px;
                position: relative;
                left: 0;
                top: 20%;
                display: inline-block;
                width: 90px;
                height: 30px;
                line-height: 30px;
                color: #409EFF;
                background: #fff;
                text-align: center;
                overflow: hidden;
                border-radius: 5px;
                font-size: 14px;
                box-sizing: border-box;
                border: 1px solid #409EFF;
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
<style lang='less'>
    .szProcessing{
        .el-date-editor .el-range-separator, .el-date-editor .el-range__icon, .el-date-editor .el-range__close-icon{
            line-height: 24px;
        }
        .el-input--suffix .el-input__inner{
            padding-right: 10px !important;
        }
    }

</style>
