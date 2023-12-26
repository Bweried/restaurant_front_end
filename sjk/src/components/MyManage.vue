<template>
    <div>
        <!-- <div class="header">
            &nbsp;&nbsp; 大学外卖平台---后台管理
        </div> -->
        <div class="body">
            <div class="liner">
                <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" @select="handleselect">

                    <el-menu-item index="1">
                        <i class="el-icon-s-shop"></i>
                        <span slot="title">菜品管理</span>
                    </el-menu-item>

                    <el-menu-item index="2">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>

                    <el-menu-item index="3">
                        <i class="el-icon-s-check"></i>
                        <span slot="title">顾客记录</span>
                    </el-menu-item>


                    <!-- <el-submenu>
                        <template slot="title">
                            <i class="el-icon-s-promotion"></i>
                            <span>物流管理</span>
                        </template>
                        <el-menu-item-group>

                            <el-menu-item index="4">已完成</el-menu-item>
                            <el-menu-item index="5">进行中</el-menu-item>
                        </el-menu-item-group>

                    </el-submenu> -->


                    <el-submenu index="100">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>

                            <el-menu-item index="6">已完成订单</el-menu-item>
                            <el-menu-item index="7">未完成订单</el-menu-item>
                            <!-- <el-menu-item index="8">未发货订单</el-menu-item> -->
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
                <div id="manageshop" v-show="active == 1">
                    <manageshop></manageshop>
                </div>

                <div id="manageserver" v-show="active == 2">
                    <manageserver></manageserver>
                </div>

                <div id="managedispatcher" v-show="active == 3">
                    <managedispatcher></managedispatcher>
                </div>


                <!-- <div id="wuliuended" v-show="active == 4">
                    <wuliuended></wuliuended>
                </div>

                <div id="wuliuunended" v-show="active == 5">
                    <wuliuunended></wuliuunended>
                </div> -->
                <div id="ordersended" v-show="active == 6">
                    <ordersended></ordersended>
                </div>
                <div id="ordersending" v-show="active == 7">
                    <ordersending></ordersending>
                </div>

                <!-- <div id="orderunsend" v-show="active == 8">
                    <orderunsend></orderunsend>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import manageshop from '@/components/ManageShop.vue'
import manageserver from '@/components/ManageServer.vue'
import managedispatcher from '@/components/ManageDispatcher.vue'
// import wuliuended from '@/components/ManageWuliu/WuliuEnded.vue'
// import wuliuunended from '@/components/ManageWuliu/WuliuUnended.vue'
import ordersended from '@/components/ManageOrder/BeSended.vue'
import ordersending from '@/components/ManageOrder/BeSending.vue'
// import orderunsend from '@/components/ManageOrder/UnSend.vue'
export default {
    components: {
        manageshop: manageshop,
        manageserver: manageserver,
        managedispatcher: managedispatcher,
        // wuliuended: wuliuended,
        // wuliuunended: wuliuunended,
        ordersended: ordersended,
        ordersending: ordersending,
        // orderunsend: orderunsend
    },
    data() {
        return {
            active: 1,
            logoutDialogVisible: false,
        }
    },
    methods: {
        handleselect(index) {
            this.active = index;
        },
        showLogoutDialog() {
            this.logoutDialogVisible = true;
        },
        closeLogoutDialog() {
            // 对话框关闭时的处理
        },logout() {
            // 执行退出登录操作，可能包括清除登录状态等
            // 然后跳转至登录页面
            localStorage.clear();
            this.$router.push('/login'); // 假设登录页面的路由为 '/login'
        },
        cancelLogout() {
            this.logoutDialogVisible = false;
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
  margin-bottom: 20px; /* 调整按钮与liner底部的距离 */
}

</style>