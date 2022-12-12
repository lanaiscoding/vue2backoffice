import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'

//定义mock请求拦截 是get时可以省略，应该表示默认时get吧 这个Url难道会默认去掉前缀吗？？？神奇。。视频里是有个/api的。
// Mock.mock('/home/getData', function () {
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return 1
// })

//定义首页数据
Mock.mock('/home/getData', homeApi.getStatisticalData)

//定义用户列表数据
Mock.mock('/user/add', 'post', user.createUser)
Mock.mock('/user/edit', 'post', user.updateUser)
Mock.mock('/user/del', 'post', user.deleteUser)
Mock.mock('/user/getUser', user.getUserList)