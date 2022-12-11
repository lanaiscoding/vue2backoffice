<template lang="">
    <div class="header-container flex-center">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <span class="text">首页</span>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user_avatar" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            //不需要传入属性嘛？这里只传了方法呢。
            // console.log('点击')
            this.$store.commit('COLLAPSE_MENU')
        }
    }
}
</script>
<style lang="less" scoped>
.header-container {
    background-color: #333;
    height: 60px;
    padding: 0 20px;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .r-content {
        .user_avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #fff;
            vertical-align: middle;
        }
    }

}
</style>