// import Todo from '../views/todo/Todo.vue'
// import Login from '../views/login/Login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:age',
    // props: true, // 直接在组件中通过 props 获取
    // props: {
    //   age: 45
    // },
    // props: (route) => ({
    //   age: route.query.b
    // }),
    name: 'app', // 路由命名,可以用于在 router-link 中跳转
    meta: {
      title: 'todo 应用',
      description: 'todo 页面描述'
    },
    component: () => import('../views/todo/Todo.vue'),
    beforeEnter (to, from, next) {
      console.log('app router before enter invoked')
      next()
    },
    // children: [
    //   {
    //     path: 'test',
    //     component:
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      description: '登录页面'
    },
    component: () => import('../views/login/Login.vue')
  }
]
