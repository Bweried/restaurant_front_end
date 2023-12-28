<template>
    <div>
        <div class="header">
            顾客记录
        </div>
        <div class="body">
            <el-table :data="tableData" style="width: 89%" class="table">
                <el-table-column prop="id" label="顾客编号" style="width: 25%" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" style="width: 25%" align="center">
                </el-table-column>
                <el-table-column prop="tel" label="联系方式" style="width: 25%" align="center">
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
            dia_add: false,
            dia_dlt: false,
            add_form: {
                dispatcher_id: '',
                dispatcher_name: '',
                dispatcher_phone: '',
            },
            want_delete: '',
            add_form_rules: {
                dispatcher_id: [{ required: true, message: '必填项', trigger: 'blur' }],
                dispatcher_name: [{ required: true, message: '必填项', trigger: 'blur' }],
                dispatcher_phone: [{ required: true, message: '必填项', trigger: 'blur' }]

            },

        }
    },
    methods: {
        getdata() {
            
            const userToken = localStorage.getItem('token'); 
            
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/users/profile").then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                    this.tableData = res.data.tabledata;
                }
            })
        },
        showdia_add() {
            this.dia_add = true;
        },
        adddispatcher() {
            this.$refs.add_form.validate(valid => {
                if (!valid)
                    return;
                else //验证通过再发送请求
                    this.$axios.post("/api/manager/dispatcher", this.add_form).then((res) => {
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
                                message: res.data.msg,
                                type: "error"
                            })
                        }
                    })
            })


        },
        showdia_dlt(row) {
            this.want_delete = row.dispatcher_id;
            this.dia_dlt = true;
        },
        deletedispatcher() {
            this.$axios.delete("/api/manager/dispatcher", { data: { want_delete: this.want_delete } }).then((res) => {
                if (res.data.status == 200) {
                    this.$message({
                        message: res.data.msg,
                        type: "success"
                    })
                    this.getdata()
                    this.dia_dlt = false;
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

    width: 80%;
    margin: auto;
    margin-top: 30px;
}
</style>