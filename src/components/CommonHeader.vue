<template lang="">
    <div class="header-container flex-center">
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu" size="mini" style="margin-right:10px"
            id="hamburger"
            />
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{$t(`menu.${item.name}`)}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content flex-center">
            <!-- 引导 -->
            <Driver />
            <!-- 中英文切换 -->
            <el-dropdown @command="handleChangeLang"
            id="language">
                <img src="../assets/lang.png" alt="" class="lang"></img>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item 
                    command="zh"
                    :disabled="currentLanguage ==='zh'">中文</el-dropdown-item>
                    <el-dropdown-item 
                    command="en"
                    :disabled="currentLanguage ==='en'">English</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            <!-- 个人中心 -->
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user_avatar" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>{{$t('logout.space')}}</el-dropdown-item>
                    <el-dropdown-item command="Logout">{{$t('logout.logout')}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
//引导页
import Driver from './driver'
//获取面包屑里的数据,store里的state。
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {

        }
    },
    components: { Driver },
    methods: {
        handleMenu() {
            // console.log('点击')
            this.$store.commit('COLLAPSE_MENU')
        },

        //中英文切换
        handleChangeLang(command) {
            this.$store.commit('CHANGE_LANG', command)
            localStorage.setItem('lang', command)
            this.$i18n.locale = command
        },

        // 个人中心
        handleCommand(command) {
            if (command === 'LogOut') {
                // Cookie.remove('token')
                //清除菜单
                // Cookie.remove('menu')

                localStorage.removeItem('menu');
                localStorage.removeItem('token');

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
        }),

        currentLanguage() {
            return this.$i18n.locale
        }
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
        .lang {
            width: 25px;
            height: 25px;
            margin-right: 10px;
            /* background-color: white; */
            border-radius: 5px;
            vertical-align: middle;
        }

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