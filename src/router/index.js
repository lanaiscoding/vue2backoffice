import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Cookies from 'js-cookie';

//没用懒加载
import Home from "../views/Home";
import User from "../views/User";
import Main from "../views/Main";
import Mall from "../views/Mall";
import PageOne from "../views/PageOne";
import PageTwo from "../views/PageTwo";

import Login from "../views/Login";

const routes = [{
        path: '/',
        component: Main,
        name: 'main',
        redirect: '/home', //重定向
        children: [
            // {
            //     path: 'home',
            //     name: 'home',
            //     component: Home
            // }, //首页
            // {
            //     path: 'user',
            //     name: 'user',
            //     component: User
            // }, //用户管理
            // {
            //     path: 'mall',
            //     name: 'mall',
            //     component: Mall
            // }, //商品管理
            // {
            //     path: 'page1',
            //     name: 'page1',
            //     component: PageOne
            // }, //页面1
            // {
            //     path: 'page2',
            //     name: 'page2',
            //     component: PageTwo
            // }, //页面2
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)


    return originalPush.call(this, location).catch(err => err)
}


//前置路由守卫
router.beforeEach((to, from, next) => {
    // const token = Cookies.get("token")
    const token = localStorage.getItem("token")

    //token不存在且非login页面
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        })
    }
    //防止重复登录
    else if (token && to.name === 'login') {
        next({
            name: 'home'
        })
    } else {
        next()
    }
})

export default router