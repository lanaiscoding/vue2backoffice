<template lang="">
    <el-menu 
        :default-active="$route.name" 
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    <h3>{{isCollapse ? $t('title').short:$t('title').long}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{$t(`menu.${item.name}`)}}</span>
        </el-menu-item>

        <el-submenu  v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{$t(`menu.${item.label}`)}}</span>
            </template>
            <el-menu-item-group   v-for="subItem in item.children" :key="subItem.path" >
                <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{$t(`menu.${subItem.name}`)}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
// import store from '../store'
import Cookie from 'js-cookie'
export default {
    data() {
        return {
        }
    },
    methods: {
        //点击菜单
        clickMenu(item) {
            //当页面的路由与跳转的路由不一致时才允许跳转,
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path)
            }
            //实现面包屑效果
            this.$store.commit('SELECT_MENU', item)
        },

    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },

        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },

        isCollapse() {
            return this.$store.state.tab.isCollapse
        },

        //获取菜单
        menuData() {
            //可以从缓存的cookie中读,后面这个或好像意义不大。
            // return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
            return JSON.parse(localStorage.getItem('menu')) || this.$store.state.tab.menu
        }

    },
}
</script>
<style lang="less" scoped>
.el-menu {
    height: 100%;
    border-right: none;

    h3 {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        text-align: center;
        line-height: 48px;
        margin: 0 10px;
    }
}
</style>