<template>
    <div>
        <div class="top-title" v-if="isDefault">
            <TopHead :title='titleArr'></TopHead>   
        </div>
        <div class="top-title" v-else>
            <NavHead :parent='parentOperation' :child='childOperation'></NavHead>
        </div>
        <div class="inner-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TopHead from '../common/header';
import NavHead from '../common/navHeader';
import Bus from '../common/bus.js'
export default {
    name:"district",
    data() {
        return {
            titleArr:'',
            isDefault:true,
            parentOperation:'',
            childOperation:'',
        }
    },
    mounted() {
        this.titleArr = this.$route.meta.title.join(",");
    },
    methods: {
        
    },
    beforeUpdate(){
        Bus.$on("back",msg => {
            this.isDefault = true;
        });
        Bus.$on("addMarket",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("glMerchants",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("glSupplier",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("glCommodity",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("glStandingBook",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("redact",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
        Bus.$on("addMerchants",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
        Bus.$on("addSupplier",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("addEntry",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("addSell",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url})
        });
        Bus.$on("merchantsXq",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
        Bus.$on("supplierXq",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
        Bus.$on("entryXq",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
        Bus.$on("sellXq",msg => {
            this.isDefault = msg.status;
            this.parentOperation = this.titleArr;
            this.childOperation = msg.operationName;
            this.$router.push({path:'/home/district/'+ msg.url,query: msg.params})
        });
    },
    components:{
        TopHead,
        NavHead
    }
}
</script>

<style scoped lang='less'>
    .inner-content{
        position: absolute;
        top: 70px;
        left: 110px;
        bottom: 10px;
        right: 10px;
        background: #fff;
        border: 1px solid #ccc;
    }

</style>
