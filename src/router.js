import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mobile',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      // 无邀请码进该注册页面
      path: '/mobile/register',
      name: 'register',
      component: () => import('./views/Register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/mobile/regSuccess',
      name: 'regSuccess',
      component: () => import('./views/RegSuccess'),
      meta: {
        title: '注册成功'
      }
    },
    {
      path: '/mobile/invite',
      name: 'invite',
      component: () => import('./views/Invite'),
      meta: {
        title: '邀请有礼'
      }
    },
    {
      // 有邀请码进该注册页面
      path: '/mobile/register/:code/',
      name: 'RegisterByCode',
      component: () => import('./views/InviteRegister'),
      meta: {
        title: '邀请有礼'
      }
    },
    {
      // 有邀请码进该注册页面
      path: '/mobile/register/:code/:account',
      name: 'RegisterByCodeAndAcc',
      component: () => import('./views/InviteRegister'),
      meta: {
        title: '邀请有礼'
      }
    },
    {
      path: '/mobile/download',
      name: 'download',
      component: () => import('./views/Download'),
      meta: {
        title: '邀请有礼'
      }
    },
    {
      path: '/mobile/guessGame/guessIndex',
      name: 'guessIndex',
      component: () => import('./views/guessGame/GuessIndex'),
      meta: {
        title: '猜涨跌'
      }
    },
    {
      path: '/mobile/guessGame/rule/:currency',
      name: 'rule',
      component: () => import('./views/guessGame/Rule'),
      meta: {
        title: '活动规则'
      }
    },
    {
      path: '/mobile/guessGame/history',
      name: 'history',
      component: () => import('./views/guessGame/History'),
      meta: {
        title: '历史记录'
      }
    },
    {
      path: '*',
      component: () => import('./views/Home')
    }
    // ,
    // {
    //   path: '/about',
    //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
