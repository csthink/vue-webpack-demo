export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    name: 'app',
    meta: {
      title: 'todo 应用',
      description: 'todo 页面描述'
    },
    component: () => import('../views/todo/Todo.vue'),
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
