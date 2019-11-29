<template>
    <div class="content manageGoods" ref="content"> 
        <el-tabs v-model="activeName" type="card" @tab-click="tabsClick">
            <el-tab-pane name="first">
                <span slot="label">进货商品({{entryGoodsNumber}})</span>
                <div ref="btnHeight" :class="{hide:visibleHide}">
                    <el-button class="btn" type="primary" @click="addGoods(1)">绑定商品</el-button>            
                </div>  
                <div class="infor-msg">
                    <el-table :data="entryGoodsData" border >
                        <el-table-column prop="GOODS_NAME" label="商品名称" width='130'> </el-table-column>
                        <el-table-column prop="GB_NAME" label="品种"></el-table-column>
                        <el-table-column prop="PRICE" label="价格"></el-table-column>
                        <el-table-column prop="GOODS_UNIT" label="规格"></el-table-column>
                        <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                        <el-table-column label="操作" v-if="!visibleHide">
                            <template slot-scope="scope">
                                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination v-if="firstDataTotal" background @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange" :current-page.sync="page" :page-size="15"
                        layout="total, prev, pager, next, jumper" :total='firstDataTotal'>
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label">销售商品({{sellGoodsNumber}})</span>
                <div ref="btnHeight" :class="{hide:visibleHide}">
                    <el-button class="btn" type="primary" @click="addGoods(2)">绑定商品</el-button>            
                </div>  
                <div class="infor-msg">
                    <el-table :data="sellGoodsData" border>
                        <el-table-column prop="GOODS_NAME" label="商品名称" width='130'> </el-table-column>
                        <el-table-column prop="GB_NAME" label="品种"></el-table-column>
                        <el-table-column prop="PRICE" label="价格"></el-table-column>
                        <el-table-column prop="GOODS_UNIT" label="规格"></el-table-column>
                        <el-table-column prop="SUPPLIERS_NAME" label="供应商"></el-table-column>
                        <el-table-column label="操作" v-if="!visibleHide">
                        <template slot-scope="scope">
                            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination">
                    <el-pagination v-if="secondDataTotal" background @size-change="handleSizeChange"
                        @current-change="handleCurrentChange" :current-page.sync="page" :page-size="15"
                        layout="total, prev, pager, next, jumper" :total='secondDataTotal'>
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="msg-box" v-if="addNew">
            <div class="list">
                <header class="title">绑定商品<i class="icon-close" @click="closeMsgBox">x</i></header>
                <div class="search">
                    <el-input class="search-input" v-model="searchGoodsName" placeholder="请输入商品名称" clearable></el-input>
                    <el-button class="search-button" type="primary" v-if="good == '1'" @click="seaechJhFun">搜索</el-button>
                    <el-button class="search-button" type="primary" v-else @click="seaechXsFun">搜索</el-button>
                </div>
                <div class="msg-table">
                    <el-table ref="multipleTable" :data="dataList" border style="width: 100%" height='360'@selection-change="changeFun">
                        <!--<el-table-column prop="id" label="" width='50'>
                            <template slot-scope="scope">
                                <el-checkbox @change="changeFun(scope.row)"/>
                            </template>
                        </el-table-column>-->
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goods_Name" label="商品名称"> </el-table-column>
                        <el-table-column prop="goods_Unit" label="规格"> </el-table-column>
                        <el-table-column prop="key_number" label="键位" width="160">
                            <template slot-scope="scope">
                                <el-input class="num-input" v-model="scope.row.key_number" placeholder="范围：1-70" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>   
                </div>
                <el-pagination v-if="total" background :page-size="15" @current-change="handleCurrentChange2"
                    :current-page.sync="page2" layout="total, prev, pager, next" :total='total'>
                </el-pagination>
                <!--<div class="add-new" v-if="good == '1'" @click="addEntryFun">新增商品</div>
                <div class="add-new" v-else @click="addSaleFun">新增商品</div>-->
                <el-button class="msg-save-btn" type="primary" @click="addGoodsSave">保存</el-button>
            </div>
        </div>
        
    </div>
</template>

<script>
import {EntryGoodsList,SellGoodsList,BindingGoods,SaveBindingGoods} from "../../js/management/management.js";
import {deleteGood} from '../../js/goods/goods.js'
export default {    
    name:'manageGoods',
    data(){
        return{
            activeName: 'first',
            entryGoodsNumber: '',
            sellGoodsNumber: '',
            entryGoodsData: [],
            sellGoodsData:[],
            visibleHide:true,
            searchEntryGoods:'',
            dataList:[],
            selectGoodsList:[],
            addNew:false,
            addGoodsType:'',//1-新增进货商品 2- 新增销售商品
            searchGoodsName:'',
            firstCurrentPage:1,
            secondCurrentPage:1,
            firstDataTotal:0,
            secondDataTotal:0,
            currtab:'',
            good: '',
            page: 1,
            page2: 1,
            total: 0,
            checkGood: [],
            checkGoodId: [],
            allGood: [],
        }
    },
    mounted(){
        this.getGoodsList(1,this.$route.params.searchMsg,this.$route.params.searchMsg.currShop_userId);
    },
    methods: {
        handleCurrentChange2(val){
            this.page2 = val
            this.getBindingGoodsList()
        },
        seaechJhFun(){
            this.getBindingGoodsList()
        },
        seaechXsFun(){
            this.getBindingGoodsList()
        },
        addEntryFun(){
            // this.$router.push({path: 'editStocks'})
        },  
        addSaleFun(){
            // this.$router.push({path: 'editMarket'})
        },  
        handleSizeChange(val) { //pageSize 改变时会触发
            this.page = val
            // this.page = val
            if(this.activeName == 'first'){
                this.getEntryGoodsList();
            }else{          
                this.getSellGoodsList();
            } 
        },
        handleCurrentChange(val) { //currentPage 改变时会触发
            if(this.activeName == 'first'){
                this.getEntryGoodsList();
            }else{          
                this.getSellGoodsList();
            } 
        },
        getGoodsList(page,data,uId){//进入展示获取商品列表 进货 和 销售
            if(data.bindgys == '1'){
                this.visibleHide = true;
            }else{
                this.visibleHide = false;
            }
            let msgData = {
                page:page,
                cols:"15",
                userId:uId,
                region:data.region,
                shopBoothId:data.shop_booth_id,
                bindgys:data.bindgys
            }
            this.getEntryGoodsList(msgData);   
            this.getSellGoodsList(msgData);         
        },
        tabsClick(tab, event) {
            this.page = 1
            // console.log(tab.name); 
            this.currtab = tab.name; 
            if(tab.name == 'first'){
                this.getEntryGoodsList();
            }else{          
                this.getSellGoodsList();
            }         
        },
        getEntryGoodsList(){
            let msgData = {
                page:this.page,
                cols:"15",
                userId:this.$route.params.searchMsg.currShop_userId,
                region:this.$route.params.searchMsg.region,
                shopBoothId:this.$route.params.searchMsg.shop_booth_id,
                bindgys:this.$route.params.searchMsg.bindgys
            }
            EntryGoodsList(msgData)
                .then(res => {
                    this.firstDataTotal = res.data.condition.total;                  
                    this.entryGoodsData = res.data.dataList;
                    this.entryGoodsNumber = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        getSellGoodsList(){
            let msgData = {
                page: this.page,
                cols:"15",
                userId:this.$route.params.searchMsg.currShop_userId,
                region:this.$route.params.searchMsg.region,
                shopBoothId:this.$route.params.searchMsg.shop_booth_id,
                bindgys:this.$route.params.searchMsg.bindgys
            }
            SellGoodsList(msgData)
                .then(res => {
                    // console.log(res)
                    this.secondDataTotal = res.data.condition.total;  
                    this.sellGoodsData = res.data.dataList;
                    this.sellGoodsNumber = res.data.condition.total;
                })
                .catch(res => {
                    console.log(res)
                })
        },
        addGoods(type){//1-新增进货商品 2- 新增销售商品
            this.good = type
            this.addGoodsType = type;
            this.addNew = true;
            this.selectGoodsList = [];
            this.getBindingGoodsList()
        },
        // 表格默认选中
        checked(){
            let arr = new Set(this.allGood),
                newArr = [];
            newArr = Array.from(arr)
            for(var i = 0; i < newArr.length; i++){
                for(var j = 0; j < this.dataList.length; j++){
                    if(newArr[i].id == this.dataList[j].id)
                    this.$refs.multipleTable.toggleRowSelection(this.dataList[j],true);
                }
            }
        },
        getBindingGoodsList(){
            let data = {
                page : this.page2,
                cols : "15",   
                goods_name:this.searchGoodsName,             
                goods_Type: this.addGoodsType,  
                parent_userId:this.$route.params.searchMsg.parent_userId,//区域的userId
                parent_shop_booth_id:this.$route.params.searchMsg.parent_shop_booth_id,//区域的shop_booth_id
                shop_booth_id:this.$route.params.searchMsg.currShop_shop_booth_id,//当前商户的shop_booth_id
                userId:this.$route.params.searchMsg.currShop_userId//当前商户的userId
            }
            BindingGoods(data)
                .then(res => {
                    res.data.dataList.forEach(val => {
                        val.key_number = ''
                    })
                    this.dataList = res.data.dataList
                    this.total = res.data.condition.total
                    this.$nextTick(function () {
                        this.checked()
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        closeMsgBox(){//关闭添加商品弹层
            this.addNew = false;
            this.searchGoodsName = ''
            this.page2 = 1
            this.checkGoodId = []
            this.selectGoodsList = []
            this.allGood = []
        },
        changeFun(item){//复选框勾选
            item.forEach(val => {
                if(val.id){
                    this.selectGoodsList.push(val.id)
                    this.allGood.push(val)
                }
            })
        },
        deleteClick(row){//删除列表信息
            this.$confirm('是否要删除此条信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteGood(row.ID)
                .then(res => {                    
                    this.$message.success('删除成功');
                    this.getGoodsList(this.$route.params.searchMsg,this.$route.params.searchMsg.currShop_userId)
                })
                .catch(res => {
                    console.log(res);
                })
            }).catch(() => {
                this.$message.info('已取消删除');          
            });
        },
        addGoodsSave(){
            this.selectGoodsList.forEach(val2 => {
                if(this.checkGoodId.indexOf(val2) == -1){
                    this.checkGoodId.push(val2)
                }
            })
            let that = this;
            console.log(this.checkGoodId)
            let numArr = [],state = true;
            if(this.selectGoodsList.length > 0){
                this.dataList.forEach(val => {
                    this.checkGoodId.forEach(ele => {
                        if(state){
                            if(ele == val.id){
                                if(val.key_number == ''){
                                    // this.$message.error('请输入键位！');
                                    // state = false
                                    // return
                                }else{
                                    let num = Number(val.key_number)
                                    if(/^[0-9]{1,2}/.test(num) == false){
                                        this.$message.error('请输入数字！');
                                        state = false
                                        return
                                    }else{
                                        if( num > 0 && num < 71){
                                            numArr.push(num)
                                        }else{
                                            this.$message.error('范围：1-70！');
                                            state = false
                                            return
                                        }
                                    }
                                }
                            }
                        }
                    })
                })
            }
            if(state == true){
                let data = {
                    ids:this.checkGoodId.join(','),
                    goods_type:this.addGoodsType,
                    shop_booth_id:this.$route.params.searchMsg.currShop_shop_booth_id,
                    key_number: numArr.join(','),
                }
                console.log(data)
                SaveBindingGoods(data)
                    .then(res => {
                        if(res.result == true){
                            this.$message.success('恭喜，绑定成功！');
                            this.searchGoodsName = ''
                            this.checkGoodId = []
                            this.selectGoodsList = []
                            this.allGood = []
                            this.getGoodsList(this.$route.params.searchMsg,this.$route.params.searchMsg.currShop_userId);
                            this.getBindingGoodsList() 
                            this.addNew = false;
                            this.page2 = 1
                        }else{
                            this.$message.error('抱歉，绑定失败！');
                        }
                    })
                    .catch(res => {
                        this.$message.error('抱歉，绑定失败！');
                        console.log(res)
                    })
            }
            
        },
    }
}
</script>

<style scoped lang='less'>
    .content{
        padding: 20px;
        height: 100%;
        background: #fff;
        box-sizing: border-box;
        .btn{
            margin-bottom: 10px;
        }
        .hide{
            display: none;
        } 
        .num-input{
            width: 120px;
            height: 30px;
        }
    }    
    .msg-box{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: rgba(0,0,0,.5);      
        .list{
            position: relative;
            top:50%;
            left: 50%;
            margin-top: -325px;
            margin-left: -250px;
            padding: 20px;
            width: 500px;
            height: 650px;
            box-sizing: border-box;
            background: #fff;
            .title{
                margin-bottom: 20px;
                padding: 7px 0;
                border-bottom:1px solid #ddd;
                overflow: hidden;
                .btn{
                    margin-bottom: 10px;
                } 
                .icon-close{
                    float: right;
                    display: block;
                    padding: 5px;
                    width: 10px;
                    height: 10px;
                    text-align: center;
                    line-height: 10px;
                    font-size: 16px;
                    font-style: normal;
                    cursor: pointer;
                }  
            }
            .search{
                margin-bottom: 20px;
                .search-input{
                    width: 260px;
                }
            }
            .add-new{
                margin-bottom: 20px;
                padding: 2px 3px;
                width: 70px;
                text-align: center;
                font-size: 14px;
                color: #409EFF;
                border-radius: 3px;
                border:1px dotted #409EFF;
                cursor: pointer;
            }
            .msg-save-btn{
                display: block;
                margin: 0 auto;
            }
        }  
    }
    
</style>
<style lang='less'>
.manageGoods{
    .el-tabs--card>.el-tabs__header .el-tabs__nav{
        border:1px solid #e4e7ed;
        border-bottom: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
        border: none;
    }
    .el-tabs__item.is-active {
        color: #fff;
        background: #409EFF;
    }
    .el-checkbox{
        display: block;
    }
    .el-checkbox+.el-checkbox{
        margin-left: 0;
    }
    .el-table th.is-leaf{
        background: #f5f5f5;
    }
    .msg-table{
        margin-bottom: 10px;
    }
    .msg-table .el-table th,.msg-table .el-table td{
        padding: 7px 0;
    }
}

</style>
<style lang="less">
    .manageGoods{
        .el-table--enable-row-transition .el-table__body td{
            padding: 5px 0;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"]{
            -moz-appearance: textfield;
        }
    }
</style>

