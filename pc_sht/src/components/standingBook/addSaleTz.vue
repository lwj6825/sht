<template>
    <div class="content">
        <div class="msg">
            <div class="left">
                <div>
                    <el-form ref="form" :model="form" label-width="100px" size="mini">
                        <el-form-item label="商户信息">
                            <span>
                                <el-select v-model="value" size="mini" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                            <span>{{form.name}}{{form.addr}}</span>
                        </el-form-item>
                        <el-form-item label="供货单位">
                            <el-input v-model="form.ghUnit"></el-input>
                        </el-form-item>
                        <el-form-item label="运输车牌号">
                            <el-input v-model="form.ysNum"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="right">
                <el-form ref="form2" :model="form2" label-width="80px" size="mini">
                    <el-form-item label="进货日期">
                         <el-date-picker
                            v-model="form2.time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="实付金额">
                        <el-input v-model="form2.payment"></el-input>
                    </el-form-item>
                     <el-form-item label="欠款金额">
                        <el-input v-model="form2.arrears"></el-input>
                    </el-form-item>
                    <el-form-item label="付款方式">
                        <el-select v-model="form2.way" size="mini" clearable placeholder="请选择">
                            <el-option
                            v-for="item in wayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form2.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="table">
            <div class="title">
                <p>选择商品(共0种商品，合计￥0.00)</p>
                <div>
                    <el-button size="mini">下载模板</el-button>
                    <el-button size="mini">批量导入</el-button>
                </div>
            </div>
            <el-input v-model="searchVal" clearable></el-input>
            <el-table
            :data="tableData"
            style="width: 100%">
                <el-table-column
                    prop="date"
                    label="序号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="规格">
                </el-table-column>
                    <el-table-column
                    prop="date"
                    label="单价价">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="总价">
                </el-table-column>
                    <el-table-column
                    prop="date"
                    label="生产日期">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="保质期">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作">
                </el-table-column>
            </el-table>
            <div class="btn">
                <el-button type="primary">保存</el-button>
                <el-button type="primary">保存并记下一单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "addSaleTz",    
    data() {
        return {
            searchVal: '',
            form: {
                name: '张三（13112345678）',
                addr: '北京市北京市昌平区水屯批发市场',
                value: '',
                ghUnit: '',
                ysNum: '',
            },
            form2: {
                time: '',
                payment: '',
                arrears: '',
                way: '',
                remarks: '',
            },
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, 
                {
                    value: '选项2',
                    label: '双皮奶'
                }, 
                {
                    value: '选项3',
                    label: '蚵仔煎'
                }, 
                {
                    value: '选项4',
                    label: '龙须面'
                }
            ],
            wayOptions: [
                {
                    value: '选项1',
                    label: '现金'
                }, 
                {
                    value: '选项2',
                    label: '转账'
                }, 
                {
                    value: '选项3',
                    label: '欠款'
                }
            ],
            value: '',
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '1518'
                }, 
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '1517'
                }, 
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '1519'
                }, 
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '1516'
                }
            ]
        }
    },
    
}
</script>

<style lang='less' scoped>
    .content{
        background: #fff;
        height: 100%;
        overflow: auto;
        .msg{
            font-size: 14px;
            display: flex;
            .left{
                flex: 2;
                border: 1px solid #ccc;
                margin-right: 10px;
                div{
                    .el-form{
                        margin-top: 20px;
                        margin-left: 10px;
                        .el-select,.el-input{
                            width: 170px;
                        }
                        .el-input{
                            border: none;
                        }
                    }
                }
            }
            .right{
                flex: 1;
                border: 1px solid #ccc;
                .el-form{
                    margin-top: 20px;
                    margin-left: 10px;
                    .el-select,.el-input{
                        width: 170px;
                    }
                }
            }
        }
        .table{
            margin: 0 16px;
            .title{
                margin: 10px 0;
                display: flex;
                p{
                    flex: 1;
                    line-height: 40px;
                    font-size: 14px;
                }
                div{
                    display: flex;
                    width: 300px;
                    justify-content: flex-end;
                }
            }
        }
        .btn{
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            margin-right: 20px;
        }
    }
</style>
