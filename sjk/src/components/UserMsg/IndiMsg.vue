<template>
    <div>
        <div class="header">
            个人信息
        </div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="20%" id="selectForm">
                <el-form-item label="姓名：" prop="real_name">
                    <span>{{ form.real_name }}</span>
                </el-form-item>
                <el-form-item label="年龄：" prop="age">
                    <span>{{ form.age }}</span>
                </el-form-item>
                <el-form-item label="性别：" prop="sex">
                    <span>{{ form.sex }}</span>
                </el-form-item>
                <el-form-item label="联系方式：" prop="phone">
                    <span>{{ form.phone }}</span>
                </el-form-item>
            </el-form>
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
                    this.form.age = res.data.age;
                    this.form.phone = res.data.tel;
                    this.form.real_name = res.data.name;
                    this.form.sex = res.data.gender;
                    this.form.id = res.data.id;
                    this.form.user_name = res.data.username;
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