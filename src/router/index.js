import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//没用懒加载
import Home from "../views/Home";
import User from "../views/User";
import Main from "../views/Main";
import Mall from "../views/Mall";
import PageOne from "../views/PageOne";
import PageTwo from "../views/PageTwo";

const routes = [{
        path: '/',
        component: Main,
        redirect: '/home', //重定向
        children: [{
                path: 'home',
                component: Home
            }, //首页
            {
                path: 'user',
                component: User
            }, //用户管理
            {
                path: 'mall',
                component: Mall
            }, //商品管理
            {
                path: 'page1',
                component: PageOne
            }, //页面1
            {
                path: 'page2',
                component: PageTwo
            }, //页面2
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router