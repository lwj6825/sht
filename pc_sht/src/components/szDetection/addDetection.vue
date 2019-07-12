<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="检测日期">
                <el-date-picker v-model="form.in_date" type="date" format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品类型">
                <el-radio-group v-model="goodsType">
                    <el-radio label="进货" name="goodsType" value="进货" @change="goodsTypesFun(1)"></el-radio>
                    <el-radio label="销售" name="goodsType" value="销售" @change="goodsTypesFun(2)"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="检测商品">
                <el-select v-model="form.goodName" placeholder="请选择" size="small" filterable clearable>
                    <el-option v-for="item in goodList" :key="item.ID" :label="item.GOODS_NAME" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择商品批次">
                <el-select v-model="form.goodBatch" placeholder="请选择" size="small" filterable clearable>
                    <el-option v-for="item in BatchList" :key="item.ID" :label="item.GOODS_NAME" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="所属企业">
                <el-select v-model="form.enterprise" filterable clearable placeholder="请选择">
                    <el-option v-for="item in enterpriseList" :key="item.a_conf_id" :label="item.a_conf_item" :value="item.a_conf_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检测项目">
                <el-input v-model="form.project" clearable></el-input>
            </el-form-item>
            <el-form-item label="检测值">
                <el-input v-model="form.jcValue" clearable></el-input>
            </el-form-item>
            <el-form-item label="检测标准值">
                <el-select v-model="form.jcBzValue" placeholder="请选择" size="small" filterable clearable>
                    <el-option v-for="item in goodList" :key="item.ID" :label="item.GOODS_NAME" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检测结果判定">
                <el-select v-model="form.determine" placeholder="请选择" size="small" filterable clearable>
                    <el-option v-for="item in BatchList" :key="item.ID" :label="item.GOODS_NAME" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检测结果">
                <el-radio-group v-model="form.results">
                    <el-radio label="合格" name="results" value="合格"></el-radio>
                    <el-radio label="不合格" name="results" value="不合格"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="检测人">
                <el-input v-model="form.people" clearable></el-input>
            </el-form-item>
            <el-form-item label="检测机构">
                <el-input v-model="form.institutions" clearable></el-input>
            </el-form-item>
            <el-form-item label="检测报告">
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
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.remake" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveFun">保存</el-button>
                <el-button @click="cancelFun">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>// 标准时间转日期格式
function formatTen(num) { 
    return num > 9 ? (num + "") : ("0" + num); 
} 
function formatDate(date) { 
    var year = date.getFullYear(); 
    var month = date.getMonth() + 1; 
    var day = date.getDate(); 
    var hour = date.getHours(); 
    var minute = date.getMinutes(); 
    var second = date.getSeconds(); 
    return year + "-" + formatTen(month) + "-" + formatTen(day); 
} 
export default {
    name:"addDetection",
    data() {
        return {
            form: {
                in_date: '', // 检测日期
                goodName: '', // 检测商品
                goodBatch: '', // 选择商品批次
                enterprise: '', // 所属企业
                project: '', // 检测项目
                jcValue: '', // 检测值
                jcBzValue: '', // 检测标准值
                determine: '', // 检测结果判定
                results: '', // 结果
                people: '', // 检测人
                institutions: '', // 检测机构
                remake: '', // 备注
            },
            goodsType: '进货',
            goodList: [],
            BatchList: [],
            enterpriseList: [],
            imgArr1: []
        }
    },
    mounted() {
        var currentTime = new Date()
        this.form.in_date = formatDate(currentTime)
    },
    methods: {
        cancelFun(){

        },
        saveFun(){

        },
        fileFun(event){
            // var that = this;
            // let file = event.target.files;
            // let reg = /.(jpg|png|PNG|JPG)+$/;           
            // if(file[0].size){
            //     let point = file[0].name.indexOf('.');
            //     if(!reg.test((file[0].name).slice(point))){
            //         this.$message.error("上传图片格式不支持");
            //         return;
            //     }
            //     let size = file[0].size / 1024 / 1024 ;
            //     if(size > 0.5){
            //         that.clarity = 0.5/size;
            //     }else{
            //         that.clarity = 1;
            //     }
            //     let reader = new FileReader();
            //     reader.readAsDataURL(file[0]); 
            //     reader.onload = function(){                    
            //         that.imgFun(reader.result,that.clarity,function(src){
            //             that.imgArr.push(src.slice(23))
            //         })
            //     }
            // }
            // let timer = setInterval(()=>{
            //     if(that.imgArr.length == file.length){
            //         let formData = new FormData()  
            //         formData.append('img_url', that.imgArr[0]);   
            //         formData.append('node_id', that.node_id);  
            //         formData.append('id', that.form.goodsID); 
            //         let config = {
            //             headers:{'Content-Type':'multipart/form-data'}
            //         };
            //         const ajaxPost = function (url, params,config) {
            //             return new Promise((resolve, reject) => {
            //                 axios
            //                     .post(url, params,{config})
            //                     .then((res) => {
            //                         resolve(res.data)
            //                     })
            //                     .catch(() => {
            //                         reject('error')
            //                     })
            //             })
            //         }  
            //         let url = baseUrl + 'goods/updateGoodsImgForTrace'
            //         ajaxPost(url,formData,config)
            //             .then(res => {
            //                 that.imgArr = []
            //                 that.imgUrl = res.data.img_url
            //             })
            //             .catch(res => {
            //                 console.log(res)
            //             })
            //         clearInterval(timer);
            //     }
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
        goodsTypesFun(ele){
            console.log(ele)
            // this.getGoodsFun(ele)
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        padding: 80px 0 0 80px;
        background: #fff;
        .el-input, .el-select, .el-textarea{
            width: 400px;
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
