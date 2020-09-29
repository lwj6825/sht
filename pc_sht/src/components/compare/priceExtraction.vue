<template>
    <div class="content priceExtraction">
        <p class="title">价格抽取主要服务于北京E追溯价格监测，通过页面对价格抽取数据进行维护，价格抽取数据来源包括：FTP文件解析、电子秤流水数据、查询机、京东到家、人工填报。</p>
        <div class="message">
            <div class="item">
                <div class="tit">
                    <img src="../../assets/images/u3025.png" alt="">
                    <p>生活必需品商品库管理</p>
                </div>
                <div class="msg">
                    <p>生活必需品共维护<span>&nbsp;{{num1}}</span>种商品，其中涵盖：</p>
                    <p v-for="(item, index) in list1" :key="index" v-if="item.varieties_type">{{item.varieties_type}}<span class="spans" @click="jumpFun1(item.varieties_type)"> &nbsp; {{item.goods_count}}</span>种</p>
                </div>
            </div>
            <div class="item item2">
                <div class="tit">
                    <img src="../../assets/images/u3026.png" alt="">
                    <p>价格抽取节点管理</p>
                </div>
                <div class="msg">
                    <p>价格抽取企业目前涉及<span> &nbsp; {{num2}}</span>家</p>
                    <ul>
                        <!--<li>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                        </li>-->
                        <li>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '东城区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '西城区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '朝阳区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '海淀区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '丰台区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '石景山区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '门头沟区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '房山区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '通州区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '顺义区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '昌平区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '大兴区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '怀柔区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '平谷区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '密云区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                            <p v-for="(item, index) in list2" :key="index" v-if="item.district_name == '延庆区'">{{item.district_name}}：<span class="spans" @click="jumpFun2(item.district_name)"> {{item.node_count}}</span>家</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="tit">
                    <img src="../../assets/images/u3044.png" alt="">
                    <p>节点抽取商品管理</p>
                </div>
                <div class="msg">
                    <p>价格抽取原则：</p>
                    <p>ftp文件解析：选取有交易流水的且给价格合理的集团数据</p>
                    <p>电子秤流水数据：选品打票的价格合理的</p>
                    <p>查询机：有扫描记录和能解析出价格的</p>
                    <p>京东到家： 补充区县没有超市的</p>
                    <p>人工填报：菜市场定期上报</p>
                </div>
            </div>
        </div>
        <div class="message message2">
            <div class="item">
                <div class="view-btn" @click="jumpFun1()">查看</div>
            </div>
            <div class="item item2">
                <div class="view-btn" @click="jumpFun2()">查看</div>
            </div>
            <div class="item">
                <div class="view-btn" @click="jumpFun3">查看</div>
            </div>
        </div>
    </div>
</template>

<script>
import {QueryPriceExtract} from '../../js/compare/compare.js'
export default {
    name:"priceExtraction",
    data() {
        return {
            num1: '',
            num2: '',
            list1: [],
            list2: [],
        }
    },
    mounted() {
        if(localStorage.getItem('varieties_type')){
            localStorage.removeItem('varieties_type')
        }
        if(localStorage.getItem('district_name')){
            localStorage.removeItem('district_name')
        }
        window.scrollTo(0,0)
        this.getDataFun()
    },
    methods: {
        getDataFun(){
            QueryPriceExtract('')
                .then(res => {
                    this.list2 = res.data.nodePriceExtract
                    this.num2 = res.data.nodePriceExtract[res.data.nodePriceExtract.length -1].node_sum
                    this.list1 = res.data.lifeGoods
                    this.num1 = res.data.lifeGoods[res.data.lifeGoods.length -1].goods_sum
                })
                .catch(res => {
                    console.log(res)
                })
        },
        // 生活必需品商品库管理
        jumpFun1(ele){
            if(ele){
                localStorage.setItem('varieties_type', JSON.stringify(ele))
            }
            this.$router.push({name: 'Necessaries'})
        },
        // 价格抽取节点管理
        jumpFun2(ele){
            if(ele){
                localStorage.setItem('district_name', JSON.stringify(ele))
            }
            this.$router.push({name: 'NodeExtraction'})
        },
        // 节点抽取商品管理
        jumpFun3(){
            this.$router.push({name: 'NodeGoodGl'})
        },
    },
}
</script>

<style scoped lang='less'>
    .content{
        width: 100%;
        height: 100%;
        .title{
            padding: 20px;
            font-size: 14px;
            line-height: 30px;
            background: #fff;
        }
        .message{
            margin-top: 20px;
            display: flex;
            min-width: 930px;
            .item{
                width: 30%;
                padding: 20px;
                margin-right: 10px;
                background: #fff;
                .tit{
                    display: flex;
                    align-items: center;
                    img{
                        width: 40px;
                        height: 40px;
                    }
                    p{
                        margin-left: 30px;
                        font-size: 14px;
                    }
                }
                .msg{
                    p{
                        font-size: 14px;
                        line-height: 30px;
                        span{
                            font-size: 16px;
                            font-weight: bolder;
                        }
                    }
                    ul li{
                        display: flex;
                        flex-wrap: wrap;
                        p{
                            width: 33%;
                            font-size: 14px;
                        }
                    }
                    .spans{
                        cursor: pointer;
                    }
                }
                .view-btn{
                    text-align: center;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
            .item:last-child{
                margin-right: 0;
            }
            .item2{
                width: 40%;
                .msg{
                    p span{
                        font-size: 14px;
                        font-weight: bolder;
                    }
                }
            }
        }
        .message2{
            margin-top: 0;
            border-top: 1px solid #f2f2f2;
        }
    }
</style>
