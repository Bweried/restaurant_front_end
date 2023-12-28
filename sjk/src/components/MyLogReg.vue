<template>
    <div class="container">
        <div class="login_box">
            <div class="head">
                用户登录
            </div>
            <!-- 登录 -->
            <div v-show="target == 1">
                <el-form label-width="0" class="login_form" :model="login_form" :rules="login_rules" ref="login_form">
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input v-model="login_form.username" spellcheck="false" placeholder="用户名">
                        </el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input v-model="login_form.password" show-password spellcheck="false" placeholder="密码">
                        </el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="login()">登录</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div class="operate">
                        <span id="op1" @click="change(2)">注册</span>
                        <span id="op2" @click="change(3)">管理员登录</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 管理员登录 -->
        <div class="login_box" v-show="target == 3">
            <div class="head">
                管理员登录
            </div>
            <!-- 管理员登录 -->
            <div>
                <el-form label-width="0" class="login_form" :model="admin_login_form" :rules="admin_login_rules"
                    ref="admin_login_form">
                    <!-- 管理员用户名 -->
                    <el-form-item prop="adminUsername">
                        <el-input v-model="admin_login_form.username" spellcheck="false" placeholder="管理员用户名">
                        </el-input>
                    </el-form-item>
                    <!-- 管理员密码 -->
                    <el-form-item prop="adminPassword">
                        <el-input v-model="admin_login_form.password" show-password spellcheck="false"
                            placeholder="管理员密码">
                        </el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="adminLogin()">登录</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div class="operate">
                        <span id="op1" @click="change(1)">用户登录</span>
                        <span id="op2" @click="change(2)">注册</span>
                    </div>
                </div>
            </div>
        </div>



        <!-- 注册表单 -->
        <div class="reg_box" v-show="target == 2">
            <div class="head">
                用户注册
            </div>
            <div>
                <el-form class="reg_form" :model="reg_form" :rules="reg_rules" ref="reg_form">
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input prefix-icon="iconfont icon-user" v-model="reg_form.username" spellcheck="false"
                            placeholder="用户名">
                        </el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.password" show-password
                            spellcheck="false" placeholder="密码(密码长度应在6到225位之间)"></el-input>
                    </el-form-item>

                    <el-form-item prop="name">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.name" spellcheck="false"
                            placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item prop="age">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.age" spellcheck="false"
                            placeholder="年龄"></el-input>
                    </el-form-item>

                    <el-form-item prop="gender">
                        <el-select v-model="reg_form.gender" placeholder="性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="telephone">
                        <el-input prefix-icon="iconfont icon-password" v-model="reg_form.telephone" spellcheck="false"
                            placeholder="手机号码"></el-input>
                    </el-form-item>

                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button type="primary" @click="zhuce()">注册</el-button>
                    </el-form-item>

                </el-form>
                <div>
                    <div>
                        <span @click="change(1)"
                            style="margin-left:210px;color: #000;opacity: .5;font-weight: 400;font-size: 16px;cursor:pointer;">登录</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyLogin',
    data() {
        var checkPassword = (rule, value, cb) => {
            const regPassword = /^.{6,225}$/;
            if (regPassword.test(value)) {
                return cb();
            }
            cb(new Error('密码长度应在6到225位之间'));
        };
        var checkMobile = (rule, value, cb) => {
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if (regMobile.test(value)) {
                // 合法的手机号码
                return cb()
            }
            cb(new Error('手机号码格式不正确'))
        };
        var checkAge = (rule, value, cb) => {
            const age = parseInt(value, 10);

            if (isNaN(age) || age < 18 || age > 99) {
                cb(new Error('年龄必须在18到99岁之间'));
            } else {
                cb();
            }
        };
        return {
            target: 1,
            login_form: {
                username: '',
                password: '',
            },
            reg_form: {
                username: '',
                password: '',
                name: '',
                age: '',
                gender: '',
                tel: '',
            },
            admin_login_form: {
                username: '',
                password: '',
            },
            login_rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }]
            },
            reg_rules: {
                username: [{ required: true, message: '请设置用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请设置密码', trigger: 'blur' }, { validator: checkPassword, trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' },],
                age: [{ required: true, message: '请设置年龄', trigger: 'blur' }, { validator: checkAge, trigger: 'blur' }],
                tel: [{ required: true, message: '请绑定手机号', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
            },
            admin_login_rules: {
                username: [
                    { required: true, message: '请输入管理员用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        zhuce() {
            console.log(this.reg_form.username)
            this.$refs.reg_form.validate(valid => {
                console.log('Form is valid:', valid);

                if (!valid)
                    return;
                else {
                    this.$axios.request({
                        method: 'POST',
                        url: '/register',
                        data: {
                            username: this.reg_form.username,
                            password: this.reg_form.password,
                            name: this.reg_form.name,
                            age: this.reg_form.age,
                            gender: this.reg_form.gender,
                            tel: this.reg_form.telephone
                        }
                    }).then((res) => {
                        // console.log(res.status);
                        if (res.data.status == 200) {
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                            this.target = 1;
                            // 页面变为登录页面
                        } else {
                            console.log(res.data.message)
                            this.$message({
                                message: res.data.message,
                                type: 'error'
                            })
                        }
                    })
                }
            })
        },
        change(id) {
            this.target = id;
        },
        async login() {
            this.$axios.post("/login", this.login_form).then((res) => {
                console.log(res.status);
                //200登录成功
                if (res.data.status != 200) {
                    return this.$message({
                        message: res.data.message,
                        type: 'error'
                    })
                } else {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    window.localStorage.setItem("token", res.data.access_token);

                    this.$router.push('/user');
                }
            }).catch(error => {
                // console.log(res.response.data);
                console.log(error)
                this.$message({
                    message: error.response.data.message,
                    type: 'error'
                })
            })
        },
        async adminLogin() {
            try {
                const response = await this.$axios.post("/admin/login", this.admin_login_form);

                console.log(response.status);
                console.log(response.data.message)

                // 检查登录是否成功（假设状态码为 200）
                if (response.data.status != 200) {
                    return this.$message({
                        message: response.data.message,
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: '管理员登录成功',
                        type: 'success'
                    });

                    // 保存管理员的访问令牌到本地存储
                    window.localStorage.setItem("token", response.data.access_token);

                    // 跳转到管理员页面
                    this.$router.push('/manage');
                }
            } catch (error) {
                console.error(error);

                // 处理错误
                this.$message({
                    message: error.response.data.message,
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: #2b4b6b;
    height: 100%;
    width: 100%;
}

.head {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: larger;
}

.login_box {
    height: 300px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.reg_box {
    height: 550px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.forget_box {
    height: 350px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input {
    width: 350px;
    height: 50px;
    margin-left: 50px;
}

.el-form-item {
    width: 350px;
    margin-left: 50px;
}

.btns {
    text-align: center;
}

.operate {
    text-align: center;
    color: #000;
    opacity: .5;
    font-weight: 400;
    font-size: 16px;
    margin-left: 28px;
}

#op1 {
    padding-left: 15px;
    padding-right: 30px;
    border-right: 1px solid #bdb9b9;
    cursor: pointer;
}

#op2 {
    padding-left: 30px;
    padding-right: 15px;
    // border-right: 1px solid #e5e5e5;
    cursor: pointer;
}
</style>