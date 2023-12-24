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
                            <!-- <el-input v-model="form.shop_name"></el-input> -->
                        </el-form-item>

                        <el-form-item label="菜品单价：">
                            <span>{{ form.order_money }}</span>
                            <!-- <el-input v-model="form.order_money"></el-input> -->
                        </el-form-item>

                        <!-- <el-form-item label="订餐方式：">
                            <el-select v-model="form.order_way" placeholder="请选择订餐方式">
                                <el-option label="人工订餐" value="人工订餐"></el-option>
                                <el-option label="网上订餐" value="网上订餐"></el-option>
                            </el-select>
                        </el-form-item> -->

                        <!-- <el-form-item label="客户电话：">
                            <el-input v-model="form.cons_phone"></el-input>
                        </el-form-item> -->

                        <el-form-item label="购买数量：">
                            <el-input v-model="form.quantity"></el-input>
                        </el-form-item>

                        <!-- <el-form-item label="送餐地址：">
                            <el-input v-model="form.cons_addre"></el-input>
                        </el-form-item> -->

                    </el-form>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="add">
                            确认
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            
            <!-- <template>
                <el-input-number v-model="num" @change="handleChange" :min="0" :max="1000" :disabled="false"></el-input-number>
            </template>  -->

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
            table_Data:[
                { num: 0 },
                { num: 0 },
            ],
            dialog: false,
            form: {
                // name: '',
                // order_money: '',
                quantity:'',
                dish_id:'',
                // cons_phone: '',
                // cons_name: '',
                // cons_addre: '',
                // order_way: '',
            },
            num: 0,
        }
    },
    methods: {
        getdata() {
            // 假设你有一个保存 token 的变量
            const userToken = localStorage.getItem('token'); // 请确保这个 token 是在登录时存储的
            // 设置 Axios 请求的默认配置，包括在请求头中添加 token
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/dish/").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                    // this.form.name = res.data.tabledata.name;
                    // this.form.order_money = res.data.tabledata.price;
                    this.form.dish_id = res.data.tabledata.id;
                }
            })
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

            // console.log(this.form)

            // console.log(formattedData);

            this.$axios.post("/order/", formattedData).then((res) => {
                console.log(res.data);
                if (res.data.status == 201) {
                    this.$message({
                        message: "成功下单",
                        type: "success"
                    })
                    this.dialog = false;
                    this.getdata();
                }
            })
        },
        // handleChange(value) {
        // console.log(value);
        // },
        handleChange(row) {
        // 更新 form.quantity
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