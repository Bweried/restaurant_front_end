<template>
    <div>
        <div class="header">
            欢迎点餐
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 100%" class="table" border>
                <el-table-column prop="name" label="菜品名称" align="center" style="width: 25%">
                </el-table-column>
                <el-table-column prop="price" label="菜品单价" align="center" style="width: 25%">
                </el-table-column>
                <el-table-column prop="D_class" label="类别" align="center" style="width: 25%">
                </el-table-column>
                <el-table-column prop="operate" label="操作" align="center" style="width: 25%">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia(scope.row)">订餐
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="订餐表单" :visible.sync="dialog" class="dialog" width="40%">
                <div>
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="菜品名称：">
                            <span>{{ form.name }}</span>
                        </el-form-item>

                        <el-form-item label="菜品单价：">
                            <span>{{ form.order_money }}</span>
                        </el-form-item>

                        <el-form-item label="购买数量：">
                            <el-input v-model="form.quantity"></el-input>
                        </el-form-item>

                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="add">
                            确认
                        </el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata();
    },
    data() {
        return {
            tableData: [],
            table_Data: [
                { num: 0 },
                { num: 0 },
            ],
            dialog: false,
            form: {
                quantity: '',
                dish_id: '',
            },
            num: 0,
        }
    },
    methods: {
        getdata() {
            const userToken = localStorage.getItem('token');
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            setInterval(() => {
                this.$axios.get("/dish/").then((res) => {
                    console.log(res.data);
                    if (res.data.status == 200) {
                        this.tableData = res.data.tabledata;
                    }
                })
            },750)

            this.form.dish_id = this.tabledata.id;

        },
        showdia(row) {
            this.form.name = row.name;
            this.form.order_money = row.price;
            this.form.dish_id = row.id;
            this.dialog = true;
        },
        add() {
            const formattedData = {
                dish_details: [
                    {
                        dish_id: parseInt(this.form.dish_id),
                        quantity: parseInt(this.form.quantity),
                    },
                ],
            };
            this.$axios.post("/order/", formattedData).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: "成功下单",
                        type: "success"
                    })
                    this.dialog = false;
                    this.getdata();
                }
            })
        },
        handleChange(row) {
            this.form.quantity = row.num;
        },
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
    width: 62%;
    margin: auto;
    margin-top: 30px;
}

/* .table {
    margin-left: 120px;
} */

.dialog {
    /* width: 700px; */
}
</style>