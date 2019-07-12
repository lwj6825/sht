<template>
    <div class="content">
        <div class="data">
            <div class="title">检测日期：</div>
            <div class="msg">{{form.in_date}}</div>
        </div>
        <div class="data">
            <div class="title">商品类型：</div>
            <div class="msg">{{goodsType}}</div>
        </div>
        <div class="data">
            <div class="title">检测商品：</div>
            <div class="msg">{{form.goodName}}</div>
        </div>
        <div class="data">
            <div class="title">选择商品批次：</div>
            <div class="msg">{{form.goodBatch}}</div>
        </div>
        <div class="data">
            <div class="title">所属企业：</div>
            <div class="msg">{{form.enterprise}}</div>
        </div>
        <div class="data">
            <div class="title">检测项目：</div>
            <div class="msg">{{form.project}}</div>
        </div>
        <div class="data">
            <div class="title">检测值：</div>
            <div class="msg">{{form.jcValue}}</div>
        </div>
        <div class="data">
            <div class="title">检测标准值：</div>
            <div class="msg">{{form.jcBzValue}}</div>
        </div>
        <div class="data">
            <div class="title">检测结果判定：</div>
            <div class="msg">{{form.determine}}</div>
        </div>
        <div class="data">
            <div class="title">检测结果：</div>
            <div class="msg">{{form.results}}</div>
        </div>
        <div class="data">
            <div class="title">检测人：</div>
            <div class="msg">{{form.people}}</div>
        </div>
        <div class="data">
            <div class="title">检测机构：</div>
            <div class="msg">{{form.institutions}}</div>
        </div>
        <div class="data">
            <div class="title">检测报告：</div>
            <div class="msg">
                <div class="msg-item">   
                    <div class="img-list">
                        <ul>
                            <li v-for="(item,index) in imgArr1" :key="index" v-if="item.img_url">
                                <figure class="image">
                                    <!--<p class="icon-delete" @click="removeFun(index)">-</p>-->
                                    <img :src="item.img_url">
                                </figure>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="data">
            <div class="title">备注：</div>
            <div class="msg">{{form.remake}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"viewDetection",
    data() {
        return {
            form: {
                in_date: '', // 检测日期
                goodName: '', // 检测商品
                goodBatch: '', // 进货商品批次
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
            goodsType: '',
            imgArr1: [],
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style scoped lang='less'>
    .content{
        background: #fff;
        .data{
            display: flex;
            font-size: 14px;
            line-height: 60px;
            .title{
                margin-right: 50px;
                width: 200px;
                text-align: right;
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
