import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/env'

Vue.use(Router)

const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'helloworld')

/**
 * 交易模块
 */
// 交易 QC 列表
const ListQc = r => require.ensure([], () => r(require('@/page/deal/list-qc')), 'listQc') 


let myRoutes = [
  {
    path: '/',
    redirect: '/qc-list'
  }, {
    path: '/qc-list',
    name: 'listQc',
    component: ListQc
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
