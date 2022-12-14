//缓存菜单
import Cookie from 'js-cookie'
//菜单的状态管理
export default {
    state: {
        isCollapse: false, //用于控制菜单的展开/收起
        tabsList: [{
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
        }, ], //面包屑数据  这个是默认显示首页 的数据

        //Menu数据
        menu: [],
        route: [],
    },
    mutations: {
        //修改菜单展开收起的方法
        COLLAPSE_MENU(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        SELECT_MENU(state, val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //删除指定的tag数据
        CLOSE_TAG(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        },

        //动态获取菜单列表
        GET_MENU(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },

        //动态获取路由列表
        GET_SUBROUTER(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return

            const menu = JSON.parse(Cookie.get('menu'))

            //更新一下数据
            state.menu = menu

            //组装动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                //有二级菜单
                if (item.children) {
                    item.children.map(item => {
                        item.component = (resolve) => require([`../views/${item.url}`], resolve)
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = (resolve) => require([`../views/${item.url}`], resolve)
                    menuArray.push(item)
                }

            });
            console.log(menuArray, 'array')

            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('main', item)
            })
        },


    }
}