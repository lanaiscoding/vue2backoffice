import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//没用懒加载
import Home from "../views/Home";
import User from "../views/User";
import Main from "../views/Main";

const routes = [{
        path: '/',
        component: Main,
        redirect: '/home',
        children: [{
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            }
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router