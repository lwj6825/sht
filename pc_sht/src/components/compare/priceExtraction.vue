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
                    <p>粮油副食<span> &nbsp; {{num2}}</span>种</p>
                    <p>肉禽蛋<span> &nbsp; {{num3}}</span>种</p>
                    <p>蔬菜<span> &nbsp; {{num4}}</span>种</p>
                    <p>水果<span> &nbsp; {{num5}}</span>种</p>
                </div>
            </div>
            <div class="item">
                <div class="tit">
                    <img src="../../assets/images/u3026.png" alt="">
                    <p>价格抽取节点管理</p>
                </div>
                <div class="msg">
                    <p>价格抽取企业目前涉及<span> &nbsp; {{num6}}</span>家</p>
                    <ul>
                        <li>
                            <p>朝阳区：<span> {{num7}}</span>家</p>
                            <p>丰台区：<span> {{num8}}</span>家</p>
                            <p>昌平区：<span> {{num9}}</span>家</p>
                        </li>
                        <li>
                            <p>怀柔区：<span> {{num10}}</span>家</p>
                            <p>海淀区：<span> {{num11}}</span>家</p>
                            <p>延庆区：<span> {{num12}}</span>家</p>
                        </li>
                        <li>
                            <p>朝阳区：<span> {{num13}}</span>家</p>
                            <p>丰台区：<span> {{num14}}</span>家</p>
                            <p>昌平区：<span> {{num15}}</span>家</p>
                        </li>
                        <li>
                            <p>朝阳区：<span> {{num16}}</span>家</p>
                            <p>丰台区：<span> {{num17}}</span>家</p>
                            <p>昌平区：<span> {{num18}}</span>家</p>
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
                <div class="view-btn" @click="jumpFun1">查看</div>
            </div>
            <div class="item">
                <div class="view-btn" @click="jumpFun2">查看</div>
            </div>
            <div class="item">
                <div class="view-btn" @click="jumpFun3">查看</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"priceExtraction",
    data() {
        return {
            num1: 58,
            num2: 7,
            num3: 2,
            num4: 31,
            num5: 10,
            num6: '**',
            num7: '**',
            num8: '**',
            num9: '**',
            num10: '**',
            num11: '**',
            num12: '**',
            num13: '**',
            num14: '**',
            num15: '**',
            num16: '**',
            num17: '**',
            num18: '**',
        }
    },
    mounted() {
        
    },
    methods: {
        // 生活必需品商品库管理
        jumpFun1(){
            this.$router.push({name: 'Necessaries'})
        },
        // 价格抽取节点管理
        jumpFun2(){
            this.$router.push({name: 'NodeExtraction'})
        },
        // 节点抽取商品管理
        jumpFun3(){

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
                flex: 1;
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
                        p{
                            flex: 1;
                            font-size: 14px;
                        }
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
        }
        .message2{
            margin-top: 0;
            border-top: 1px solid #f2f2f2;
        }
    }
</style>
