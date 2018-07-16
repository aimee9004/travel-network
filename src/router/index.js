import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/env'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'helloworld')


let myRoutes = [
  {
    path: '/',
    name: 'helloworld',
    component: HelloWorld
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
