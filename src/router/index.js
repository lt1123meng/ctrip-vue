import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import IndexMain from 'components/index/Main'
import IndexServer from 'components/index/server'
import TicketIndex from 'components/index/ticket/TicketIndex'
import TicketMain from 'components/index/ticket/TicketMain'
import TicketResult from 'components/index/ticket/SearchResult'
import TicketDetail from 'components/index/ticket/TrainDetail'

import BgIndex from 'components/BgIndex'
import BgFirst from 'components/BgIndex/first'
import BgHot from 'components/BgIndex/hot'
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
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: TicketIndex,
      children: [
        {
          path: 'main',
          component: TicketMain
        },
        {
          path: 'result',
          component: TicketResult
        },
        {
          path: 'detail',
          component: TicketDetail
        }

      ]
    },

    {
      path: '/bgindex',
      name: 'bgIndex',
      component: BgIndex,
      children: [
        {
          path: 'first',
          component: BgFirst
        },
        {
          path: 'hot',
          component: BgHot
        }
      ]
    }
  ]
})
