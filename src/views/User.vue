<template lang="">
    <div class="manage">
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
                    <el-option label="女" value="0"></el-option>
                    <el-option label="男" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期"
                prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期">
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
        <div class="manage-header">
            <el-button 
            @click="dialogVisible=true"
            type="primary">
                + 新增
            </el-button>
            <!-- 表格展示 -->
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { getUser } from '../api'
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
            ]
        }
    },
    methods: {
        //提交
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //后续对表单数据的处理

                    //清空表单
                    this.$refs.form.resetFields()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        }
    },
    mounted() {
        getUser().then(({ data }) => {
            console.log(data)
        })
    },
}
</script>
<style lang="">
    
</style>