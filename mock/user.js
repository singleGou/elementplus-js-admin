import mockjs from 'mockjs'

const userList = mockjs.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 随机生成id号
      id: '@id',
      // 随机生成中文姓名
      name: '@cname',
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      // 随机生成ip地址
      ip: '@ip',
      // 随机生成省市区地址
      address: '@county(true)',
      // 随机生成邮政编码
      zip: '@zip',
      // 随机生成18-70之间的年龄
      'age|18-70': 20,
      // 随机生成日期
      date: '@date("yyyy-MM-dd")',
      // 随机生成头像
      avatar: "@image('200x200')",
    },
  ],
})

const createUserList = () => {
  return mockjs.mock([
    {
      userId: 1,
      avatar: 'https://pic1.zhimg.com/80/v2-083faf550543c1e9f134b56b3322ee3c_720w.webp',
      username: 'admin',
      password: '111111',
      desc: '下船不谈船里事',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar: 'https://pic1.zhimg.com/80/v2-e1427f6a21122ac163ff98d24f55d372_720w.webp',
      username: 'system',
      password: '111111',
      desc: '旧人不谈近况，新人不讲过往',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ])
}
export default [
  // 用户登录接口
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      // 获取请求体携带过来的用户名与密码
      const { username, password } = body
      // 调用获取用户信息函数，用于判断是否有此用户
      const checkUser = createUserList().find((item) => item.username === username && item.password === password)
      // 没有用户则返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          data: {},
          message: '账号或者密码不正确',
        }
      }
      // 如果有返回成功信息
      const { token } = checkUser
      return {
        code: 200,
        data: {
          token,
        },
      }
    },
  },
  // 获取用户信息接口
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      // 获取请求头携带的 token
      const token = request.headers.token
      // 查看用户信息数据中是否包含有此 token 的用户
      const checkUser = createUserList().find((item) => item.token === token)
      // 没有就返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          data: {},
          message: '获取用户信息失败',
        }
      }
      // 有就返回成功信息
      return {
        code: 200,
        data: checkUser,
      }
    },
  },

  {
    url: '/api/user/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: userList,
      }
    },
  },
]
