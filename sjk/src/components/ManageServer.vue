<template>
    <div>
        <div class="header">
            员工管理
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 89%" class="table">
                <el-table-column prop="id" label="员工编号" width="" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="" align="center">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="" align="center">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="" align="center">
                </el-table-column>
                <el-table-column prop="salary" label="工资" width="" align="center">
                </el-table-column>
                <el-table-column prop="operate" label="操作" width="" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="showdia_dlt(scope.row)">解雇
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column width="120" align="center">
                    <template slot="header">
                        <el-button icon="el-icon-plus" size="small" type="success" @click="showdia_add()">添加员工
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="添加员工" :visible.sync="dia_add" width="30%">
                <el-form ref="add_form" :model="add_form" label-width="120px" :rules="add_form_rules">
                    <el-form-item label="姓名：" prop="name">
                        <el-input v-model="add_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄：" prop="age">
                        <el-input v-model="add_form.age"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="gender">
                        <el-select v-model="add_form.gender" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工资：" prop="salary">
                        <el-input v-model="add_form.salary"></el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;">
                    <el-button type="primary" @click="addserver()">
                        添加
                    </el-button>
                </div>
            </el-dialog>


            <el-dialog title="解雇服务员" :visible.sync="dia_dlt" width="30%">
                <div>
                    确定解雇此服务员吗？
                </div>
                <div style="text-align: center;">
                    <el-button type="primary" @click="deleteserver()">
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
        this.getdata()
    },
    data() {
        return {
            tableData: [],
            dia_add: false,
            dia_dlt: false,
            add_form: {
                name: '',
                gender: '',
                age: '',
                salary: ''
            },
            want_delete: '',
            add_form_rules: {
                name: [{ required: true, message: '必填项', trigger: 'blur' }],
                gender: [{ required: true, message: '必填项', trigger: 'blur' }],
                age: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    {
                        pattern: /^[1-9]\d*$/,
                        message: '请输入正确的年龄（正整数）',
                        trigger: 'blur'
                    }
                ],
                salary: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    {
                        pattern: /^(\d+|\d+\.\d+)$/,
                        message: '请输入正确的工资（数字或带小数点的数字）',
                        trigger: 'blur'
                    }
                ]
            },
        }
    },
    methods: {
        getdata() {
            
            const userToken = localStorage.getItem('token'); 
            
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/emp").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                    this.shop_range = res.data.shop_range;
                }
            })
        },
        showdia_add() {
            this.dia_add = true;
        },
        addserver() {
            console.log('Adding employee:', this.add_form);

            
            const userToken = localStorage.getItem('token'); 
            
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$refs.add_form.validate(valid => {
                if (!valid)
                    return;
                else //验证通过再发送请求
                {
                    console.log('Sending request...');
                    this.$axios.post("/emp", this.add_form).then((res) => {
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
        showdia_dlt(row) {
            this.want_delete = row.id;
            this.dia_dlt = true;
        },
        deleteserver() {
            const token = localStorage.getItem('token');

            this.$axios.delete(`/emp/${this.want_delete}`, {
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
                console.error('删除失败', error);
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