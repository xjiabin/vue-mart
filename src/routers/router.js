import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store/store'
import History from '@/utils/history'

Vue.use(Router)
Vue.use(History)

Router.prototype.goBack = function() {
  this.isBack = true;
  this.back();
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { isNav: true }
    },
    {
      path: '/cart',
      name: 'cart',
      meta: { auth: true, isNav: true },
      component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue')
    },
    {
      path: '/person',
      name: 'person',
      meta: { isNav: true },
      component: () => import(/* webpackChunkName: "person" */ '@/views/Person.vue'),
      children: [
        
      ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
      },
    {
      path: '/about',
      name: 'about',
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 需要验证
    // 验证 token
    if (store.state.token) { // 有token
      next(); // 放行
    } else { // 无token
      next({
        name: 'login',
        query: { redirect: to.path }
      }); // 去登录页
    }
  } else { // 无需验证
    next(); // 直接放行
  }
});

router.afterEach((to, from) => {
  if (to.meta.isNav) {
    if (router.isBack) {
      // 后退
      History.pop();
      router.transitionName = 'route-back';
      router.isBack = false;
    } else {
      // 前进
      router.transitionName = 'route-forward';
      History.push(to.path);
    }
  }
})

export default router