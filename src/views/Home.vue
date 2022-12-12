<template lang="">
    <el-row>
        <el-col :span="8" style="padding-right:10px">
            <el-card class="box-card">
               <div class="user">
                    <img src="../assets/logo.png" alt="">
                    <div class="userinfo">
                        <p class="name">admin</p>
                        <p class="access">超级管理员</p>
                    </div>
               </div>
               <div class="login-info">
                    <p>上次登录时间:<span>2022/12/11</span></p>
                    <p>上次登录地点:<span>北京</span></p>
               </div>
            </el-card>
            <el-card style="margin-top:20px;">
                <el-table
                 :data="tableData"
                 style="width: 100%">
                <!-- <el-table-column
                    prop="name"
                    label="手机品牌">
                </el-table-column>
                <el-table-column
                    prop="todayBuy"
                    label="日销量">
                </el-table-column>
                <el-table-column
                    prop="monthBuy"
                    label="月销量">
                </el-table-column>
                <el-table-column
                    prop="totalBuy"
                    label="总销量">
                </el-table-column> -->
                <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" 
                :key="key"/>
                   
               </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:10px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="price">￥{{item.value}}</p>
                        <p class="desc">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <!-- 折线图 -->
            <el-card>
                <div ref="echart1" style="height:280px"></div>
            </el-card>

            <!-- 其他图表 -->
            <div class="flex-center graph">
                <el-card >
                    <div ref="echart2" style="height:260px"></div>
                </el-card>
                <el-card >
                    <div ref="echart3" style="height:240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import { getData } from "../api";
import * as echarts from 'echarts';
export default {
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: '品牌',
                todayBuy: '日销量',
                monthBuy: '月销量',
                totalBuy: '年销量',
            },
            countData: [
                {
                    name: "今日支付订单",
                    value: 21,
                    icon: "success",
                    color: "#2ec7c9"
                },
                {
                    name: "本月收最订单",
                    value: 218,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "本月收最订单1",
                    value: 218,
                    icon: "star-on",
                    color: "#ffb980"
                },
                {
                    name: "本月收最订单2",
                    value: 218,
                    icon: "star-on",
                    color: "#2ec7c9"
                },
                {
                    name: "本月未支付订单",
                    value: 1231,
                    icon: "s-goods",
                    color: "#ffb980"
                },
                {
                    name: "本月未支付订单2",
                    value: 1231,
                    icon: "s-goods",
                    color: "#ffb980"
                },
            ]
        }

    },
    mounted() {
        getData().then(({ data }) => {
            const { tableData } = data.data
            this.tableData = tableData

            //1.基于准备好的dom，初始化echarts实例
            const echart1 = echarts.init(this.$refs.echart1)
            //指定图表的配置项和数据
            var echart1Option = {}
            //处理数据xAxis
            const { orderData, userData, videoData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            const xAxisData = {
                data: xAxis
            }
            echart1Option.xAxis = xAxisData
            echart1Option.yAxis = {}
            echart1Option.legend = xAxisData
            echart1Option.series = []
            xAxis.forEach(key => {
                echart1Option.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
                })
            })

            //使用指定的配置项和数据显示图表
            echart1.setOption(echart1Option)

            // 柱状图
            const echart2 = echarts.init(this.$refs.echart2)
            const echart2Option = {
                legend: {
                    textStyle: {
                        color: "#333",
                    },
                },
                grid: {
                    left: "20%"
                },
                //提示框
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: "category",
                    data: userData.map(item => item.date),
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333"
                    }
                },
                yAxis: [{
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3"
                        }
                    }
                }],
                color: ["#2ec7c9", "#b6b2de"],
                series: [
                    {
                        name: "新增用户",
                        data: userData.map(item => item.new),
                        type: 'bar'
                    },
                    {
                        name: "活跃用户",
                        data: userData.map(item => item.active),
                        type: 'bar'
                    }
                ],
            }
            echart2.setOption(echart2Option)

            // 饼图
            const echart3 = echarts.init(this.$refs.echart3)
            const echart3Option = {
                tooltip: {
                    trigger: "item"
                },
                series: [
                    {
                        data: videoData,
                        type: 'pie'
                    }
                ],

            }
            console.log(echart3Option)
            echart3.setOption(echart3Option)
        })


    },
}
</script>
<style lang="less" scoped>
.user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }

}

.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .icon {
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }

    .detail {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .price {
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }

        .desc {
            font-size: 14px;
            text-align: center;
            color: #999;
        }
    }

    .el-card {
        width: 32%;
        margin-bottom: 20px;
    }
}

.graph {
    margin-top: 20px;

    .el-card {
        width: 48%;
        height: 260px;
    }
}
</style>