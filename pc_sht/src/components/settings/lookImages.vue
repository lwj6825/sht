<template>
    <div class="content lookImages">
        <el-carousel trigger="click" height="300px" :autoplay="autoplay" :initial-index="current">
            <el-carousel-item  v-for="(item,index) in imgList" :key="index">
                <figure class="image">
                    <img :src="'https://zhd-img.oss-cn-zhangjiakou.aliyuncs.com' + item.img_url">
                </figure>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {GetNodeZzrzForTrace} from '../../js/settings/settings.js';
export default {
    name:"lookImages",
    data() {
        return {
            imgList: [],
            node_id: '',
            autoplay: false,
            current: 0,
            list: {},
            type: ''
        }
    },
    mounted() {
        this.node_id = localStorage.getItem('loginId')
        let param = this.$route.params
        this.type = param.type
        if(param.data){
            this.list = param.data
        }
        this.getMsgFun()
    },
    methods: {
        getMsgFun(){
            let obj = {
                node_id: this.node_id,
                img_type: this.type
            }
            GetNodeZzrzForTrace(obj)
                .then(res => {
                    this.imgList = res.data 
                    if(this.list){
                        this.imgList.forEach((ele,index) => {
                            if(ele.id == this.list.id){
                                this.current = index
                            }
                        })
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        }
    }
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        background: #fff;
        .el-carousel{
            margin: 0 auto;
            padding: 10px 0;
            width: 800px;
            height: 300px;
            .image{
                width: 800px;
                height: 300px;
                text-align: center;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .el-carousel__item{
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
        }
        .el-carousel__item{
            background-color: #99a9bf;
        }
    }
</style>
<style lang="less">
    .lookImages{
        .el-carousel__indicators{
            bottom: 10px;
        }
    }
</style>
