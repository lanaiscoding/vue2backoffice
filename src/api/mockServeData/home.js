import Mock from 'mockjs'

let List = []
export default {
    getStatisticalData: () => {
        //mock,Random.f1oat产生随机数100到8000之间 保留小数最小0位。最大0位？？
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    苹果: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    魅族: Mock.Random.float(100, 8000, 0, 0),
                    三星: Mock.Random.float(100, 8000, 0, 0),
                    小米: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼图 
                videoData: [{
                        name: '小米',
                        value: 2999
                    },
                    {
                        name: '苹果',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 2599
                    },
                    {
                        name: '三星',
                        value: 4999
                    },
                    {
                        name: 'oppo',
                        value: 2799
                    },
                ],
                //柱状图
                userData: [{
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 11,
                        active: 300
                    },
                    {
                        date: '周三',
                        new: 14,
                        active: 100
                    },
                    {
                        date: '周四',
                        new: 4,
                        active: 440
                    },
                    {
                        date: '周五',
                        new: 15,
                        active: 230
                    },
                    {
                        date: '周六',
                        new: 11,
                        active: 220
                    },
                    {
                        date: '周日',
                        new: 5,
                        active: 250
                    },

                ],
                //折线图
                orderData: {
                    date: ['20221201', '20221202', '20221203', '20221204', '20221205', '20221206', '20221207', ],
                    data: List
                },
                // 表格数据
                tableData: [{
                        name: 'oppo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'vivo',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    },
                    {
                        name: 'mi',
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800
                    }
                ],
            }
        }
    }
}