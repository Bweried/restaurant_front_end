<template>
    <div>
        <div class="header">
            未完成订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <!-- <el-table-column prop="order_id" label="订单编号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="shop_name" label="店铺" width="100" align="center">
                </el-table-column>
                <el-table-column prop="order_money" label="订单价格" width="80" align="center">
                </el-table-column>
                <el-table-column prop="order_way" label="订餐方式" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_phone" label="订餐人电话" width="150" align="center">
                </el-table-column>
                <el-table-column prop="cons_name" label="订餐人姓名" width="100" align="center">
                </el-table-column> -->
                <el-table-column prop="cons_addre" label="订单编号" style="width: " align="center">
                </el-table-column>
                <el-table-column prop="disp_id" label="下单时间" style="width: " align="center">
                </el-table-column>
                
                <el-table-column prop="operate" label="确认完成此订单" width="" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="showdia_makesure(scope.row)">确认
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-dialog title = "确认订单" :visible.sync="dia_makesure" width="30%">
                
            </el-dialog>

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
            dia_makesure: false,
            from:{
                caiming:'',
                jiage:'',
                leibie:'',
            }

        }
    },
    methods: {
        getdata() {
            this.$axios.get("/api/manager/sending").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                    this.from.caiming = res.data.caipin.caiming;
                }
            })
        },
        showdia_makesure(){
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