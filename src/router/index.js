import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import Users from "../components/users/Users";
import Rights from "../components/power/Rights";
import Roles from "../components/power/Roles/Roles";
import Categories from "../components/goods/Categories";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/users',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Categories
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to: 表示将要访问的路径
  // from: 表示从哪个路径跳转而来
  // next: 是一个函数，表示放行
  // next() 放行    next('/login')   强制跳转到某个路径

  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
});

export default router
