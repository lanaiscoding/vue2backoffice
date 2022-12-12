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
        }
    }
}