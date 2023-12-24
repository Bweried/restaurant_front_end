<template>
    <div>
        <div class="header">
            个人信息
        </div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="20%" id="selectForm">
                <!-- <el-form-item label="用户名：" prop="dispatcher_id">   
                    <span>{{ form.user_name }}</span>
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item> -->
                <el-form-item label="姓名：" prop="real_name">
                    <span>{{ form.real_name }}</span>
                    <!-- <el-input v-model="form.real_name"></el-input> -->
                </el-form-item>
                <el-form-item label="年龄：" prop="age">
                    <span>{{ form.age }}</span>
                    <!-- <el-input v-model="form.age"></el-input> -->
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                    <span>{{ form.sex }}</span>
                    <!-- <el-input v-model="form.sex"></el-input> -->
                </el-form-item>
                <el-form-item label="联系方式：" prop="phone">
                    <span>{{ form.phone }}</span>
                    <!-- <el-input v-model="form.phone"></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="邮箱：" prop="dispatcher_phone">
                    <span>{{ form.mail }}</span>
                    <el-input v-model="form.mail"></el-input>
                </el-form-item> -->
            </el-form>

            <!-- <el-table :data="tableData" style="width: 89%" class="vertical-table">
                <el-table-column prop="id" label="顾客编号" style="width: " align="center">
                </el-table-column>
                <el-table-column prop="id" label="顾客编号" style="width: " align="center">
                </el-table-column>
                <el-table-column prop="id" label="顾客编号" style="width: " align="center">
                </el-table-column>
                <el-table-column prop="id" label="顾客编号" style="width: " align="center">
                </el-table-column>

            </el-table> -->



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
            tableData:[],
            form: {
                real_name: '',
                sex: '',
                age: '',
                id:'',
                // mail: '',
                phone: '',
                user_name: '',
            }
        }
    },
    methods: {
        getdata() {
            // 假设你有一个保存 token 的变量
            const userToken = localStorage.getItem('token'); // 请确保这个 token 是在登录时存储的
            // 设置 Axios 请求的默认配置，包括在请求头中添加 token
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

            this.$axios.get("/user/profile").then((res) => {
                console.log(res.data);
                if (res.status == 200) {
                    // this.tableData = res.data.tabledata;
                    this.form.age = res.data.age;
                    // this.form.mail = res.data.mail;
                    this.form.phone = res.data.tel;
                    this.form.real_name = res.data.name;
                    this.form.sex = res.data.gender;
                    this.form.id = res.data.id;
                    this.form.user_name = res.data.username;
                    // this.form.user_name = res.data.user_name;
                }
            })
        }
    },
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
    width: 40%;
    /* margin: auto; */
    margin-top: 30px;
    margin-left: 30px;

}

#selectForm>>>.el-form-item__label {
    font-size: 18px;
}

span {
    font-size: 18px;
}

</style>