<template lang="">
    <div class="tags">
        <el-tag
            v-for="(item,index) in tags"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name?'dark':'plain'"
            size="small"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            >
            {{ item.label }}
         </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations(['CLOSE_TAG']),

        //点击tag跳转
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        //点击tag删除的功能
        handleClose(item, index) {
            //调用store中的mutation
            this.CLOSE_TAG(item)


            //删除后的数组长度和实际取到的index对比。
            const length = this.tags.length

            //删除之后的跳转逻辑
            //删除的非选中的，不影响。
            //删除的是最后一项时
            if (index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                //else是必需的，不然页面显示和路由会错掉。因为不知道跳转到哪里。
                this.$router.push({
                    name: this.tags[index].name
                })
            }

        }


    },
}
</script>
<style lang="less" scoped>
.tags {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>