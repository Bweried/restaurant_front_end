<template>
    <div>
        <div class="header">
            消费记录
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="id" label="账单编号" width="" align="center">
                </el-table-column>
                <el-table-column prop="total_amount" label="消费金额" width="" align="center">
                </el-table-column>
                <el-table-column prop="billing_time" label="付款时间" width="" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata()
    },
    data() {
        return {
            tableData: [],
            form: {
                id: '',
                total_amount: '',
                billing_time: '',
            },
        }
    },
    methods: {
        getdata() {
            setInterval(() => {
                this.$axios.get("/finishedorder").then((res) => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        this.tableData = res.data.tabledata;
                    }
                })
            },1500) //每1.5秒发送一次请求
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e3e3e3;
}

.body {

    width: 68%;
    margin: auto;
    margin-top: 30px;
}
</style>