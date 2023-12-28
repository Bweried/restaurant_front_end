<template>
    <div>
        <div class="body">
            <!-- 左侧导航栏 -->
            <div class="liner">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" @select="handleselect">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">点餐</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>个人订单</span>
                        </template>
                        <el-menu-item-group>

                            <el-menu-item index="3">消费记录</el-menu-item>
                            <el-menu-item index="5">未付款订单</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>

                    <el-submenu>
                        <template slot="title">
                            <i class="el-icon-s-home"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>

                            <el-menu-item index="6">个人信息</el-menu-item>
                            <el-menu-item index="7">修改密码</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>


                </el-menu>
                <template>
                    <div>
                        <el-button class="absolute-bottom" type="danger" @click="showLogoutDialog">退出登录</el-button>
                        <el-dialog title="确认退出" :visible.sync="logoutDialogVisible" width="30%" @close="closeLogoutDialog">
                            <p>确定要退出登录吗？</p>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="danger" @click="logout">确认</el-button>
                                <el-button @click="cancelLogout">取消</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </template>
            </div>

            <div class="main">
                <div id="usershop" v-show="active == 1">
                    <usershop></usershop>
                </div>

                <div id="userfinished" v-show="active == 3">
                    <userfinished></userfinished>
                </div>

                <div id="userunsend" v-show="active == 5">
                    <userunsend></userunsend>
                </div>

                <div id="indimag" v-show="active == 6">
                    <indimsg></indimsg>
                </div>

                <div id="changepwd" v-show="active == 7">
                    <changepwd></changepwd>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import usershop from '@/components/UserShop.vue'
import userfinished from '@/components/UserOrder/UserFinished.vue'
import userunsend from '@/components/UserOrder/UserUnsend.vue'
import indimsg from '@/components/UserMsg/IndiMsg.vue'
import changepwd from '@/components/UserMsg/ChPwd.vue'
export default {
    components: {
        usershop: usershop,
        userfinished: userfinished,
        // usersending: usersending,
        userunsend: userunsend,
        indimsg: indimsg,
        changepwd: changepwd,
    },
    data() {
        return {
            active: 1,
            logoutDialogVisible: false,
        };
    },
    methods: {
        handleselect(index) {
            this.active = index;
        },
        showLogoutDialog() {
            this.logoutDialogVisible = true;
        },
        logout() {
            // 执行退出登录操作，可能包括清除登录状态等
            // 然后跳转至登录页面
            localStorage.clear();
            this.$router.push('/login'); // 假设登录页面的路由为 '/login'
        },
        cancelLogout() {
            this.logoutDialogVisible = false;
        },
        closeLogoutDialog() {
            // 对话框关闭时的处理
        },
    },
}  
</script>

<style scoped>
.header {
    width: 100%;
    height: 10vh;
    /* text-align: center; */
    line-height: 10vh;
    font-size: 25px;
    font-weight: 800;
    background-color: #e3e3e3;
    /* padding-left: 100px; */
}

.body {
    width: 100%;
    height: 648px;
    display: flex;
    justify-content: space-around;
}

.liner {
    position: relative;
    width: 15%;
    height: 100vh;
    background-color: #545c64;
}

.main {
    width: 85%;
}

.absolute-bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
    /* 调整按钮与liner底部的距离 */
}
</style>