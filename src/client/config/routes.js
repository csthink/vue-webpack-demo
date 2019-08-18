import Todo from '../views/todo/Todo.vue'
import Login from '../views/login/Login.vue'

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
    beforeEnter (to, from, next) {
      next()
    }
  },
  {
    path: '/login',
    component: Login
  }
]
