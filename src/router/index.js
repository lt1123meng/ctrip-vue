import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import IndexMain from 'components/index/Main'
import IndexServer from 'components/index/server'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'main',
          component: IndexMain
        },
        {
          path: 'server',
          component: IndexServer
        }
      ]
    }
  ]
})
