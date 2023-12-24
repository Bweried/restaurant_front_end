<template>
    <div>
        <div class="header">
            未付款订单
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <!-- <el-table-column prop="shop_name" label="店铺" width="200" align="center">
                </el-table-column> -->
                <el-table-column prop="id" label="订单编号" width="" align="center">
                </el-table-column>
                <el-table-column prop="order_time" label="下单时间" width="" align="center">
                </el-table-column>
                <!-- <el-table-column prop="orderway" label="订餐方式" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_name" label="订餐人姓名" width="100" align="center">
                </el-table-column>
                <el-table-column prop="cons_addre" label="取餐地址" width="200" align="center">
                </el-table-column> -->
                <el-table-column prop="operate" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="success" @click="showdia_ch(scope.row)">修改订单
                        </el-button>

                        <el-button size="small" type="success" @click="showdia_confirm(scope.row)">确认付款
                        </el-button>

                        <el-button size="small" type="danger" @click="showdia_dl(scope.row)">取消订单
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改订单" :visible.sync="dialog_chnage" width="30%">
                <el-form ref="form" :model="form_change" label-width="100px">
                    <el-form-item label="订餐人姓名：">
                        <el-input v-model="form_change.cons_name"></el-input>
                    </el-form-item>
                    <el-form-item label="取餐地址：">
                        <el-input v-model="form_change.cons_addre"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="change">
                        确认修改
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="取消订单" :visible.sync="dialog_delete" width="30%">
                <div>
                    确定取消此订单吗？
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="order_delete">
                        确定
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="确认订单" :visible.sync="dialog_confirm" width="30%">

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
            dialog_chnage: false,
            dialog_delete: false,
            dialog_confirm: false,
            form_confirm:{
                id:'',
                order_id:'',
                dish_id:'',
                quantity:'',
            },
            form_change: {
                order_id: '',
                cons_addre: '',
                cons_name: '',
            },
            delete_id: '',
        }
    },
    methods: {
        getdata() {
            // 假设你有一个保存 token 的变量
            const userToken = localStorage.getItem('token'); // 请确保这个 token 是在登录时存储的
            // 设置 Axios 请求的默认配置，包括在请求头中添加 token
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/porder/").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                }
            })

            this.$axios.get("/menuorder/").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.order_Data = res.data.tabledata;
                }
            })
        },
        showdia_ch(row) {
            this.form_change.order_id = row.order_id;
            this.form_change.cons_name = row.cons_name;
            this.form_change.cons_addre = row.cons_addre;
            this.dialog_chnage = true;
        },
        change() {
            this.$axios.post("/api/user/unsend", this.form_change).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    })
                    this.getdata()
                    this.dialog_chnage = false;
                }
            })
        },
        showdia_dl(row) {
            this.delete_id = row.order_id;
            this.dialog_delete = true;
        },
        showdia_confirm(){
            this.dialog_confirm = true;
        },
        confirm(){
            
        },
        order_delete() {
            this.$axios.delete("/api/user/unsend", { data: { delete_id: this.delete_id } }).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    })
                    this.getdata()
                    this.dialog_delete = false;
                }
            })
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
    width: 85%;
    margin: auto;
    margin-top: 30px;
}

.table {
    /* margin-left: 50px; */
}
</style>