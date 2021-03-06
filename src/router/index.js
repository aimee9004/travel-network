import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/env'

Vue.use(Router)

const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'helloworld')
const Demo = r => require.ensure([], () => r(require('@/page/demo/demo')), 'demo')

/**
 * 交易模块
 */
// 交易 CEEC 列表
const ListQc = r => require.ensure([], () => r(require('@/page/deal/list-qc')), 'listQc') 

// 买入 卖出页面
const BuySell = r => require.ensure([], () => r(require('@/page/deal/buy-sell/buy-sell')), 'buySell')

// 分享页面
const ShareOne = r => require.ensure([], () => r(require('@/page/share/share-one')), 'shareOne')
const ShareTwo = r => require.ensure([], () => r(require('@/page/share/share-two')), 'shareTwo')


let myRoutes = [
  {
    path: '/exchange',
    name: 'listQc',
    component: ListQc
  }, {
    path: '/buy-sell/:id',
    name: 'buySell',
    component: BuySell
  }, {
    path: '/share-one',
    name: 'shareOne',
    component: ShareOne
  }, {
    path: '/share-two',
    name: 'shareTwo',
    component: ShareTwo
  }, {
    path: '/demo',
    name: 'demo',
    component: Demo
  }
]

export default new Router({
  routes: myRoutes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
