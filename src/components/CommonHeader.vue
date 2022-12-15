<template lang="">
    <div class="header-container flex-center">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini" style="margin-right:10px" />
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user_avatar" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="Logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
        </div>
    </div>
</template>

<script>
//获取面包屑里的数据,store里的state。
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
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
        },
        handleCommand(command) {
            if (command === 'LogOut') {
                // Cookie.remove('token')
                //清除菜单
                // Cookie.remove('menu')

                localStorage.clear();

                //重置一下面包屑
                this.$store.state.tab.tabsList = [{
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },]

                this.$message({
                    message: '退出成功',
                    type: 'success'
                });

                this.$router.push('login')
            }


        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
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

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
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