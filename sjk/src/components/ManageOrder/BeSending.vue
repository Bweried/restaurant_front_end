<template>
    <div>
        <div class="header">
            未付款订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="id" label="订单编号" width="" align="center">
                </el-table-column>
                <el-table-column prop="order_time" label="下单时间" width="" align="center">
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
            dia_makesure: ''
        }
    },
    methods: {
        getdata() {
            setInterval(() => {
                this.$axios.get("/allunfinished").then((res) => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        this.tableData = res.data.tabledata;
                    }
                })
            },3000)
        },
        showdia_makesure() {
            this.dia_makesure = true;
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

    width: 76%;
    margin: auto;
    margin-top: 30px;
}
</style>