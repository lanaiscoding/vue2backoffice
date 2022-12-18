<template lang="">
    <div class="manage">
        <!-- 新增弹窗 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
        <!-- 用户的表单信息，行内展示 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name" >
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别"
                prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期"
                prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" 
                prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" 
                @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增按钮+搜索 -->
        <div class="manage-header flex-center">
            <el-button 
            @click="handleAdd"
            type="primary">
                + 新增
            </el-button>
            <!-- form表单搜索区域 -->
            <el-form
            :model="searchData"
            :inline="true">
            <el-form-item 
             prop="searchData" >
                <el-input placeholder="请输入字段" v-model="searchData.name"
                >
                </el-input>
                
            </el-form-item>
            <el-button 
            type="primary" 
            @click="onSearch">
            搜 索</el-button>
            </el-form>
        </div>  
        <!-- 表格&页码展示 -->
        <div class="manage-table">
            <el-table
                stripe
                height="90%"
                :data="tableData"
                style="width: 100%"
                >
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.sex ==0?'女':'男'}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
                        <el-button @click="handleDel(scope.row)" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 页码 -->
            <div class="pager">
                <el-pagination
                layout="sizes, prev, pager, next"
                    :total="total"
                    @current-change="handlePage"
                    @size-change="handleSizeChange"
                    :page-sizes="[5, 10,15]"
                    :page-size="pageData.limit"   
                    >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ],

            },
            tableData: [
            ],
            mode: 0, //0表示新增，1表示编辑
            total: 0,//信息总条数
            pageData: {
                page: 1,
                limit: 10
            },
            searchData: {
                name: ''
            }
        }
    },
    methods: {
        //提交
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //后续对表单数据的处理
                    if (this.mode === 0) {
                        addUser(this.form).then(() => {
                            //刷新列表
                            this.getUserList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            //刷新列表
                            this.getUserList()
                        })
                    }


                    //清空表单
                    this.$refs.form.resetFields()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },

        //关闭新增弹窗
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },

        //新增
        handleAdd() {
            this.dialogVisible = true
            this.mode = 0
        },

        //编辑
        handleEdit(val) {
            this.dialogVisible = true
            this.mode = 1

            this.form = { ...val }
        },

        //删除
        handleDel(val) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: val.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                    this.getUserList()
                })


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //获取数据列表
        getUserList() {
            getUser({ params: { ...this.searchData, ...this.pageData } }).then(({ data }) => {
                this.tableData = data.list
                this.total = data.count || 0
            })
        },

        //改变页数
        handlePage(val) {
            this.pageData.page = val
            this.getUserList()
        },

        handleSizeChange(val) {
            this.pageData.limit = val
            this.getUserList()
        },
        //搜索
        onSearch() {
            this.getUserList()
        },
    },
    mounted() {
        this.getUserList()
    },
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;

    .manage-table {
        position: relative;
        height: calc(100vh - 60px);

        .pager {
            position: absolute;
            right: 20px;
            bottom: 0;
        }
    }
}
</style>