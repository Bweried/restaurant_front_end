<template>
    <div>
        <div class="header">
            菜品管理
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 89%" class="table">
                <el-table-column prop="name" label="菜品名称" width="" align="center">
                </el-table-column>
                <el-table-column prop="price" label="菜品单价" width="" align="center">
                </el-table-column>
                <el-table-column prop="D_class" label="类别" width="" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="warning" @click="showdia_chg(scope.row)">修改
                        </el-button>

                        <el-button size="small" type="danger" @click="showdia_dlt(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center">
                    <template slot="header">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia_add()">添加菜品
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="添加菜品" :visible.sync="dia_add" width="30%">
                <el-form ref="add_form" :model="add_form" label-width="100px" :rules="add_form_rules">
                    <el-form-item label="菜品名称：" prop="name">
                        <el-input v-model="add_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品单价：" prop="price">
                        <el-input v-model="add_form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="类别：" prop="class">
                        <el-select v-model="add_form.class" placeholder="请选择类别">
                            <el-option v-for="category in categories" :key="category" :label="category"
                                :value="category"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="adddish()">
                        添加
                    </el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改菜品" :visible.sync="dia_chg" width="30%">
                <el-form ref="form" :model="chg_form" label-width="100px">
                    <el-form-item label="菜品名称：">
                        <span>{{ chg_form.name }}</span>
                    </el-form-item>
                    <el-form-item label="菜品单价：">
                        <el-input v-model="chg_form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="类别：" prop="class">
                        <el-select v-model="chg_form.class" placeholder="请选择类别">
                            <el-option v-for="category in categories" :key="category" :label="category"
                                :value="category"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="changedish()">
                        修改
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog title="删除菜品" :visible.sync="dia_dlt" width="30%">
                <div>
                    确定删除此菜品吗？
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="deletedish()">
                        确定
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getdata();
        this.getCategories();
    },
    data() {
        return {
            tableData: [],
            dia_add: false,
            dia_chg: false,
            dia_dlt: false,
            add_form: {
                name: '',
                price: '',
                class: '',
            },
            chg_form: {
                name: '',
                price: '',
                class: '',
            },
            want_delete: '',
            want_change: '',
            add_form_rules: {
                name: [{ required: true, message: '必填项', trigger: 'blur' }],
                price: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ],
                class: [{ required: true, message: '必填项', trigger: 'blur' }]
            },
            categories: [], // 新增的类别选项数组
        }
    },
    methods: {
        getdata() {
             
            const userToken = localStorage.getItem('token'); 
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get('/dish/').then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                }
            })
        },
        getCategories() {
             
            const userToken = localStorage.getItem('token'); 
            
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            // 从后端获取类别数据的逻辑
            this.$axios.get('/dish_categories').then((res) => {
                if (res.data.status === 200) {
                    this.categories = res.data.categories;
                    console.log(this.categories);
                } else {
                    this.$message.error('获取类别数据失败');
                }
            }).catch((error) => {
                console.error('获取类别数据失败', error);
            });
        },
        showdia_add() {
            this.dia_add = true;
        },
        adddish() {
             
            const userToken = localStorage.getItem('token'); 
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$refs.add_form.validate(valid => {
                if (!valid)
                    return;
                else //验证通过再发送请求
                {
                    console.log(this.add_form);
                    this.$axios.post("/dish/", this.add_form).then((res) => {
                        console.log(res.data);
                        if (res.data.status == 200) {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            })
                            this.dia_add = false;
                            this.getdata();
                        } else {
                            this.$message({
                                message: res.data.message,
                                type: "error"
                            })
                        }
                    })
                }
            })
        },
        showdia_chg(row) {
            this.want_change = row.id;
            this.chg_form.name = row.name;
            this.chg_form.price = row.price;
            this.chg_form.class = row.class;
            this.dia_chg = true;
        },
        changedish() {
             
            const userToken = localStorage.getItem('token'); 
            
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.put(`/dish/${this.want_change}`, this.chg_form).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    })
                    this.dia_chg = false;
                    this.getdata();
                }
            }).catch((error) => {
                console.error('修改菜品失败', error);
            });
        },
        showdia_dlt(row) {
            this.want_delete = row.id;
            this.dia_dlt = true;
        },
        deletedish() {
            const token = localStorage.getItem('token');

            this.$axios.delete(`/dish/${this.want_delete}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                if (res.data.status === 200) {
                    this.$message({
                        message: res.data.message,
                        type: "success"
                    });
                    this.getdata();
                    this.dia_dlt = false;
                } else {
                    this.$message({
                        message: res.data.message,
                        type: "error"
                    });
                }
            }).catch((error) => {
                console.error('删除菜品失败', error);
            });
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

    width: 80%;
    margin: auto;
    margin-top: 30px;
}
</style>