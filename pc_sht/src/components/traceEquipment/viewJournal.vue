<template>
    <div class="content">
        <div class="msg">
            <div class="title">ID主键</div>
            <div class="data">{{id}}</div>
        </div>
        <div class="msg">
            <div class="title">任务环节</div>
            <div class="data">{{parse_type}}</div>
        </div>
        <div class="msg">
            <div class="title">任务类型</div>
            <div class="data">{{job_type}}</div>
        </div>
        <div class="msg">
            <div class="title">开始时间</div>
            <div class="data">{{start_time}}</div>
        </div>
        <div class="msg">
            <div class="title">结束时间</div>
            <div class="data">{{end_time}}</div>
        </div>
        <div class="msg">
            <div class="title">执行用时（秒）</div>
            <div class="data">{{execute_time}}</div>
        </div>
        <div class="msg">
            <div class="title">数据时间(多个)</div>
            <div class="data">{{data_date}}</div>
        </div>
        <div class="msg">
            <div class="title">文件名/日期</div>
            <div class="data">{{execute_result}}</div>
        </div>
        <div class="msg">
            <div class="title">异常信息</div>
            <div class="data">{{job_exception}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"viewJournal",
    data() {
        return {
            id: '',
            parse_type: '',
            job_type: '',
            start_time: '',
            end_time: '',
            execute_time: '',
            data_date: '',
            execute_result: '',
            job_exception: '',
        }
    },
    mounted() {
        let param = this.$route.params.param
        this.id = param.id
        this.parse_type = param.parse_type
        this.job_type = param.job_type
        this.start_time = param.start_time
        this.end_time = param.end_time
        this.execute_time = param.execute_time
        this.data_date = param.data_date
        this.execute_result = param.execute_result
        this.job_exception = param.job_exception
    },
    methods: {
       
    },
}
</script>

<style scoped lang='less'>
    .content{
        padding: 50px 0 0 50px;
        background: #fff;
        .msg{
            display: flex;
            line-height: 40px;
            .title{
                margin-right: 20px;
                width: 200px;
                text-align: right;
            }
        }
    }
</style>
