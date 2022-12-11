import Mock from 'mockjs'
import homeApi from './mockServeData/home'

//定义mock请求拦截 是get时可以省略，应该表示默认时get吧 这个Url难道会默认去掉前缀吗？？？神奇。。视频里是有个/api的。
// Mock.mock('/home/getData', function () {
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return 1
// })
Mock.mock('/home/getData', homeApi.getStatisticalData)