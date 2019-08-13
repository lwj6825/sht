<template>
    <div class="content viewFarming">
        <div class="box">
            <div class="list-title">养殖场信息</div>
            <div class="list">
                <div class="data">
                    <div class="title">养殖场名称</div>
                    <div class="msg">{{form.yzcName}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖场编号</div>
                    <div class="msg">{{form.yzcNum}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖规模</div>
                    <div class="msg">{{form.yzcSize}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖品种</div>
                    <div class="msg">{{form.varieties}}</div>
                </div>
                <div class="data">
                    <div class="title">地址</div>
                    <div class="msg">{{form.addr + form.addrName}}</div>
                </div>
                <div class="data">
                    <div class="title">负责人</div>
                    <div class="msg">{{form.people + '(' + form.phone + ')'}}</div>
                </div>
                <div class="data">
                    <div class="title">所属企业</div>
                    <div class="msg">{{form.enterprise}}</div>
                </div>
                <div class="data">
                    <div class="title">创建日期</div>
                    <div class="msg">{{form.dataTime}}</div>
                </div>
                <div class="data">
                    <div class="title">养殖场介绍</div>
                    <div class="msg">{{form.introduce}}</div>
                </div><!---->
                <div class="data">
                    <div class="title">养殖场信息</div>
                    <div class="msg">
                        <div class="msg-item">   
                            <div class="img-list">
                                <ul>
                                    <li v-for="(item,index) in imgArrs" :key="index" @click="bigImgFun(item)" v-if="item.img_url">
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
        </div>
        <div class="tab">
            <div class="list-title">养殖档案</div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="养殖档案" name="first">
                    <el-button class="btn" @click="newFun">新建养殖档案</el-button>
                    <el-table :data="tableData" :header-cell-style="rowClass">
                        <el-table-column prop="date" label="档案批次"></el-table-column>
                        <el-table-column prop="name" label="档案编号"></el-table-column>
                        <el-table-column prop="province" label="入圈数量(只)"></el-table-column>
                        <el-table-column prop="city" label="入圈时间"></el-table-column>
                        <el-table-column prop="address" label="预计出栏时间"></el-table-column>
                        <el-table-column prop="zip" label="负责人(联系方式)"></el-table-column>
                        <el-table-column prop="city" label="描述"></el-table-column>
                        <el-table-column prop="city" label="图片"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun(scope.row)">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background @current-change="handleCurrentChange" :current-page.sync="page" :page-size="cols"
                        layout="total, prev, pager, next, jumper" :total="num"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="防疫防治" name="second">
                    <el-button class="btn" @click="newFun2">添加防疫防治记录</el-button>
                    <el-table :data="tableData2" :header-cell-style="rowClass">
                        <el-table-column prop="date" label="档案批次"></el-table-column>
                        <el-table-column prop="name" label="防疫内容"></el-table-column>
                        <el-table-column prop="province" label="防疫时间"></el-table-column>
                        <el-table-column prop="city" label="操作人"></el-table-column>
                        <el-table-column prop="address" label="用药时间"></el-table-column>
                        <el-table-column prop="zip" label="剂量"></el-table-column>
                        <el-table-column prop="city" label="生产单位"></el-table-column>
                        <el-table-column prop="city" label="摘要说明"></el-table-column>
                        <el-table-column prop="city" label="图片"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun2(scope.row)">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background @current-change="handleCurrentChange2" :current-page.sync="page2" :page-size="cols2"
                        layout="total, prev, pager, next, jumper" :total="num2"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="饲养记录" name="third">
                    <el-button class="btn" @click="newFun3">添加饲养记录</el-button>
                    <el-table :data="tableData3" :header-cell-style="rowClass">
                        <el-table-column prop="date" label="档案批次"></el-table-column>
                        <el-table-column prop="name" label="日期"></el-table-column>
                        <el-table-column prop="province" label="饲养类型"></el-table-column>
                        <el-table-column prop="city" label="饲养记录"></el-table-column>
                        <el-table-column prop="address" label="附件"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="editFun3(scope.row)">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background @current-change="handleCurrentChange3" :current-page.sync="page3" :page-size="cols3"
                        layout="total, prev, pager, next, jumper" :total="num3"></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--新增 编辑养殖档案-->
        <div class="passwrd" v-if="isEdits">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt}}养殖档案</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form1" :model="form1" label-width="120px">
                    <el-form-item label="档案批次">
                        <el-input clearable v-model="form1.batch"></el-input>
                    </el-form-item>
                    <el-form-item label="档案编号">
                        <el-input clearable v-model="form1.daNum"></el-input>
                    </el-form-item>
                    <el-form-item label="入圈数量">
                        <el-input clearable v-model="form1.rjNum"></el-input>
                    </el-form-item>
                    <el-form-item label="入圈时间">
                        <el-input clearable v-model="form1.rjTime"></el-input>
                    </el-form-item>
                    <el-form-item label="预计出栏时间">
                        <el-date-picker v-model="form1.yjclTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input clearable v-model="form1.people"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input clearable v-model="form1.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input clearable v-model="form1.describe" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                    <figure class="image">
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
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="passwrd" v-if="isEdits2">
            <div class="text">
                <div class="box-title">
                    <p class="tit">{{prompt2}}防疫防治记录</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form2" :model="form2" label-width="120px">
                    <el-form-item label="档案批次">
                        <el-select v-model="form2.batch" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.GOODS_NAME"
                            :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="防疫内容">
                        <el-input clearable v-model="form2.content"></el-input>
                    </el-form-item>
                    <el-form-item label="防疫时间">
                        <el-input clearable v-model="form2.fyTime"></el-input>
                    </el-form-item>
                    <el-form-item label="操作人">
                        <el-input clearable v-model="form2.people"></el-input>
                    </el-form-item>
                    <el-form-item label="用药名称">
                        <el-input clearable v-model="form2.drugName"></el-input>
                    </el-form-item>
                    <el-form-item label="剂量">
                        <el-input clearable v-model="form2.dose"></el-input>
                    </el-form-item>
                    <el-form-item label="药品生产单位">
                        <el-input clearable v-model="form2.production"></el-input>
                    </el-form-item>
                    <el-form-item label="摘要说明">
                        <el-input clearable v-model="form2.describe" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr2" :key="index" v-if="item.img_url">
                                    <figure class="image">
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
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm2">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="passwrd" v-if="isEdits3">
            <div class="text text3">
                <div class="box-title">
                    <p class="tit">{{prompt3}}防疫防治记录</p>
                    <p class="iconfont icon-close close" @click="closeFun"></p>
                </div>
                <el-form class="form" ref="form3" :model="form3" label-width="120px">
                    <el-form-item label="档案批次">
                        <el-select v-model="form3.batch" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in batchList" :key="index" :label="item.GOODS_NAME"
                            :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="form3.time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="饲养类型">
                         <el-select v-model="form3.syTypes" filterable clearable placeholder="请选择">
                            <el-option v-for="(item,index) in typesList" :key="index" :label="item.GOODS_NAME"
                            :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="饲养记录">
                        <el-input clearable v-model="form3.describe" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="msg-item">   
                            <div class="img-list">
                            <ul>
                                <li v-for="(item,index) in imgArr3" :key="index" v-if="item.img_url">
                                    <figure class="image">
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
                    <el-form-item class="btn">
                        <el-button @click="cancelFun">取消</el-button>
                        <el-button type="primary" @click="submitForm2">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"viewFarming",
    data() {
        return {
            form: {
                enterprise: '', // 所属企业
                yzcNum: '', // 养殖场编号
                yzcName: '', // 养殖场名称
                yzcSize: '', // 养殖规模
                varieties: '', // 养殖品种
                addr: '', // 地址
                addrName: '', // 详细地址
                people: '', // 负责人
                phone: '', // 联系方式
                introduce: '', // 养殖场介绍
                dataTime: '', // 创建日期
            },
            imgArrs: [],
            imgArr: [],
            activeName: 'first',
            tableData: [
                {date: '1111'}
            ],
            page: 1,
            cols: 15,
            num: 0,
            tableData2: [
                {date: '2222'}
            ],
            page2: 1,
            cols2: 15,
            num2: 0,
            tableData3: [
                {date: '3333'}
            ],
            page3: 1,
            cols3: 15,
            num3: 0,
            isEdits: false,
            prompt: '新建',
            isEdits2: false,
            prompt2: '添加',
            isEdits3: false,
            prompt3: '添加',
            form1: {
                batch: '', // 档案批次
                daNum: '', // 档案编号
                rjNum: '', // 入圈数量
                rjTime: '', // 入圈时间
                yjclTime: '', // 预计出栏时间
                people: '', // 负责人
                phone: '', // 联系方式
                describe: '', // 描述
            },
            form2: {
                batch: '', // 档案批次
                content: '', // 防疫内容
                fyTime: '', // 防疫时间
                people: '', // 操作人
                drugName: '', // 用药名称
                dose: '', // 剂量
                production: '', // 药品生产单位
                describe: '', // 摘要说明
                
            },
            form3: {
                batch: '', // 档案批次
                time: '', // 时间
                rjNum: '', // 入圈数量
                syTypes: '', // 饲养类型
                describe: '', // 描述
            },
            imgArr1: [],
            imgArr2: [],
            imgArr3: [],
            batchList: [],
            typesList: [],
        }
    },
    mounted() {
        
    },
    methods: {
        submitForm(){

        },
        submitForm2(){

        },
        submitForm3(){

        },
        cancelFun(){
            this.closeFun()
        },
        newFun(){
            this.prompt = '新建'
            this.isEdits = true
        },
        editFun(ele){
            this.prompt = '编辑'
            this.isEdits = true
        },
        newFun2(){
            this.prompt2 = '添加'
            this.isEdits2 = true
        },
        editFun2(ele){
            this.prompt2 = '编辑'
            this.isEdits2 = true
        },
        newFun3(){
            this.prompt3 = '添加'
            this.isEdits3 = true
        },
        editFun3(ele){
            this.prompt3 = '编辑'
            this.isEdits3 = true
        },
        closeFun(){
            this.form1 = {
                batch: '', // 档案批次
                daNum: '', // 档案编号
                rjNum: '', // 入圈数量
                rjTime: '', // 入圈时间
                yjclTime: '', // 预计出栏时间
                people: '', // 负责人
                phone: '', // 联系方式
                describe: '', // 描述
            }
            this.form2 = {
                batch: '', // 档案批次
                content: '', // 防疫内容
                fyTime: '', // 防疫时间
                people: '', // 操作人
                drugName: '', // 用药名称
                dose: '', // 剂量
                production: '', // 药品生产单位
                describe: '', // 摘要说明   
            }
            this.form3 = {
                batch: '', // 档案批次
                time: '', // 时间
                rjNum: '', // 入圈数量
                syTypes: '', // 饲养类型
                describe: '', // 描述
            }
            this.isEdits = false
            this.isEdits2 = false
            this.isEdits3 = false
            this.imgArr1 = []
            this.imgArr2 = []
            this.imgArr3 = []
        },
        handleClick(tab) {
            // console.log(tab);
        },
        handleCurrentChange(val) {
            this.page = val
        },
        handleCurrentChange2(val) {
            this.page2 = val
        },
        handleCurrentChange3(val) {
            this.page3 = val
        },
        fileFun(event){
            let that = this
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('importAssets', this.file);   
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
            // let url = importAssets + '?userid=' + this.userId
            // ajaxPost(url,formData,config)
            //     .then(res => {
            //         if(res[0].result == true){
            //             this.$message.success(res[0].message);
            //         }else{
            //             this.$message.error(res[0].message);
            //         }
            //         // that.$refs.file.value = null
            //         this.file = null
            //     })
            //     .catch(res => {
            //         console.log(res)
            //         this.$message.error("出错了");
            //     })

        },
        searchFun(){

        },
        clearFun(){
            this.form = {
                dataTime: '',
                goodName: '',
                enterprise: '',
            }
            this.getTime()
            this.page = 1
        },
        fileFun(event){
            var that = this;
            let file = event.target.files;
            let reg = /.(jpg|png|PNG|JPG)+$/;           
            if(file[0].size){
                let point = file[0].name.indexOf('.');
                if(!reg.test((file[0].name).slice(point))){
                    this.$message.error("上传图片格式不支持");
                    return;
                }
                let size = file[0].size / 1024 / 1024 ;
                if(size > 0.5){
                    that.clarity = 0.5/size;
                }else{
                    that.clarity = 1;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file[0]); 
                reader.onload = function(){                    
                    that.imgFun(reader.result,that.clarity,function(src){
                        that.imgArr.push(src.slice(23))
                    })
                }
            }
            // let timer = setInterval(()=>{
            //   if(that.imgArr.length == file.length){
            //     let formData = new FormData()  
            //     formData.append('img_url', that.imgArr[0]);   
            //     formData.append('node_id', that.node_id);  
            //     formData.append('id', that.form.goodsID); 
            //     let config = {
            //       headers:{'Content-Type':'multipart/form-data'}
            //     };
            //     const ajaxPost = function (url, params,config) {
            //       return new Promise((resolve, reject) => {
            //         axios
            //           .post(url, params,{config})
            //           .then((res) => {
            //               resolve(res.data)
            //           })
            //           .catch(() => {
            //               reject('error')
            //           })
            //       })
            //     }  
            //     let url = baseUrl + 'goods/updateGoodsImgForTrace'
            //     ajaxPost(url,formData,config)
            //       .then(res => {
            //         that.imgArr = []
            //         that.imgUrl = res.data.img_url
            //       })
            //       .catch(res => {
            //         console.log(res)
            //       })
            //     clearInterval(timer);
            //   }
            // },1000)
        },
        imgFun(path,quality,callback){
            let img = new Image();
            img.src = path;
            img.onload = function(){
                let that = this;
                let w = that.width;
                let h = that.height;
                // console.log(w,h)
                //生成canvas
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d'); 
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh); 
                    // 在canvas绘制前填充白色背景   
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(that, 0, 0, w, h);
                let base64 = canvas.toDataURL('image/jpeg', quality );
                // 回调函数返回base64的值
                callback(base64);
            }
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
        height: 100%;
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
            .msg-item{
                margin: 10px 0;
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
        .tab{
            margin-top: 10px;
            padding: 10px 20px;
            background: #fff;
        }
        .el-tabs{
            margin: 0 50px;
            .btn{
                margin: 10px 0 20px 0;
                color: #169BD5;
                border: 1px solid #169BD5;
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
                margin-top: -310px;
                margin-left: -280px;
                width: 560px;
                height: 620px;
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
                    margin: 10px auto;
                    position: relative;
                    left: 10%;
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
                .btn{
                    margin-left: 270px;
                }
            }
            .text3{
                margin-top: -210px;
                height: 420px;
            }
        }
    }
</style>
