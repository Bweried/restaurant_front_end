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
                    <el-form-item label="菜品名称：">
                        <span>{{ form_change.name }}</span>
                    </el-form-item>

                    <el-form-item label="菜品单价：">
                        <span>{{ form_change.price }}</span>
                    </el-form-item>

                    <el-form-item label="购买数量：">
                        <el-input v-model="form_change.quantity"></el-input>
                    </el-form-item>

                    <el-form-item label="总额：">
                        <span>{{ form_change.total_amount }}</span>
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
            form_confirm: {
                id: '',
                order_id: '',
                dish_id: '',
                quantity: '',
            },

            form_change: {
                name: '',
                price: '',
                quantity: '',
                total_amount: '',
            },
            delete_id: '',
            want_change: ''
        }
    },
    methods: {
        getdata() {
            // 假设你有一个保存 token 的变量
            const userToken = localStorage.getItem('token'); // 请确保这个 token 是在登录时存储的
            // 设置 Axios 请求的默认配置，包括在请求头中添加 token
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/unfinishedorder/").then((res) => {
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
            // 清空表单数据
            this.form_change.name = '';
            this.form_change.price = '';
            this.form_change.quantity = '';
            this.form_change.total_amount = '';
            this.want_change = row.id; // 保存要修改的订单 ID

            // 向后端发送请求，获取菜品名称和数量
            this.$axios.get(`/menuorder/${row.id}`).then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                    const orderDetails = res.data.order_details;
                    if (orderDetails.length > 0) {
                        // 使用第一个菜品的信息填充表单数据
                        this.form_change.name = orderDetails[0].name;
                        this.form_change.price = orderDetails[0].price;
                        this.form_change.quantity = orderDetails[0].quantity;
                        this.form_change.total_amount = orderDetails[0].total_amount;
                    }
                }
            });

            // 打开对话框
            this.dialog_chnage = true;
        },

        change() {
            this.form_change.quantity = parseInt(this.form_change.quantity);

            this.$axios.put(`/unfinishedorder/${this.want_change}`, this.form_change).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.message,
                        type: "success"
                    })
                    this.getdata()
                    this.dialog_chnage = false;
                }
            })
        },
        showdia_dl(row) {
            this.delete_id = row.id;
            this.dialog_delete = true;
        },
        showdia_confirm() {
            this.dialog_confirm = true;
        },
        confirm() {

        },
        order_delete() {
            // 假设你有一个保存 token 的变量
            const userToken = localStorage.getItem('token'); // 请确保这个 token 是在登录时存储的
            // 设置 Axios 请求的默认配置，包括在请求头中添加 token
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.delete(`/order/${this.delete_id}`).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.message,
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