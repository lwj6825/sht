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
    name:"retail",
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

