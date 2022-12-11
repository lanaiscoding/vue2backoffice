//菜单的状态管理
export default {
    state: {
        isCollapse: false //用于控制菜单的展开/收起
    },
    mutations: {
        //修改菜单展开收起的方法
        COLLAPSE_MENU(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}